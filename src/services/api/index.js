// API service layer — ready for real backend integration
// Replace BASE_URL with your actual API endpoint

const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.creamandcrust.com/v1'

const getAuthHeader = () => {
  const token = localStorage.getItem('cc-token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const request = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...options.headers,
    },
    ...options,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Network error' }))
    throw new Error(error.message || 'Request failed')
  }
  return res.json()
}

// Auth endpoints
export const authApi = {
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  me: () => request('/auth/me'),
}

// Menu endpoints
export const menuApi = {
  getAll: () => request('/menu'),
  getById: (id) => request(`/menu/${id}`),
  getByCategory: (category) => request(`/menu?category=${category}`),
  search: (query) => request(`/menu/search?q=${encodeURIComponent(query)}`),
}

// Order endpoints
export const orderApi = {
  create: (orderData) => request('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
  getMyOrders: () => request('/orders/me'),
  getById: (id) => request(`/orders/${id}`),
}

// Contact endpoint
export const contactApi = {
  send: (formData) => request('/contact', { method: 'POST', body: JSON.stringify(formData) }),
}

export default { authApi, menuApi, orderApi, contactApi }
