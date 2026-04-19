// Format price in BDT
export const formatPrice = (amount) => `৳${amount.toLocaleString('en-BD')}`

// Truncate text
export const truncate = (text, length = 80) =>
  text.length > length ? text.slice(0, length) + '…' : text

// Debounce
export const debounce = (fn, delay) => {
  let timer
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay) }
}

// Validate email
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// Get category label
export const getCategoryLabel = (id, categories) =>
  categories.find(c => c.id === id)?.name || id

// Sort menu items
export const sortItems = (items, by = 'default') => {
  if (by === 'price-asc') return [...items].sort((a, b) => a.price - b.price)
  if (by === 'price-desc') return [...items].sort((a, b) => b.price - a.price)
  if (by === 'name') return [...items].sort((a, b) => a.name.localeCompare(b.name))
  return items
}

// Group by category
export const groupByCategory = (items) =>
  items.reduce((acc, item) => {
    ;(acc[item.category] = acc[item.category] || []).push(item)
    return acc
  }, {})
