import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../context/ThemeContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count } = useCart()
  const { isDark, toggle } = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  const navBg =
    isHome && !scrolled
      ? 'bg-transparent'
      : 'bg-cream-100/95 dark:bg-dark-surface/95 backdrop-blur-md shadow-lg'

  const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/about', label: 'About' },
    { to: '/location', label: 'Location' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start group">
            <div className="flex items-center gap-1">
              <span className="font-display text-2xl font-bold text-crimson-600 group-hover:text-crimson-700 transition-colors">
                Cream & Crust
              </span>
            </div>
            <span className="text-xs tracking-[0.3em] uppercase text-gold-600 font-body font-bold -mt-1">
              C&C
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'text-crimson-600 dark:text-gold-400' : ''} ${
                    isHome && !scrolled
                      ? 'text-cream-100 hover:text-gold-300'
                      : ''
                  }`
                }
              >
                <span>{l.label}</span>
                <span className="block text-[9px] font-bangla text-current opacity-60 mt-0.5 tracking-normal normal-case">
                  {l.bangla}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isHome && !scrolled
                  ? 'text-cream-100 hover:bg-white/20'
                  : 'text-gray-700 dark:text-cream-200 hover:bg-crimson-600/10 dark:hover:bg-gold-500/10'
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isHome && !scrolled
                  ? 'text-cream-100 hover:bg-white/20'
                  : 'text-gray-700 dark:text-cream-200 hover:bg-crimson-600/10'
              }`}
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-crimson-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-fade-in">
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className={`md:hidden p-2 rounded-full transition-all ${
                isHome && !scrolled
                  ? 'text-cream-100'
                  : 'text-gray-700 dark:text-cream-200'
              }`}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${open ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="bg-cream-100 dark:bg-dark-surface border-t border-gold-500/20 px-4 py-4 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex items-center justify-between py-3 px-2 border-b border-cream-200 dark:border-white/10 ${
                  isActive
                    ? 'text-crimson-600 dark:text-gold-400'
                    : 'text-gray-700 dark:text-cream-200'
                }`
              }
            >
              <span className="font-body font-bold text-sm tracking-widest uppercase">
                {l.label}
              </span>
              <span className="font-bangla text-sm opacity-70">{l.bangla}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
