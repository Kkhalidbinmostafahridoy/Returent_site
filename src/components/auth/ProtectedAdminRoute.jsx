import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { PageSkeleton } from '../ui/Skeleton'

export default function ProtectedAdminRoute() {
  const { admin, initializing } = useAdminAuth()
  const location = useLocation()

  if (initializing) return <PageSkeleton />
  if (!admin) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }
  return <Outlet />
}
