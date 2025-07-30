import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { 
  Users as UsersIcon, 
  UserPlus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Download,
  Mail,
  Shield,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const frmRef = useRef();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [editId, setEditId] = useState();
  const [showForm, setShowForm] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = `${API_URL}/api/users/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(result.data.users || []);
      setTotalPages(result.data.total || 1);
    } catch (err) {
      console.log(err);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.token) {
      fetchUsers();
    }
  }, [page, user.token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const url = `${API_URL}/api/users/${id}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setError(null);
      fetchUsers();
    } catch (err) {
      console.log(err);
      setError("Failed to delete user. Please try again.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      setLoading(true);
      const url = `${API_URL}/api/users`;
      await axios.post(url, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setError(null);
      fetchUsers();
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.log(err);
      setError("Failed to add user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      role: user.role,
    });
    setShowForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      setLoading(true);
      const url = `${API_URL}/api/users/${editId}`;
      await axios.patch(url, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchUsers();
      setEditId();
      resetForm();
      setShowForm(false);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleSearch = () => {
    setPage(1);
    fetchUsers();
  };

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
            <UsersIcon size={28} />
            User Management
          </h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Manage user accounts and permissions
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary">
            <Download size={16} />
            Export
          </button>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            <UserPlus size={16} />
            Add User
          </button>
        </div>
      </div>

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            marginBottom: '20px'
          }}>
            <UserPlus size={20} />
            {editId ? 'Edit User' : 'Add New User'}
          </h3>
          
          <form ref={frmRef} onSubmit={editId ? handleUpdate : handleAdd}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}>
              <div className="form-group">
                <label className="form-label">
                  <User size={16} />
                  First Name
                </label>
                <input
                  name="firstName"
                  value={form.firstName}
                  type="text"
                  className="form-input"
                  placeholder="Enter first name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <User size={16} />
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={form.lastName}
                  type="text"
                  className="form-input"
                  placeholder="Enter last name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  name="email"
                  value={form.email}
                  type="email"
                  className="form-input"
                  placeholder="Enter email address"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Shield size={16} />
                  Password
                </label>
                <input
                  name="password"
                  value={form.password}
                  type="password"
                  className="form-input"
                  placeholder={editId ? "Leave blank to keep current" : "Enter password"}
                  onChange={handleChange}
                  required={!editId}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Shield size={16} />
                  Role
                </label>
                <select
                  name="role"
                  value={form.role}
                  className="form-select"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {editId ? (
                <>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update User'}
                  </button>
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add User'}
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Search and Filters */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="search-container">
          <div style={{ position: 'relative', flex: 1 }}>
            <Search 
              size={18} 
              style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} 
            />
            <input
              type="text"
              className="search-input"
              placeholder="Search users by name or email..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              style={{ paddingLeft: '44px' }}
            />
          </div>
          <button onClick={handleSearch} className="btn btn-primary">
            <Search size={16} />
            Search
          </button>
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

      {/* Users Table */}
      <div className="card">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <span>Loading users...</span>
          </div>
        ) : users.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            color: 'var(--text-secondary)'
          }}>
            <UsersIcon size={64} style={{ opacity: 0.3, marginBottom: '16px' }} />
            <h3>No users found</h3>
            <p>Try adjusting your search criteria or add a new user.</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((userItem) => (
                    <tr key={userItem._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'var(--gradient-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '600'
                          }}>
                            {userItem.firstName?.charAt(0)}{userItem.lastName?.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: '600' }}>
                              {userItem.firstName} {userItem.lastName}
                            </div>
                            <div style={{ 
                              fontSize: '12px', 
                              color: 'var(--text-secondary)' 
                            }}>
                              ID: {userItem._id?.slice(-8)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Mail size={14} color="var(--text-muted)" />
                          {userItem.email}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${userItem.role === 'admin' ? 'badge-completed' : 'badge-pending'}`}>
                          <Shield size={12} />
                          {userItem.role}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-completed">
                          Active
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => handleEdit(userItem)}
                            className="btn btn-secondary btn-sm"
                            title="Edit user"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => handleDelete(userItem._id)}
                            className="btn btn-danger btn-sm"
                            title="Delete user"
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
                Page {page} of {totalPages} • {users.length} users
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