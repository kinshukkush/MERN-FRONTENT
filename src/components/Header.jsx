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
  Sun, 
  Moon,
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
  const { user, cart, isDarkMode, setIsDarkMode } = useContext(AppContext);
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

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
  };

  // Theme colors
  const theme = {
    bg: isDarkMode ? '#0f172a' : '#ffffff',
    bgSecondary: isDarkMode ? '#1e293b' : '#f3f4f6',
    text: isDarkMode ? '#f1f5f9' : '#111827',
    textSecondary: isDarkMode ? '#cbd5e1' : '#6b7280',
    border: isDarkMode ? '#334155' : '#e5e7eb',
    primary: '#3b82f6',
    primaryDark: '#2563eb'
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
        background: isDarkMode 
          ? `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bgSecondary} 100%)`
          : `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        transform: isScrolled ? 'translateY(0)' : 'translateY(0)',
        borderBottom: `1px solid ${isDarkMode ? theme.border : 'transparent'}`
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <nav style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: isScrolled ? '12px 0' : '16px 0',
            color: isDarkMode ? theme.text : 'white',
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
                  background: isDarkMode ? theme.primary : 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  transform: isScrolled ? 'scale(0.9)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}>
                  <Package size={24} color={isDarkMode ? 'white' : undefined} />
                </div>
                <h1 style={{ 
                  fontSize: isScrolled ? '20px' : '24px', 
                  fontWeight: '700',
                  margin: 0,
                  background: isDarkMode 
                    ? 'linear-gradient(45deg, #3b82f6, #60a5fa)' 
                    : 'linear-gradient(45deg, #fff, #e0e7ff)',
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
              background: isDarkMode ? theme.bgSecondary : 'rgba(255, 255, 255, 0.1)',
              padding: '8px',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${isDarkMode ? theme.border : 'rgba(255, 255, 255, 0.2)'}`
            }}>
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    color: isDarkMode ? theme.text : 'white',
                    textDecoration: 'none',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    background: isActive(link.path) 
                      ? (isDarkMode ? theme.primary : 'rgba(255, 255, 255, 0.2)') 
                      : 'transparent',
                    fontWeight: '500',
                    position: 'relative',
                    transform: 'translateY(0)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(link.path)) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.background = isDarkMode 
                        ? 'rgba(59, 130, 246, 0.1)' 
                        : 'rgba(255, 255, 255, 0.1)';
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
                  background: isDarkMode ? theme.bgSecondary : 'rgba(255, 255, 255, 0.2)',
                  border: `1px solid ${isDarkMode ? theme.border : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '12px',
                  width: '40px',
                  height: '40px',
                  display: window.innerWidth > 768 ? 'flex' : 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: isDarkMode ? theme.text : 'white'
                }}
              >
                <Search size={18} />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="theme-toggle"
                style={{
                  background: isDarkMode 
                    ? `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`
                    : 'rgba(255, 255, 255, 0.2)',
                  border: `1px solid ${isDarkMode ? theme.border : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '20px',
                  width: '50px',
                  height: '26px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: isDarkMode ? '26px' : '3px',
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {isDarkMode ? <Moon size={12} color="#3b82f6" /> : <Sun size={12} color="#f59e0b" />}
                </div>
              </button>

              {/* User Section */}
              {user?.token ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Notifications */}
                  <button style={{
                    background: isDarkMode ? theme.bgSecondary : 'rgba(255, 255, 255, 0.2)',
                    border: `1px solid ${isDarkMode ? theme.border : 'rgba(255, 255, 255, 0.3)'}`,
                    borderRadius: '12px',
                    width: '40px',
                    height: '40px',
                    display: window.innerWidth > 768 ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    color: isDarkMode ? theme.text : 'white',
                    position: 'relative'
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
                        color: isDarkMode ? theme.text : 'white',
                        textDecoration: 'none',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        background: isDarkMode ? theme.bgSecondary : 'rgba(255, 255, 255, 0.2)',
                        fontWeight: '500',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${isDarkMode ? theme.border : 'rgba(255, 255, 255, 0.3)'}`,
                        cursor: 'pointer'
                      }}
                    >
                      <User size={18} />
                      <span style={{ display: window.innerWidth > 768 ? 'inline' : 'none' }}>
                        {user.name || 'Profile'}
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
                        background: isDarkMode ? theme.bgSecondary : 'white',
                        border: `1px solid ${theme.border}`,
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        minWidth: '200px',
                        animation: 'fadeIn 0.2s ease',
                        overflow: 'hidden'
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
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.bgSecondary}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.bgSecondary}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.bgSecondary}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <Settings size={16} />
                          <span>Settings</span>
                        </Link>
                        <hr style={{ margin: 0, borderColor: theme.border }} />
                        <button
                          onClick={() => {
                            localStorage.removeItem('user');
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
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                    color: isDarkMode ? theme.text : 'white',
                    textDecoration: 'none',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    background: isDarkMode 
                      ? `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`
                      : 'rgba(255, 255, 255, 0.2)',
                    fontWeight: '500',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${isDarkMode ? theme.primary : 'rgba(255, 255, 255, 0.3)'}`,
                    transform: 'translateY(0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
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
                  background: isDarkMode ? theme.bgSecondary : 'rgba(255, 255, 255, 0.2)',
                  border: `1px solid ${isDarkMode ? theme.border : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '12px',
                  width: '40px',
                  height: '40px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: isDarkMode ? theme.text : 'white'
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
                background: isDarkMode ? theme.bgSecondary : 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '12px 16px',
                border: `1px solid ${isDarkMode ? theme.border : 'rgba(255, 255, 255, 0.3)'}`,
                backdropFilter: 'blur(10px)'
              }}>
                <Search size={20} color={isDarkMode ? theme.textSecondary : 'white'} />
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
                    color: isDarkMode ? theme.text : 'white',
                    fontSize: '16px',
                    '::placeholder': {
                      color: isDarkMode ? theme.textSecondary : 'rgba(255, 255, 255, 0.7)'
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      // Handle search
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
                    color: isDarkMode ? theme.text : 'white'
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
            background: isDarkMode ? theme.bg : 'white',
            borderTop: `1px solid ${theme.border}`,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            animation: 'slideDown 0.3s ease'
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
                    background: isActive(link.path) ? theme.primary + '20' : 'transparent',
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
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
                    fontWeight: '600'
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
            zIndex: 998
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
          color: ${isDarkMode ? theme.textSecondary : 'rgba(255, 255, 255, 0.7)'};
        }

        /* Custom scrollbar for dropdown */
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