import React, { useEffect } from 'react'
import { X, ShoppingCart, Leaf, Flame, Plus, Minus } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function QuickViewModal({ item, onClose }) {
  const { addItem, updateQty, items, removeItem } = useCart()
  const cartItem = items.find(i => i.id === item.id)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleAdd = () => {
    addItem(item)
    toast.success(`${item.name} added!`, {
      icon: '🛒',
      style: { background: '#FFF5E1', color: '#8B0000', border: '1px solid #B8860B', fontFamily: 'Lato, sans-serif' }
    })
  }

  return (
    <div className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(26,10,10,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content bg-cream-50 dark:bg-crimson-800 w-full max-w-2xl rounded-sm overflow-hidden
        shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Image */}
        <div className="relative h-72">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur text-white p-2 rounded-full hover:bg-white/40 transition"
          >
            <X size={18} />
          </button>
          {item.badge && (
            <span className={`absolute top-4 left-4 ${item.badgeColor} text-white text-xs font-bold px-3 py-1 uppercase tracking-wider`}>
              {item.badge}
            </span>
          )}
          <div className="absolute bottom-4 left-5">
            <h2 className="font-display text-3xl text-white font-bold text-shadow">{item.name}</h2>
            <p className="font-bangla text-gold-300 text-lg">{item.bangla}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Price & tags */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-display text-4xl font-bold text-crimson-600 dark:text-gold-400">৳{item.price}</span>
            </div>
            <div className="flex items-center gap-3">
              {item.vegetarian && (
                <span className="flex items-center gap-1 text-green-700 bg-green-100 dark:bg-green-900/30 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                  <Leaf size={12} /> Veg
                </span>
              )}
              {item.spicy > 0 && (
                <div className="flex items-center gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Flame key={i} size={16} className={i < item.spicy ? 'text-orange-500 fill-orange-500' : 'text-gray-300'} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-16 h-0.5 bg-gold-500" />

          <p className="text-gray-600 dark:text-cream-200/80 leading-relaxed">{item.description}</p>

          {/* Cart controls */}
          <div className="flex items-center gap-4 pt-2">
            {cartItem ? (
              <div className="flex items-center gap-3 border-2 border-crimson-600 flex-1">
                <button
                  onClick={() => updateQty(item.id, cartItem.qty - 1)}
                  className="p-3 hover:bg-crimson-600 hover:text-white transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="flex-1 text-center font-bold text-lg font-display">{cartItem.qty}</span>
                <button
                  onClick={() => updateQty(item.id, cartItem.qty + 1)}
                  className="p-3 hover:bg-crimson-600 hover:text-white transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            )}
            <button
              onClick={onClose}
              className="btn-outline px-6 py-3"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
