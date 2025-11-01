import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  LogOut, 
  Save, 
  Eye, 
  EyeOff,
  Shield,
  CheckCircle,
  AlertCircle,
  Award,
  Package,
  ShoppingBag,
  Clock,
  TrendingUp,
  Settings,
  Bell,
  CreditCard,
  MapPin,
  Phone,
  Calendar,
  Activity
} from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isVisible, setIsVisible] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();

  // Dark mode theme
  const theme = {
    bg: '#0f172a',
    bgSecondary: '#1e293b',
    bgTertiary: '#334155',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    border: '#334155',
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444'
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fetchProfile = async () => {
    try {
      const url = `${API_URL}/api/users/${user.id}/profile`;
      const result = await axios.get(url);
      setProfile(result.data);
      setForm({
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        email: result.data.email
      });
    } catch (err) {
      console.log(err);
      setError("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    setUser({});
    Navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const url = `${API_URL}/api/users/${profile._id}/profile`;
      const result = await axios.patch(url, form);
      await fetchProfile();
      setSuccess("Profile updated successfully!");
      setForm({ ...form, password: "" });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Mock stats - replace with actual data from your API
  const userStats = [
    { icon: ShoppingBag, label: 'Total Orders', value: '24', color: theme.primary },
    { icon: Package, label: 'Active Orders', value: '3', color: theme.warning },
    { icon: Award, label: 'Loyalty Points', value: '1,250', color: theme.success },
    { icon: TrendingUp, label: 'Total Spent', value: '₹45,680', color: '#8b5cf6' }
  ];

  const activityLog = [
    { action: 'Order Placed', details: 'Order #12345', time: '2 hours ago', icon: ShoppingBag },
    { action: 'Profile Updated', details: 'Email address changed', time: '1 day ago', icon: User },
    { action: 'Password Changed', details: 'Security update', time: '3 days ago', icon: Lock },
    { action: 'Order Delivered', details: 'Order #12340', time: '5 days ago', icon: Package }
  ];

  return (
    <div 
      className="page-wrapper" 
      style={{ 
        background: theme.bg, 
        minHeight: '100vh',
        paddingTop: '40px',
        paddingBottom: '60px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out'
      }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          animation: 'fadeInUp 0.6s ease-out'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: `linear-gradient(135deg, ${theme.primary} 0%, #8b5cf6 100%)`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
            position: 'relative',
            animation: 'scaleIn 0.5s ease-out'
          }}>
            <User size={50} color="white" strokeWidth={2} />
            <div style={{
              position: 'absolute',
              bottom: '5px',
              right: '5px',
              width: '24px',
              height: '24px',
              background: theme.success,
              borderRadius: '50%',
              border: `3px solid ${theme.bg}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle size={14} color="white" />
            </div>
          </div>
          <h1 style={{ 
            fontSize: '2.8rem', 
            marginBottom: '12px', 
            color: theme.text, 
            fontWeight: '800',
            background: `linear-gradient(135deg, ${theme.primary} 0%, #8b5cf6 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {profile.firstName} {profile.lastName}
          </h1>
          <p style={{ 
            color: theme.textSecondary, 
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <Mail size={18} />
            {profile.email}
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {userStats.map((stat, index) => (
            <div 
              key={index}
              style={{
                background: theme.bgSecondary,
                padding: '24px',
                borderRadius: '16px',
                border: `1px solid ${theme.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
              }}
              className="stat-card-profile"
            >
              <div style={{
                width: '56px',
                height: '56px',
                background: `${stat.color}20`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <stat.icon size={28} color={stat.color} />
              </div>
              <div>
                <div style={{ 
                  fontSize: '28px', 
                  fontWeight: '700', 
                  color: theme.text,
                  marginBottom: '4px'
                }}>
                  {stat.value}
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  color: theme.textSecondary,
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Messages */}
        {error && (
          <div style={{ 
            background: '#7f1d1d', 
            color: '#fecaca', 
            padding: '16px 20px', 
            borderRadius: '12px', 
            marginBottom: '24px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            border: '1px solid #991b1b',
            animation: 'slideInDown 0.3s ease-out'
          }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div style={{ 
            background: '#14532d', 
            color: '#bbf7d0', 
            padding: '16px 20px', 
            borderRadius: '12px', 
            marginBottom: '24px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            border: '1px solid #166534',
            animation: 'slideInDown 0.3s ease-out'
          }}>
            <CheckCircle size={20} />
            <span>{success}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}>
          {[
            { id: 'profile', label: 'Profile Settings', icon: User },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'activity', label: 'Activity', icon: Activity }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                background: activeTab === tab.id ? `linear-gradient(135deg, ${theme.primary} 0%, #8b5cf6 100%)` : theme.bgSecondary,
                color: activeTab === tab.id ? 'white' : theme.textSecondary,
                border: `1px solid ${activeTab === tab.id ? 'transparent' : theme.border}`,
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: activeTab === 'profile' ? 'repeat(auto-fit, minmax(500px, 1fr))' : '1fr',
          gap: '24px'
        }}>
          {/* Profile Settings Tab */}
          {activeTab === 'profile' && (
            <>
              {/* Edit Profile Form */}
              <div style={{ 
                background: theme.bgSecondary, 
                borderRadius: '16px', 
                padding: '32px', 
                border: `1px solid ${theme.border}`, 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                animation: 'fadeIn 0.4s ease-out'
              }}>
                <h2 style={{ 
                  color: theme.text, 
                  marginBottom: '24px', 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px' 
                }}>
                  <Settings size={24} color={theme.primary} />
                  Edit Profile
                </h2>

                <form onSubmit={handleSubmit}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                    gap: '20px', 
                    marginBottom: '20px' 
                  }}>
                    <div>
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        marginBottom: '10px', 
                        color: theme.text, 
                        fontSize: '14px', 
                        fontWeight: '600' 
                      }}>
                        <User size={16} />
                        First Name
                      </label>
                      <input 
                        name="firstName" 
                        type="text" 
                        onChange={handleChange} 
                        value={form.firstName || ''} 
                        required 
                        className="form-input" 
                        style={{ 
                          width: '100%', 
                          padding: '14px 16px', 
                          background: theme.bgTertiary, 
                          border: `2px solid ${theme.border}`, 
                          borderRadius: '12px', 
                          color: theme.text, 
                          fontSize: '15px', 
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }} 
                      />
                    </div>
                    <div>
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        marginBottom: '10px', 
                        color: theme.text, 
                        fontSize: '14px', 
                        fontWeight: '600' 
                      }}>
                        <User size={16} />
                        Last Name
                      </label>
                      <input 
                        name="lastName" 
                        type="text" 
                        onChange={handleChange} 
                        value={form.lastName || ''} 
                        required 
                        className="form-input" 
                        style={{ 
                          width: '100%', 
                          padding: '14px 16px', 
                          background: theme.bgTertiary, 
                          border: `2px solid ${theme.border}`, 
                          borderRadius: '12px', 
                          color: theme.text, 
                          fontSize: '15px', 
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }} 
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      marginBottom: '10px', 
                      color: theme.text, 
                      fontSize: '14px', 
                      fontWeight: '600' 
                    }}>
                      <Mail size={16} />
                      Email Address
                    </label>
                    <input 
                      name="email" 
                      type="email" 
                      onChange={handleChange} 
                      value={form.email || ''} 
                      required 
                      className="form-input" 
                      style={{ 
                        width: '100%', 
                        padding: '14px 16px', 
                        background: theme.bgTertiary, 
                        border: `2px solid ${theme.border}`, 
                        borderRadius: '12px', 
                        color: theme.text, 
                        fontSize: '15px', 
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }} 
                    />
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      marginBottom: '10px', 
                      color: theme.text, 
                      fontSize: '14px', 
                      fontWeight: '600' 
                    }}>
                      <Lock size={16} />
                      New Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        name="password" 
                        type={showPassword ? "text" : "password"} 
                        onChange={handleChange} 
                        value={form.password || ''} 
                        placeholder="Leave blank to keep current password" 
                        className="form-input" 
                        style={{ 
                          width: '100%', 
                          padding: '14px 48px 14px 16px', 
                          background: theme.bgTertiary, 
                          border: `2px solid ${theme.border}`, 
                          borderRadius: '12px', 
                          color: theme.text, 
                          fontSize: '15px', 
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }} 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        style={{ 
                          position: 'absolute', 
                          right: '12px', 
                          top: '50%', 
                          transform: 'translateY(-50%)', 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer', 
                          color: theme.textSecondary, 
                          display: 'flex', 
                          alignItems: 'center', 
                          padding: '8px',
                          borderRadius: '8px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <p style={{ 
                      fontSize: '12px', 
                      color: theme.textSecondary, 
                      marginTop: '8px', 
                      marginLeft: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <AlertCircle size={14} />
                      Only fill this to change your password
                    </p>
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button 
                      type="submit" 
                      disabled={loading} 
                      style={{ 
                        flex: '1', 
                        minWidth: '180px', 
                        padding: '16px 28px', 
                        background: loading ? theme.bgTertiary : `linear-gradient(135deg, ${theme.primary} 0%, #8b5cf6 100%)`, 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '12px', 
                        fontSize: '16px', 
                        fontWeight: '700', 
                        cursor: loading ? 'not-allowed' : 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '10px', 
                        boxShadow: loading ? 'none' : '0 4px 16px rgba(59, 130, 246, 0.4)', 
                        opacity: loading ? 0.7 : 1,
                        transition: 'all 0.3s ease'
                      }}
                      className="save-btn"
                    >
                      <Save size={20} />
                      {loading ? 'Updating...' : 'Save Changes'}
                    </button>
                    <button 
                      type="button" 
                      onClick={logout} 
                      style={{ 
                        flex: '1', 
                        minWidth: '180px', 
                        padding: '16px 28px', 
                        background: theme.bgTertiary, 
                        color: theme.danger, 
                        border: `2px solid ${theme.border}`, 
                        borderRadius: '12px', 
                        fontSize: '16px', 
                        fontWeight: '700', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '10px', 
                        transition: 'all 0.3s ease' 
                      }}
                      className="logout-btn"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  </div>
                </form>
              </div>

              {/* Account Info Sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Account Details */}
                <div style={{ 
                  background: theme.bgSecondary, 
                  borderRadius: '16px', 
                  padding: '28px', 
                  border: `1px solid ${theme.border}`,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                  animation: 'fadeIn 0.5s ease-out'
                }}>
                  <h3 style={{ 
                    color: theme.text, 
                    marginBottom: '20px', 
                    fontSize: '1.25rem', 
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <User size={22} color={theme.primary} />
                    Account Details
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{
                      padding: '14px',
                      background: theme.bgTertiary,
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: theme.textSecondary, fontSize: '14px', fontWeight: '500' }}>Role</span>
                      <div style={{ 
                        padding: '6px 14px', 
                        background: profile.role === 'admin' ? '#8b5cf6' : theme.primary, 
                        color: 'white', 
                        borderRadius: '8px', 
                        fontSize: '13px', 
                        fontWeight: '700', 
                        textTransform: 'capitalize'
                      }}>
                        {profile.role || 'User'}
                      </div>
                    </div>
                    <div style={{
                      padding: '14px',
                      background: theme.bgTertiary,
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: theme.textSecondary, fontSize: '14px', fontWeight: '500' }}>Member Since</span>
                      <span style={{ color: theme.text, fontWeight: '600', fontSize: '14px' }}>
                        {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                      </span>
                    </div>
                    <div style={{
                      padding: '14px',
                      background: theme.bgTertiary,
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: theme.textSecondary, fontSize: '14px', fontWeight: '500' }}>Account Status</span>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: theme.success,
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        <CheckCircle size={16} />
                        Active
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div style={{ 
                  background: theme.bgSecondary, 
                  borderRadius: '16px', 
                  padding: '28px', 
                  border: `1px solid ${theme.border}`,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                  animation: 'fadeIn 0.6s ease-out'
                }}>
                  <h3 style={{ 
                    color: theme.text, 
                    marginBottom: '20px', 
                    fontSize: '1.25rem', 
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <Settings size={22} color={theme.primary} />
                    Quick Actions
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { icon: ShoppingBag, label: 'View Orders', href: '/orders', color: theme.primary },
                      { icon: Package, label: 'Track Shipment', href: '/track', color: theme.warning },
                      { icon: Bell, label: 'Notifications', href: '/notifications', color: '#8b5cf6' },
                      { icon: CreditCard, label: 'Payment Methods', href: '/payments', color: theme.success }
                    ].map((action, index) => (
                      <a
                        key={index}
                        href={action.href}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '14px 16px',
                          background: theme.bgTertiary,
                          borderRadius: '10px',
                          textDecoration: 'none',
                          color: theme.text,
                          transition: 'all 0.3s ease',
                          border: `1px solid ${theme.border}`
                        }}
                        className="quick-action"
                      >
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: `${action.color}20`,
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <action.icon size={20} color={action.color} />
                        </div>
                        <span style={{ fontWeight: '600', fontSize: '14px' }}>{action.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div style={{ 
              background: theme.bgSecondary, 
              borderRadius: '16px', 
              padding: '32px', 
              border: `1px solid ${theme.border}`,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              animation: 'fadeIn 0.4s ease-out',
              maxWidth: '800px'
            }}>
              <h2 style={{ 
                color: theme.text, 
                marginBottom: '24px', 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px' 
              }}>
                <Shield size={24} color={theme.primary} />
                Security Settings
              </h2>

              {/* Security Tips */}
              <div style={{ 
                marginBottom: '32px', 
                padding: '24px', 
                background: 'rgba(59, 130, 246, 0.1)', 
                borderRadius: '12px', 
                border: '1px solid rgba(59, 130, 246, 0.2)' 
              }}>
                <h4 style={{ 
                  color: theme.text, 
                  marginBottom: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  fontSize: '16px',
                  fontWeight: '700'
                }}>
                  <Shield size={18} color={theme.primary} />
                  Security Best Practices
                </h4>
                <ul style={{ 
                  color: theme.textSecondary, 
                  fontSize: '14px', 
                  margin: 0, 
                  paddingLeft: '24px', 
                  lineHeight: '2',
                  listStyleType: 'none'
                }}>
                  {[
                    'Use a strong, unique password with at least 12 characters',
                    'Enable two-factor authentication for extra security',
                    'Never share your password with anyone',
                    'Always logout from shared or public devices',
                    'Review your account activity regularly',
                    'Keep your contact information up to date'
                  ].map((tip, index) => (
                    <li key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'start', 
                      gap: '10px',
                      marginBottom: '8px'
                    }}>
                      <CheckCircle size={16} color={theme.success} style={{ marginTop: '4px', flexShrink: 0 }} />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Security Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  padding: '20px',
                  background: theme.bgTertiary,
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: `1px solid ${theme.border}`
                }}>
                  <div>
                    <h5 style={{ color: theme.text, fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>
                      Password
                    </h5>
                    <p style={{ color: theme.textSecondary, fontSize: '13px', margin: 0 }}>
                      Last changed 3 days ago
                    </p>
                  </div>
                  <button style={{
                    padding: '10px 20px',
                    background: theme.primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    Change
                  </button>
                </div>

                <div style={{
                  padding: '20px',
                  background: theme.bgTertiary,
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: `1px solid ${theme.border}`
                }}>
                  <div>
                    <h5 style={{ color: theme.text, fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>
                      Two-Factor Authentication
                    </h5>
                    <p style={{ color: theme.textSecondary, fontSize: '13px', margin: 0 }}>
                      Add an extra layer of security
                    </p>
                  </div>
                  <button style={{
                    padding: '10px 20px',
                    background: theme.success,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    Enable
                  </button>
                </div>

                <div style={{
                  padding: '20px',
                  background: theme.bgTertiary,
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: `1px solid ${theme.border}`
                }}>
                  <div>
                    <h5 style={{ color: theme.text, fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>
                      Active Sessions
                    </h5>
                    <p style={{ color: theme.textSecondary, fontSize: '13px', margin: 0 }}>
                      Manage your active login sessions
                    </p>
                  </div>
                  <button style={{
                    padding: '10px 20px',
                    background: theme.bgSecondary,
                    color: theme.text,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    View All
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div style={{ 
              background: theme.bgSecondary, 
              borderRadius: '16px', 
              padding: '32px', 
              border: `1px solid ${theme.border}`,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              animation: 'fadeIn 0.4s ease-out',
              maxWidth: '900px'
            }}>
              <h2 style={{ 
                color: theme.text, 
                marginBottom: '24px', 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px' 
              }}>
                <Activity size={24} color={theme.primary} />
                Recent Activity
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activityLog.map((activity, index) => (
                  <div 
                    key={index}
                    style={{
                      padding: '20px',
                      background: theme.bgTertiary,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      border: `1px solid ${theme.border}`,
                      transition: 'all 0.3s ease',
                      animation: `fadeInUp 0.4s ease-out ${index * 0.1}s backwards`
                    }}
                    className="activity-item"
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: `${theme.primary}20`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <activity.icon size={24} color={theme.primary} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h5 style={{ 
                        color: theme.text, 
                        fontSize: '16px', 
                        fontWeight: '700', 
                        marginBottom: '4px' 
                      }}>
                        {activity.action}
                      </h5>
                      <p style={{ 
                        color: theme.textSecondary, 
                        fontSize: '14px', 
                        margin: 0 
                      }}>
                        {activity.details}
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: theme.textSecondary,
                      fontSize: '13px',
                      whiteSpace: 'nowrap'
                    }}>
                      <Clock size={14} />
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-card-profile:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          border-color: ${theme.primary};
        }

        .form-input:focus {
          border-color: ${theme.primary} !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .save-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
        }

        .logout-btn:hover {
          background: ${theme.bgSecondary};
          border-color: ${theme.danger};
          transform: translateY(-2px);
        }

        .quick-action:hover {
          transform: translateX(6px);
          background: ${theme.bgSecondary};
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .activity-item:hover {
          transform: translateX(6px);
          background: ${theme.bgSecondary};
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 16px !important;
          }
          
          h1 {
            font-size: 2rem !important;
          }

          .stat-card-profile {
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
