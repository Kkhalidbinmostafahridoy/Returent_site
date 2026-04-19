const BASE = import.meta.env.VITE_API_URL ?? ''

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { message: text || 'Invalid response' }
  }
  if (!res.ok) {
    const err = new Error(data?.message || 'Request failed')
    err.status = res.status
    err.code = data?.code
    err.errors = data?.errors
    throw err
  }
  return data
}

export const authApi = {
  register: (body) => apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  verifyOtp: (body) => apiFetch('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify(body) }),
  resendOtp: (email) => apiFetch('/api/auth/resend-otp', { method: 'POST', body: JSON.stringify({ email }) }),
  login: (body) => apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  logout: () => apiFetch('/api/auth/logout', { method: 'POST' }),
  me: () => apiFetch('/api/auth/me'),
}

export const cartApi = {
  get: () => apiFetch('/api/cart'),
  put: (items) => apiFetch('/api/cart', { method: 'PUT', body: JSON.stringify({ items }) }),
  merge: (guestItems) =>
    apiFetch('/api/cart/merge', { method: 'POST', body: JSON.stringify({ guestItems }) }),
}

export const checkoutApi = {
  create: (payload) => apiFetch('/api/checkout', { method: 'POST', body: JSON.stringify(payload) }),
  get: (checkoutId) => apiFetch(`/api/checkout/${encodeURIComponent(checkoutId)}`),
}

export const paymentApi = {
  create: (body) => apiFetch('/api/payment/create', { method: 'POST', body: JSON.stringify(body) }),
  confirm: (body) => apiFetch('/api/payment/confirm', { method: 'POST', body: JSON.stringify(body) }),
}

export const orderApi = {
  getMine: () => apiFetch('/api/orders/me'),
  getById: (id) => apiFetch(`/api/orders/${encodeURIComponent(id)}`),
}

export const adminAuthApi = {
  login: (body) => apiFetch('/api/admin/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  logout: () => apiFetch('/api/admin/auth/logout', { method: 'POST' }),
  me: () => apiFetch('/api/admin/auth/me'),
}

export const adminStatsApi = {
  get: () => apiFetch('/api/admin/stats'),
}

export const adminOrderApi = {
  list: () => apiFetch('/api/admin/orders'),
  get: (id) => apiFetch(`/api/admin/orders/${encodeURIComponent(id)}`),
  update: (id, body) =>
    apiFetch(`/api/admin/orders/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(body) }),
  delivery: (id, payload) =>
    apiFetch(`/api/admin/orders/${encodeURIComponent(id)}/delivery`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}

export async function adminDownloadOrderPdf(orderId) {
  const res = await fetch(`${BASE}/api/admin/orders/${encodeURIComponent(orderId)}/pdf`, {
    credentials: 'include',
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(t || 'PDF download failed')
  }
  return res.blob()
}

export default { authApi, cartApi, checkoutApi, paymentApi, orderApi, adminAuthApi, adminStatsApi, adminOrderApi }
