const jwt = require('jsonwebtoken')

const ADMIN_COOKIE = 'cc_admin_auth'

function getJwtSecret() {
  const s = process.env.JWT_SECRET
  if (!s || s.length < 16) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET must be set (min 16 chars) in production')
    }
    return 'dev-insecure-jwt-secret-change-me'
  }
  return s
}

function signAdminToken(payload) {
  return jwt.sign({ ...payload, role: 'admin' }, getJwtSecret(), { expiresIn: '2d' })
}

function verifyAdminToken(token) {
  try {
    const d = jwt.verify(token, getJwtSecret())
    if (d.role !== 'admin' || !d.sub) return null
    return d
  } catch {
    return null
  }
}

function adminAuthMiddleware(req, res, next) {
  const token = req.cookies?.[ADMIN_COOKIE]
  if (!token) return res.status(401).json({ message: 'Admin authentication required' })
  const decoded = verifyAdminToken(token)
  if (!decoded) return res.status(401).json({ message: 'Invalid or expired admin session' })
  req.adminId = decoded.sub
  req.adminEmail = decoded.email
  next()
}

function setAdminCookie(res, token) {
  res.cookie(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.COOKIE_SECURE === 'true',
    maxAge: 2 * 24 * 60 * 60 * 1000,
    path: '/',
  })
}

function clearAdminCookie(res) {
  res.clearCookie(ADMIN_COOKIE, { path: '/' })
}

module.exports = {
  ADMIN_COOKIE,
  signAdminToken,
  verifyAdminToken,
  adminAuthMiddleware,
  setAdminCookie,
  clearAdminCookie,
}
