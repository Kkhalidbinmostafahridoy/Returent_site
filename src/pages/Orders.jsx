import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package } from 'lucide-react'
import toast from 'react-hot-toast'
import { orderApi } from '../services/api'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await orderApi.getMine()
        if (!cancelled) setOrders(data.orders || [])
      } catch (e) {
        toast.error(e.message || 'Could not load orders')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-20 pb-16">
      <div className="bg-crimson-800 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-4xl text-cream-100 font-bold flex items-center gap-3">
            <Package /> My orders
          </h1>
          <p className="font-bangla text-gold-300 mt-1">আমার অর্ডার</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-crimson-800/20 border border-cream-200 dark:border-white/10">
            <p className="text-gray-600 dark:text-cream-200/70 mb-4">You have no orders yet.</p>
            <Link to="/menu" className="btn-primary inline-block">
              Browse menu
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {orders.map((o) => (
              <li
                key={o.id}
                className="bg-white dark:bg-crimson-800/30 border border-cream-200 dark:border-white/10 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <p className="font-display font-bold text-lg text-gray-900 dark:text-cream-100">{o.id}</p>
                  <p className="text-xs text-gray-500 dark:text-cream-200/50">
                    {new Date(o.createdAt).toLocaleString()} · {o.payment?.method?.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-cream-200/70 mt-1">
                    {o.items?.length} item(s) · {o.shipping?.city}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-cream-200/50 mt-1">
                    Delivery:{' '}
                    <span className="font-bold uppercase text-crimson-600 dark:text-gold-400">
                      {o.deliveryStatus || 'pending'}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-bold text-crimson-600 dark:text-gold-400">৳{o.grandTotal}</p>
                  <span className="text-xs font-bold uppercase text-green-700 dark:text-green-400">{o.status}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <Link to="/menu" className="inline-block mt-8 text-sm text-crimson-600 dark:text-gold-400 font-bold hover:underline">
          ← Continue shopping
        </Link>
      </div>
    </main>
  )
}
