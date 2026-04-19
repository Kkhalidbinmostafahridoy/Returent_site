import React, { useState } from 'react'
import { ShoppingCart, Eye, Leaf, Flame } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function FoodCard({ item, onQuickView }) {
  const { addItem, items } = useCart()
  const [imgLoaded, setImgLoaded] = useState(false)
  const inCart = items.find(i => i.id === item.id)

  const handleAdd = (e) => {
    e.stopPropagation()
    addItem(item)
    toast.success(`${item.name} added to cart!`, {
      icon: '🛒',
      style: {
        background: '#FFF5E1',
        color: '#8B0000',
        border: '1px solid #B8860B',
        fontFamily: 'Lato, sans-serif',
        fontWeight: '600',
      },
    })
  }

  return (
    <div className="group relative bg-white dark:bg-crimson-800/30 rounded-sm overflow-hidden shadow-md hover:shadow-2xl
      transition-all duration-500 hover:-translate-y-1 border border-cream-200 dark:border-white/10">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        {!imgLoaded && <div className="skeleton absolute inset-0" />}
        <img
          src={item.image}
          alt={item.name}
          className={`food-card-img ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-crimson-800/0 group-hover:bg-crimson-800/40 transition-all duration-500 flex items-center justify-center">
          <button
            onClick={() => onQuickView(item)}
            className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0
              transition-all duration-300 bg-cream-100 text-crimson-700 px-4 py-2 text-xs font-bold
              tracking-widest uppercase flex items-center gap-2 hover:bg-gold-400"
          >
            <Eye size={14} />
            Quick View
          </button>
        </div>
        {/* Badge */}
        {item.badge && (
          <span className={`absolute top-3 left-3 ${item.badgeColor} text-white text-[10px] font-bold tracking-wider px-2 py-1 uppercase`}>
            {item.badge}
          </span>
        )}
        {/* Vegetarian */}
        {item.vegetarian && (
          <span className="absolute top-3 right-3 bg-green-700 text-white rounded-full w-6 h-6 flex items-center justify-center">
            <Leaf size={12} />
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-cream-100 leading-tight">
              {item.name}
            </h3>
            <p className="font-bangla text-sm text-crimson-600 dark:text-gold-400 mt-0.5">{item.bangla}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-display text-xl font-bold text-crimson-600 dark:text-gold-400">
              ৳{item.price}
            </div>
          </div>
        </div>

        {/* Spice level */}
        {item.spicy > 0 && (
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Flame
                key={i}
                size={12}
                className={i < item.spicy ? 'text-orange-500 fill-orange-500' : 'text-gray-300'}
              />
            ))}
          </div>
        )}

        <p className="text-gray-500 dark:text-cream-200/60 text-xs leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>

        <button
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold tracking-widest uppercase
            transition-all duration-300 border-2
            ${inCart
              ? 'border-gold-600 bg-gold-600 text-white hover:bg-gold-700'
              : 'border-crimson-600 text-crimson-600 dark:text-cream-100 dark:border-cream-200 hover:bg-crimson-600 hover:text-white dark:hover:bg-crimson-600 dark:hover:border-crimson-600'
            }`}
        >
          <ShoppingCart size={14} />
          {inCart ? `In Cart (${inCart.qty})` : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
