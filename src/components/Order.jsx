import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Package, Calendar, DollarSign, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import { AppContext } from "../App";

export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dark mode theme
  const theme = {
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    bgPrimary: '#0f172a',
    bgSecondary: '#1e293b',
    bgCard: '#1e293b',
    border: '#334155',
    accent: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444'
  };

  const fetchOrders = async () => {
  try {
    setLoading(true);
    const url = `${API_URL}/api/orders/${user.email}`;
    const result = await axios.get(url);
    // Sort new orders first (descending by createdAt)
    setOrders(result.data?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    setError(null);
  } catch (err) {
    console.log(err);
    setError("Failed to load orders. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (user.email) {
      fetchOrders();
    }
  }, [user.email]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <CheckCircle size={20} color="#10b981" />;
      case 'cancelled':
        return <XCircle size={20} color="#ef4444" />;
      case 'pending':
      default:
        return <Clock size={20} color="#f59e0b" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    const baseStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '600',
      textTransform: 'capitalize',
      transition: 'all 0.3s ease'
    };

    switch (statusLower) {
      case 'completed':
        return {
          ...baseStyle,
          background: 'rgba(16, 185, 129, 0.15)',
          color: '#10b981',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        };
      case 'cancelled':
        return {
          ...baseStyle,
          background: 'rgba(239, 68, 68, 0.15)',
          color: '#ef4444',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        };
      case 'pending':
      default:
        return {
          ...baseStyle,
          background: 'rgba(245, 158, 11, 0.15)',
          color: '#f59e0b',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: theme.bgPrimary,
        padding: '40px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          color: theme.text,
          fontSize: '18px',
          animation: 'fadeIn 0.5s ease-in-out'
        }}>
          <div style={{ animation: 'spin 1s linear infinite' }}>
            <Package size={32} color={theme.accent} />
          </div>
          <span>Loading your orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bgPrimary,
      padding: '40px 20px',
      animation: 'fadeIn 0.6s ease-in-out'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header Section */}
        <div style={{ 
          marginBottom: '40px',
          animation: 'slideDown 0.6s ease-out'
        }}>
          <h1 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            marginBottom: '12px',
            color: theme.text,
            fontSize: '36px',
            fontWeight: '700',
            margin: '0 0 12px 0'
          }}>
            <Package size={36} color={theme.accent} />
            My Orders
          </h1>
          <p style={{ 
            color: theme.textSecondary,
            fontSize: '16px',
            margin: 0
          }}>
            Track and manage your order history
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            color: '#ef4444',
            animation: 'slideDown 0.4s ease-out'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Empty State */}
        {orders.length === 0 && !loading ? (
          <div style={{
            background: theme.bgCard,
            borderRadius: '16px',
            padding: '60px 40px',
            textAlign: 'center',
            border: `1px solid ${theme.border}`,
            animation: 'scaleIn 0.5s ease-out'
          }}>
            <div style={{ 
              margin: '0 auto 24px',
              opacity: 0.3,
              animation: 'float 3s ease-in-out infinite'
            }}>
              <Package size={80} color={theme.textSecondary} />
            </div>
            <h3 style={{ 
              color: theme.text, 
              fontSize: '24px',
              marginBottom: '12px'
            }}>
              No orders found
            </h3>
            <p style={{ 
              color: theme.textSecondary, 
              marginBottom: '32px',
              fontSize: '16px'
            }}>
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              style={{
                background: theme.accent,
                color: 'white',
                padding: '12px 32px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gap: '24px'
          }}>
            {orders.map((order, index) => (
              <div 
                key={order._id} 
                style={{
                  background: theme.bgCard,
                  borderRadius: '16px',
                  padding: '28px',
                  border: `1px solid ${theme.border}`,
                  transition: 'all 0.3s ease',
                  animation: `slideUp 0.5s ease-out ${index * 0.1}s backwards`,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = theme.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = theme.border;
                }}
              >
                {/* Order Header */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '24px',
                  paddingBottom: '20px',
                  borderBottom: `1px solid ${theme.border}`
                }}>
                  <div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      marginBottom: '12px'
                    }}>
                      <h3 style={{ 
                        margin: 0, 
                        color: theme.text,
                        fontSize: '20px',
                        fontWeight: '700'
                      }}>
                        Order #{order._id.slice(-8)}
                      </h3>
                      <span style={getStatusBadge(order.status)}>
                        {getStatusIcon(order.status)}
                        {order.status || 'Pending'}
                      </span>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '20px',
                      color: theme.textSecondary,
                      fontSize: '14px'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px' 
                      }}>
                        <Calendar size={16} />
                        {formatDate(order.createdAt || new Date())}
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px' 
                      }}>
                        <DollarSign size={16} />
                        ₹{order.orderValue?.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '28px', 
                      fontWeight: '700',
                      color: theme.success,
                      marginBottom: '4px'
                    }}>
                      ₹{order.orderValue?.toFixed(2)}
                    </div>
                    <div style={{ 
                      fontSize: '13px', 
                      color: theme.textSecondary,
                      background: theme.bgSecondary,
                      padding: '4px 12px',
                      borderRadius: '12px',
                      display: 'inline-block'
                    }}>
                      {order.items?.length || 0} items
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 style={{ 
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: theme.text,
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    <Truck size={20} color={theme.accent} />
                    Order Items
                  </h4>
                  
                  <div style={{
                    background: theme.bgPrimary,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: `1px solid ${theme.border}`
                  }}>
                    <table style={{
                      width: '100%',
                      borderCollapse: 'collapse'
                    }}>
                      <thead>
                        <tr style={{
                          background: theme.bgSecondary,
                          borderBottom: `1px solid ${theme.border}`
                        }}>
                          <th style={{
                            textAlign: 'left',
                            padding: '16px',
                            color: theme.text,
                            fontWeight: '600',
                            fontSize: '14px'
                          }}>Product</th>
                          <th style={{
                            textAlign: 'left',
                            padding: '16px',
                            color: theme.text,
                            fontWeight: '600',
                            fontSize: '14px'
                          }}>Price</th>
                          <th style={{
                            textAlign: 'center',
                            padding: '16px',
                            color: theme.text,
                            fontWeight: '600',
                            fontSize: '14px'
                          }}>Quantity</th>
                          <th style={{
                            textAlign: 'right',
                            padding: '16px',
                            color: theme.text,
                            fontWeight: '600',
                            fontSize: '14px'
                          }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items?.map((item, idx) => (
                          <tr 
                            key={item._id}
                            style={{
                              borderBottom: idx !== order.items.length - 1 ? `1px solid ${theme.border}` : 'none',
                              transition: 'background 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = theme.bgSecondary;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <td style={{ padding: '16px' }}>
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '14px' 
                              }}>
                                <img 
                                  src={item.imgUrl || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'} 
                                  alt={item.productName}
                                  style={{ 
                                    width: '50px', 
                                    height: '50px', 
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    border: `1px solid ${theme.border}`,
                                    transition: 'transform 0.3s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.1)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                  }}
                                />
                                <span style={{ 
                                  fontWeight: '500',
                                  color: theme.text,
                                  fontSize: '15px'
                                }}>
                                  {item.productName}
                                </span>
                              </div>
                            </td>
                            <td style={{ 
                              padding: '16px',
                              color: theme.textSecondary,
                              fontSize: '15px'
                            }}>
                              ₹{item.price?.toFixed(2)}
                            </td>
                            <td style={{ 
                              padding: '16px',
                              textAlign: 'center'
                            }}>
                              <span style={{ 
                                background: theme.bgSecondary,
                                padding: '6px 14px',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: theme.text,
                                border: `1px solid ${theme.border}`,
                                display: 'inline-block'
                              }}>
                                {item.qty}
                              </span>
                            </td>
                            <td style={{ 
                              padding: '16px',
                              fontWeight: '600',
                              color: theme.text,
                              fontSize: '16px',
                              textAlign: 'right'
                            }}>
                              ₹{(item.qty * item.price)?.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Status Messages */}
                {order.status === 'pending' && (
                  <div style={{ 
                    marginTop: '20px',
                    padding: '16px 20px',
                    background: 'rgba(245, 158, 11, 0.15)',
                    borderRadius: '10px',
                    fontSize: '14px',
                    color: '#f59e0b',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    animation: 'slideUp 0.4s ease-out'
                  }}>
                    <strong>Order Status:</strong> Your order is being processed and will be shipped soon.
                  </div>
                )}

                {order.status === 'completed' && (
                  <div style={{ 
                    marginTop: '20px',
                    padding: '16px 20px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    borderRadius: '10px',
                    fontSize: '14px',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    animation: 'slideUp 0.4s ease-out'
                  }}>
                    <strong>Delivered!</strong> Your order has been successfully delivered.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Support Section */}
        {orders.length > 0 && (
          <div style={{ 
            marginTop: '40px',
            textAlign: 'center',
            padding: '32px',
            background: theme.bgCard,
            borderRadius: '16px',
            border: `1px solid ${theme.border}`,
            animation: 'fadeIn 0.8s ease-out'
          }}>
            <h4 style={{ 
              color: theme.text,
              fontSize: '22px',
              marginBottom: '12px'
            }}>
              Need Help?
            </h4>
            <p style={{ 
              color: theme.textSecondary, 
              marginBottom: '24px',
              fontSize: '15px'
            }}>
              Have questions about your order? Our customer support team is here to help.
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              {['Contact Support', 'Track Package', 'Return Item'].map((label, idx) => (
                <button 
                  key={idx}
                  style={{
                    background: theme.bgSecondary,
                    color: theme.text,
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.border}`,
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = theme.accent;
                    e.target.style.borderColor = theme.accent;
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = theme.bgSecondary;
                    e.target.style.borderColor = theme.border;
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @media (max-width: 768px) {
          table {
            font-size: 13px;
          }
          
          th, td {
            padding: 12px 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
