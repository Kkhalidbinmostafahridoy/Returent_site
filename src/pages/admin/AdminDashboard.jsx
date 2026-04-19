import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Package, Truck, Ban, Banknote, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { adminStatsApi } from '../../services/api'

function StatCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <div
      className={`border border-white/10 rounded-sm p-5 bg-gray-900/50 ${accent || ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-cream-200/50 mb-1">{label}</p>
          <p className="font-display text-3xl font-bold text-cream-100">{value}</p>
          {sub && <p className="text-xs text-cream-200/40 mt-1">{sub}</p>}
        </div>
        <div className="p-2 rounded-sm bg-white/5 text-gold-400">
          <Icon size={22} />
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const s = await adminStatsApi.get()
        if (!cancelled) setData(s)
      } catch (e) {
        toast.error(e.message || 'Could not load dashboard')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading || !data) {
    return <p className="text-cream-200/60">{loading ? 'Loading dashboard…' : 'No data'}</p>
  }

  const fmt = (n) => (typeof n === 'number' ? n.toLocaleString() : '0')

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-cream-100 flex items-center gap-3">
            <LayoutDashboard className="text-gold-400" size={32} />
            Dashboard
          </h1>
          <p className="text-sm text-cream-200/50 mt-1">Overview of orders, delivery pipeline, and revenue.</p>
        </div>
        <Link
          to="/admin/orders"
          className="inline-flex items-center gap-2 self-start px-4 py-2 border-2 border-gold-500 text-gold-400 text-xs font-bold uppercase tracking-wider hover:bg-gold-500/10 transition-colors"
        >
          All orders <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard icon={Package} label="Total orders" value={fmt(data.totalOrders)} />
        <StatCard
          icon={Truck}
          label="Delivery pending"
          value={fmt(data.pendingDelivery)}
          sub="Awaiting confirm or cancel"
          accent="ring-1 ring-amber-600/30"
        />
        <StatCard icon={Banknote} label="Revenue (paid)" value={`৳${fmt(data.revenueTotal)}`} sub="Sum of paid orders" />
        <StatCard
          icon={Ban}
          label="Deliveries"
          value={`${fmt(data.confirmedDelivery)} ok / ${fmt(data.cancelledDelivery)} cancelled`}
          sub="Confirmed vs cancelled"
        />
      </div>

      <section className="border border-white/10 rounded-sm overflow-hidden">
        <div className="px-4 py-3 bg-crimson-900/60 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-gold-400">Recent orders</h2>
          <Link to="/admin/orders" className="text-xs font-bold uppercase text-cream-200 hover:text-white">
            View all →
          </Link>
        </div>
        {data.recentOrders.length === 0 ? (
          <p className="p-8 text-center text-cream-200/50 text-sm">No orders yet.</p>
        ) : (
          <ul className="divide-y divide-white/10">
            {data.recentOrders.map((o) => (
              <li key={o.id} className="hover:bg-white/5 transition-colors">
                <Link to={`/admin/orders/${encodeURIComponent(o.id)}`} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 text-sm">
                  <div>
                    <span className="font-mono text-xs text-gold-300">{o.id}</span>
                    <p className="text-cream-100 font-medium">{o.shipping?.fullName || o.email}</p>
                    <p className="text-xs text-cream-200/40">{new Date(o.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        o.deliveryStatus === 'confirmed'
                          ? 'bg-emerald-800 text-emerald-100'
                          : o.deliveryStatus === 'cancelled'
                            ? 'bg-gray-700 text-gray-200'
                            : 'bg-amber-800 text-amber-100'
                      }`}
                    >
                      {o.deliveryStatus || 'pending'}
                    </span>
                    <span className="font-display font-bold text-gold-400">৳{o.grandTotal}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
