import React from 'react'
import { Award, Heart, Leaf } from 'lucide-react'

const chefs = [
  {
    name: 'Chef Abdur Rahman',
    title: 'Head Chef & Founder',
    bangla: 'প্রধান বাবুর্চি',
    specialty: 'Kacchi Biryani & Mughal Cuisine',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80',
    exp: '20 Years',
  },
  {
    name: 'Chef Taslima Begum',
    title: 'Traditional Cuisine Specialist',
    bangla: 'ঐতিহ্যবাহী রন্ধনশিল্পী',
    specialty: 'Ilish & Seafood',
    image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&q=80',
    exp: '15 Years',
  },
  {
    name: 'Chef Karim Hossain',
    title: 'Dessert & Sweets Chef',
    bangla: 'মিষ্টান্ন বিশেষজ্ঞ',
    specialty: 'Bengali Sweets & Desserts',
    image: 'https://images.unsplash.com/photo-1583394293214-0e5d5b928f22?w=400&q=80',
    exp: '12 Years',
  },
]

const values = [
  { icon: Heart, title: 'Made with Love', bangla: 'ভালোবাসা দিয়ে তৈরি', desc: 'Every dish is crafted with passion and the warmth of Bengali hospitality.' },
  { icon: Leaf, title: 'Fresh Ingredients', bangla: 'তাজা উপকরণ', desc: 'We source the finest local ingredients daily from Dhaka\'s best markets.' },
  { icon: Award, title: 'Heritage Recipes', bangla: 'ঐতিহ্যবাহী রেসিপি', desc: 'Our recipes are passed down through generations, preserving authentic flavors.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-20">
      {/* Header */}
      <div className="bg-crimson-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)`, backgroundSize: '28px 28px' }}
        />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-bold font-body">Our Heritage</span>
          <h1 className="font-display text-5xl md:text-6xl text-cream-100 font-bold mt-2">About Us</h1>
          <p className="font-bangla text-gold-300 text-2xl mt-1">আমাদের সম্পর্কে</p>
          <div className="w-24 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>
      </div>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-5">
              <span className="text-gold-600 text-xs tracking-[0.4em] uppercase font-bold">The Beginning</span>
              <h2 className="font-display text-4xl text-crimson-700 dark:text-gold-400 font-bold">
                A Passion for Authentic Bengali Flavors
              </h2>
              <div className="w-16 h-0.5 bg-gold-500" />
              <p className="text-gray-600 dark:text-cream-200/70 leading-relaxed">
                Cream & Crust (C&C) was born in 2019 from Chef Abdur Rahman's dream of bringing
                the rich culinary heritage of Bengal to a single, welcoming table. Growing up in
                Dhaka's Old City, he watched his mother prepare Kacchi Biryani for hours,
                infusing every grain of rice with love and tradition.
              </p>
              <p className="text-gray-600 dark:text-cream-200/70 leading-relaxed">
                Today, we serve over 50 authentic dishes that span the full breadth of Bengali cuisine —
                from the mustard-sharp Ilish of the Padma Delta to the delicate Roshmalai of
                Comilla's sweet shops.
              </p>
              <p className="font-bangla text-gray-500 dark:text-cream-200/50 leading-relaxed text-sm">
                আমাদের লক্ষ্য একটাই — বাংলার প্রতিটি স্বাদকে আপনার কাছে পৌঁছে দেওয়া। প্রতিটি থালায় মিশে আছে আমাদের ভালোবাসা ও ঐতিহ্য।
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80"
                alt="Restaurant story"
                className="w-full h-96 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-gold-500 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white dark:bg-dark-surface">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Values</h2>
            <p className="font-bangla text-crimson-600 dark:text-gold-400 text-xl mt-1">আমাদের মূল্যবোধ</p>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, bangla, desc }) => (
              <div key={title} className="text-center p-8 border border-cream-200 dark:border-white/10 group hover:border-gold-500 transition-colors">
                <div className="w-16 h-16 bg-crimson-600/10 dark:bg-crimson-600/20 flex items-center justify-center mx-auto mb-4
                  group-hover:bg-crimson-600 transition-colors">
                  <Icon size={28} className="text-crimson-600 dark:text-gold-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-cream-100">{title}</h3>
                <p className="font-bangla text-crimson-600 dark:text-gold-400 text-sm mt-1">{bangla}</p>
                <div className="w-10 h-0.5 bg-gold-500 mx-auto my-3" />
                <p className="text-gray-500 dark:text-cream-200/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="py-20 bg-cream-50 dark:bg-dark-bg pattern-bg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-gold-600 text-xs tracking-[0.4em] uppercase font-bold">The Artisans</span>
            <h2 className="section-title mt-2">Meet Our Chefs</h2>
            <p className="font-bangla text-crimson-600 dark:text-gold-400 text-xl mt-1">আমাদের পাচকগণ</p>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefs.map(chef => (
              <div key={chef.name} className="group bg-white dark:bg-crimson-800/30 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-cream-200 dark:border-white/10">
                <div className="relative overflow-hidden h-64">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-crimson-600 text-white text-xs px-3 py-1 font-bold uppercase tracking-wider">
                    {chef.exp}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-cream-100">{chef.name}</h3>
                  <p className="text-crimson-600 dark:text-gold-400 text-xs font-bold tracking-wider uppercase mt-1">{chef.title}</p>
                  <p className="font-bangla text-gray-400 dark:text-cream-200/40 text-xs">{chef.bangla}</p>
                  <div className="w-10 h-0.5 bg-gold-500 my-3" />
                  <p className="text-gray-500 dark:text-cream-200/60 text-sm">
                    <span className="font-bold text-gray-700 dark:text-cream-200">Specialty:</span> {chef.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
