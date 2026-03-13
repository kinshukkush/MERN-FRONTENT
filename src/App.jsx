import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Order from "./components/Order";
import Profile from "./components/Profile";
import About from "./components/about";
import Admin, { AdminDashboard } from "./components/Admin";
import Products from "./components/Products";
import Users from "./components/Users";
import Orders from "./components/Orders";

function ConditionalLayout() {
  const location = useLocation();
  const hideLayout = ["/login", "/register"].includes(location.pathname);
  return hideLayout ? null : <Header />;
}

function ConditionalFooter() {
  const location = useLocation();
  const hideFooter = ["/login", "/register"].includes(location.pathname);
  return hideFooter ? null : <Footer />;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-obsidian font-body">
              <ConditionalLayout />
              <main className="flex-1">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Product />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<About />} />

                  {/* Protected user routes */}
                  <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                  <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                  {/* Admin routes */}
                  <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                  </Route>
                </Routes>
              </main>
              <ConditionalFooter />
            </div>
          </BrowserRouter>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;