import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Users,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  TrendingUp,
  DollarSign
} from "lucide-react";

export default function Admin() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.includes(path)) return true;
    return false;
  };

  // Sidebar items
  const sidebarItems = [
    { path: '/admin', label: 'Users', icon: Users },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  ];

  // Dashboard stats
  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: '#667eea' },
    { label: 'Total Products', value: '89', icon: Package, color: '#f093fb' },
    { label: 'Total Orders', value: '456', icon: ShoppingBag, color: '#4facfe' },
    { label: 'Revenue', value: '₹12,345', icon: DollarSign, color: '#00f2fe' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: '#f1f5f9',
      fontFamily: 'Inter, Arial, sans-serif',
      animation: 'fadeIn 1s'
    }}>
      <div style={{
        display: 'flex',
        maxWidth: '1700px',
        margin: '0 auto',
        padding: '0 24px',
        gap: '36px'
      }}>
        {/* Sidebar — now very wide and always far left */}
        <aside
          style={{
            minWidth: '400px',
            maxWidth: '460px',
            alignSelf: 'flex-start',
            background: '#181e2c',
            borderRadius: '22px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.21)',
            padding: '48px 36px 32px 36px',
            marginTop: '48px',
            position: 'sticky',
            left: 0,
            top: '32px',
            height: 'fit-content',
            animation: 'slideLeft 0.7s'
          }}
        >
          <h3 style={{
            marginBottom: '38px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            color: '#e0e7ff',
            fontWeight: '800',
            fontSize: '28px',
            letterSpacing: '.7px'
          }}>
            <Settings size={28} />
            Management
          </h3>
          <nav style={{
            display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px'
          }}>
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '18px 28px',
                  borderRadius: '13px',
                  textDecoration: 'none',
                  color: isActive(item.path) ? '#fff' : '#f1f5f9',
                  background: isActive(item.path)
                    ? 'linear-gradient(90deg,#6366f1cc,#4f46e5f5)'
                    : 'transparent',
                  fontWeight: isActive(item.path) ? '800' : '600',
                  border: isActive(item.path)
                    ? 'none'
                    : '1px solid #334155',
                  fontSize: '18px',
                  boxShadow: isActive(item.path) ? '0 4px 20px #6366f160' : 'none',
                  transition: 'all 0.22s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  if (!isActive(item.path)) e.target.style.background = "#334155";
                }}
                onMouseLeave={e => {
                  if (!isActive(item.path)) e.target.style.background = "transparent";
                }}
              >
                <item.icon size={24} />
                {item.label}
              </Link>
            ))}
          </nav>
          {/* Quick Stats Box — larger, clearly separated */}
          <div style={{
            background: '#162038',
            borderRadius: '18px',
            border: '1.5px solid #25304b',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            padding: '36px 28px 18px 28px',
            marginBottom: '10px',
            animation: 'scaleIn 0.7s'
          }}>
            <h4 style={{
              marginBottom: '26px',
              display: 'flex',
              alignItems: 'center',
              gap: '13px',
              fontSize: '21px',
              fontWeight: '800',
              color: '#e0e7ff'
            }}>
              <TrendingUp size={22} />
              Quick Stats
            </h4>
            <div style={{ fontSize: '18px', color: '#b6bedc', lineHeight: 1.8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '19px' }}>
                <span>Active Users:</span>
                <span style={{ fontWeight: '700', color: '#6366f1', fontSize: '21px' }}>892</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '19px' }}>
                <span>Pending Orders:</span>
                <span style={{ fontWeight: '700', color: '#fbbf24', fontSize: '21px' }}>23</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Low Stock:</span>
                <span style={{ fontWeight: '700', color: '#ef4444', fontSize: '21px' }}>5</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main & Stats */}
        <main style={{ flex: 1 }}>
          <div style={{ marginTop: '54px', marginBottom: '32px', animation: 'slideDown 0.8s' }}>
            <h1 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              marginBottom: '13px',
              fontSize: '44px',
              fontWeight: 900,
              color: '#e0e7ff',
              letterSpacing: '1.2px'
            }}>
              <BarChart3 size={44} color="#3b82f6" />
              Admin Dashboard
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '18px' }}>
              Manage your store, users, and orders from this central dashboard.
            </p>
          </div>
          {/* Stats Cards */}
          <div className="stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
            marginBottom: '38px'
          }}>
            {stats.map((stat, index) => (
              <div key={index}
                className="stat-card"
                style={{
                  padding: '30px',
                  borderRadius: '18px',
                  background: '#1e293b',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  animation: `scaleIn 0.7s ${index * 0.11}s backwards`
                }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '19px',
                  background: `linear-gradient(135deg, ${stat.color}20 0, ${stat.color}08 90%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '21px',
                  border: `3px solid ${stat.color}44`,
                  boxShadow: `0 3px 20px ${stat.color}12`
                }}>
                  <stat.icon size={34} color={stat.color} />
                </div>
                <div style={{ fontSize: '31px', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '17px', color: '#90a2cf' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          {/* Outlet/Main Content Panel */}
          <div style={{
            background: '#1e293b',
            borderRadius: '18px',
            padding: '38px 38px',
            minHeight: '480px',
            boxShadow: '0 8px 22px rgba(0,0,0,0.15)',
            animation: 'fadeIn 1.1s'
          }}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Animations and Responsive */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0);} }
        @keyframes slideLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0);} }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.89);} to { opacity: 1; transform: scale(1);} }
        @media (max-width: 1100px) {
          div[style*="display: flex"][style*="max-width:"] {
            flex-direction: column !important;
            gap: 34px !important;
          }
          aside {
            min-width: 100% !important;
            max-width: 100% !important;
            margin-bottom: 48px !important;
            position: relative !important;
            padding: 38px 16px 24px 16px !important;
          }
          main {
            width: 100% !important;
            min-width: 0 !important;
          }
        }
        @media (max-width: 700px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          main > div {
            padding: 12px 6px !important;
          }
          aside {
            padding: 22px 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
