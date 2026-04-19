import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Package, Truck } from 'lucide-react'
import toast from 'react-hot-toast'
import { adminDownloadOrderPdf, adminOrderApi } from '../../services/api'

export default function AdminOrderDetail() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pdfBusy, setPdfBusy] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  const [form, setForm] = useState({
    adminNotes: '',
    shipping: { fullName: '', phone: '', addressLine1: '', city: '', notes: '' },
  })

  const load = useCallback(async () => {
    const { order: o } = await adminOrderApi.get(orderId)
    setOrder(o)
    setForm({
      adminNotes: o.adminNotes || '',
      shipping: {
        fullName: o.shipping?.fullName || '',
        phone: o.shipping?.phone || '',
        addressLine1: o.shipping?.addressLine1 || '',
        city: o.shipping?.city || '',
        notes: o.shipping?.notes || '',
      },
    })
  }, [orderId])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        await load()
      } catch (e) {
        if (!cancelled) toast.error(e.message || 'Could not load order')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [load])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!/^[0-9+\-\s]{10,20}$/.test(form.shipping.phone.trim())) {
      toast.error('Enter a valid phone (10–20 digits/symbols)')
      return
    }
    setSaving(true)
    try {
      await adminOrderApi.update(orderId, {
        adminNotes: form.adminNotes,
        shipping: {
          fullName: form.shipping.fullName.trim(),
          phone: form.shipping.phone.trim(),
          addressLine1: form.shipping.addressLine1.trim(),
          city: form.shipping.city.trim(),
          notes: form.shipping.notes.trim() || undefined,
        },
      })
      toast.success('Order updated')
      await load()
    } catch (err) {
      toast.error(err.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handlePdf = async () => {
    setPdfBusy(true)
    try {
      const blob = await adminDownloadOrderPdf(orderId)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `order-${orderId}.pdf`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('PDF downloaded')
    } catch (e) {
      toast.error(e.message || 'PDF failed')
    } finally {
      setPdfBusy(false)
    }
  }

  const handleDelivery = async (action) => {
    try {
      const body = { action }
      if (action === 'cancel') body.cancelReason = cancelReason.trim() || undefined
      await adminOrderApi.delivery(orderId, body)
      toast.success(action === 'confirm' ? 'Delivery confirmed' : 'Delivery cancelled')
      setCancelReason('')
      await load()
    } catch (e) {
      toast.error(e.message || 'Action failed')
    }
  }

  const inputCls =
    'w-full border border-white/20 bg-gray-900/80 px-3 py-2 text-sm text-cream-100 focus:outline-none focus:border-gold-500'

  if (loading || !order) {
    return <p className="text-cream-200/60">{loading ? 'Loading…' : 'Order not found'}</p>
  }

  const ds = order.deliveryStatus || 'pending'

  return (
    <div>
      <Link to="/admin/orders" className="inline-flex items-center gap-2 text-sm text-gold-400 font-bold hover:underline mb-6">
        <ArrowLeft size={16} /> All orders
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-cream-100 flex items-center gap-2">
            <Package size={24} className="text-gold-400" /> {order.id}
          </h1>
          <p className="text-sm text-cream-200/50 mt-1">{order.email}</p>
          <p className="text-xs text-cream-200/40 mt-1">Created {order.createdAt ? new Date(order.createdAt).toLocaleString() : '—'}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handlePdf}
            disabled={pdfBusy}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-600 text-gray-900 text-xs font-bold uppercase tracking-wider hover:bg-gold-500 disabled:opacity-50"
          >
            <Download size={16} /> {pdfBusy ? '…' : 'Download PDF'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="border border-white/10 p-5 bg-gray-900/40">
            <h2 className="font-display text-lg font-bold text-gold-400 mb-4 flex items-center gap-2">
              <Truck size={18} /> Delivery control
            </h2>
            <p className="text-xs text-cream-200/60 mb-4">
              Status: <strong className="text-cream-100 uppercase">{ds}</strong>
              {order.deliveryConfirmedAt && (
                <span className="block mt-1">Confirmed at {new Date(order.deliveryConfirmedAt).toLocaleString()}</span>
              )}
              {order.deliveryCancelledAt && (
                <span className="block mt-1">Cancelled at {new Date(order.deliveryCancelledAt).toLocaleString()}</span>
              )}
              {order.cancelReason && <span className="block mt-1">Reason: {order.cancelReason}</span>}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={ds !== 'pending'}
                onClick={() => handleDelivery('confirm')}
                className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-600"
              >
                Confirm delivery
              </button>
              <button
                type="button"
                disabled={ds === 'cancelled'}
                onClick={() => handleDelivery('cancel')}
                className="px-4 py-2 bg-gray-700 text-white text-xs font-bold uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-600"
              >
                Cancel delivery
              </button>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-bold uppercase text-cream-200/50 mb-1">Cancel reason (optional)</label>
              <input className={inputCls} value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} placeholder="Shown on PDF if delivery is cancelled" />
            </div>
          </section>

          <form onSubmit={handleSave} className="border border-white/10 p-5 bg-gray-900/40 space-y-4">
            <h2 className="font-display text-lg font-bold text-gold-400 mb-2">Edit shipping &amp; notes</h2>
            {['fullName', 'phone', 'addressLine1', 'city'].map((key) => (
              <div key={key}>
                <label className="block text-xs font-bold uppercase text-cream-200/50 mb-1">{key}</label>
                <input
                  className={inputCls}
                  value={form.shipping[key]}
                  onChange={(e) => setForm((f) => ({ ...f, shipping: { ...f.shipping, [key]: e.target.value } }))}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-bold uppercase text-cream-200/50 mb-1">Customer notes</label>
              <textarea
                className={`${inputCls} min-h-[72px]`}
                value={form.shipping.notes}
                onChange={(e) => setForm((f) => ({ ...f, shipping: { ...f.shipping, notes: e.target.value } }))}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-cream-200/50 mb-1">Admin notes (internal)</label>
              <textarea
                className={`${inputCls} min-h-[80px]`}
                value={form.adminNotes}
                onChange={(e) => setForm((f) => ({ ...f, adminNotes: e.target.value }))}
              />
            </div>
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </form>
        </div>

        <div className="border border-white/10 p-5 bg-gray-900/40 h-fit">
          <h3 className="font-bold text-gold-400 text-sm uppercase tracking-wider mb-3">Items</h3>
          <ul className="text-sm space-y-2 text-cream-200/80 mb-4">
            {(order.items || []).map((i) => (
              <li key={i.id} className="flex justify-between gap-2">
                <span>
                  {i.name} × {i.qty}
                </span>
                <span>৳{i.price * i.qty}</span>
              </li>
            ))}
          </ul>
          <div className="text-sm border-t border-white/10 pt-3 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>৳{order.delivery}</span>
            </div>
            <div className="flex justify-between font-bold text-gold-400 pt-2">
              <span>Total</span>
              <span>৳{order.grandTotal}</span>
            </div>
          </div>
          {order.payment && (
            <div className="mt-4 text-xs text-cream-200/50">
              <p>
                Paid via <strong className="text-cream-200">{order.payment.method}</strong>
              </p>
              <p>Ref: {order.payment.transactionRef}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
