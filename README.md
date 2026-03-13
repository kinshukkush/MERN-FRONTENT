<div align="center">

<!-- Animated Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=MERN%20STORE&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=C0C0D0&desc=Premium%20E-Commerce%20Frontend&descAlignY=60&descSize=22" width="100%"/>

</div>

<div align="center">

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://mern-frontent-main.vercel.app/)

<br/>

**🔗 Live Demo:** [mern-frontent-main.vercel.app](https://mern-frontent-main.vercel.app/)  &nbsp;|&nbsp;  **📦 Backend:** [mern-backend-main-zeta.vercel.app](https://mern-backend-main-zeta.vercel.app/)

<br/>

> *"Crafted for those who demand the finest."*

<br/>

</div>

---

## ⚡ About the Project

**MERN Store** is a full-stack e-commerce platform rebuilt with a **Metalastic UI** — a premium design language that blends brushed steel textures, anodized aluminum surfaces, and liquid chrome gradients. Every interaction is physics-inspired: buttons have micro-press feedback, cards use magnetic hover, and transitions are spring-eased.

```
Apple Vision Pro aesthetics × Luxury E-Commerce functionality
```

---

## 🎨 Design System — Metalastic UI

<details>
<summary><b>🖌️ Color Palette (click to expand)</b></summary>

<br/>

| Token | Value | Usage |
|-------|-------|-------|
| `--color-obsidian` | `#0A0A0F` | Base background |
| `--color-steel` | `#8A8A9A` | Secondary text, borders |
| `--color-steel-light` | `#C0C0D0` | Primary text |
| `--color-copper` | `#B87333` | Accent, CTA buttons |
| `--color-gold` | `#D4AF37` | Price tags, highlights |
| `--color-chrome` | `#E8E8F0` | Headings |

</details>

<details>
<summary><b>🔤 Typography</b></summary>

<br/>

| Font | Usage | Weight |
|------|-------|--------|
| **Bebas Neue** | Display headings | 400 |
| **Chakra Petch** | Sub-headings, buttons | 300–700 |
| **DM Sans** | Body, labels, paragraphs | 300–600 |
| **Outfit** | UI elements, badges | 300–700 |

All loaded via Google Fonts with `display=swap` for zero CLS.

</details>

<details>
<summary><b>✨ Animations & Micro-interactions</b></summary>

<br/>

| Interaction | Effect |
|-------------|--------|
| Page load | `scaleFade` — scale(0.93→1) + opacity(0→1), 300ms |
| Button hover | `translateY(-1px)` + brightness boost |
| Button click | `scale(0.97)` — tactile press |
| Input focus | Copper glow ring: `box-shadow: 0 0 0 2px #B87333` |
| Card hover | `translateY(-6px)` + copper aura shadow |
| Cart badge | `bounceCart` keyframe on item add |
| Toast | `slideInRight` with spring easing |
| Page transition | `scaleFade` on route change |
| Stats counter | `useCountUp` hook with eased number animation |
| Skeleton | Metallic shimmer sweep, 1.8s loop |
| Sidebar | Smooth width collapse: 56px ↔ 224px |
| Header | Glass blur intensifies on scroll |
| Nav links | Copper underline slides from left on hover/active |

</details>

---

## 🏗️ Architecture

```
src/
├── components/          # 13 fully-rebuilt components
│   ├── Login.jsx        # Split layout · JWT auth · shake error
│   ├── Register.jsx     # Validation · password strength meter
│   ├── Header.jsx       # Glassmorphism Nav · cart badge · dropdown
│   ├── Footer.jsx       # 4-col metallic grid · social icons
│   ├── Product.jsx      # Catalog · search · filter · sort · pagination
│   ├── Cart.jsx         # Qty controls · promo codes · order placement
│   ├── Order.jsx        # Order history · stepper · expandable details
│   ├── Profile.jsx      # Editable info · address · change password
│   ├── about.jsx        # CountUp stats · team cards · tech stack
│   ├── Admin.jsx        # Sidebar layout + Dashboard (count-up stats)
│   ├── Products.jsx     # Admin CRUD: table + add/edit modal + delete
│   ├── Users.jsx        # Admin: role toggle · delete · search
│   ├── Orders.jsx       # Admin: inline status update · filter · search
│   └── ProtectedRoute.jsx
│
├── context/
│   ├── AuthContext.jsx  # JWT user state + logout
│   ├── CartContext.jsx  # Cart operations + computed totals
│   └── ToastContext.jsx # Custom toast system (no library)
│
├── utils/
│   └── api.js           # Axios instance + auto-auth interceptor + 401 redirect
│
├── App.jsx              # Router + all providers + protected routes
├── main.jsx
└── index.css            # Full metalastic design system (CSS vars + components)
```

---

## 🛣️ Routes

| Path | Component | Auth Required | Admin Only |
|------|-----------|:---:|:---:|
| `/` | Product | — | — |
| `/product` | Product | — | — |
| `/login` | Login | — | — |
| `/register` | Register | — | — |
| `/about` | About | — | — |
| `/cart` | Cart | ✅ | — |
| `/order` | Order | ✅ | — |
| `/profile` | Profile | ✅ | — |
| `/admin` | AdminDashboard | ✅ | ✅ |
| `/admin/users` | Users | ✅ | ✅ |
| `/admin/products` | Products | ✅ | ✅ |
| `/admin/orders` | Orders | ✅ | ✅ |

---

## 🔐 State Management

| Concern | Solution |
|---------|---------|
| Authentication | `AuthContext` — user, token, role, logout |
| Shopping cart | `CartContext` — add, remove, updateQty, clearCart |
| Notifications | `ToastContext` — success/error/info, 3.5s auto-dismiss |
| API calls | `api.js` (Axios) — auto `Authorization: Bearer <token>` header |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Backend API running (see backend README)

### Installation

```bash
# Clone the repository
git clone https://github.com/kinshukkush/MERN-FRONTENT.git
cd MERN-FRONTENT

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

```env
# .env
VITE_API_URL=http://localhost:8080
```

### Development

```bash
npm run dev
# Starts on http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 🛒 Features

### User Features
- ✅ Register / Login with JWT authentication
- ✅ Browse products with search, category filter, and sort
- ✅ Add to cart with real-time quantity management
- ✅ Apply promo codes: `SAVE10`, `METAL20`, `FIRST50`
- ✅ Place orders with delivery charge calculation
- ✅ View order history with expandable details & status stepper
- ✅ Edit profile: name, phone, address
- ✅ Change password securely

### Admin Features
- ✅ Dashboard with animated count-up stat cards
- ✅ Products: add, edit (pre-filled modal), delete with confirmation
- ✅ Users: search, role toggle (user ↔ admin), delete
- ✅ Orders: inline status update, search/filter, delete
- ✅ Collapsible sidebar navigation
- ✅ Recent orders table on dashboard

---

## 🧩 Component Gallery

| Component | Key Features |
|-----------|-------------|
| **Login** | Split layout, animated brand panel, shake on error, show/hide password, forgot password modal |
| **Register** | Real-time validation, 4-tier password strength meter, feature list panel |
| **Header** | Scroll-aware glass blur, animated cart badge bounce, active copper underline, mobile drawer |
| **Product** | 4-column grid, debounced search, category tabs, price sort, skeleton loader, pagination |
| **Cart** | Quantity +/−, promo code REPL, free delivery threshold, order summary breakdown |
| **Order** | 4-step progress stepper (Pending→Shipped→In Transit→Delivered), expandable line items |
| **Profile** | Account stats, full address form, inline save, dedicated password change section |
| **Admin** | Count-up stat cards, collapsible sidebar, recent orders table, quick action cards |

---

## 🎭 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.0 | UI framework |
| Vite | 7.0 | Build tool + dev server |
| TailwindCSS | 3.4 | Utility-first styling |
| React Router | 7.6 | Client-side routing |
| Axios | 1.10 | HTTP client |
| Google Fonts | — | Bebas Neue · Chakra Petch · DM Sans |

---

## 📄 License

MIT © [Kinshuk](https://github.com/kinshukkush)

---

## 👨‍💻 Developer

<div align="center">

### **Kinshuk Saxena**

Full Stack Developer | React Native Enthusiast | Music Lover

[![GitHub](https://img.shields.io/badge/GitHub-kinshukkush-181717?style=for-the-badge&logo=github)](https://github.com/kinshukkush)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-kinshuk--saxena-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/kinshuk-saxena-/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit_Website-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://portfolio-frontend-mu-snowy.vercel.app/)
[![Email](https://img.shields.io/badge/Email-kinshuksaxena3%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kinshuksaxena3@gmail.com)
[![Phone](https://img.shields.io/badge/Phone-%2B91%209057538521-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](tel:+919057538521)

</div>

---

<div align="center">

**Made with ❤️ and 🎵 by Kinshuk Saxena**

⭐ Star this repo if you like it!

</div>

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

</div>
