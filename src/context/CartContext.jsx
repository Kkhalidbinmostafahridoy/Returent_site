import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { cartApi } from '../services/api'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cc-cart')) || []
    } catch {
      return []
    }
  })
  const mergedUserRef = useRef(null)
  const itemsRef = useRef(items)
  itemsRef.current = items

  useEffect(() => {
    localStorage.setItem('cc-cart', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (!user) {
      mergedUserRef.current = null
      return
    }
    if (mergedUserRef.current === user.id) return
    let cancelled = false
    ;(async () => {
      try {
        const snapshot = itemsRef.current
        const { items: merged } = await cartApi.merge(snapshot)
        if (cancelled || !Array.isArray(merged)) return
        setItems(merged)
        mergedUserRef.current = user.id
      } catch {
        mergedUserRef.current = null
      }
    })()
    return () => {
      cancelled = true
    }
  }, [user?.id])

  useEffect(() => {
    if (!user) return
    const t = setTimeout(() => {
      cartApi.put(items).catch(() => {})
    }, 500)
    return () => clearTimeout(t)
  }, [items, user])

  const addItem = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeItem(id)
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  const clearCart = () => setItems([])

  const replaceCart = (next) => setItems(Array.isArray(next) ? next : [])

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, replaceCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
