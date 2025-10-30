import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { 
  ShoppingCart, 
  User, 
  Home, 
  Package, 
  LogIn, 
  Shield, 
  Bell,
  Search,
  Menu,
  X,
  Heart,
  LogOut,
  Settings,
  ChevronDown
} from "lucide-react";
import { AppContext } from "../App";

export default function Header() {
  const { user, cart } = useContext(AppContext); // Removed isDarkMode reference
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const location = useLocation();
  
  const cartItemCount = cart.reduce((total, item) => total + (item.qty || 0), 0);
  
  const isActive = (path) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Dark mode theme colors (always dark mode)
  const theme = {
    bg: '#0f172a',
    bgSecondary: '#1e293b',
    bgTertiary: '#334155',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    border: '#334155',
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    accent: '#8b5cf6',
    accentDark: '#7c3aed'
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/cart', label: 'Cart', icon: ShoppingCart, badge: cartItemCount },
    { path: '/order', label: 'Orders', icon: Package },
    ...(user?.role === "admin" ? [{ path: '/admin', label: 'Admin', icon: Shield }] : [])
  ];

  return (
    <>
      <header style={{ 
        background: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bgSecondary} 100%)`,
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        borderBottom: `1px solid ${theme.border}`
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <nav style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: isScrolled ? '12px 0' : '16px 0',
            color: theme.text,
            transition: 'all 0.3s ease'
          }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link to="/" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                textDecoration: 'none',
                color: 'inherit'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  transform: isScrolled ? 'scale(0.9)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}>
                  <Package size={24} color="white" />
                </div>
                <h1 style={{ 
                  fontSize: isScrolled ? '20px' : '24px', 
                  fontWeight: '700',
                  margin: 0,
                  background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transition: 'all 0.3s ease'
                }}>
                  MERN Store
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div style={{ 
              display: window.innerWidth > 768 ? 'flex' : 'none',
              alignItems: 'center', 
              gap: '8px',
              background: theme.bgSecondary,
              padding: '8px',
              borderRadius: '16px',
              border: `1px solid ${theme.border}`,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}>
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    color: theme.text,
                    textDecoration: 'none',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    background: isActive(link.path) ? theme.primary : 'transparent',
                    fontWeight: '500',
                    position: 'relative',
                    transform: 'translateY(0)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(link.path)) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(link.path)) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <link.icon size={18} />
                  <span>{link.label}</span>
                  {link.badge > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '2px',
                      right: '8px',
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      color: 'white',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: '600',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      animation: 'bounce 2s infinite'
                    }}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                style={{
                  background: theme.bgSecondary,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  width: '40px',
                  height: '40px',
                  display: window.innerWidth > 768 ? 'flex' : 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: theme.text
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme.bgTertiary;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = theme.bgSecondary;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Search size={18} />
              </button>

              {/* User Section */}
              {user?.token ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Notifications */}
                  <button style={{
                    background: theme.bgSecondary,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '12px',
                    width: '40px',
                    height: '40px',
                    display: window.innerWidth > 768 ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    color: theme.text,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme.bgTertiary;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = theme.bgSecondary;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    <Bell size={18} />
                    {notifications > 0 && (
                      <span style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        background: '#ef4444',
                        color: 'white',
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}>
                        {notifications}
                      </span>
                    )}
                  </button>
                  
                  {/* Profile Dropdown */}
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        color: theme.text,
                        textDecoration: 'none',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        background: theme.bgSecondary,
                        fontWeight: '500',
                        border: `1px solid ${theme.border}`,
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = theme.bgTertiary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = theme.bgSecondary;
                      }}
                    >
                      <User size={18} />
                      <span style={{ display: window.innerWidth > 768 ? 'inline' : 'none' }}>
                        {user.firstName || user.name || 'Profile'}
                      </span>
                      <ChevronDown size={16} style={{
                        transform: showProfileMenu ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s ease'
                      }} />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {showProfileMenu && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: '8px',
                        background: theme.bgSecondary,
                        border: `1px solid ${theme.border}`,
                        borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                        minWidth: '200px',
                        animation: 'fadeIn 0.2s ease',
                        overflow: 'hidden',
                        zIndex: 1001
                      }}>
                        <Link
                          to="/profile"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            color: theme.text,
                            textDecoration: 'none',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = theme.bgTertiary}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <User size={16} />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            color: theme.text,
                            textDecoration: 'none',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = theme.bgTertiary}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <Heart size={16} />
                          <span>Wishlist</span>
                        </Link>
                        <Link
                          to="/settings"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            color: theme.text,
                            textDecoration: 'none',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = theme.bgTertiary}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <Settings size={16} />
                          <span>Settings</span>
                        </Link>
                        <hr style={{ margin: 0, borderColor: theme.border }} />
                        <button
                          onClick={() => {
                            localStorage.removeItem('user');
                            localStorage.removeItem('token');
                            window.location.href = '/';
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            color: '#ef4444',
                            width: '100%',
                            border: 'none',
                            background: 'none',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#7f1d1d'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    color: theme.text,
                    textDecoration: 'none',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
                    fontWeight: '600',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                    transform: 'translateY(0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  display: window.innerWidth <= 768 ? 'flex' : 'none',
                  background: theme.bgSecondary,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  width: '40px',
                  height: '40px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: theme.text
                }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>

          {/* Search Bar */}
          {isSearchOpen && (
            <div style={{
              paddingBottom: '16px',
              animation: 'slideDown 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: theme.bgSecondary,
                borderRadius: '12px',
                padding: '12px 16px',
                border: `1px solid ${theme.border}`,
              }}>
                <Search size={20} color={theme.textSecondary} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: theme.text,
                    fontSize: '16px'
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      console.log('Searching for:', searchQuery);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: theme.text
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: theme.bg,
            borderTop: `1px solid ${theme.border}`,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            animation: 'slideDown 0.3s ease',
            maxHeight: 'calc(100vh - 80px)',
            overflowY: 'auto'
          }}>
            <div style={{ padding: '16px' }}>
              {/* Mobile Search */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: theme.bgSecondary,
                borderRadius: '12px',
                padding: '12px 16px',
                marginBottom: '16px',
                border: `1px solid ${theme.border}`
              }}>
                <Search size={20} color={theme.textSecondary} />
                <input
                  type="text"
                  placeholder="Search products..."
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: theme.text,
                    fontSize: '16px'
                  }}
                />
              </div>

              {/* Mobile Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    color: theme.text,
                    textDecoration: 'none',
                    borderRadius: '12px',
                    marginBottom: '8px',
                    background: isActive(link.path) ? theme.primary + '30' : 'transparent',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon size={20} color={isActive(link.path) ? theme.primary : theme.text} />
                  <span style={{ flex: 1 }}>{link.label}</span>
                  {link.badge > 0 && (
                    <span style={{
                      background: '#ef4444',
                      color: 'white',
                      borderRadius: '12px',
                      padding: '2px 8px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}

              <hr style={{ margin: '16px 0', borderColor: theme.border }} />

              {/* Mobile User Section */}
              {user?.token ? (
                <>
                  <Link
                    to="/profile"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      color: theme.text,
                      textDecoration: 'none',
                      borderRadius: '12px',
                      marginBottom: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={20} />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem('user');
                      localStorage.removeItem('token');
                      window.location.href = '/';
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      color: '#ef4444',
                      width: '100%',
                      border: 'none',
                      background: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: '12px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '16px',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100())`,
                    fontWeight: '600',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Click outside to close dropdowns */}
      {(showProfileMenu || isMobileMenuOpen) && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 998,
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(2px)'
          }}
          onClick={() => {
            setShowProfileMenu(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 16px !important;
          }
        }

        input::placeholder {
          color: ${theme.textSecondary};
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: ${theme.bgSecondary};
        }

        ::-webkit-scrollbar-thumb {
          background: ${theme.border};
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.textSecondary};
        }
      `}</style>
    </>
  );
}
