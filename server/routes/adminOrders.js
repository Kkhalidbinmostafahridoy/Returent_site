const express = require('express')
const PDFDocument = require('pdfkit')
const { body, param, validationResult } = require('express-validator')
const { adminAuthMiddleware } = require('../middleware/adminAuth')
const { withStore, readStore } = require('../db')

const router = express.Router()

router.use(adminAuthMiddleware)

router.get('/', (_req, res) => {
  const store = readStore()
  const orders = [...(store.orders || [])].sort(
    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  )
  res.json({
    orders: orders.map((o) => ({
      id: o.id,
      email: o.email,
      grandTotal: o.grandTotal,
      status: o.status,
      deliveryStatus: o.deliveryStatus || 'pending',
      createdAt: o.createdAt,
      shipping: o.shipping
        ? { fullName: o.shipping.fullName, city: o.shipping.city, phone: o.shipping.phone }
        : null,
    })),
  })
})

router.get('/:orderId/pdf', (req, res, next) => {
  const store = readStore()
  const o = store.orders.find((x) => x.id === req.params.orderId)
  if (!o) return res.status(404).send('Order not found')

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename="order-${o.id}.pdf"`)

  const doc = new PDFDocument({ margin: 50 })
  doc.on('error', next)
  doc.pipe(res)

  doc.fontSize(20).text('Cream & Crust — Order receipt', { underline: true })
  doc.moveDown()
  doc.fontSize(11)
  doc.text(`Order ID: ${o.id}`)
  doc.text(`Created: ${o.createdAt || ''}`)
  doc.text(`Updated: ${o.updatedAt || o.createdAt || ''}`)
  doc.text(`Payment status: ${o.status || ''}`)
  doc.text(`Delivery status: ${o.deliveryStatus || 'pending'}`)
  if (o.deliveryConfirmedAt) doc.text(`Delivery confirmed at: ${o.deliveryConfirmedAt}`)
  if (o.deliveryCancelledAt) doc.text(`Cancelled at: ${o.deliveryCancelledAt}`)
  if (o.cancelReason) doc.text(`Cancel reason: ${o.cancelReason}`)
  doc.moveDown()
  doc.fontSize(14).text('Customer')
  doc.fontSize(11)
  doc.text(`Email: ${o.email || ''}`)
  if (o.shipping) {
    doc.text(`Name: ${o.shipping.fullName || ''}`)
    doc.text(`Phone: ${o.shipping.phone || ''}`)
    doc.text(`Address: ${o.shipping.addressLine1 || ''}`)
    doc.text(`City: ${o.shipping.city || ''}`)
    if (o.shipping.notes) doc.text(`Customer notes: ${o.shipping.notes}`)
  }
  doc.moveDown()
  if (o.payment) {
    doc.fontSize(14).text('Payment')
    doc.fontSize(11)
    doc.text(`Method: ${o.payment.method || ''}`)
    doc.text(`Reference: ${o.payment.transactionRef || ''}`)
    doc.text(`Paid at: ${o.payment.paidAt || ''}`)
    doc.moveDown()
  }
  doc.fontSize(14).text('Items')
  doc.fontSize(11)
  for (const line of o.items || []) {
    doc.text(`${line.name} × ${line.qty} @ ৳${line.price} = ৳${line.price * line.qty}`)
  }
  doc.moveDown()
  doc.text(`Subtotal: ৳${o.subtotal ?? ''}`)
  doc.text(`Delivery: ৳${o.delivery ?? ''}`)
  doc.fontSize(12).text(`Total: ৳${o.grandTotal ?? ''}`)
  if (o.adminNotes) {
    doc.moveDown()
    doc.fontSize(14).text('Admin notes')
    doc.fontSize(11).text(o.adminNotes)
  }
  doc.end()
})

router.get('/:orderId', (req, res) => {
  const store = readStore()
  const o = store.orders.find((x) => x.id === req.params.orderId)
  if (!o) return res.status(404).json({ message: 'Order not found' })
  res.json({ order: o })
})

router.patch('/:orderId', (req, res) => {
  const id = req.params.orderId
  const patch = req.body || {}
  if (patch.adminNotes !== undefined && typeof patch.adminNotes !== 'string') {
    return res.status(400).json({ message: 'adminNotes must be a string' })
  }
  if (patch.adminNotes !== undefined && patch.adminNotes.length > 2000) {
    return res.status(400).json({ message: 'adminNotes too long' })
  }
  if (patch.shipping && typeof patch.shipping !== 'object') {
    return res.status(400).json({ message: 'Invalid shipping' })
  }
  const s = patch.shipping
  if (s) {
    if (s.fullName !== undefined && (typeof s.fullName !== 'string' || s.fullName.trim().length < 2)) {
      return res.status(400).json({ message: 'Invalid shipping.fullName' })
    }
    if (s.phone !== undefined && !/^[0-9+\-\s]{10,20}$/.test(String(s.phone).trim())) {
      return res.status(400).json({ message: 'Invalid shipping.phone' })
    }
    if (s.addressLine1 !== undefined && (typeof s.addressLine1 !== 'string' || s.addressLine1.trim().length < 5)) {
      return res.status(400).json({ message: 'Invalid shipping.addressLine1' })
    }
    if (s.city !== undefined && (typeof s.city !== 'string' || s.city.trim().length < 2)) {
      return res.status(400).json({ message: 'Invalid shipping.city' })
    }
    if (s.notes !== undefined && String(s.notes).length > 500) {
      return res.status(400).json({ message: 'Invalid shipping.notes' })
    }
  }

  let updated = null
  withStore((store) => {
    const o = store.orders.find((x) => x.id === id)
    if (!o) return
    if (patch.adminNotes !== undefined) o.adminNotes = patch.adminNotes.trim()
    if (patch.shipping) {
      o.shipping = o.shipping || {}
      for (const k of ['fullName', 'phone', 'addressLine1', 'city', 'notes']) {
        if (patch.shipping[k] !== undefined) o.shipping[k] = String(patch.shipping[k]).trim()
      }
    }
    o.updatedAt = new Date().toISOString()
    updated = JSON.parse(JSON.stringify(o))
  })
  if (!updated) return res.status(404).json({ message: 'Order not found' })
  res.json({ order: updated })
})

router.post(
  '/:orderId/delivery',
  param('orderId').isString(),
  body('action').isIn(['confirm', 'cancel']),
  body('cancelReason').optional().trim().isLength({ max: 500 }),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid request' })
    const { orderId } = req.params
    const { action, cancelReason } = req.body
    let updated = null
    let bad = null
    withStore((store) => {
      const o = store.orders.find((x) => x.id === orderId)
      if (!o) return
      if (action === 'confirm') {
        if (o.deliveryStatus !== 'pending') {
          bad = 'not_pending'
          return
        }
        o.deliveryStatus = 'confirmed'
        o.deliveryConfirmedAt = new Date().toISOString()
        delete o.deliveryCancelledAt
        delete o.cancelReason
      } else {
        if (o.deliveryStatus === 'cancelled') {
          bad = 'already_cancelled'
          return
        }
        o.deliveryStatus = 'cancelled'
        o.deliveryCancelledAt = new Date().toISOString()
        if (cancelReason) o.cancelReason = cancelReason.trim()
        delete o.deliveryConfirmedAt
      }
      o.updatedAt = new Date().toISOString()
      updated = JSON.parse(JSON.stringify(o))
    })
    if (bad === 'not_pending') {
      return res.status(400).json({ message: 'Delivery can only be confirmed while status is pending' })
    }
    if (bad === 'already_cancelled') {
      return res.status(400).json({ message: 'Order delivery is already cancelled' })
    }
    if (!updated) return res.status(404).json({ message: 'Order not found' })
    res.json({ order: updated })
  }
)

module.exports = router
