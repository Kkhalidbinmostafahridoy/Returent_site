const bcrypt = require('bcryptjs')
const { readStore, withStore } = require('./db')

function migrateStoreShape(store) {
  if (!Array.isArray(store.admins)) store.admins = []
  for (const o of store.orders || []) {
    if (o.deliveryStatus == null) o.deliveryStatus = 'pending'
    if (o.adminNotes == null) o.adminNotes = ''
    if (o.updatedAt == null) o.updatedAt = o.createdAt || new Date().toISOString()
  }
}

async function ensureAdminSeed() {
  withStore((s) => {
    migrateStoreShape(s)
  })
  const store = readStore()
  if (store.admins.length > 0) return

  const email = (process.env.ADMIN_EMAIL || 'admin@creamandcrust.local').toLowerCase()
  const password = process.env.ADMIN_PASSWORD || 'ChangeMeAdmin123!'
  const passwordHash = await bcrypt.hash(password, 10)
  withStore((s) => {
    s.admins.push({
      id: 'admin_1',
      email,
      passwordHash,
      name: 'Administrator',
      createdAt: new Date().toISOString(),
    })
  })
  console.log(`[admin] Created default admin login: ${email}`)
  if (!process.env.ADMIN_PASSWORD) {
    console.warn('[admin] Using default password. Set ADMIN_EMAIL and ADMIN_PASSWORD in production.')
  }
}

module.exports = { ensureAdminSeed, migrateStoreShape }
