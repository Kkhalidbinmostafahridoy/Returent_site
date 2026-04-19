const jwt = require('jsonwebtoken')

const COOKIE = 'cc_auth'

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

function signToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' })
}

function verifyToken(token) {
  try {
    return jwt.verify(token, getJwtSecret())
  } catch {
    return null
  }
}

function authMiddleware(req, res, next) {
  const token = req.cookies?.[COOKIE]
  if (!token) return res.status(401).json({ message: 'Authentication required' })
  const decoded = verifyToken(token)
  if (!decoded?.sub) return res.status(401).json({ message: 'Invalid session' })
  req.userId = decoded.sub
  req.userEmail = decoded.email
  next()
}

function optionalAuth(req, res, next) {
  const token = req.cookies?.[COOKIE]
  if (token) {
    const decoded = verifyToken(token)
    if (decoded?.sub) {
      req.userId = decoded.sub
      req.userEmail = decoded.email
    }
  }
  next()
}

function setAuthCookie(res, token) {
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.COOKIE_SECURE === 'true',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  })
}

function clearAuthCookie(res) {
  res.clearCookie(COOKIE, { path: '/' })
}

module.exports = {
  COOKIE,
  signToken,
  verifyToken,
  authMiddleware,
  optionalAuth,
  setAuthCookie,
  clearAuthCookie,
}
