const path = require('path')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const { router: checkoutRoutes } = require('./routes/checkout')
const paymentRoutes = require('./routes/payment')
const orderRoutes = require('./routes/orders')
const adminAuthRoutes = require('./routes/adminAuth')
const adminOrdersRoutes = require('./routes/adminOrders')
const { ensureAdminSeed } = require('./seedAdmin')

const app = express()
const PORT = Number(process.env.PORT || 3001)
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
)
app.use(express.json({ limit: '512kb' }))
app.use(cookieParser())

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.use('/api/auth', authRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/checkout', checkoutRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin/auth', adminAuthRoutes)
app.use('/api/admin/orders', adminOrdersRoutes)

// Static preview build (optional)
const dist = path.join(__dirname, '..', 'dist')
app.use(express.static(dist))

async function start() {
  await ensureAdminSeed()
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT} (CORS: ${clientOrigin})`)
  })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
