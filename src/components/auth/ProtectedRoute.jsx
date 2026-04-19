import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { PageSkeleton } from '../ui/Skeleton'

export default function ProtectedRoute({ children }) {
  const { user, initializing } = useAuth()
  const location = useLocation()

  if (initializing) {
    return <PageSkeleton />
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}
