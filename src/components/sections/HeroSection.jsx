import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1400&q=80',
    dish: 'Kacchi Biryani',
    bangla: 'কাচ্চি বিরিয়ানি',
  },
  {
    image:
      'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1400&q=80',
    dish: 'Ilish Bhuna',
    bangla: 'ইলিশ ভুনা',
  },
  {
    image:
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1400&q=80',
    dish: 'Chingri Malaikari',
    bangla: 'চিংড়ি মালাইকারি',
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    const interval = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      5000
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={slide.image}
            alt={slide.dish}
            className="w-full h-full object-cover scale-105"
            style={{
              transform: i === current ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 8s ease',
            }}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="hero-gradient absolute inset-0" />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center text-center px-4
        transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Ornament */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-16 bg-gold-400" />
          <span className="text-gold-400 font-bangla text-sm tracking-widest">
            বাংলার সেরা স্বাদ
          </span>
          <div className="h-px w-16 bg-gold-400" />
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream-100 font-bold leading-tight text-shadow">
          Cream & Crust
        </h1>
        <div className="flex items-center gap-3 my-3">
          <div className="h-px w-12 bg-gold-400" />
          <span className="font-display text-xl md:text-2xl text-gold-300 italic">
            Authentic Bengali Taste
          </span>
          <div className="h-px w-12 bg-gold-400" />
        </div>
        <p className="font-bangla text-cream-200/80 text-lg md:text-xl mb-8 max-w-lg">
          প্রতিটি খাবারে বাংলার ঐতিহ্য, প্রতিটি কামড়ে ভালোবাসা
        </p>

        {/* Current dish label */}
        <div className="mb-10 px-6 py-2 border border-gold-400/40 bg-black/20 backdrop-blur-sm">
          <span className="text-gold-300 text-xs tracking-[0.3em] uppercase font-bold">
            {slides[current].dish} · {slides[current].bangla}
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/menu" className="btn-primary">
            Explore Menu
            <span className="font-bangla normal-case tracking-normal ml-2 text-cream-100/60">
              {/* মেনু দেখুন */}
            </span>
          </Link>
          <Link
            to="/location"
            className="btn-outline border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-crimson-700"
          >
            Visit Us
            <span className="font-bangla normal-case tracking-normal ml-2 opacity-60">
              {/* আসুন */}
            </span>
          </Link>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-0.5 transition-all duration-300 ${i === current ? 'w-8 bg-gold-400' : 'w-4 bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream-100/60 animate-bounce">
        <ChevronDown size={28} />
      </div>
    </section>
  )
}
