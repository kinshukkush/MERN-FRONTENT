import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  Users, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings,
  TrendingUp,
  DollarSign,
  Eye
} from "lucide-react";

export default function Admin() {
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.includes(path)) return true;
    return false;
  };

  const sidebarItems = [
    { path: '/admin', label: 'Users', icon: Users },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  ];

  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: '#667eea' },
    { label: 'Total Products', value: '89', icon: Package, color: '#f093fb' },
    { label: 'Total Orders', value: '456', icon: ShoppingBag, color: '#4facfe' },
    { label: 'Revenue', value: '$12,345', icon: DollarSign, color: '#00f2fe' },
  ];

  return (
    <div className="page-wrapper fade-in">
      <div className="container">
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '8px'
          }}>
            <BarChart3 size={32} />
            Admin Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Manage your store, users, and orders from this central dashboard.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{
              padding: '20px',
              borderRadius: '16px',
              background: '#1e293b',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                border: `2px solid ${stat.color}30`
              }}>
                <stat.icon size={28} color={stat.color} />
              </div>
              <div className="stat-value" style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div className="stat-label" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '32px' }}>
          {/* Sidebar */}
          <div className="admin-sidebar" style={{
            padding: '24px',
            background: 'var(--bg-sidebar)',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}>
            <h3 style={{ 
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-primary)',
              fontSize: '18px'
            }}>
              <Settings size={20} />
              Management
            </h3>
            
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: isActive(item.path) ? 'white' : 'var(--text-primary)',
                    background: isActive(item.path) 
                      ? 'var(--gradient-primary)' 
                      : 'transparent',
                    transition: 'all 0.3s ease',
                    fontWeight: '500',
                    border: isActive(item.path) 
                      ? 'none' 
                      : '1px solid var(--border-color)',
                    boxShadow: isActive(item.path) ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'
                  }}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div style={{
              marginTop: '32px',
              padding: '20px',
              background: 'var(--bg-secondary)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h4 style={{ 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                <TrendingUp size={16} />
                Quick Stats
              </h4>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <span>Active Users:</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>892</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <span>Pending Orders:</span>
                  <span style={{ fontWeight: '600', color: '#f59e0b' }}>23</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between'
                }}>
                  <span>Low Stock:</span>
                  <span style={{ fontWeight: '600', color: '#ef4444' }}>5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="admin-content" style={{ padding: '24px', background: '#1e293b', borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
