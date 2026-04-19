import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, MapPin, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext'
import { checkoutApi } from '../services/api'

const delivery = 50

export default function Checkout() {
  const { items, total } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    city: '',
    notes: '',
  })

  useEffect(() => {
    if (!items.length) {
      toast.error('Your cart is empty')
      navigate('/cart', { replace: true })
    }
  }, [items.length, navigate])

  const grandTotal = total + delivery

  const inputCls = `w-full border-2 border-cream-200 dark:border-white/20 bg-white dark:bg-dark-bg px-4 py-3 text-sm
    focus:outline-none focus:border-crimson-500 dark:text-cream-100 transition-colors`

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (items.length === 0) return
    if (form.fullName.trim().length < 2) return toast.error('Enter your full name')
    if (!/^[0-9+\-\s]{10,20}$/.test(form.phone.trim())) return toast.error('Enter a valid phone number')
    if (form.addressLine1.trim().length < 5) return toast.error('Enter a complete address')
    if (form.city.trim().length < 2) return toast.error('Enter your city')

    setLoading(true)
    try {
      const res = await checkoutApi.create({
        items,
        shipping: {
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          addressLine1: form.addressLine1.trim(),
          city: form.city.trim(),
          notes: form.notes.trim() || undefined,
        },
      })
      toast.success('Checkout ready — continue to payment')
      navigate('/payment', { state: { checkoutId: res.checkoutId } })
    } catch (err) {
      toast.error(err.message || 'Could not start checkout')
    } finally {
      setLoading(false)
    }
  }

  if (!items.length) return null

  return (
    <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-20">
      <div className="bg-crimson-800 py-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="font-display text-4xl text-cream-100 font-bold">Checkout</h1>
          <p className="font-bangla text-gold-300 mt-1">চেকআউট</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6 bg-white dark:bg-crimson-800/30 border border-cream-200 dark:border-white/10 p-6">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-cream-100 flex items-center gap-2">
            <MapPin size={20} className="text-crimson-600 dark:text-gold-400" /> Delivery details
          </h2>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-cream-200/50 mb-2">
              Full name
            </label>
            <input className={inputCls} value={form.fullName} onChange={handleChange('fullName')} required minLength={2} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-cream-200/50 mb-2">
              Phone
            </label>
            <input className={inputCls} value={form.phone} onChange={handleChange('phone')} required placeholder="+8801XXXXXXXXX" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-cream-200/50 mb-2">
              Address line
            </label>
            <input className={inputCls} value={form.addressLine1} onChange={handleChange('addressLine1')} required minLength={5} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-cream-200/50 mb-2">
              City / area
            </label>
            <input className={inputCls} value={form.city} onChange={handleChange('city')} required minLength={2} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-cream-200/50 mb-2">
              Notes (optional)
            </label>
            <textarea className={`${inputCls} min-h-[80px]`} value={form.notes} onChange={handleChange('notes')} maxLength={500} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2 disabled:opacity-60">
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Continue to payment <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="bg-white dark:bg-crimson-800/30 border border-cream-200 dark:border-white/10 p-6 h-fit sticky top-24">
          <h3 className="font-display text-lg font-bold text-gray-900 dark:text-cream-100 mb-4 flex items-center gap-2">
            <User size={18} /> Summary
          </h3>
          <ul className="text-sm space-y-2 text-gray-600 dark:text-cream-200/80 max-h-48 overflow-y-auto">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between gap-2">
                <span>
                  {i.name} × {i.qty}
                </span>
                <span>৳{i.price * i.qty}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-cream-200 dark:border-white/10 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>৳{delivery}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Total</span>
              <span className="text-crimson-600 dark:text-gold-400">৳{grandTotal}</span>
            </div>
          </div>
          <Link to="/cart" className="block text-center text-sm text-crimson-600 dark:text-gold-400 mt-4 hover:underline">
            ← Edit cart
          </Link>
        </div>
      </div>
    </main>
  )
}
