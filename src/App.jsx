import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { PageSkeleton } from './components/ui/Skeleton'
import ProtectedRoute from './components/auth/ProtectedRoute'
import ProtectedAdminRoute from './components/auth/ProtectedAdminRoute'

const Home = lazy(() => import('./pages/Home'))
const Menu = lazy(() => import('./pages/Menu'))
const Cart = lazy(() => import('./pages/Cart'))
const About = lazy(() => import('./pages/About'))
const Location = lazy(() => import('./pages/Location'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Payment = lazy(() => import('./pages/Payment'))
const Orders = lazy(() => import('./pages/Orders'))
const NotFound = lazy(() => import('./pages/NotFound'))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'))
const AdminOrderDetail = lazy(() => import('./pages/admin/AdminOrderDetail'))

function CustomerShell() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 dark:bg-dark-bg transition-colors duration-300">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AdminAuthProvider>
              <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
              <Routes>
                <Route
                  path="/admin/login"
                  element={
                    <Suspense fallback={<PageSkeleton />}>
                      <AdminLogin />
                    </Suspense>
                  }
                />
                <Route element={<ProtectedAdminRoute />}>
                  <Route
                    path="/admin"
                    element={
                      <Suspense fallback={<PageSkeleton />}>
                        <AdminLayout />
                      </Suspense>
                    }
                  >
                    <Route
                      index
                      element={
                        <Suspense fallback={<PageSkeleton />}>
                          <AdminDashboard />
                        </Suspense>
                      }
                    />
                    <Route
                      path="orders"
                      element={
                        <Suspense fallback={<PageSkeleton />}>
                          <AdminOrders />
                        </Suspense>
                      }
                    />
                    <Route
                      path="orders/:orderId"
                      element={
                        <Suspense fallback={<PageSkeleton />}>
                          <AdminOrderDetail />
                        </Suspense>
                      }
                    />
                  </Route>
                </Route>

                <Route element={<CustomerShell />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/payment"
                    element={
                      <ProtectedRoute>
                        <Payment />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </AdminAuthProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
