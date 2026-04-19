// import React, { useState } from 'react'
// import { Send, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'
// import toast from 'react-hot-toast'

// export default function ContactPage() {
//   const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
//   const [sending, setSending] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setSending(true)
//     await new Promise(r => setTimeout(r, 1200))
//     toast.success('Message sent! We\'ll get back to you soon.', {
//       icon: '✉️',
//       duration: 4000,
//       style: { background: '#FFF5E1', color: '#8B0000', border: '1px solid #B8860B', fontFamily: 'Lato, sans-serif' }
//     })
//     setForm({ name: '', email: '', phone: '', subject: '', message: '' })
//     setSending(false)
//   }

//   const inputCls = `w-full border-2 border-cream-200 dark:border-white/20 bg-white dark:bg-dark-bg px-4 py-3 text-sm
//     focus:outline-none focus:border-crimson-500 dark:text-cream-100 transition-colors placeholder-gray-400
//     dark:placeholder-cream-200/30`

//   return (
//     <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-20">
//       {/* Header */}
//       <div className="bg-crimson-800 py-20 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10"
//           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)`, backgroundSize: '28px 28px' }}
//         />
//         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
//           <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-bold font-body">Get in Touch</span>
//           <h1 className="font-display text-5xl md:text-6xl text-cream-100 font-bold mt-2">Contact Us</h1>
//           <p className="font-bangla text-gold-300 text-2xl mt-1">যোগাযোগ করুন</p>
//           <div className="w-24 h-0.5 bg-gold-500 mx-auto mt-4" />
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-16">
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
//           {/* Contact info */}
//           <div className="lg:col-span-2 space-y-8">
//             <div>
//               <h2 className="font-display text-3xl font-bold text-crimson-700 dark:text-gold-400">Let's Talk</h2>
//               <div className="w-12 h-0.5 bg-gold-500 mt-3 mb-5" />
//               <p className="text-gray-600 dark:text-cream-200/70 text-sm leading-relaxed">
//                 Have a question, want to make a reservation, or just want to say hello?
//                 We'd love to hear from you.
//               </p>
//               <p className="font-bangla text-gray-400 dark:text-cream-200/40 text-sm mt-2">
//                 আমাদের সাথে যোগাযোগ করুন।
//               </p>
//             </div>

//             <div className="space-y-5">
//               {[
//                 { icon: Phone, label: 'Phone', value: '+880 1700-000000', href: 'tel:+8801700000000' },
//                 { icon: Mail, label: 'Email', value: 'hello@creamandcrust.com', href: 'mailto:hello@creamandcrust.com' },
//                 { icon: MapPin, label: 'Address', value: 'House 12, Road 5, Bashundhara R/A, Dhaka', href: '#' },
//               ].map(({ icon: Icon, label, value, href }) => (
//                 <a key={label} href={href}
//                   className="flex items-start gap-4 group">
//                   <div className="w-11 h-11 bg-crimson-600/10 dark:bg-crimson-600/20 flex items-center justify-center flex-shrink-0
//                     group-hover:bg-crimson-600 transition-colors">
//                     <Icon size={18} className="text-crimson-600 dark:text-gold-400 group-hover:text-white transition-colors" />
//                   </div>
//                   <div>
//                     <div className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-cream-200/40">{label}</div>
//                     <div className="text-sm text-gray-700 dark:text-cream-100 group-hover:text-crimson-600 dark:group-hover:text-gold-400 transition-colors mt-0.5">
//                       {value}
//                     </div>
//                   </div>
//                 </a>
//               ))}
//             </div>

//             {/* Socials */}
//             <div>
//               <h3 className="font-body text-xs font-bold tracking-[0.3em] uppercase text-gray-400 dark:text-cream-200/40 mb-4">
//                 Follow Us
//               </h3>
//               <div className="flex gap-3">
//                 {[
//                   { icon: Facebook, href: '#', label: 'Facebook' },
//                   { icon: Instagram, href: '#', label: 'Instagram' },
//                   { icon: Youtube, href: '#', label: 'YouTube' },
//                 ].map(({ icon: Icon, href, label }) => (
//                   <a key={label} href={href} aria-label={label}
//                     className="w-10 h-10 border-2 border-crimson-200 dark:border-white/20 flex items-center justify-center
//                       text-crimson-600 dark:text-cream-200 hover:bg-crimson-600 hover:border-crimson-600 hover:text-white
//                       dark:hover:bg-gold-500 dark:hover:border-gold-500 dark:hover:text-white
//                       transition-all duration-300">
//                     <Icon size={16} />
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Form */}
//           <div className="lg:col-span-3">
//             <div className="bg-white dark:bg-crimson-800/30 border border-cream-200 dark:border-white/10 p-8 shadow-xl">
//               <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-cream-100 mb-6">Send a Message</h3>
//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">
//                       Your Name *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={form.name}
//                       onChange={e => setForm({ ...form, name: e.target.value })}
//                       placeholder="Rafiq Ahmed"
//                       className={inputCls}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       required
//                       value={form.email}
//                       onChange={e => setForm({ ...form, email: e.target.value })}
//                       placeholder="you@example.com"
//                       className={inputCls}
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">
//                       Phone (Optional)
//                     </label>
//                     <input
//                       type="tel"
//                       value={form.phone}
//                       onChange={e => setForm({ ...form, phone: e.target.value })}
//                       placeholder="+880 1xxx-xxxxxx"
//                       className={inputCls}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">
//                       Subject *
//                     </label>
//                     <select
//                       required
//                       value={form.subject}
//                       onChange={e => setForm({ ...form, subject: e.target.value })}
//                       className={inputCls}
//                     >
//                       <option value="">Select subject</option>
//                       <option>Reservation</option>
//                       <option>Feedback</option>
//                       <option>Catering Inquiry</option>
//                       <option>Special Event</option>
//                       <option>Other</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">
//                     Message *
//                   </label>
//                   <textarea
//                     required
//                     rows={5}
//                     value={form.message}
//                     onChange={e => setForm({ ...form, message: e.target.value })}
//                     placeholder="Write your message here..."
//                     className={`${inputCls} resize-none`}
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={sending}
//                   className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   {sending ? (
//                     <>
//                       <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send size={16} />
//                       Send Message
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }

