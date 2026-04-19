const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, 'data')
const DATA_FILE = path.join(DATA_DIR, 'store.json')

const defaultStore = () => ({
  users: [],
  admins: [],
  otpByEmail: {},
  carts: {},
  checkouts: {},
  orders: [],
})

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultStore(), null, 2), 'utf8')
  }
}

function readStore() {
  ensureFile()
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    const d = defaultStore()
    return {
      ...d,
      ...parsed,
      users: Array.isArray(parsed.users) ? parsed.users : d.users,
      admins: Array.isArray(parsed.admins) ? parsed.admins : d.admins,
      orders: Array.isArray(parsed.orders) ? parsed.orders : d.orders,
    }
  } catch {
    return defaultStore()
  }
}

function writeStore(store) {
  ensureFile()
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf8')
}

function withStore(fn) {
  const store = readStore()
  const result = fn(store)
  writeStore(store)
  return result
}

module.exports = { readStore, writeStore, withStore, DATA_FILE }
