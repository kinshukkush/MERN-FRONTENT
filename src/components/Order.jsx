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

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
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
        return <CheckCircle size={20} color="#059669" />;
      case 'cancelled':
        return <XCircle size={20} color="#dc2626" />;
      case 'pending':
      default:
        return <Clock size={20} color="#d97706" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'completed':
        return 'badge-completed';
      case 'cancelled':
        return 'badge-cancelled';
      case 'pending':
      default:
        return 'badge-pending';
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
      <div className="page-wrapper">
        <div className="container">
          <div className="loading">
            <Package size={32} />
            <span style={{ marginLeft: '12px' }}>Loading your orders...</span>
          </div>
        </div>
      </div>
    );
  }

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
            <Package size={32} />
            My Orders
          </h1>
          <p style={{ color: '#6b7280' }}>
            Track and manage your order history
          </p>
        </div>

        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}

        {orders.length === 0 && !loading ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Package size={64} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
            <h3>No orders found</h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="btn btn-primary"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid" style={{ gap: '24px' }}>
            {orders.map((order) => (
              <div key={order._id} className="card">
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <h3 style={{ margin: 0 }}>Order #{order._id.slice(-8)}</h3>
                      <span className={`badge ${getStatusBadge(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status || 'Pending'}
                      </span>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '16px',
                      color: '#6b7280',
                      fontSize: '14px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} />
                        {formatDate(order.createdAt || new Date())}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <DollarSign size={14} />
                        ${order.orderValue?.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '24px', 
                      fontWeight: '700',
                      color: '#059669'
                    }}>
                      ${order.orderValue?.toFixed(2)}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#6b7280'
                    }}>
                      {order.items?.length || 0} items
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={{ 
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Truck size={16} />
                    Order Items
                  </h4>
                  
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items?.map((item) => (
                          <tr key={item._id}>
                            <td>
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px' 
                              }}>
                                <img 
                                  src={item.imgUrl || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'} 
                                  alt={item.productName}
                                  style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    objectFit: 'cover',
                                    borderRadius: '6px'
                                  }}
                                />
                                <span style={{ fontWeight: '500' }}>
                                  {item.productName}
                                </span>
                              </div>
                            </td>
                            <td>${item.price?.toFixed(2)}</td>
                            <td>
                              <span style={{ 
                                background: '#f3f4f6',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '14px'
                              }}>
                                {item.qty}
                              </span>
                            </td>
                            <td style={{ fontWeight: '600' }}>
                              ${(item.qty * item.price)?.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {order.status === 'pending' && (
                  <div style={{ 
                    marginTop: '16px',
                    padding: '12px',
                    background: '#fef3c7',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#92400e'
                  }}>
                    <strong>Order Status:</strong> Your order is being processed and will be shipped soon.
                  </div>
                )}

                {order.status === 'completed' && (
                  <div style={{ 
                    marginTop: '16px',
                    padding: '12px',
                    background: '#d1fae5',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#065f46'
                  }}>
                    <strong>Delivered!</strong> Your order has been successfully delivered.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {orders.length > 0 && (
          <div style={{ 
            marginTop: '32px',
            textAlign: 'center',
            padding: '20px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h4>Need Help?</h4>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              Have questions about your order? Our customer support team is here to help.
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <button className="btn btn-secondary">Contact Support</button>
              <button className="btn btn-secondary">Track Package</button>
              <button className="btn btn-secondary">Return Item</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}