import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-20 flex items-center justify-center text-center px-4">
      <div>
        <div className="text-9xl mb-4">🍽️</div>
        <h1 className="font-display text-8xl text-crimson-600 dark:text-gold-400 font-bold">404</h1>
        <h2 className="font-display text-3xl text-gray-700 dark:text-cream-100 mt-2">Page Not Found</h2>
        <p className="font-bangla text-gray-400 dark:text-cream-200/50 text-lg mt-1">পৃষ্ঠাটি পাওয়া যায়নি</p>
        <p className="text-gray-500 dark:text-cream-200/50 mt-4 mb-8">
          Looks like this dish isn't on our menu. Let's get you back to the kitchen.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          Back to Home
        </Link>
      </div>
    </main>
  )
}
