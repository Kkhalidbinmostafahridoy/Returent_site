import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { adminAuthApi } from '../services/api'

const AdminAuthContext = createContext()

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [initializing, setInitializing] = useState(true)

  const refreshAdmin = useCallback(async () => {
    try {
      const data = await adminAuthApi.me()
      setAdmin(data.admin)
    } catch {
      setAdmin(null)
    }
  }, [])

  useEffect(() => {
    refreshAdmin().finally(() => setInitializing(false))
  }, [refreshAdmin])

  const loginAdmin = useCallback(async (email, password) => {
    const data = await adminAuthApi.login({ email, password })
    setAdmin(data.admin)
    return data
  }, [])

  const logoutAdmin = useCallback(async () => {
    try {
      await adminAuthApi.logout()
    } finally {
      setAdmin(null)
    }
  }, [])

  return (
    <AdminAuthContext.Provider
      value={{ admin, initializing, loginAdmin, logoutAdmin, refreshAdmin, isAdmin: Boolean(admin) }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => useContext(AdminAuthContext)
