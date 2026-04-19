const express = require('express')
const { authMiddleware } = require('../middleware/auth')
const { readStore } = require('../db')

const router = express.Router()

router.get('/me', authMiddleware, (req, res) => {
  const store = readStore()
  const list = store.orders.filter((o) => o.userId === req.userId)
  res.json({ orders: list })
})

router.get('/:orderId', authMiddleware, (req, res) => {
  const store = readStore()
  const o = store.orders.find((x) => x.id === req.params.orderId)
  if (!o || o.userId !== req.userId) return res.status(404).json({ message: 'Order not found' })
  res.json({ order: o })
})

module.exports = router
