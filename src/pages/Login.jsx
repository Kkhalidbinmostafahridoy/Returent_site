import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    // Mock JWT login - replace with real API call
    const mockToken = btoa(JSON.stringify({ header: 'jwt' })) + '.' +
      btoa(JSON.stringify({ name: 'Guest User', email: form.email, exp: Math.floor(Date.now() / 1000) + 86400 })) + '.signature'
    login({ name: 'Guest User', email: form.email }, mockToken)
    toast.success('Welcome back!', { icon: '👋', style: { background: '#FFF5E1', color: '#8B0000', border: '1px solid #B8860B' } })
    navigate('/')
    setLoading(false)
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
          <p className="font-bangla text-crimson-500 dark:text-gold-400 text-sm mb-6">লগইন করুন</p>
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
            Don't have an account?{' '}
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
