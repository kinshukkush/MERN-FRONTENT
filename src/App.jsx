import { useState, createContext, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Register from "./components/Register";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Order from "./components/Order";
import Admin from "./components/Admin";
import Users from "./components/Users";
import Orders from "./components/Orders";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Products from "./components/Products";
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import "./App.css";

export const AppContext = createContext();

// Component to conditionally render Footer
function ConditionalFooter() {
  const location = useLocation();
  const hideFooterPaths = ['/login', '/register'];
  
  if (hideFooterPaths.includes(location.pathname)) {
    return null;
  }
  
  return <Footer />;
}

function App() {
  // Initialize cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {};
  });

  // Force dark mode - always enabled
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user && user.token) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Apply dark mode class to body (always enabled)
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark-mode');
    // Clean up old dark mode preference
    localStorage.removeItem('darkMode');
  }, []);

  const contextValue = {
    cart,
    setCart,
    user,
    setUser,
    isDarkMode,
    setIsDarkMode
  };

  return (
    <div className="App-Container dark">
      <AppContext.Provider value={contextValue}>
        <BrowserRouter>
          <Header />
          <main className="main-content">
            <Routes>
              <Route index element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
              <Route path="register" element={<Register />} />
              <Route path="cart" element={<Cart />} />
              <Route path="order" element={<Order />} />
              <Route path="admin" element={<Admin />}>
                <Route index element={<Users />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Routes>
          </main>
          <ConditionalFooter />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;