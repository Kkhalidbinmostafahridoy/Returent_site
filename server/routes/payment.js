const express = require('express')
const crypto = require('crypto')
const { body, validationResult } = require('express-validator')
const { authMiddleware } = require('../middleware/auth')
const { withStore, readStore } = require('../db')
const { sendMail } = require('../utils/email')

const router = express.Router()

const GATEWAYS = ['bkash', 'nagad']

function signIntent(checkoutId, amount, method) {
  const secret = process.env.PAYMENT_HMAC_SECRET || 'dev-payment-hmac-secret'
  const payload = `${checkoutId}|${amount}|${method}`
  return crypto.createHmac('sha256', secret).update(payload).digest('hex')
}

function verifyIntent(checkoutId, amount, method, sig) {
  return signIntent(checkoutId, amount, method) === sig
}

/** Sandbox-style payment initiation — real bKash/Nagad replace this with their token/checkout APIs */
router.post(
  '/create',
  authMiddleware,
  body('checkoutId').isString().trim().isLength({ min: 8 }),
  body('method').isIn(GATEWAYS),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid payment request' })
    const { checkoutId, method } = req.body
    const store = readStore()
    const c = store.checkouts[checkoutId]
    if (!c || c.userId !== req.userId) {
      return res.status(404).json({ message: 'Checkout not found' })
    }
    if (c.status !== 'pending_payment') {
      return res.status(400).json({ message: 'Checkout is not payable' })
    }
    const intentId = `pi_${crypto.randomBytes(10).toString('hex')}`
    const signature = signIntent(checkoutId, c.grandTotal, method)
    withStore((s) => {
      const ch = s.checkouts[checkoutId]
      ch.payment = { intentId, method, signature, startedAt: Date.now() }
    })
    res.json({
      intentId,
      method,
      amount: c.grandTotal,
      currency: 'BDT',
      gateway: method === 'bkash' ? 'bKash' : 'Nagad',
      clientPayload: {
        checkoutId,
        amount: c.grandTotal,
        method,
        signature,
        message:
          method === 'bkash'
            ? 'Complete payment in the bKash sandbox (simulated). Confirm only after reviewing the amount.'
            : 'Complete payment in the Nagad sandbox (simulated). Confirm only after reviewing the amount.',
      },
    })
  }
)

router.post(
  '/confirm',
  authMiddleware,
  body('checkoutId').isString().trim(),
  body('method').isIn(GATEWAYS),
  body('signature').isString().isLength({ min: 32 }),
  body('success').isBoolean(),
  body('transactionRef').optional().trim().isLength({ max: 80 }),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid confirmation' })
    const { checkoutId, method, signature, success, transactionRef } = req.body
    const store = readStore()
    const c = store.checkouts[checkoutId]
    if (!c || c.userId !== req.userId) {
      return res.status(404).json({ message: 'Checkout not found' })
    }
    if (!verifyIntent(checkoutId, c.grandTotal, method, signature)) {
      return res.status(400).json({ message: 'Invalid payment signature' })
    }
    if (!success) {
      withStore((s) => {
        const ch = s.checkouts[checkoutId]
        ch.status = 'payment_failed'
        ch.paymentResult = { at: Date.now(), success: false, method }
      })
      return res.json({ ok: false, message: 'Payment was not completed.' })
    }
    const orderId = `ord_${crypto.randomBytes(8).toString('hex')}`
    const now = new Date().toISOString()
    const order = {
      id: orderId,
      userId: req.userId,
      email: c.email,
      items: c.lines,
      subtotal: c.subtotal,
      delivery: c.delivery,
      grandTotal: c.grandTotal,
      shipping: c.shipping,
      payment: {
        method,
        transactionRef: transactionRef || `SIM-${Date.now()}`,
        paidAt: now,
      },
      status: 'paid',
      deliveryStatus: 'pending',
      adminNotes: '',
      createdAt: now,
      updatedAt: now,
    }
    withStore((s) => {
      s.orders.unshift(order)
      const ch = s.checkouts[checkoutId]
      ch.status = 'paid'
      ch.paymentResult = { at: Date.now(), success: true, method, orderId }
      s.carts[req.userId] = []
    })
    try {
      await sendMail({
        to: c.email,
        subject: `Order confirmed — ${orderId}`,
        text: `Thank you for your order ${orderId}. Total: ৳${order.grandTotal}. Payment: ${method}.`,
        html: `<h2>Thank you!</h2><p>Order <strong>${orderId}</strong></p><p>Total: ৳${order.grandTotal}</p><p>Payment: ${method}</p>`,
      })
    } catch (e) {
      console.error('[order email]', e.message)
    }
    res.json({ ok: true, orderId, order })
  }
)

module.exports = router
