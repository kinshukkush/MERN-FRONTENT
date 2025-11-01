import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
import { 
  ShoppingBag, 
  Filter, 
  Download,
  Calendar,
  DollarSign,
  User,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Truck,
  Navigation
} from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders || []);
      setTotalPages(result.data.total || 1);
    } catch (err) {
      console.log(err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.token) {
      fetchOrders();
    }
  }, [status, page, user.token]);

  const updateOrder = async (newStatus, id) => {
    if (!window.confirm(`Are you sure you want to change status to ${newStatus}?`)) return;
    
    try {
      console.log('Updating order:', { 
        id, 
        newStatus, 
        userRole: user.role,
        hasToken: !!user.token,
        apiUrl: API_URL 
      });
      
      if (!user.token) {
        setError("No authentication token. Please login again.");
        return;
      }
      
      if (user.role !== 'admin') {
        setError("Admin access required to update orders.");
        return;
      }
      
      const url = `${API_URL}/api/orders/${id}`;
      const response = await axios.patch(url, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      console.log('Update successful:', response.data);
      fetchOrders();
    } catch (err) {
      console.error('Update order error:', err.response?.data || err.message);
      const errorMsg = err.response?.data?.message || "Failed to update order. Please try again.";
      setError(errorMsg);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) return;
    
    try {
      console.log('Deleting order:', { 
        id, 
        userRole: user.role,
        hasToken: !!user.token,
        apiUrl: API_URL 
      });
      
      if (!user.token) {
        setError("No authentication token. Please login again.");
        return;
      }
      
      if (user.role !== 'admin') {
        setError("Admin access required to delete orders.");
        return;
      }
      
      const url = `${API_URL}/api/orders/${id}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      console.log('Delete successful:', response.data);
      fetchOrders();
    } catch (err) {
      console.error('Delete order error:', err.response?.data || err.message);
      const errorMsg = err.response?.data?.message || "Failed to delete order. Please try again.";
      setError(errorMsg);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <CheckCircle size={16} color="#059669" />;
      case 'shipped':
        return <Truck size={16} color="#3b82f6" />;
      case 'in transit':
        return <Navigation size={16} color="#8b5cf6" />;
      case 'cancelled':
        return <XCircle size={16} color="#dc2626" />;
      case 'pending':
      default:
        return <Clock size={16} color="#d97706" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'delivered':
        return 'badge-completed';
      case 'shipped':
        return 'badge-info';
      case 'in transit':
        return 'badge-info';
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalRevenue = orders.reduce((sum, order) => sum + (order.orderValue || 0), 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;

  return (
    <div className="fade-in">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <div>
          <h2 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '8px'
          }}>
            <ShoppingBag size={28} />
            Order Management
          </h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Track and manage customer orders
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            background: 'rgba(102, 126, 234, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <ShoppingBag size={24} color="#667eea" />
          </div>
          <div className="stat-value">{orders.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>

        <div className="stat-card">
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            background: 'rgba(251, 191, 36, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <Clock size={24} color="#fbbf24" />
          </div>
          <div className="stat-value">{pendingOrders}</div>
          <div className="stat-label">Pending</div>
        </div>

        <div className="stat-card">
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            background: 'rgba(34, 197, 94, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <CheckCircle size={24} color="#22c55e" />
          </div>
          <div className="stat-value">{deliveredOrders}</div>
          <div className="stat-label">Delivered</div>
        </div>

        <div className="stat-card">
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            background: 'rgba(34, 197, 94, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <DollarSign size={24} color="#22c55e" />
          </div>
          <div className="stat-value">₹{totalRevenue.toFixed(0)}</div>
          <div className="stat-label">Revenue</div>
        </div>
      </div>

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Filters */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="var(--text-secondary)" />
            <span style={{ fontWeight: '500' }}>Filter by status:</span>
          </div>
          
          <select 
            className="form-select"
            style={{ width: 'auto', minWidth: '150px' }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="in transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select 
            className="form-select"
            style={{ width: 'auto', minWidth: '120px' }}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <span>Loading orders...</span>
          </div>
        ) : orders.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            color: 'var(--text-secondary)'
          }}>
            <ShoppingBag size={64} style={{ opacity: 0.3, marginBottom: '16px' }} />
            <h3>No orders found</h3>
            <p>No orders match your current filter criteria.</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <div>
                          <div style={{ fontWeight: '600' }}>
                            #{order._id?.slice(-8)}
                          </div>
                          <div style={{ 
                            fontSize: '12px', 
                            color: 'var(--text-secondary)' 
                          }}>
                            Order ID
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'var(--gradient-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            <User size={16} />
                          </div>
                          <div>
                            <div style={{ fontWeight: '500' }}>
                              {order.email}
                            </div>
                            <div style={{ 
                              fontSize: '12px', 
                              color: 'var(--text-secondary)' 
                            }}>
                              Customer
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Calendar size={14} color="var(--text-muted)" />
                          <div>
                            <div style={{ fontSize: '14px' }}>
                              {formatDate(order.createdAt || new Date())}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Package size={14} color="var(--text-muted)" />
                          <span style={{ fontWeight: '500' }}>
                            {order.items?.length || 0} items
                          </span>
                        </div>
                      </td>
                      <td>
                        <div style={{ 
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#059669'
                        }}>
                          ₹{order.orderValue?.toFixed(2)}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadge(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status || 'Pending'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {order.status === "pending" && (
                            <button 
                              onClick={() => updateOrder("shipped", order._id)}
                              className="btn btn-primary btn-sm"
                              title="Mark as shipped"
                            >
                              <Truck size={14} />
                            </button>
                          )}
                          
                          {order.status === "shipped" && (
                            <button 
                              onClick={() => updateOrder("in transit", order._id)}
                              className="btn btn-info btn-sm"
                              title="Mark as in transit"
                              style={{
                                background: '#8b5cf6',
                                borderColor: '#8b5cf6'
                              }}
                            >
                              <Navigation size={14} />
                            </button>
                          )}
                          
                          {order.status === "in transit" && (
                            <button 
                              onClick={() => updateOrder("delivered", order._id)}
                              className="btn btn-success btn-sm"
                              title="Mark as delivered"
                            >
                              <CheckCircle size={14} />
                            </button>
                          )}
                          
                          <button 
                            onClick={() => deleteOrder(order._id)}
                            className="btn btn-danger btn-sm"
                            title="Delete order"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(page - 1)}
                className="btn btn-secondary"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              
              <div className="pagination-info">
                Page {page} of {totalPages} • {orders.length} orders
              </div>
              
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="btn btn-secondary"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}