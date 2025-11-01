# 🛍️ MERN Store - Frontend

A modern, full-featured e-commerce platform built with React 19, featuring a beautiful dark theme UI, shopping cart, order management, and admin panel.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/Frontend-React%2019-blue)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### Customer Features
- 🛍️ Browse products with beautiful card layouts
- 🔍 Search and filter products
- 🛒 Shopping cart with real-time updates
- 💳 Promo code support
- 📦 Order placement and tracking
- 👤 User profile management
- 💱 Indian Rupee (₹) currency support
- 🔐 Secure authentication (JWT)

### Admin Features
- 👥 User management
- 📦 Product management (Add, Edit, Delete)
- 📊 Order management with status updates
- 🔄 Order workflow: Pending → Shipped → In Transit → Delivered
- 📈 Dashboard with statistics

### UI/UX Features
- 🌙 Beautiful dark theme
- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- 🎨 Modern, clean interface
- ℹ️ About page with company information

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library
- **Context API** - State management

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend repository)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kinshukkush/mern-frontend-main.git
cd mern-frontend-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# For local development
VITE_API_URL=http://localhost:8080

# For production (update with your backend URL)
# VITE_API_URL=https://your-backend-url.vercel.app
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at: `http://localhost:5174`

### 5. Build for Production

```bash
npm run build
```

The production build will be created in the `dist/` folder.

### 6. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── About.jsx        # About page
│   ├── Admin.jsx        # Admin panel
│   ├── Cart.jsx         # Shopping cart
│   ├── Footer.jsx       # Footer component
│   ├── Header.jsx       # Navigation header
│   ├── Login.jsx        # Login page
│   ├── Order.jsx        # Order details
│   ├── Orders.jsx       # Admin orders management
│   ├── Product.jsx      # Product catalog
│   ├── Products.jsx     # Admin product management
│   ├── Profile.jsx      # User profile
│   ├── Register.jsx     # Registration page
│   └── Users.jsx        # Admin user management
├── contexts/            # React contexts
│   └── ThemeContext.jsx # Theme context
├── App.jsx             # Main app component
├── main.jsx            # Entry point
├── App.css             # App styles
└── index.css           # Global styles
```

## 🌐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8080` |

**Note:** For production deployment, set this in your Vercel dashboard.

## 🎮 Running the Full Application

1. **Start the Backend Server** (see backend repository)
2. **Start the Frontend** (this repository)
3. **Access the Application** at `http://localhost:5174`

### Default Admin Account (for testing)
```
Email: demo@example.com
Password: demo123
```

## 🚀 Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variable: `VITE_API_URL` to your backend URL
4. Deploy

**Live Demo:** [https://mern-frontent-main.vercel.app/](https://mern-frontent-main.vercel.app/)

## 🔗 Related Repositories

- **Backend API:** [https://github.com/kinshukkush/mern-backend-main](https://github.com/kinshukkush/mern-backend-main)
- **Backend Live:** [https://mern-backend-main-zeta.vercel.app/](https://mern-backend-main-zeta.vercel.app/)

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Kinshuk Saxena**
- GitHub: [@kinshukkush](https://github.com/kinshukkush)
- Frontend Repository: [mern-frontend-main](https://github.com/kinshukkush/mern-frontend-main)
- Backend Repository: [mern-backend-main](https://github.com/kinshukkush/mern-backend-main)

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the blazing-fast build tool
- Lucide React for beautiful icons

---

**Made with ❤️ using React and MERN Stack**

