import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const token = localStorage.getItem('cc-token')
      if (!token) return null
      const payload = JSON.parse(atob(token.split('.')[1]))
      if (payload.exp * 1000 < Date.now()) { localStorage.removeItem('cc-token'); return null }
      return payload
    } catch { return null }
  })

  const login = (userData, token) => {
    localStorage.setItem('cc-token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('cc-token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isGuest: !user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
