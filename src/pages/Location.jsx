// import React from 'react'
// import { MapPin, Phone, Mail, Clock, Car, Bus } from 'lucide-react'

// const hours = [
//   {
//     day: 'Saturday – Thursday',
//     bangla: 'শনি – বৃহস্পতি',
//     time: '11:00 AM – 11:00 PM',
//   },
//   { day: 'Friday', bangla: 'শুক্রবার', time: '1:00 PM – 11:30 PM' },
// ]

// export default function LocationPage() {
//   return (
//     <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-20">
//       {/* Header */}
//       <div className="bg-crimson-800 py-20 relative overflow-hidden">
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: `radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)`,
//             backgroundSize: '28px 28px',
//           }}
//         />
//         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
//           <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-bold font-body">
//             Find Us
//           </span>
//           <h1 className="font-display text-5xl md:text-6xl text-cream-100 font-bold mt-2">
//             Our Location
//           </h1>
//           <p className="font-bangla text-gold-300 text-2xl mt-1">
//             আমাদের অবস্থান
//           </p>
//           <div className="w-24 h-0.5 bg-gold-500 mx-auto mt-4" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//           {/* Info panel */}
//           <div className="space-y-8">
//             {/* Address */}
//             <div className="bg-white dark:bg-crimson-800/30 border border-cream-200 dark:border-white/10 p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-crimson-600/10 flex items-center justify-center">
//                   <MapPin
//                     size={20}
//                     className="text-crimson-600 dark:text-gold-400"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="font-display text-xl font-bold text-gray-900 dark:text-cream-100">
//                     Address
//                   </h3>
//                   {/* <p className="font-bangla text-xs text-crimson-500">ঠিকানা</p> */}
//                 </div>
//               </div>
//               <div className="text-gray-600 dark:text-cream-200/70 text-sm leading-relaxed">
//                 <p className="font-bold text-gray-900 dark:text-cream-100">
//                   Cream & Crust (C&C)
//                 </p>
//                 <p>99,Motijheel Chorim Chamber C/A</p>
//                 <p>Dhaka 1000, Bangladesh</p>
//                 <p className="font-bangla text-xs mt-2 text-gray-400 dark:text-cream-200/40">
//                   {/* বসুন্ধরা আবাসিক এলাকা, ঢাকা ১২২৯ */}
//                 </p>
//               </div>
//             </div>

//             {/* Hours */}
//             <div className="bg-white dark:bg-crimson-800/30 border border-cream-200 dark:border-white/10 p-6">
//               <div className="flex items-center gap-3 mb-5">
//                 <div className="w-10 h-10 bg-crimson-600/10 flex items-center justify-center">
//                   <Clock
//                     size={20}
//                     className="text-crimson-600 dark:text-gold-400"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="font-display text-xl font-bold text-gray-900 dark:text-cream-100">
//                     Opening Hours
//                   </h3>
//                   <p className="font-bangla text-xs text-crimson-500">
//                     খোলার সময়
//                   </p>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 {hours.map((h) => (
//                   <div
//                     key={h.day}
//                     className="flex items-start justify-between text-sm"
//                   >
//                     <div>
//                       <div className="font-bold text-gray-900 dark:text-cream-100">
//                         {h.day}
//                       </div>
//                       <div className="font-bangla text-xs text-gray-400 dark:text-cream-200/40">
//                         {h.bangla}
//                       </div>
//                     </div>
//                     <div className="text-crimson-600 dark:text-gold-400 font-bold text-right">
//                       {h.time}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 pt-4 border-t border-cream-200 dark:border-white/10">
//                 <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-bold">
//                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />{' '}
//                   Open Now
//                 </span>
//               </div>
//             </div>

//             {/* Contact */}
//             <div className="bg-white dark:bg-crimson-800/30 border border-cream-200 dark:border-white/10 p-6 space-y-4">
//               <h3 className="font-display text-xl font-bold text-gray-900 dark:text-cream-100 mb-2">
//                 Contact
//               </h3>
//               <a
//                 href="tel:+8801700000000"
//                 className="flex items-center gap-3 text-sm text-gray-600 dark:text-cream-200/70 hover:text-crimson-600 dark:hover:text-gold-400 transition-colors"
//               >
//                 <Phone
//                   size={16}
//                   className="text-crimson-600 dark:text-gold-400"
//                 />
//                 +880 1700-000000
//               </a>
//               <a
//                 href="tel:+8809611000000"
//                 className="flex items-center gap-3 text-sm text-gray-600 dark:text-cream-200/70 hover:text-crimson-600 dark:hover:text-gold-400 transition-colors"
//               >
//                 <Phone
//                   size={16}
//                   className="text-crimson-600 dark:text-gold-400"
//                 />
//                 +880 9611-000000
//               </a>
//               <a
//                 href="mailto:hello@creamandcrust.com"
//                 className="flex items-center gap-3 text-sm text-gray-600 dark:text-cream-200/70 hover:text-crimson-600 dark:hover:text-gold-400 transition-colors"
//               >
//                 <Mail
//                   size={16}
//                   className="text-crimson-600 dark:text-gold-400"
//                 />
//                 hello@creamandcrust.com
//               </a>
//             </div>

