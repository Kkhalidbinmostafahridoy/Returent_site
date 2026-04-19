import React from 'react'
import { specialOffers } from '../../data/menuData'
import { Tag } from 'lucide-react'

export default function OffersSection() {
  return (
    <section className="py-16 bg-crimson-800 relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)`,
          backgroundSize: '28px 28px'
        }}
      />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Tag size={18} className="text-gold-400" />
            <span className="text-gold-400 font-body text-xs tracking-[0.4em] uppercase font-bold">Limited Time</span>
            <Tag size={18} className="text-gold-400" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-cream-100 font-bold">Special Offers</h2>
          <p className="font-bangla text-gold-300 text-xl mt-1">বিশেষ অফার</p>
          <div className="w-24 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialOffers.map(offer => (
            <div key={offer.id}
              className={`bg-gradient-to-br ${offer.color} p-6 relative overflow-hidden group
                hover:-translate-y-1 transition-all duration-300 shadow-lg`}
            >
              <div className="absolute top-3 right-4 text-5xl opacity-20 group-hover:opacity-30 transition-opacity text-white select-none">
                {offer.icon}
              </div>
              <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-widest uppercase px-3 py-1 mb-4">
                {offer.discount}
              </span>
              <h3 className="font-display text-2xl text-white font-bold">{offer.title}</h3>
              <p className="font-bangla text-white/70 text-sm mt-0.5">{offer.bangla}</p>
              <p className="text-white/80 text-sm mt-3 leading-relaxed">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
