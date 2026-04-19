import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAdminAuth } from '../../context/AdminAuthContext'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const { loginAdmin, admin } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin/orders'

  React.useEffect(() => {
    if (!admin) return
    navigate(from, { replace: true })
  }, [admin, from, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await loginAdmin(form.email, form.password)
      toast.success('Signed in as admin')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.message || 'Admin sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = `w-full border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900
    focus:outline-none focus:border-crimson-600 transition-colors`

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-crimson-600 text-white mb-3">
            <Shield size={28} />
          </div>
          <h1 className="font-display text-3xl font-bold text-cream-100">Staff / Admin</h1>
          <p className="text-gray-400 text-sm mt-2">Customer accounts cannot access this area.</p>
        </div>

        <div className="bg-white border border-gray-200 p-8 shadow-2xl">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Admin sign in</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Admin email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputCls}
                autoComplete="username"
              />
            </div>
            <div className="relative">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Password</label>
              <input
                type={show ? 'text' : 'password'}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`${inputCls} pr-12`}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 bottom-3 text-gray-400 hover:text-crimson-600"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-crimson-600 text-white py-3 font-bold uppercase tracking-widest text-sm hover:bg-crimson-700 disabled:opacity-60">
              {loading ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Sign in'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            <Link to="/" className="text-crimson-600 font-bold hover:underline">← Back to store</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
