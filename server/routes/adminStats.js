const express = require('express')
const { adminAuthMiddleware } = require('../middleware/adminAuth')
const { readStore } = require('../db')

const router = express.Router()
router.use(adminAuthMiddleware)

router.get('/', (_req, res) => {
  const orders = readStore().orders || []
  let pendingDelivery = 0
  let confirmedDelivery = 0
  let cancelledDelivery = 0
  let revenueTotal = 0

  for (const o of orders) {
    if (o.status === 'paid') revenueTotal += Number(o.grandTotal) || 0
    const d = o.deliveryStatus || 'pending'
    if (d === 'pending') pendingDelivery += 1
    else if (d === 'confirmed') confirmedDelivery += 1
    else if (d === 'cancelled') cancelledDelivery += 1
  }

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 8)
    .map((o) => ({
      id: o.id,
      email: o.email,
      grandTotal: o.grandTotal,
      deliveryStatus: o.deliveryStatus || 'pending',
      createdAt: o.createdAt,
      shipping: o.shipping ? { fullName: o.shipping.fullName, city: o.shipping.city } : null,
    }))

  res.json({
    totalOrders: orders.length,
    pendingDelivery,
    confirmedDelivery,
    cancelledDelivery,
    revenueTotal,
    recentOrders,
  })
})

module.exports = router
