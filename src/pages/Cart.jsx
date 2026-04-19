import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, total } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleRemove = (item) => {
    removeItem(item.id)
    toast.success(`${item.name} removed`, {
      icon: '🗑️',
      style: {
        background: '#FFF5E1',
        color: '#8B0000',
        border: '1px solid #B8860B',
        fontFamily: 'Lato, sans-serif',
      },
    })
  }

  const goCheckout = () => {
    if (!user) {
      toast.error('Please sign in or register to checkout', { icon: '🔐' })
      navigate('/login', { state: { from: { pathname: '/checkout' } } })
      return
    }
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-20 flex items-center justify-center">
        <div className="text-center px-4 py-20">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="font-display text-4xl text-crimson-600 dark:text-gold-400 font-bold">
            Your cart is empty
          </h2>
          <p className="text-gray-400 mt-3 mb-8">
            Add some delicious Bengali dishes to get started
          </p>
          <Link
            to="/menu"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ShoppingBag size={16} /> Browse Menu
          </Link>
        </div>
      </main>
    )
  }

  const delivery = 50
  const grandTotal = total + delivery

  return (
    <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-20">
      {/* Header */}
      <div className="bg-crimson-800 py-14 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="font-display text-5xl text-cream-100 font-bold">
            Your Cart
          </h1>
          <p className="font-bangla text-gold-300 text-xl mt-1">আপনার কার্ট</p>
          <div className="w-16 h-0.5 bg-gold-500 mt-3" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl text-gray-900 dark:text-cream-100">
                {items.length} item{items.length > 1 ? 's' : ''}
              </h2>
              <button
                onClick={() => {
                  clearCart()
                  toast.success('Cart cleared')
                }}
                className="text-xs text-gray-400 hover:text-crimson-600 dark:hover:text-gold-400 transition-colors uppercase tracking-wider font-bold flex items-center gap-1"
              >
                <Trash2 size={13} /> Clear All
              </button>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-crimson-800/30 border border-cream-200 dark:border-white/10 flex gap-4 p-4
                  hover:shadow-md transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-bold text-gray-900 dark:text-cream-100">
                        {item.name}
                      </h3>
                      <p className="font-bangla text-sm text-crimson-500 dark:text-gold-400">
                        {item.bangla}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-gray-300 hover:text-crimson-600 dark:hover:text-gold-400 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty */}
                    <div className="flex items-center border-2 border-crimson-200 dark:border-white/20">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="p-2 hover:bg-crimson-600 hover:text-white transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-10 text-center font-bold text-sm dark:text-cream-100">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="p-2 hover:bg-crimson-600 hover:text-white transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <div className="font-display text-xl font-bold text-crimson-600 dark:text-gold-400">
                      ৳{item.price * item.qty}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-crimson-800/30 border border-cream-200 dark:border-white/10 p-6 sticky top-28">
              <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-cream-100 mb-6">
                Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-cream-200/70">
                  <span>Subtotal</span>
                  <span>৳{total}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-cream-200/70">
                  <span>Delivery</span>
                  <span>৳{delivery}</span>
                </div>
                <div className="h-px bg-cream-200 dark:bg-white/10 my-3" />
                <div className="flex justify-between font-bold text-xl">
                  <span className="font-display text-gray-900 dark:text-cream-100">
                    Total
                  </span>
                  <span className="text-crimson-600 dark:text-gold-400 font-display">
                    ৳{grandTotal}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={goCheckout}
                className="w-full btn-primary flex items-center justify-center gap-2 mt-6"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              {!user ? (
                <p className="text-center text-xs text-amber-800 dark:text-amber-200/90 mt-3 font-bold">
                  Sign in required for checkout and payment
                </p>
              ) : (
                <p className="text-center text-xs text-gray-400 dark:text-cream-200/40 mt-3">
                  Signed in as {user.email}
                </p>
              )}

              <Link
                to="/menu"
                className="block text-center text-sm text-crimson-600 dark:text-gold-400 hover:underline mt-4 font-bold"
              >
                ← Continue Shopping
              </Link>

              <div className="mt-4 bg-cream-100 dark:bg-dark-bg border border-gold-500/30 p-3 text-center">
                <span className="text-xs text-gold-600 dark:text-gold-400 font-bold">
                  {user ? '✓ Account cart sync' : '🛒 Guest cart'}
                </span>
                <p className="text-xs text-gray-400 mt-0.5">
                  {user ? 'Saved to your account (and this browser)' : 'Items saved in this browser'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
