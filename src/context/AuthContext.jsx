import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const data = await authApi.me()
      setUser(data.user)
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    refreshUser().finally(() => setInitializing(false))
  }, [refreshUser])

  const loginUser = useCallback(async (email, password) => {
    const data = await authApi.login({ email, password })
    setUser(data.user)
    return data
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } finally {
      setUser(null)
    }
  }, [])

  const value = {
    user,
    initializing,
    isAuthenticated: Boolean(user),
    isGuest: !user,
    loginUser,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