//             {/* How to get here */}
//             <div className="bg-crimson-800 dark:bg-crimson-700/40 p-6 text-cream-100">
//               <h3 className="font-display text-lg font-bold mb-4">
//                 Getting Here
//               </h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex items-start gap-3">
//                   <Car
//                     size={16}
//                     className="text-gold-400 mt-0.5 flex-shrink-0"
//                   />
//                   <span className="text-cream-200/80">
//                     10 minutes from Pragati Sarani, ample parking available
//                   </span>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Bus
//                     size={16}
//                     className="text-gold-400 mt-0.5 flex-shrink-0"
//                   />
//                   <span className="text-cream-200/80">
//                     99,Motijheel Chorim Chamber C/A
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Map */}
//           <div className="lg:col-span-2">
//             <div className="w-full h-96 lg:h-full min-h-[400px] shadow-2xl border border-cream-200 dark:border-white/10 overflow-hidden">
//               <iframe
//                 title="Cream & Crust Location"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0, minHeight: '400px' }}
//                 loading="lazy"
//                 allowFullScreen
//                 referrerPolicy="no-referrer-when-downgrade"
//                 src="https://www.google.com/maps?q=23.7285102,90.4176187&z=15&output=embed"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }

import React, { useEffect, useState } from 'react'
import { MapPin, Phone, Mail, Clock, Car, Bus } from 'lucide-react'

const hours = [
  {
    day: 'Saturday – Thursday',
    bangla: 'শনি – বৃহস্পতি',
    time: '11:00 AM – 11:00 PM',
  },
  { day: 'Friday', bangla: 'শুক্রবার', time: '1:00 PM – 11:30 PM' },
]

export default function LocationMap() {
  const [userLoc, setUserLoc] = useState(null)

  const restaurant = {
    lat: 23.7285102,
    lng: 90.4176187,
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLoc({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
        },
        () => {
          console.log('Location permission denied')
        }
      )
    }
  }, [])

  return (
    <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-20">
      {/* HEADER */}
      <div className="bg-crimson-800 py-20 text-center text-white">
        <h1 className="text-4xl font-bold">Our Location</h1>
        <p className="text-gold-300 mt-2">আমাদের অবস্থান</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT PANEL */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-white p-6 shadow">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <MapPin size={18} /> Address
              </h3>
              <p>
                <strong>Cream & Crust (C&C)</strong>
              </p>
              <p>99, Motijheel C/A</p>
              <p>Dhaka, Bangladesh</p>
            </div>

            {/* Hours */}
            <div className="bg-white p-6 shadow">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Clock size={18} /> Opening Hours
              </h3>
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between text-sm mb-2">
                  <span>{h.day}</span>
                  <span className="font-bold text-crimson-600">{h.time}</span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="bg-white p-6 shadow space-y-2">
              <h3 className="font-bold text-lg mb-2">Contact</h3>
              <p className="flex items-center gap-2">
                <Phone size={14} /> +880 1972-205213
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} /> cream&crust@admin.com
              </p>
            </div>

            {/* Getting Here */}
            <div className="bg-crimson-800 text-white p-6">
              <h3 className="font-bold mb-3">Getting Here</h3>
              <p className="flex items-center gap-2">
                <Car size={14} /> Easy car access
              </p>
              <p className="flex items-center gap-2">
                <Bus size={14} /> Public transport available
              </p>
            </div>
          </div>

          {/* RIGHT MAP */}
          <div className="lg:col-span-2">
            <div className="w-full h-96 lg:h-full min-h-[400px] shadow-lg overflow-hidden border">
              {!userLoc && (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Loading live location...
                </div>
              )}

              <iframe
                title="Live Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={
                  userLoc
                    ? `https://www.google.com/maps?saddr=${userLoc.lat},${userLoc.lng}&daddr=${restaurant.lat},${restaurant.lng}&output=embed`
                    : `https://www.google.com/maps?q=${restaurant.lat},${restaurant.lng}&z=15&output=embed`
                }
              />
            </div>

            {/* Directions Button */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-center bg-crimson-600 text-white py-3 font-bold hover:bg-crimson-700"
            >
              📍 Get Directions
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
