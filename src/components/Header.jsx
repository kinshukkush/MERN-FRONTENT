import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { user, isAdmin, isLoggedIn, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bounce animation when cart changes
  useEffect(() => {
    if (itemCount > 0) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 700);
    }
  }, [itemCount]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `copper-underline text-sm font-body font-medium transition-colors px-1 py-0.5 ${isActive ? "text-copper active" : "text-steel-light hover:text-chrome"}`;

  const userNavLinks = (
    <>
      <NavLink to="/product" className={navClass}>Products</NavLink>
      <NavLink to="/order" className={navClass}>Orders</NavLink>
      <NavLink to="/about" className={navClass}>About</NavLink>
    </>
  );

  const adminNavLinks = (
    <>
      <NavLink to="/admin" className={navClass} end>Dashboard</NavLink>
      <NavLink to="/admin/products" className={navClass}>Products</NavLink>
      <NavLink to="/admin/orders" className={navClass}>Orders</NavLink>
      <NavLink to="/about" className={navClass}>About</NavLink>
    </>
  );

  return (
    <>
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,10,15,0.92)" : "rgba(10,10,15,0.7)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          borderBottom: scrolled ? "1px solid rgba(184,115,51,0.2)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #B87333, #D4AF37)", boxShadow: "0 4px 16px rgba(184,115,51,0.35)" }}>
              <span className="font-heading text-xl text-obsidian">M</span>
            </div>
            <span className="font-heading text-xl text-gradient-steel tracking-wide">MERN STORE</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {isLoggedIn ? (isAdmin ? adminNavLinks : userNavLinks) : (
              <NavLink to="/product" className={navClass}>Products</NavLink>
            )}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Cart icon */}
            {isLoggedIn && !isAdmin && (
              <Link to="/cart" className="relative p-2 rounded-lg hover:bg-white/5 transition-colors text-steel hover:text-chrome">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {itemCount > 0 && (
                  <span className={`absolute -top-1 -right-1 w-4.5 h-4.5 flex items-center justify-center text-[10px] font-bold rounded-full text-obsidian min-w-[18px] px-1 ${cartBounce ? "animate-bounce" : ""}`}
                    style={{ background: "linear-gradient(135deg, #B87333, #D4AF37)" }}>
                    {itemCount}
                  </span>
                )}
              </Link>
            )}

            {/* Profile or auth buttons */}
            {isLoggedIn ? (
              <div className="relative">
                <button onClick={() => setProfileOpen((p) => !p)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors group">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold text-obsidian"
                    style={{ background: "linear-gradient(135deg, #B87333, #D4AF37)" }}>
                    {(user?.name || user?.email || "?")[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-body text-steel-light group-hover:text-chrome hidden sm:block max-w-[120px] truncate">
                    {user?.name || user?.email}
                  </span>
                  <svg className={`w-3.5 h-3.5 text-steel transition-transform ${profileOpen ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>

                {profileOpen && (
                  <div onClick={() => setProfileOpen(false)}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden z-50 animate-slide-down"
                    style={{ background: "#1A1A26", border: "1px solid rgba(255,255,255,0.09)", boxShadow: "0 16px 40px rgba(0,0,0,0.6)" }}>
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-xs text-steel font-body truncate">{user?.email}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-body text-steel-light hover:text-chrome hover:bg-white/5 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      Profile
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-body text-left transition-colors hover:bg-white/5"
                      style={{ color: "#FCA5A5" }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-ghost px-4 py-2 text-sm">Sign In</Link>
                <Link to="/register" className="btn-copper px-4 py-2 text-sm">Register</Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen((p) => !p)}
              className="md:hidden p-2 rounded-lg text-steel hover:text-chrome hover:bg-white/5 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/05 animate-slide-down"
            style={{ background: "rgba(10,10,15,0.97)", backdropFilter: "blur(20px)" }}>
            <nav className="flex flex-col px-4 py-4 gap-1">
              {(isLoggedIn ? (isAdmin ? [
                { to: "/admin", label: "Dashboard", end: true },
                { to: "/admin/products", label: "Products" },
                { to: "/admin/orders", label: "Orders" },
                { to: "/about", label: "About" },
              ] : [
                { to: "/product", label: "Products" },
                { to: "/order", label: "Orders" },
                { to: "/profile", label: "Profile" },
                { to: "/about", label: "About" },
              ]) : [{ to: "/product", label: "Products" }, { to: "/about", label: "About" }]
              ).map(({ to, label, end }) => (
                <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-lg text-sm font-body transition-colors ${isActive ? "text-copper bg-copper/10" : "text-steel-light hover:text-chrome hover:bg-white/05"}`}>
                  {label}
                </NavLink>
              ))}
              {isLoggedIn && (
                <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="px-4 py-2.5 rounded-lg text-sm font-body text-left transition-colors hover:bg-white/05"
                  style={{ color: "#FCA5A5" }}>
                  Sign out
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Close dropdown on outside click */}
      {profileOpen && <div className="fixed inset-0 z-30" onClick={() => setProfileOpen(false)} />}
    </>
  );
}
