import React, { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { menuItems, menuCategories } from '../data/menuData'
import FoodCard from '../components/ui/FoodCard'
import QuickViewModal from '../components/ui/QuickViewModal'
import { CardSkeleton } from '../components/ui/Skeleton'

export default function MenuPage() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [modalItem, setModalItem] = useState(null)
  const [loading] = useState(false)
  const [vegOnly, setVegOnly] = useState(false)

  const filtered = useMemo(() => {
    return menuItems.filter(item => {
      const matchCat = category === 'all' || item.category === category
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.bangla.includes(search) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      const matchVeg = !vegOnly || item.vegetarian
      return matchCat && matchSearch && matchVeg
    })
  }, [category, search, vegOnly])

  return (
    <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-20">
      {/* Page Header */}
      <div className="bg-crimson-800 relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)`, backgroundSize: '28px 28px' }}
        />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-bold font-body">Browse & Order</span>
          <h1 className="font-display text-5xl md:text-6xl text-cream-100 font-bold mt-2">Our Menu</h1>
          <p className="font-bangla text-gold-300 text-2xl mt-2">আমাদের মেনু</p>
          <div className="w-24 h-0.5 bg-gold-500 mx-auto mt-4" />
          <p className="text-cream-200/60 mt-4 max-w-xl mx-auto text-sm">
            Discover the rich tapestry of Bengali cuisine — from heritage classics to street favourites
          </p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-20 z-40 bg-cream-100/95 dark:bg-dark-surface/95 backdrop-blur-md border-b border-cream-200 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {menuCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold tracking-widest uppercase border-2 transition-all duration-200
                    ${category === cat.id
                      ? 'border-crimson-600 bg-crimson-600 text-white'
                      : 'border-gray-300 dark:border-white/20 text-gray-600 dark:text-cream-200 hover:border-crimson-400 hover:text-crimson-600'
                    }`}
                >
                  <span>{cat.name}</span>
                  <span className="ml-1 font-bangla text-[10px] normal-case tracking-normal opacity-70">{cat.bangla}</span>
                </button>
              ))}
            </div>

            {/* Search & filters */}
            <div className="flex gap-3 items-center w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-9 py-2.5 border-2 border-gray-300 dark:border-white/20 bg-white dark:bg-dark-bg
                    text-sm focus:outline-none focus:border-crimson-500 dark:text-cream-100 transition-colors"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-crimson-600">
                    <X size={14} />
                  </button>
                )}
              </div>
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`flex items-center gap-2 px-4 py-2.5 border-2 text-xs font-bold uppercase tracking-wider transition-all duration-200
                  ${vegOnly ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 dark:border-white/20 text-gray-600 dark:text-cream-200 hover:border-green-500'}`}
              >
                🌿 Veg
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Results count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-500 dark:text-cream-200/50 text-sm">
            Showing <span className="font-bold text-crimson-600 dark:text-gold-400">{filtered.length}</span> dishes
            {search && <span> for "<em>{search}</em>"</span>}
          </p>
          {(search || vegOnly || category !== 'all') && (
            <button
              onClick={() => { setSearch(''); setVegOnly(false); setCategory('all') }}
              className="text-xs text-crimson-600 dark:text-gold-400 hover:underline flex items-center gap-1"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="font-display text-3xl text-gray-400">No dishes found</h3>
            <p className="font-bangla text-gray-400 mt-2">কোনো খাবার পাওয়া যায়নি</p>
            <button onClick={() => { setSearch(''); setCategory('all') }}
              className="btn-primary mt-6 inline-block">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(item => (
              <FoodCard key={item.id} item={item} onQuickView={setModalItem} />
            ))}
          </div>
        )}
      </div>

      {modalItem && <QuickViewModal item={modalItem} onClose={() => setModalItem(null)} />}
    </main>
  )
}
