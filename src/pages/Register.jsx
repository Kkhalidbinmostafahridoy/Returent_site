import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match'); return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    const mockToken = btoa('{}') + '.' +
      btoa(JSON.stringify({ name: form.name, email: form.email, exp: Math.floor(Date.now() / 1000) + 86400 })) + '.sig'
    login({ name: form.name, email: form.email }, mockToken)
    toast.success(`Welcome, ${form.name}!`, { icon: '🎉', style: { background: '#FFF5E1', color: '#8B0000', border: '1px solid #B8860B' } })
    navigate('/')
    setLoading(false)
  }

  const inputCls = `w-full border-2 border-cream-200 dark:border-white/20 bg-white dark:bg-dark-bg px-4 py-3 text-sm
    focus:outline-none focus:border-crimson-500 dark:text-cream-100 transition-colors placeholder-gray-400`

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
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-cream-100 mb-1">Create Account</h2>
          <p className="font-bangla text-crimson-500 dark:text-gold-400 text-sm mb-6">নতুন অ্যাকাউন্ট</p>
          <div className="w-12 h-0.5 bg-gold-500 mb-6" />

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Rafiq Ahmed' },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'you@example.com' },
              { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
              { label: 'Confirm Password', key: 'confirm', type: 'password', placeholder: '••••••••' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">{f.label}</label>
                <input type={f.type} required value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder} className={inputCls} />
              </div>
            ))}

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><UserPlus size={16} /> Create Account</>
              }
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-cream-200/50 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-crimson-600 dark:text-gold-400 font-bold hover:underline">Sign In</Link>
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
