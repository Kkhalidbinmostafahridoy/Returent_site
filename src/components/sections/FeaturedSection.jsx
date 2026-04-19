import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { menuItems } from '../../data/menuData'
import FoodCard from '../ui/FoodCard'
import QuickViewModal from '../ui/QuickViewModal'

const featured = menuItems
  .filter(
    (i) =>
      i.badge === 'Bestseller' ||
      i.badge === "Chef's Pick" ||
      i.badge === 'Premium'
  )
  .slice(0, 4)

export default function FeaturedSection() {
  const [modalItem, setModalItem] = useState(null)

  return (
    <section className="py-20 bg-cream-50 dark:bg-dark-bg pattern-bg">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-gold-600 font-body text-xs tracking-[0.4em] uppercase font-bold">
            Our Signature
          </span>
          <h2 className="section-title mt-2">Featured Dishes</h2>
          <p className="font-bangla text-crimson-600 dark:text-gold-400 text-xl mt-1">
            বিশেষ পদসমূহ
          </p>
          <div className="gold-divider" />
          <p className="text-gray-500 dark:text-cream-200/60 max-w-lg mx-auto mt-4 text-sm leading-relaxed">
            Handpicked by our head chef — dishes that define the soul of Cream &
            Crust
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item) => (
            <FoodCard key={item.id} item={item} onQuickView={setModalItem} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/menu"
            className="btn-primary inline-flex items-center gap-2"
          >
            View Full Menu
            <span className="font-bangla normal-case tracking-normal opacity-70"></span>
          </Link>
        </div>
      </div>

      {modalItem && (
        <QuickViewModal item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </section>
  )
}
