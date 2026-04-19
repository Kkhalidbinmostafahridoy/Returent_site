import React, { useState } from 'react'
import { testimonials } from '../../data/menuData'
import { Star, Quote } from 'lucide-react'

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-20 bg-cream-100 dark:bg-dark-surface">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-gold-600 font-body text-xs tracking-[0.4em] uppercase font-bold">Guest Reviews</span>
          <h2 className="section-title mt-2">What Our Guests Say</h2>
          <p className="font-bangla text-crimson-600 dark:text-gold-400 text-xl mt-1">আমাদের অতিথিদের মতামত</p>
          <div className="gold-divider" />
        </div>

        {/* Featured testimonial */}
        <div className="relative bg-white dark:bg-crimson-800/40 p-8 md:p-12 shadow-xl border border-cream-200 dark:border-white/10 mb-6 overflow-hidden">
          <Quote size={80} className="absolute top-4 left-4 text-crimson-100 dark:text-crimson-700 rotate-180" />
          <div className="relative z-10">
            <div className="flex gap-1 mb-4 justify-center">
              {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                <Star key={i} size={20} className="text-gold-500 fill-gold-500" />
              ))}
            </div>
            <p className="font-display text-xl md:text-2xl text-gray-700 dark:text-cream-100 text-center italic leading-relaxed mb-6">
              "{testimonials[active].text}"
            </p>
            <p className="font-bangla text-gray-400 dark:text-cream-200/50 text-center text-sm mb-6">
              "{testimonials[active].banglaText}"
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-11 h-11 rounded-full bg-crimson-600 text-white flex items-center justify-center font-bold text-sm">
                {testimonials[active].avatar}
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-cream-100">{testimonials[active].name}</div>
                <div className="text-gold-600 text-xs tracking-wider">{testimonials[active].location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots / thumbs */}
        <div className="flex justify-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 ${
                i === active
                  ? 'w-8 h-2 bg-crimson-600'
                  : 'w-2 h-2 rounded-full bg-gray-300 dark:bg-white/20 hover:bg-crimson-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
