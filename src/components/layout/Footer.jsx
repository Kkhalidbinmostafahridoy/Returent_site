import React from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  Clock,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-crimson-800 dark:bg-crimson-800 text-cream-100 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600" />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-3xl font-bold text-cream-100">
                Cream & Crust
              </h3>
              <p className="text-gold-400 text-xs tracking-[0.3em] uppercase font-bold mt-1">
                C&C Bengali Kitchen
              </p>
            </div>
            <div className="w-12 h-0.5 bg-gold-500" />
            <p className="font-bangla text-cream-200 text-sm leading-relaxed opacity-80">
              বাংলার ঐতিহ্যবাহী রন্ধনশৈলী ও আধুনিক রুচির মেলবন্ধনে আপনাকে
              স্বাগতম।
            </p>
            <p className="text-cream-200 text-sm opacity-70 italic font-display">
              "Where Heritage Meets Flavor"
            </p>
            {/* Socials */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-gold-500/40 flex items-center justify-center
                    hover:bg-gold-500 hover:border-gold-500 transition-all duration-300 hover:scale-110"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-bold text-xs tracking-[0.3em] uppercase text-gold-400 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/menu', label: 'Menu' },
                { to: '/about', label: 'About Us' },
                { to: '/location', label: 'Location' },
                { to: '/contact', label: 'Contact' },
                { to: '/cart', label: 'Your Cart' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-cream-200 text-sm hover:text-gold-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-500 group-hover:w-3 transition-all duration-300" />
                    {l.label}
                    <span className="font-bangla text-xs opacity-50">
                      {l.bangla}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-body font-bold text-xs tracking-[0.3em] uppercase text-gold-400 mb-6">
              Opening Hours
            </h4>
            <ul className="space-y-3 text-sm text-cream-200">
              <li className="flex items-start gap-2">
                <Clock
                  size={14}
                  className="text-gold-500 mt-0.5 flex-shrink-0"
                />
                <div>
                  <div className="font-bold">Sat – Thu</div>
                  <div className="opacity-70">11:00 AM – 11:00 PM</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock
                  size={14}
                  className="text-gold-500 mt-0.5 flex-shrink-0"
                />
                <div>
                  <div className="font-bold">Friday</div>
                  <div className="opacity-70">1:00 PM – 11:30 PM</div>
                </div>
              </li>
              <li className="mt-4 pt-4 border-t border-white/10">
                {/* <span className="font-bangla text-xs opacity-60 block">
                  শনি–বৃহস্পতি: সকাল ১১টা – রাত ১১টা
                </span>
                <span className="font-bangla text-xs opacity-60 block">
                  শুক্রবার: দুপুর ১টা – রাত সাড়ে ১১টা
                </span> */}
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-bold text-xs tracking-[0.3em] uppercase text-gold-400 mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-cream-200">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-gold-500 mt-0.5 flex-shrink-0"
                />
                <div>
                  <div>99,Carim Chamber</div>
                  <div>Motijheel, Dhaka 1000</div>
                  {/* <div className="font-bangla text-xs opacity-60 mt-1">
                    বসুন্ধরা আ/এ, ঢাকা
                  </div> */}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold-500 flex-shrink-0" />
                <a
                  href="tel:+8801700000000"
                  className="hover:text-gold-400 transition-colors"
                >
                  +880 1972-205213
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold-500 flex-shrink-0" />
                <a
                  href="mailto:cream&crust@admin.com"
                  className="hover:text-gold-400 transition-colors text-xs"
                >
                  cream&crust@admin.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/50">
          <span>© 2025 Cream & Crust (C&C). All rights reserved.</span>
          <Link to="/admin/login" className="text-cream-200/40 hover:text-gold-400 transition-colors">
            Staff login
          </Link>
          {/* <span className="font-bangla">
            ক্রিম অ্যান্ড ক্রাস্ট — বাংলার স্বাদ
          </span> */}
        </div>
      </div>
    </footer>
  )
}
