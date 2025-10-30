# 🍵 MERN Cafe - Full Stack E-Commerce Application

A modern, full-featured e-commerce cafe application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a beautiful dark theme UI with animated components.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![React](https://img.shields.io/badge/Frontend-React%2019-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![License](https://img.shields.io/badge/License-ISC-blue)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Database Configuration](#-database-configuration)
- [User Roles](#-user-roles)
- [Design Features](#-design-features)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Customer Features
- 🛍️ Browse products with beautiful card layouts
- 🛒 Shopping cart with real-time updates
- 📦 Order placement and tracking
- 👤 User profile management
- 🔐 Secure authentication (JWT)
- 🎨 Animated dark theme UI
- 📱 Fully responsive design
- 🔍 Product search functionality

### Admin Features
- 👥 User management
- 📦 Product management (CRUD operations)
- 📊 Order management
- 📈 Dashboard with statistics
- 🔒 Role-based access control

### UI/UX Features
- 🌙 Permanent dark mode theme
- ✨ Animated login page with floating elements
- 🎭 Glassmorphism design elements
- 🎬 Smooth transitions and hover effects
- 💫 Interactive components with ripple effects
- 📐 Clean and modern layout
- 🎨 Consistent color scheme throughout

## 🛠 Tech Stack

### Frontend
- **React 19.1.0** - UI library
- **Vite 7.0.3** - Build tool and dev server
- **React Router DOM 7.6.3** - Client-side routing
- **Axios 1.10.0** - HTTP client
- **Lucide React 0.525.0** - Icon library
- **CSS3** - Styling with animations

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose 8.16.1** - ODM for MongoDB
- **JWT (jsonwebtoken 9.0.2)** - Authentication
- **Bcrypt 6.0.0** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing
- **Dotenv 17.1.0** - Environment variables

## 📁 Project Structure

```
project-bolt-github-7y9rshtz/
│
├── mern-backend-main/          # Backend application
│   ├── controllers/            # Route controllers
│   │   ├── userController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── models/                 # Mongoose models
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   └── orderModel.js
│   ├── routes/                 # API routes
│   │   ├── userRoute.js
│   │   ├── productRoute.js
│   │   └── orderRoute.js
│   ├── middlewares/            # Custom middlewares
│   │   └── auth.js            # JWT authentication
│   ├── public/                 # Static files
│   │   └── images/
│   ├── server.js              # Main server file
│   ├── package.json
│   └── .env                   # Environment variables
│
└── project/                    # Frontend application
    ├── src/
    │   ├── components/         # React components
    │   │   ├── Header.jsx     # Navigation header
    │   │   ├── Footer.jsx     # Footer component
    │   │   ├── Login.jsx      # Animated login page
    │   │   ├── Register.jsx   # User registration
    │   │   ├── Product.jsx    # Product listing
    │   │   ├── Products.jsx   # Admin product management
    │   │   ├── Cart.jsx       # Shopping cart
    │   │   ├── Order.jsx      # Order history
    │   │   ├── Orders.jsx     # Admin order management
    │   │   ├── Profile.jsx    # User profile
    │   │   ├── Admin.jsx      # Admin dashboard
    │   │   └── Users.jsx      # Admin user management
    │   ├── contexts/
    │   │   └── ThemeContext.jsx
    │   ├── assets/
    │   ├── App.jsx            # Main app component
    │   ├── main.jsx           # Entry point
    │   ├── App.css
    │   └── index.css
    ├── public/
    │   └── images/
    ├── package.json
    ├── vite.config.js
    └── .env                   # Environment variables
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended)

## 🚀 Installation

### 1. Backend Setup

#### Step 1: Navigate to Backend Directory
```bash
cd project-bolt-github-7y9rshtz/mern-backend-main
```

#### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- bcrypt
- cors
- dotenv
- jsonwebtoken
- nodemon

#### Step 3: Create Environment File
Create a `.env` file in the `mern-backend-main` directory:

```bash
# Create .env file
touch .env  # On Windows: type nul > .env
```

#### Step 4: Configure Environment Variables
Add the following to your `.env` file:

```env
# MongoDB Configuration
DBUSER=kinshuksaxena3
DBPASS=LLWVgq40UPACWiRy
MONGODB_URI=mongodb+srv://kinshuksaxena3:LLWVgq40UPACWiRy@kinshuk.tizneb5.mongodb.net/merncafe?retryWrites=true&w=majority&appName=kinshuk

# Server Configuration
PORT=8080

# JWT Secret (change this to your own secret key)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

#### Step 5: Start the Backend Server
```bash
# Using nodemon (recommended for development)
nodemon server.js

# OR using node directly
node server.js
```

You should see:
```
✅ MongoDB connected successfully!
📊 Database: merncafe
🚀 Server running at http://localhost:8080
```

### 2. Frontend Setup

#### Step 1: Navigate to Frontend Directory
```bash
cd ../project
```

#### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- react & react-dom
- react-router-dom
- axios
- lucide-react
- vite
- eslint and related plugins

#### Step 3: Create Environment File
Create a `.env` file in the `project` directory:

```bash
# Create .env file
touch .env  # On Windows: type nul > .env
```

#### Step 4: Configure Environment Variables
Add the following to your `.env` file:

```env
# Backend API URL
VITE_API_URL=http://localhost:8080
```

#### Step 5: Start the Frontend Development Server
```bash
npm run dev
```

You should see:
```
  VITE v7.0.3  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Note:** If port 5173 is already in use, Vite will automatically use the next available port (e.g., 5174).

## 🔐 Environment Variables

### Backend (.env in mern-backend-main/)
| Variable | Description | Example |
|----------|-------------|---------|
| `DBUSER` | MongoDB Atlas username | `kinshuksaxena3` |
| `DBPASS` | MongoDB Atlas password | `LLWVgq40UPACWiRy` |
| `MONGODB_URI` | Full MongoDB connection string | `mongodb+srv://...` |
| `PORT` | Backend server port | `8080` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key` |

### Frontend (.env in project/)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080` |

## 🎮 Running the Application

### Development Mode

1. **Start Backend Server** (Terminal 1):
```bash
cd mern-backend-main
nodemon server.js
```

2. **Start Frontend Server** (Terminal 2):
```bash
cd project
npm run dev
```

3. **Access the Application**:
   - Frontend: `http://localhost:5173` (or the port shown in terminal)
   - Backend: `http://localhost:8080`

### Production Build

#### Build Frontend
```bash
cd project
npm run build
```

This creates an optimized production build in the `dist/` folder.

#### Preview Production Build
```bash
npm run preview
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:8080/api
```

### User Routes (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| GET | `/profile` | Get user profile | Yes |
| PATCH | `/:id/profile` | Update user profile | Yes |
| GET | `/all` | Get all users (Admin) | Yes (Admin) |
| PATCH | `/:id/role` | Update user role (Admin) | Yes (Admin) |
| DELETE | `/:id` | Delete user (Admin) | Yes (Admin) |

### Product Routes (`/api/products`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all products | No |
| GET | `/:id` | Get single product | No |
| POST | `/` | Create product (Admin) | Yes (Admin) |
| PATCH | `/:id` | Update product (Admin) | Yes (Admin) |
| DELETE | `/:id` | Delete product (Admin) | Yes (Admin) |

### Order Routes (`/api/orders`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user orders | Yes |
| GET | `/all` | Get all orders (Admin) | Yes (Admin) |
| POST | `/` | Create new order | Yes |
| PATCH | `/:id` | Update order status (Admin) | Yes (Admin) |
| DELETE | `/:id` | Delete order (Admin) | Yes (Admin) |

### Request Headers
For authenticated routes, include:
```json
{
  "Authorization": "Bearer <your_jwt_token>"
}
```

## 🗄 Database Configuration

### MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Choose "Free Shared Cluster"
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Grant "Read and Write" privileges

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add your specific IP address

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Add database name: `/merncafe`

### Database Schema

#### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: "user"), // "user" or "admin"
  createdAt: Date
}
```

#### Product Model
```javascript
{
  name: String (required),
  description: String,
  price: Number (required),
  category: String,
  image: String,
  stock: Number (default: 0),
  createdAt: Date
}
```

#### Order Model
```javascript
{
  user: ObjectId (ref: "User"),
  items: [{
    product: ObjectId (ref: "Product"),
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String (default: "pending"),
  shippingAddress: Object,
  createdAt: Date
}
```

## 👥 User Roles

### Default Admin Account
```
Email: demo@example.com
Password: demo123
Role: admin
```

### User Permissions
- **User Role**: Can browse products, add to cart, place orders, view own orders
- **Admin Role**: All user permissions + manage users, products, and all orders

### Upgrade User to Admin
Use the backend API:
```bash
PATCH http://localhost:8080/api/users/:userId/role
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "role": "admin"
}
```

## 🎨 Design Features

### Color Scheme (Dark Theme)
```css
Background Primary: #0f172a
Background Secondary: #1e293b
Background Tertiary: #334155
Text Primary: #f1f5f9
Text Secondary: #cbd5e1
Border: #334155
Primary Accent: #3b82f6 (Blue)
Secondary Accent: #8b5cf6 (Purple)
Success: #10b981
Error: #ef4444
Warning: #f59e0b
```

### Animations
- **Float Animation**: Floating circles on login page
- **Fade In**: Smooth content loading
- **Slide In**: Elements sliding from sides
- **Pulse**: Attention-grabbing effects
- **Ripple**: Button click effects
- **Grid Move**: Animated background patterns

### Key UI Components
1. **Animated Login Page**: Floating elements, moving lines, glassmorphism
2. **Header**: Fixed navigation with user menu and cart
3. **Product Cards**: Hover effects with smooth transitions
4. **Shopping Cart**: Real-time updates with animations
5. **Profile Page**: Modern gradient design with glassmorphism
6. **Admin Dashboard**: Clean tabular data with action buttons
7. **Footer**: Newsletter section (hidden on auth pages)

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: 
- Check MongoDB URI in `.env`
- Verify network access in MongoDB Atlas
- Ensure credentials are correct

#### 2. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::8080
```
**Solution**:
```bash
# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess | Stop-Process

# macOS/Linux
lsof -ti:8080 | xargs kill -9
```

#### 3. CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: 
- Ensure backend CORS is configured
- Check `VITE_API_URL` in frontend `.env`
- Verify backend is running

#### 4. JWT Token Expired
```
Error: Token expired
```
**Solution**: 
- Tokens expire after 1 hour
- Log in again to get a new token
- Clear localStorage: `localStorage.clear()`

#### 5. Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 6. Vite Build Errors
```
Error: Build failed
```
**Solution**:
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Debug Mode

Enable detailed logging:

**Backend** (server.js):
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

**Frontend** (main.jsx):
```javascript
console.log('API URL:', import.meta.env.VITE_API_URL);
```

## 📝 Additional Commands

### Backend
```bash
# Install dependencies
npm install

# Run server with nodemon (auto-reload)
nodemon server.js

# Run server with node
node server.js

# Check Node version
node --version

# Check npm version
npm --version
```

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🔒 Security Best Practices

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Use strong JWT secrets** - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. **Hash passwords** - Already implemented with bcrypt
4. **Validate user input** - Add validation middleware
5. **Rate limiting** - Consider adding express-rate-limit
6. **HTTPS in production** - Always use HTTPS in production
7. **Update dependencies** - Regularly update packages

## 📦 Deployment

### Backend Deployment (Example: Heroku)
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

### Frontend Deployment (Example: Vercel)
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Kinshuk Saxena**
- Email: kinshuksaxena3@gmail.com
- GitHub: [@kinshukkush](https://github.com/kinshukkush)

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the blazing-fast build tool
- MongoDB team for the excellent database
- Lucide React for beautiful icons
- All contributors and supporters

## 📞 Support

If you have any questions or need help, please:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an issue on GitHub
3. Contact via email: kinshuksaxena3@gmail.com

---

## 🚀 Quick Start Summary

```bash
# 1. Clone the repository
git clone <repository-url>
cd project-bolt-github-7y9rshtz

# 2. Setup Backend
cd mern-backend-main
npm install
# Create .env file with MongoDB credentials
nodemon server.js

# 3. Setup Frontend (in new terminal)
cd ../project
npm install
# Create .env file with VITE_API_URL=http://localhost:8080
npm run dev

# 4. Access application
# Frontend: http://localhost:5173
# Backend: http://localhost:8080

# 5. Login with demo account
# Email: demo@example.com
# Password: demo123
```

---

**Happy Coding! 🎉**

Made with ❤️ using MERN Stack
