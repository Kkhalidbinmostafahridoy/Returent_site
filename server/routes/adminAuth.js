const express = require('express')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const rateLimit = require('express-rate-limit')
const { readStore } = require('../db')
const { signAdminToken, setAdminCookie, clearAdminCookie, adminAuthMiddleware } = require('../middleware/adminAuth')

const router = express.Router()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
})

router.post(
  '/login',
  limiter,
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid credentials' })
    const { email, password } = req.body
    const store = readStore()
    const admins = store.admins || []
    const admin = admins.find((a) => a.email === email)
    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
      return res.status(401).json({ message: 'Invalid admin email or password' })
    }
    const token = signAdminToken({ sub: admin.id, email: admin.email })
    setAdminCookie(res, token)
    res.json({ admin: { id: admin.id, email: admin.email, name: admin.name } })
  }
)

router.post('/logout', (req, res) => {
  clearAdminCookie(res)
  res.json({ message: 'Signed out' })
})

router.get('/me', adminAuthMiddleware, (req, res) => {
  const store = readStore()
  const admin = (store.admins || []).find((a) => a.id === req.adminId)
  if (!admin) {
    clearAdminCookie(res)
    return res.status(401).json({ message: 'Admin not found' })
  }
  res.json({ admin: { id: admin.id, email: admin.email, name: admin.name } })
})

module.exports = router
