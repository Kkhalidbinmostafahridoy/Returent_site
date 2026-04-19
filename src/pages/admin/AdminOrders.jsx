import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { adminOrderApi } from '../../services/api'

function deliveryBadge(status) {
  const s = status || 'pending'
  if (s === 'confirmed') return 'bg-emerald-700 text-white'
  if (s === 'cancelled') return 'bg-gray-600 text-white'
  return 'bg-amber-600 text-white'
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await adminOrderApi.list()
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
    <div>
      <h1 className="font-display text-3xl font-bold text-cream-100 mb-2">Customer orders</h1>
      <p className="text-sm text-cream-200/50 mb-8">View, edit, confirm or cancel delivery, export PDF.</p>

      {loading ? (
        <p className="text-cream-200/60">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="text-cream-200/60">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto border border-white/10 rounded-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-crimson-900/50 text-xs uppercase tracking-wider text-gold-400">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Delivery</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-white/5">
                  <td className="px-4 py-3 font-mono text-xs text-gold-200">{o.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-cream-100">{o.shipping?.fullName || '—'}</div>
                    <div className="text-cream-200/50 text-xs">{o.email}</div>
                  </td>
                  <td className="px-4 py-3 font-bold text-gold-400">৳{o.grandTotal}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${deliveryBadge(o.deliveryStatus)}`}>
                      {o.deliveryStatus || 'pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-cream-200/60 text-xs whitespace-nowrap">
                    {o.createdAt ? new Date(o.createdAt).toLocaleString() : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/orders/${encodeURIComponent(o.id)}`}
                      className="text-gold-400 font-bold hover:underline text-xs uppercase"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
