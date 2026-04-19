const nodemailer = require('nodemailer')

let transporterPromise

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

async function getTransporter() {
  if (isSmtpConfigured()) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  }
  if (!transporterPromise) {
    transporterPromise = nodemailer.createTestAccount().then((testAccount) =>
      nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      })
    )
  }
  return transporterPromise
}

/**
 * @returns {{ messageId?: string, previewUrl: string | null, mode: 'smtp' | 'ethereal' }}
 */
async function sendMail({ to, subject, text, html }) {
  const mode = isSmtpConfigured() ? 'smtp' : 'ethereal'
  const transport = await getTransporter()
  const from = process.env.MAIL_FROM || '"Cream & Crust" <orders@creamandcrust.local>'
  const info = await transport.sendMail({ from, to, subject, text, html })
  let previewUrl = null
  if (mode === 'ethereal' && typeof nodemailer.getTestMessageUrl === 'function') {
    previewUrl = nodemailer.getTestMessageUrl(info) || null
  }
  if (previewUrl) {
    console.log(`[email] mode=${mode} to=${to} preview=${previewUrl}`)
  } else {
    console.log(`[email] mode=${mode} to=${to} messageId=${info.messageId || 'n/a'}`)
  }
  return { messageId: info.messageId, previewUrl, mode }
}

module.exports = { sendMail, isSmtpConfigured }
