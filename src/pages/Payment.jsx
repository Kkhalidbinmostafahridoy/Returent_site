import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { checkoutApi, paymentApi } from '../services/api'
import { useCart } from '../context/CartContext'

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const { clearCart } = useCart()
  const checkoutId = location.state?.checkoutId

  const [summary, setSummary] = useState(null)
  const [method, setMethod] = useState('bkash')
  const [intent, setIntent] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!checkoutId) {
      toast.error('No active checkout')
      navigate('/cart', { replace: true })
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const data = await checkoutApi.get(checkoutId)
        if (!cancelled) setSummary(data)
      } catch {
        if (!cancelled) {
          toast.error('Checkout expired or invalid')
          navigate('/cart', { replace: true })
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [checkoutId, navigate])

  const startPayment = async () => {
    if (!checkoutId) return
    setBusy(true)
    try {
      const data = await paymentApi.create({ checkoutId, method })
      setIntent(data.clientPayload)
      setModalOpen(true)
    } catch (e) {
      toast.error(e.message || 'Could not start payment')
    } finally {
      setBusy(false)
    }
  }

  const confirmSimulated = async (success) => {
    if (!intent || !checkoutId) return
    setBusy(true)
    try {
      const res = await paymentApi.confirm({
        checkoutId,
        method: intent.method,
        signature: intent.signature,
        success,
        transactionRef: success ? `${intent.method.toUpperCase()}-${Date.now()}` : undefined,
      })
      setModalOpen(false)
      if (res.ok) {
        toast.success('Payment successful — order confirmed')
        clearCart()
        navigate('/orders', { replace: true })
      } else {
        toast.error(res.message || 'Payment was not completed')
        navigate('/cart', { replace: true })
      }
    } catch (e) {
      toast.error(e.message || 'Payment confirmation failed')
    } finally {
      setBusy(false)
    }
  }

  if (!checkoutId || !summary) {
    return (
      <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-24 flex justify-center">
        <p className="text-gray-500">Loading checkout…</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-20 pb-16">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white dark:bg-crimson-800/30 border border-cream-200 dark:border-white/10 p-8 shadow-xl mt-8">
          <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-cream-100 mb-2">Payment</h1>
          <p className="text-sm text-gray-600 dark:text-cream-200/70 mb-6">
            Pay securely with bKash or Nagad (sandbox simulation). You must be signed in — amounts are verified on the
            server before the order is created.
          </p>
          <div className="rounded-lg bg-cream-100 dark:bg-dark-bg border border-gold-500/30 p-4 mb-6 text-sm space-y-1">
            <div className="flex justify-between font-bold">
              <span>Amount due</span>
              <span className="text-crimson-600 dark:text-gold-400">৳{summary.grandTotal}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-cream-200/50">Includes ৳{summary.delivery} delivery</p>
          </div>

          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Choose gateway</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setMethod('bkash')}
              className={`border-2 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                method === 'bkash'
                  ? 'border-crimson-600 bg-crimson-600 text-white'
                  : 'border-cream-200 dark:border-white/20 hover:border-crimson-400'
              }`}
            >
              bKash
            </button>
            <button
              type="button"
              onClick={() => setMethod('nagad')}
              className={`border-2 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                method === 'nagad'
                  ? 'border-crimson-600 bg-crimson-600 text-white'
                  : 'border-cream-200 dark:border-white/20 hover:border-crimson-400'
              }`}
            >
              Nagad
            </button>
          </div>

          <button type="button" onClick={startPayment} disabled={busy} className="btn-primary w-full disabled:opacity-60">
            {busy && !modalOpen ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              `Pay with ${method === 'bkash' ? 'bKash' : 'Nagad'}`
            )}
          </button>

          <Link to="/checkout" className="block text-center text-sm mt-4 text-crimson-600 dark:text-gold-400 hover:underline">
            ← Back to checkout
          </Link>
        </div>
      </div>

      {modalOpen && intent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-dark-surface max-w-md w-full p-6 border border-cream-200 dark:border-white/10 shadow-2xl">
            <h3 className="font-display text-xl font-bold text-gray-900 dark:text-cream-100 mb-2">
              {intent.method === 'bkash' ? 'bKash' : 'Nagad'} (simulated)
            </h3>
            <p className="text-sm text-gray-600 dark:text-cream-200/70 mb-4">{intent.message}</p>
            <p className="text-sm mb-1">
              Amount: <strong>৳{intent.amount}</strong>
            </p>
            <p className="text-xs text-gray-500 mb-6">In production, customers complete payment in the official app or web checkout.</p>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={busy}
                onClick={() => confirmSimulated(true)}
                className="flex-1 btn-primary disabled:opacity-60"
              >
                Payment successful
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => confirmSimulated(false)}
                className="flex-1 border-2 border-crimson-600 text-crimson-600 dark:text-gold-400 dark:border-gold-400 py-3 text-xs font-bold uppercase disabled:opacity-60"
              >
                Failed / cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
