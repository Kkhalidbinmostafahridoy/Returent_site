const express = require('express')
const { body, validationResult } = require('express-validator')
const { authMiddleware } = require('../middleware/auth')
const { withStore, readStore } = require('../db')
const { items: catalog } = require('../menuCatalog')

const router = express.Router()

function normalizeLine(raw) {
  const id = Number(raw.id)
  const meta = catalog.get(id)
  if (!meta) return null
  const qty = Math.min(99, Math.max(1, Math.floor(Number(raw.qty) || 1)))
  return {
    id,
    name: meta.name,
    price: meta.price,
    qty,
    image: typeof raw.image === 'string' ? raw.image.slice(0, 500) : '',
    bangla: typeof raw.bangla === 'string' ? raw.bangla.slice(0, 120) : '',
  }
}

function mergeLines(serverLines, guestLines) {
  const map = new Map()
  for (const line of serverLines) {
    if (line && catalog.get(line.id)) map.set(line.id, { ...line })
  }
  for (const g of guestLines) {
    const n = normalizeLine(g)
    if (!n) continue
    const cur = map.get(n.id)
    if (cur) map.set(n.id, { ...cur, qty: Math.min(99, cur.qty + n.qty) })
    else map.set(n.id, n)
  }
  return Array.from(map.values())
}

router.get('/', authMiddleware, (req, res) => {
  const store = readStore()
  const lines = store.carts[req.userId] || []
  res.json({ items: lines })
})

router.put(
  '/',
  authMiddleware,
  body('items').isArray({ max: 100 }),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid cart payload' })
    const normalized = []
    for (const raw of req.body.items) {
      const n = normalizeLine(raw)
      if (n) normalized.push(n)
    }
    withStore((s) => {
      s.carts[req.userId] = normalized
    })
    res.json({ items: normalized })
  }
)

router.post(
  '/merge',
  authMiddleware,
  body('guestItems').isArray({ max: 100 }),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid merge payload' })
    const guest = req.body.guestItems
    const store = readStore()
    const serverLines = store.carts[req.userId] || []
    const guestNorm = guest.map(normalizeLine).filter(Boolean)
    const merged = mergeLines(serverLines, guestNorm)
    withStore((s) => {
      s.carts[req.userId] = merged
    })
    res.json({ items: merged })
  }
)

module.exports = router
