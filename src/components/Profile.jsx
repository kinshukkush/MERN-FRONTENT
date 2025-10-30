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
  AlertCircle
} from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    primaryDark: '#2563eb'
  };

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

  return (
    <div className="page-wrapper fade-in" style={{ 
      background: theme.bg, 
      minHeight: '100vh',
      paddingTop: '40px',
      paddingBottom: '40px'
    }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: `linear-gradient(135deg, ${theme.primary} 0%, #8b5cf6 100%)`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
          }}>
            <User size={40} color="white" />
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: theme.text, fontWeight: '700' }}>
            My Profile
          </h1>
          <p style={{ color: theme.textSecondary, fontSize: '18px' }}>
            Manage your account settings
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div style={{ background: '#7f1d1d', color: '#fecaca', padding: '16px 20px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #991b1b' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div style={{ background: '#14532d', color: '#bbf7d0', padding: '16px 20px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #166534' }}>
            <CheckCircle size={20} />
            <span>{success}</span>
          </div>
        )}

        {/* Main Content */}
        <div style={{ background: theme.bgSecondary, borderRadius: '16px', padding: '32px', border: `1px solid ${theme.border}`, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>
          <h2 style={{ color: theme.text, marginBottom: '24px', fontSize: '1.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield size={24} color={theme.primary} />
            Account Information
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: theme.text, fontSize: '14px', fontWeight: '500' }}>
                  <User size={16} />
                  First Name
                </label>
                <input name="firstName" type="text" onChange={handleChange} value={form.firstName || ''} required className="form-input" style={{ width: '100%', padding: '12px 16px', background: theme.bgTertiary, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.text, fontSize: '16px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: theme.text, fontSize: '14px', fontWeight: '500' }}>
                  <User size={16} />
                  Last Name
                </label>
                <input name="lastName" type="text" onChange={handleChange} value={form.lastName || ''} required className="form-input" style={{ width: '100%', padding: '12px 16px', background: theme.bgTertiary, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.text, fontSize: '16px', outline: 'none' }} />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: theme.text, fontSize: '14px', fontWeight: '500' }}>
                <Mail size={16} />
                Email Address
              </label>
              <input name="email" type="email" onChange={handleChange} value={form.email || ''} required className="form-input" style={{ width: '100%', padding: '12px 16px', background: theme.bgTertiary, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.text, fontSize: '16px', outline: 'none' }} />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: theme.text, fontSize: '14px', fontWeight: '500' }}>
                <Lock size={16} />
                New Password
              </label>
              <div style={{ position: 'relative' }}>
                <input name="password" type={showPassword ? "text" : "password"} onChange={handleChange} value={form.password || ''} placeholder="Leave blank to keep current password" className="form-input" style={{ width: '100%', padding: '12px 48px 12px 16px', background: theme.bgTertiary, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.text, fontSize: '16px', outline: 'none' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: theme.textSecondary, display: 'flex', alignItems: 'center', padding: '4px' }}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p style={{ fontSize: '12px', color: theme.textSecondary, marginTop: '6px', marginLeft: '4px' }}>
                Only fill this to change password
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="submit" disabled={loading} style={{ flex: '1', minWidth: '200px', padding: '14px 24px', background: `linear-gradient(135deg, ${theme.primary} 0%, #8b5cf6 100%)`, color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', opacity: loading ? 0.7 : 1 }}>
                <Save size={20} />
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
              <button type="button" onClick={logout} style={{ flex: '1', minWidth: '200px', padding: '14px 24px', background: theme.bgTertiary, color: '#ef4444', border: `1px solid ${theme.border}`, borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s ease' }}>
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </form>

          {/* Account Info */}
          <div style={{ marginTop: '32px', padding: '20px', background: theme.bgTertiary, borderRadius: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <span style={{ color: theme.textSecondary, fontSize: '14px' }}>Role</span>
              <div style={{ marginTop: '6px', padding: '6px 12px', background: profile.role === 'admin' ? '#8b5cf6' : theme.primary, color: 'white', borderRadius: '8px', fontSize: '14px', fontWeight: '600', textTransform: 'capitalize', display: 'inline-block' }}>
                {profile.role || 'User'}
              </div>
            </div>
            <div>
              <span style={{ color: theme.textSecondary, fontSize: '14px' }}>Member Since</span>
              <div style={{ marginTop: '6px', color: theme.text, fontWeight: '500' }}>
                {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <h4 style={{ color: theme.text, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
            <Shield size={18} color={theme.primary} />
            Security Tips
          </h4>
          <ul style={{ color: theme.textSecondary, fontSize: '14px', margin: 0, paddingLeft: '24px', lineHeight: '1.8' }}>
            <li>Use a strong, unique password</li>
            <li>Never share your password</li>
            <li>Logout from shared devices</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
