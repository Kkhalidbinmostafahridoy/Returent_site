const express = require('express')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const rateLimit = require('express-rate-limit')
const { withStore, readStore } = require('../db')
const { generateOtp } = require('../utils/otp')
const { sendMail, isSmtpConfigured } = require('../utils/email')
const { signToken, setAuthCookie, clearAuthCookie, authMiddleware } = require('../middleware/auth')

const router = express.Router()

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
})

const registerValidators = [
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Name must be 2–80 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8, max: 128 }).withMessage('Password must be 8–128 characters'),
]

router.post('/register', authLimiter, registerValidators, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() })
  }
  const { name, email, password } = req.body
  if (process.env.NODE_ENV === 'production' && !isSmtpConfigured()) {
    return res.status(503).json({
      message:
        'Email is not configured on this server. Set SMTP_HOST, SMTP_USER, and SMTP_PASS to send real messages.',
    })
  }
  const existing = readStore().users.find((u) => u.email === email)
  if (existing) {
    return res.status(409).json({ message: 'An account with this email already exists' })
  }
  const otp = generateOtp()
  const otpHash = await bcrypt.hash(otp, 10)
  const passwordHash = await bcrypt.hash(password, 10)
  const user = {
    id: `u_${Date.now()}`,
    name,
    email,
    passwordHash,
    verified: false,
    createdAt: new Date().toISOString(),
  }
  withStore((store) => {
    store.users.push(user)
    store.otpByEmail[email] = {
      otpHash,
      expires: Date.now() + 10 * 60 * 1000,
      attempts: 0,
    }
  })
  let mail
  try {
    mail = await sendMail({
      to: email,
      subject: 'Verify your Cream & Crust account',
      text: `Your verification code is: ${otp}\n\nThis code expires in 10 minutes.`,
      html: `<p>Your verification code is:</p><p style="font-size:24px;font-weight:bold;">${otp}</p><p>This code expires in 10 minutes.</p>`,
    })
  } catch (e) {
    console.error('[register] email failed', e.message)
    return res.status(500).json({ message: 'Could not send verification email. Try again later.' })
  }
  const payload = {
    message:
      mail.mode === 'smtp'
        ? 'Registration started. Check your email for the verification code.'
        : 'Registration started. No real SMTP is configured — use the preview link or the development code below (not sent to your real inbox).',
    email,
    emailMode: mail.mode,
  }
  if (mail.previewUrl) payload.mailPreviewUrl = mail.previewUrl
  if (process.env.NODE_ENV !== 'production' && mail.mode === 'ethereal') {
    payload.devOtp = otp
  }
  res.status(201).json(payload)
})

const otpValidators = [
  body('email').isEmail().normalizeEmail(),
  body('otp').matches(/^\d{6}$/).withMessage('OTP must be 6 digits'),
]

router.post('/verify-otp', authLimiter, otpValidators, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() })
  }
  const { email, otp } = req.body
  const store = readStore()
  const user = store.users.find((u) => u.email === email)
  if (!user) return res.status(404).json({ message: 'No registration found for this email' })
  if (user.verified) return res.status(400).json({ message: 'Email is already verified' })
  const rec = store.otpByEmail[email]
  if (!rec || rec.expires < Date.now()) {
    return res.status(400).json({ message: 'Code expired. Request a new code.' })
  }
  if (rec.attempts >= 5) {
    return res.status(429).json({ message: 'Too many attempts. Request a new code.' })
  }
  const ok = await bcrypt.compare(otp, rec.otpHash)
  if (!ok) {
    withStore((s) => {
      const r = s.otpByEmail[email]
      if (r) r.attempts += 1
    })
    return res.status(400).json({ message: 'Invalid verification code' })
  }
  withStore((s) => {
    const u = s.users.find((x) => x.email === email)
    if (u) u.verified = true
    delete s.otpByEmail[email]
  })
  res.json({ message: 'Email verified. You can sign in now.' })
})

router.post('/resend-otp', authLimiter, body('email').isEmail().normalizeEmail(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ message: 'Valid email required' })
  const { email } = req.body
  if (process.env.NODE_ENV === 'production' && !isSmtpConfigured()) {
    return res.status(503).json({
      message:
        'Email is not configured on this server. Set SMTP_HOST, SMTP_USER, and SMTP_PASS to send real messages.',
    })
  }
  const store = readStore()
  const user = store.users.find((u) => u.email === email)
  if (!user) return res.status(404).json({ message: 'No account found' })
  if (user.verified) return res.status(400).json({ message: 'Already verified' })
  const otp = generateOtp()
  const otpHash = await bcrypt.hash(otp, 10)
  withStore((s) => {
    s.otpByEmail[email] = {
      otpHash,
      expires: Date.now() + 10 * 60 * 1000,
      attempts: 0,
    }
  })
  let mail
  try {
    mail = await sendMail({
      to: email,
      subject: 'Your new Cream & Crust verification code',
      text: `Your verification code is: ${otp}`,
      html: `<p>Your new verification code:</p><p style="font-size:24px;font-weight:bold;">${otp}</p>`,
    })
  } catch (e) {
    console.error('[resend-otp]', e.message)
    return res.status(500).json({ message: 'Could not send email' })
  }
  const payload = {
    message:
      mail.mode === 'smtp'
        ? 'A new code was sent to your email.'
        : 'A new code was generated. Use the preview link or development code (no real inbox without SMTP).',
    emailMode: mail.mode,
  }
  if (mail.previewUrl) payload.mailPreviewUrl = mail.previewUrl
  if (process.env.NODE_ENV !== 'production' && mail.mode === 'ethereal') {
    payload.devOtp = otp
  }
  res.json(payload)
})

const loginValidators = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 1 }),
]

router.post('/login', authLimiter, loginValidators, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid credentials' })
  const { email, password } = req.body
  const store = readStore()
  const user = store.users.find((u) => u.email === email)
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }
  if (!user.verified) {
    return res.status(403).json({
      code: 'EMAIL_NOT_VERIFIED',
      message: 'Please verify your email before signing in.',
      email: user.email,
    })
  }
  const token = signToken({ sub: user.id, email: user.email, name: user.name })
  setAuthCookie(res, token)
  res.json({
    user: { id: user.id, name: user.name, email: user.email, verified: user.verified },
  })
})

router.post('/logout', (req, res) => {
  clearAuthCookie(res)
  res.json({ message: 'Signed out' })
})

router.get('/me', authMiddleware, (req, res) => {
  const store = readStore()
  const user = store.users.find((u) => u.id === req.userId)
  if (!user) {
    clearAuthCookie(res)
    return res.status(401).json({ message: 'Session invalid' })
  }
  res.json({
    user: { id: user.id, name: user.name, email: user.email, verified: user.verified },
  })
})

module.exports = router
