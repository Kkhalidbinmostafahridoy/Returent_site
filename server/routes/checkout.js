const express = require('express')
const crypto = require('crypto')
const { body, validationResult } = require('express-validator')
const { authMiddleware } = require('../middleware/auth')
const { withStore, readStore } = require('../db')
const { items: catalog, deliveryFee } = require('../menuCatalog')

const router = express.Router()

function buildTotals(lines) {
  let subtotal = 0
  const resolved = []
  for (const raw of lines) {
    const id = Number(raw.id)
    const meta = catalog.get(id)
    if (!meta) continue
    const qty = Math.min(99, Math.max(1, Math.floor(Number(raw.qty) || 1)))
    const lineTotal = meta.price * qty
    subtotal += lineTotal
    resolved.push({
      id,
      name: meta.name,
      price: meta.price,
      qty,
      image: typeof raw.image === 'string' ? raw.image.slice(0, 500) : '',
      bangla: typeof raw.bangla === 'string' ? raw.bangla.slice(0, 120) : '',
    })
  }
  const delivery = resolved.length ? deliveryFee : 0
  const grandTotal = subtotal + delivery
  return { lines: resolved, subtotal, delivery, grandTotal }
}

router.post(
  '/',
  authMiddleware,
  body('items').isArray({ min: 1, max: 100 }),
  body('shipping.fullName').trim().isLength({ min: 2, max: 100 }),
  body('shipping.phone').trim().matches(/^[0-9+\-\s]{10,20}$/).withMessage('Valid phone required'),
  body('shipping.addressLine1').trim().isLength({ min: 5, max: 200 }),
  body('shipping.city').trim().isLength({ min: 2, max: 80 }),
  body('shipping.notes').optional().trim().isLength({ max: 500 }),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() })
    }
    const { items, shipping } = req.body
    const { lines, subtotal, delivery, grandTotal } = buildTotals(items)
    if (!lines.length) {
      return res.status(400).json({ message: 'No valid line items' })
    }
    const checkoutId = `chk_${crypto.randomBytes(12).toString('hex')}`
    const payload = {
      userId: req.userId,
      email: req.userEmail,
      lines,
      subtotal,
      delivery,
      grandTotal,
      shipping,
      createdAt: Date.now(),
      status: 'pending_payment',
    }
    withStore((s) => {
      s.checkouts[checkoutId] = payload
    })
    res.status(201).json({
      checkoutId,
      subtotal,
      delivery,
      grandTotal,
      items: lines,
    })
  }
)

router.get('/:checkoutId', authMiddleware, (req, res) => {
  const store = readStore()
  const c = store.checkouts[req.params.checkoutId]
  if (!c || c.userId !== req.userId) {
    return res.status(404).json({ message: 'Checkout not found' })
  }
  if (c.status !== 'pending_payment') {
    return res.status(400).json({ message: 'Checkout is no longer active' })
  }
  res.json({
    checkoutId: req.params.checkoutId,
    items: c.lines,
    subtotal: c.subtotal,
    delivery: c.delivery,
    grandTotal: c.grandTotal,
    shipping: c.shipping,
  })
})

module.exports = { router, buildTotals }
