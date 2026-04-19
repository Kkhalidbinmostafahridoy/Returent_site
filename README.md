# 🍛 Cream & Crust (C&C) — Authentic Bengali Restaurant Website

A premium, fully responsive restaurant website for **Cream & Crust**, a Bengali food brand based in Dhaka, Bangladesh.

---

## 🌟 Features

- **Full Guest Access** — Browse menu, view cart, explore all pages without login
- **Bilingual UI** — English + বাংলা (Bengali) throughout
- **Dynamic Menu** — Category filter, search bar, veg toggle, quick-view modal
- **Guest Cart** — `localStorage`-powered cart (add/remove/update quantity)
- **Dark / Light Mode** — Toggle with preference saved in localStorage
- **Optional Auth** — JWT login/register pages (only protects checkout)
- **6 Pages** — Home, Menu, Cart, About, Location, Contact
- **Toast Notifications** — Feedback for every cart action
- **Skeleton Loaders** — Smooth loading states
- **Mobile-First** — Fully responsive down to 320px
- **SEO Meta Tags** — Open Graph and meta description included

---

## 🏗️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Animations | CSS + Framer-ready |
| Toast | react-hot-toast |
| Icons | lucide-react |
| Fonts | Cormorant Garamond + Lato + Hind Siliguri |

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Hero, Featured, Heritage, Offers, Testimonials
│   └── ui/           # FoodCard, QuickViewModal, Skeleton
├── context/          # ThemeContext, CartContext, AuthContext
├── data/             # menuData.js (all menu items + categories)
├── hooks/            # useScrollReveal, useDebounce, useLocalStorage, useWindowSize
├── pages/            # Home, Menu, Cart, About, Location, Contact, Login, Register, NotFound
├── services/api/     # API service layer (ready for backend)
└── utils/            # formatPrice, truncate, sortItems, groupByCategory
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

The app runs at **http://localhost:5173**

---

## 🔐 Authentication

Auth is **optional** — guests can browse everything without login.

- Login/Register pages use a **mock JWT** for demo purposes
- Replace `src/services/api/index.js` with your real API endpoints
- Set `VITE_API_URL=https://your-api.com/v1` in `.env`

---

## 🎨 Design Tokens

| Token | Value |
|---|---|
| Cream | `#FFF5E1` |
| Deep Red | `#8B0000` |
| Gold | `#B8860B` |
| Dark BG | `#1a0a0a` |
| Display Font | Cormorant Garamond |
| Body Font | Lato |
| Bengali Font | Hind Siliguri |

---

## 📦 Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=https://api.creamandcrust.com/v1
```

---

## 🗺️ Pages Overview

| Page | Path | Auth Required |
|---|---|---|
| Home | `/` | No |
| Menu | `/menu` | No |
| Cart | `/cart` | No (checkout needs login) |
| About | `/about` | No |
| Location | `/location` | No |
| Contact | `/contact` | No |
| Login | `/login` | No |
| Register | `/register` | No |

---

## 📝 Notes

- Menu items are in `src/data/menuData.js` — replace with API calls when backend is ready
- Google Maps embed in Location page uses Bashundhara R/A coordinates — update with exact address
- Cart persists in `localStorage` as `cc-cart`

---

*Built with ❤️ for authentic Bengali food lovers*