import React, { useState } from 'react'
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
} from 'lucide-react'

// ✅ Change this to your actual WhatsApp number (no + or spaces)
const WHATSAPP_NUMBER = '8801972205213'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    // Build the message text
    const text = [
      `*New Message from Website*`,
      ``,
      `*Name:* ${form.name}`,
      `*Email:* ${form.email}`,
      form.phone ? `*Phone:* ${form.phone}` : null,
      `*Subject:* ${form.subject}`,
      ``,
      `*Message:*`,
      form.message,
    ]
      .filter((line) => line !== null)
      .join('\n')

    const encoded = encodeURIComponent(text)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`

    // Auto-open WhatsApp with the pre-filled message
    window.open(whatsappUrl, '_blank')

    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    setSending(false)
  }

  const inputCls = `w-full border-2 border-cream-200 dark:border-white/20 bg-white dark:bg-dark-bg px-4 py-3 text-sm
    focus:outline-none focus:border-crimson-500 dark:text-cream-100 transition-colors placeholder-gray-400
    dark:placeholder-cream-200/30`

  return (
    <main className="min-h-screen bg-cream-50 dark:bg-dark-bg pt-20">
      {/* Header */}
      <div className="bg-crimson-800 py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-bold font-body">
            Get in Touch
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-cream-100 font-bold mt-2">
            Contact Us
          </h1>
          <p className="font-bangla text-gold-300 text-2xl mt-1">
            যোগাযোগ করুন
          </p>
          <div className="w-24 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-crimson-700 dark:text-gold-400">
                Let's Talk
              </h2>
              <div className="w-12 h-0.5 bg-gold-500 mt-3 mb-5" />
              <p className="text-gray-600 dark:text-cream-200/70 text-sm leading-relaxed">
                Have a question, want to make a reservation, or just want to say
                hello? We'd love to hear from you.
              </p>
              <p className="font-bangla text-gray-400 dark:text-cream-200/40 text-sm mt-2">
                আমাদের সাথে যোগাযোগ করুন।
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+880 1972-205213',
                  href: 'tel:+8801972205213',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'cream&crust@admin.com',
                  href: 'mailto:cream&crust@admin.com',
                },
                {
                  icon: MapPin,
                  label: 'Address',
                  value: '99,Motijheel Commercial Area C/A, Dhaka',
                  href: '#',
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-4 group"
                >
                  <div
                    className="w-11 h-11 bg-crimson-600/10 dark:bg-crimson-600/20 flex items-center justify-center flex-shrink-0
                    group-hover:bg-crimson-600 transition-colors"
                  >
                    <Icon
                      size={18}
                      className="text-crimson-600 dark:text-gold-400 group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-cream-200/40">
                      {label}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-cream-100 group-hover:text-crimson-600 dark:group-hover:text-gold-400 transition-colors mt-0.5">
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-body text-xs font-bold tracking-[0.3em] uppercase text-gray-400 dark:text-cream-200/40 mb-4">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Youtube, href: '#', label: 'YouTube' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 border-2 border-crimson-200 dark:border-white/20 flex items-center justify-center
                      text-crimson-600 dark:text-cream-200 hover:bg-crimson-600 hover:border-crimson-600 hover:text-white
                      dark:hover:bg-gold-500 dark:hover:border-gold-500 dark:hover:text-white transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-crimson-800/30 border border-cream-200 dark:border-white/10 p-8 shadow-xl">
              <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-cream-100 mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-gray-400 dark:text-cream-200/40 mb-6">
                Your message will open in WhatsApp — just tap Send.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Rafiq Ahmed"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="cream&crust@admin.com"
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+880 1972-205213"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className={inputCls}
                    >
                      <option value="">Select subject</option>
                      <option>Reservation</option>
                      <option>Feedback</option>
                      <option>Catering Inquiry</option>
                      <option>Special Event</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-cream-200/50 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Write your message here..."
                    className={`${inputCls} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6
                    bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm tracking-wider uppercase
                    transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      {/* WhatsApp icon SVG */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Send via WhatsApp
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
