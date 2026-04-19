import React from 'react'
import { Link } from 'react-router-dom'
import { Award, Users, Clock, Utensils } from 'lucide-react'

const stats = [
  { icon: Utensils, value: '50+', label: 'Authentic Dishes', bangla: 'খাবার' },
  { icon: Users, value: '10K+', label: 'Happy Guests', bangla: 'সন্তুষ্ট অতিথি' },
  { icon: Clock, value: '5+', label: 'Years of Heritage', bangla: 'বছরের ঐতিহ্য' },
  { icon: Award, value: '#1', label: 'Bengali Restaurant', bangla: 'বাংলা রেস্তোরাঁ' },
]

export default function HeritageSection() {
  return (
    <section className="py-20 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Images collage */}
          <div className="relative h-[420px] hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80"
              alt="Restaurant interior"
              className="absolute top-0 left-0 w-72 h-64 object-cover shadow-2xl"
            />
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
              alt="Bengali food"
              className="absolute bottom-0 right-0 w-64 h-60 object-cover shadow-2xl"
            />
            {/* Gold frame accent */}
            <div className="absolute top-6 left-6 w-72 h-64 border-2 border-gold-500 -z-0 translate-x-3 translate-y-3" />
            {/* Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-crimson-700 text-white p-6 text-center shadow-2xl z-10">
              <div className="font-display text-4xl font-bold">5+</div>
              <div className="text-xs tracking-widest uppercase font-bold text-gold-300 mt-1">Years of</div>
              <div className="text-xs tracking-widest uppercase font-bold text-gold-300">Heritage</div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <span className="text-gold-600 font-body text-xs tracking-[0.4em] uppercase font-bold">Our Story</span>
            <h2 className="section-title">Where Every Dish Tells a Story</h2>
            <p className="font-bangla text-crimson-600 dark:text-gold-400 text-xl">আমাদের গল্প</p>
            <div className="w-16 h-0.5 bg-gold-500" />

            <p className="text-gray-600 dark:text-cream-200/70 leading-relaxed">
              Born from a deep love for <strong className="text-crimson-600">authentic Bengali cuisine</strong>,
              Cream & Crust was founded to preserve the timeless flavors of our heritage —
              from the narrow lanes of Old Dhaka to the banks of the Padma.
            </p>
            <p className="text-gray-600 dark:text-cream-200/70 leading-relaxed font-bangla">
              আমাদের প্রতিটি রান্নায় মিশে আছে মায়ের ভালোবাসা, দাদির রেসিপি আর বাংলার মাটির সুবাস।
            </p>

            <Link to="/about" className="btn-primary inline-flex items-center gap-2">
              Read Our Story
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-16 bg-gold-500/20 dark:bg-gold-500/10">
          {stats.map(({ icon: Icon, value, label, bangla }) => (
            <div key={label} className="bg-cream-50 dark:bg-dark-surface p-8 text-center group hover:bg-crimson-600 transition-colors duration-300">
              <Icon size={28} className="mx-auto mb-3 text-crimson-600 group-hover:text-gold-300 transition-colors" />
              <div className="font-display text-4xl font-bold text-crimson-600 group-hover:text-cream-100 transition-colors">{value}</div>
              <div className="text-xs font-bold tracking-widest uppercase text-gray-500 group-hover:text-cream-100/70 transition-colors mt-1">{label}</div>
              <div className="font-bangla text-xs text-gray-400 group-hover:text-cream-100/50 transition-colors">{bangla}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
