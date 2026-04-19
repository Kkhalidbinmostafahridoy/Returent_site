import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, LogOut, Package } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'

export default function AdminLayout() {
  const { admin, logoutAdmin } = useAdminAuth()

  const navCls = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider border-l-4 transition-colors ${
      isActive
        ? 'border-gold-500 bg-white/5 text-gold-400'
        : 'border-transparent text-cream-200/70 hover:text-cream-100'
    }`

  return (
    <div className="min-h-screen bg-gray-950 text-cream-100 flex flex-col">
      <header className="border-b border-white/10 bg-crimson-900/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/admin/orders" className="font-display text-xl font-bold text-cream-100 flex items-center gap-2">
            <LayoutDashboard className="text-gold-400" size={22} />
            C&amp;C Admin
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <NavLink
              to="/admin/orders"
              className="sm:hidden text-gold-400 font-bold uppercase tracking-wider"
            >
              Orders
            </NavLink>
            <span className="text-cream-200/60 truncate max-w-[160px] hidden sm:inline" title={admin?.email}>
              {admin?.name}
            </span>
            <button
              type="button"
              onClick={() => logoutAdmin().then(() => {})}
              className="flex items-center gap-1 text-cream-200 hover:text-white uppercase font-bold tracking-wider"
            >
              <LogOut size={14} /> Logout
            </button>
            <Link to="/" className="text-gold-400 hover:underline font-bold">
              Storefront
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-6xl mx-auto w-full">
        <aside className="hidden sm:block w-52 shrink-0 border-r border-white/10 py-8">
          <nav className="space-y-1">
            <NavLink to="/admin/orders" className={navCls}>
              <Package size={16} /> Orders
            </NavLink>
          </nav>
        </aside>
        <main className="flex-1 p-4 sm:p-8 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
