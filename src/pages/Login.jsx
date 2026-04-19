import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await loginUser(form.email, form.password)
      toast.success('Welcome back!', { icon: '👋', style: { background: '#FFF5E1', color: '#8B0000', border: '1px solid #B8860B' } })
      navigate(from, { replace: true })
    } catch (err) {
      if (err.code === 'EMAIL_NOT_VERIFIED') {
        toast.error('Please verify your email before signing in.')
        navigate('/verify-email', { state: { email: form.email.trim() } })
      } else {
        toast.error(err.message || 'Sign in failed')
      }
    } finally {
      setLoading(false)
    }
  }

  const inputCls = `w-full border-2 border-cream-200 dark:border-white/20 bg-white dark:bg-dark-bg px-4 py-3 text-sm
    focus:outline-none focus:border-crimson-500 dark:text-cream-100 transition-colors placeholder-gray-400`

  return (
    <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="font-display text-4xl font-bold text-crimson-700 dark:text-gold-400">Cream & Crust</h1>
            <p className="text-gold-600 text-xs tracking-[0.3em] uppercase font-bold mt-1">C&C Bengali Kitchen</p>
          </Link>
        </div>

        <div className="bg-white dark:bg-crimson-800/30 border border-cream-200 dark:border-white/10 p-8 shadow-2xl">
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-cream-100 mb-1">Sign In</h2>
          <p className="font-bangla text-crimson-500 dark:text-gold-400 text-sm mb-4">লগইন করুন</p>

          <div className="flex gap-3 justify-center mb-6" role="tablist" aria-label="Choose sign in or register">
            <Link
              to="/login"
              state={location.state}
              aria-current="page"
              className="flex flex-1 max-w-[9.5rem] flex-col items-center justify-center gap-1.5 px-3 py-3 border-2 border-crimson-600 bg-crimson-600 text-white rounded-sm shadow-md transition-transform hover:scale-[1.02]"
            >
              <LogIn size={22} strokeWidth={2.25} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Sign in</span>
            </Link>
            <Link
              to="/register"
              state={location.state}
              className="flex flex-1 max-w-[9.5rem] flex-col items-center justify-center gap-1.5 px-3 py-3 border-2 border-cream-200 dark:border-white/25 bg-cream-50 dark:bg-dark-bg text-gray-800 dark:text-cream-100 rounded-sm hover:border-crimson-500 dark:hover:border-gold-500 hover:text-crimson-700 dark:hover:text-gold-400 transition-all"
            >
              <UserPlus size={22} strokeWidth={2.25} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Register</span>
            </Link>
          </div>

          {location.state?.from?.pathname === '/checkout' && (
            <div className="mb-4 text-sm bg-cream-100 dark:bg-dark-bg border border-gold-500/40 text-crimson-800 dark:text-cream-100 px-3 py-2">
              Sign in to continue checkout. Your cart will be merged after login.
            </div>
          )}
          <div className="w-12 h-0.5 bg-gold-500 mb-6" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">Email</label>
              <input type="email" required value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com" className={inputCls} />
            </div>
            <div className="relative">
              <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">Password</label>
              <input type={show ? 'text' : 'password'} required value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••" className={`${inputCls} pr-12`} />
              <button type="button" onClick={() => setShow(!show)}
                className="absolute right-3 bottom-3.5 text-gray-400 hover:text-crimson-600">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><LogIn size={16} /> Sign In</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-cream-200/50 mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-crimson-600 dark:text-gold-400 font-bold hover:underline">Register</Link>
          </p>

          <div className="mt-4 pt-4 border-t border-cream-200 dark:border-white/10 text-center">
            <Link to="/" className="text-xs text-gray-400 hover:text-crimson-600 dark:hover:text-gold-400 transition-colors">
              ← Continue as Guest
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
