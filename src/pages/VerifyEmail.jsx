import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'
import { authApi } from '../services/api'

export default function VerifyEmail() {
  const location = useLocation()
  const navigate = useNavigate()
  const emailFromState = location.state?.email || ''
  const [email, setEmail] = useState(emailFromState)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [help, setHelp] = useState(() => ({
    mailPreviewUrl: location.state?.mailPreviewUrl,
    devOtp: location.state?.devOtp,
    emailMode: location.state?.emailMode,
  }))

  const inputCls = `w-full border-2 border-cream-200 dark:border-white/20 bg-white dark:bg-dark-bg px-4 py-3 text-sm
    focus:outline-none focus:border-crimson-500 dark:text-cream-100 transition-colors placeholder-gray-400`

  const showDevHelp = help.emailMode === 'ethereal' || help.mailPreviewUrl || help.devOtp

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!/^\d{6}$/.test(otp)) {
      toast.error('Enter the 6-digit code from your email')
      return
    }
    setLoading(true)
    try {
      await authApi.verifyOtp({ email, otp })
      toast.success('Email verified. You can sign in now.')
      navigate('/login', { replace: true, state: { email } })
    } catch (err) {
      toast.error(err.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email) {
      toast.error('Enter your email')
      return
    }
    setLoading(true)
    try {
      const res = await authApi.resendOtp(email)
      toast.success(res.message || 'Code sent', { duration: 5000 })
      setHelp({
        mailPreviewUrl: res.mailPreviewUrl,
        devOtp: res.devOtp,
        emailMode: res.emailMode,
      })
      if (res.mailPreviewUrl) {
        toast.success(
          <span>
            <a href={res.mailPreviewUrl} target="_blank" rel="noreferrer" className="underline font-bold">
              Open captured email
            </a>
          </span>,
          { duration: 20000 }
        )
      }
      if (res.devOtp) {
        toast(`Your verification code (dev): ${res.devOtp}`, { duration: 20000 })
      }
    } catch (err) {
      toast.error(err.message || 'Could not resend')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-20 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="font-display text-4xl font-bold text-crimson-700 dark:text-gold-400">Cream & Crust</h1>
            <p className="text-gold-600 text-xs tracking-[0.3em] uppercase font-bold mt-1">C&C Bengali Kitchen</p>
          </Link>
        </div>

        <div className="bg-white dark:bg-crimson-800/30 border border-cream-200 dark:border-white/10 p-8 shadow-2xl">
          <div className="flex justify-center mb-4 text-crimson-600 dark:text-gold-400">
            <Mail size={40} />
          </div>
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-cream-100 mb-1">Verify your email</h2>
          <p className="text-sm text-gray-600 dark:text-cream-200/70 mb-6">
            Enter the 6-digit code to activate your account. Only verified users can sign in.
          </p>

          {showDevHelp && (
            <div className="mb-6 p-4 text-xs leading-relaxed bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 text-amber-950 dark:text-amber-100 rounded-sm">
              <p className="font-bold mb-2">Why you may not see an email in Gmail</p>
              <p className="mb-2">
                This project uses a <strong>test mail catcher (Ethereal)</strong> until you configure real SMTP on the
                server. Messages are <strong>not</strong> delivered to your real address.
              </p>
              {help.mailPreviewUrl && (
                <a
                  href={help.mailPreviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-crimson-700 dark:text-gold-300 underline mt-1"
                >
                  Open captured email <ExternalLink size={12} />
                </a>
              )}
              {help.devOtp && (
                <p className="mt-3 font-mono text-base tracking-widest">
                  Dev code: <strong>{help.devOtp}</strong>
                </p>
              )}
              <p className="mt-3 text-amber-800/90 dark:text-amber-200/80">
                For real delivery, set <code className="text-[10px] bg-white/50 dark:bg-black/30 px-1">SMTP_HOST</code>,{' '}
                <code className="text-[10px] bg-white/50 dark:bg-black/30 px-1">SMTP_USER</code>,{' '}
                <code className="text-[10px] bg-white/50 dark:bg-black/30 px-1">SMTP_PASS</code> on the API process.
              </p>
            </div>
          )}

          <div className="w-12 h-0.5 bg-gold-500 mb-6" />

          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">
                One-time code
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className={`${inputCls} tracking-[0.4em] text-center text-lg font-mono`}
                placeholder="000000"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Verify & continue'}
            </button>
          </form>

          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="mt-4 w-full text-sm font-bold text-crimson-600 dark:text-gold-400 hover:underline disabled:opacity-50"
          >
            Resend code
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-cream-200/50 mt-6">
            <Link to="/login" className="font-bold hover:underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
