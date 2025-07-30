import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import axios from "axios";
import { AppContext } from "../App";

export default function Login() {
  const { setUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');
      
      const url = `${API_URL}/api/users/login`;
      const response = await axios.post(url, formData);
      
      if (response.data) {
        // Store token if available
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          if (rememberMe) {
            localStorage.setItem('userEmail', formData.email);
          }
        }
        
        // Set user in context
        setUser(response.data.user || response.data);
        
        // Show success message
        setSuccessMessage('Login successful! Redirecting...');
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Load saved email on component mount
  React.useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="page-wrapper animate-fadeIn">
      <div className="container">
        <div style={{ 
          maxWidth: '420px', 
          margin: '0 auto',
          paddingTop: '40px'
        }}>
          <div className="card glass-card">
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div className="animate-float" style={{ 
                width: '80px',
                height: '80px',
                background: 'var(--gradient-primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <LogIn size={36} color="white" />
              </div>
              <h2 className="gradient-text">Welcome Back!</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Sign in to your account to continue shopping
              </p>
            </div>

            {/* Messages */}
            {error && (
              <div className="alert error animate-slideInRight">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="alert success animate-slideInRight">
                <CheckCircle size={20} />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group animate-fadeInUp">
                <label className="form-label">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="email"
                  disabled={loading}
                />
              </div>

              <div className="form-group animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                <label className="form-label">
                  <Lock size={16} />
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    autoComplete="current-password"
                    disabled={loading}
                    style={{ paddingRight: '48px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-secondary)',
                      padding: '4px',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'all 0.2s ease'
                    }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '24px'
              }} className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: 'var(--text-secondary)'
                }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ cursor: 'pointer' }}
                  />
                  Remember me
                </label>
                
                <Link 
                  to="/forgot-password" 
                  style={{ 
                    color: 'var(--text-secondary)', 
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s ease'
                  }}
                  className="hover-link"
                >
                  Forgot password?
                </Link>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg animate-fadeInUp"
                style={{ 
                  width: '100%', 
                  marginBottom: '16px',
                  animationDelay: '0.3s'
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="spinner" style={{ width: '16px', height: '16px' }} />
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Social Login Options */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ 
                  textAlign: 'center', 
                  position: 'relative',
                  marginBottom: '20px'
                }}>
                  <span style={{
                    background: 'var(--bg-primary)',
                    padding: '0 12px',
                    color: 'var(--text-muted)',
                    fontSize: '13px',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    Or continue with
                  </span>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'var(--border-color)',
                    zIndex: 0
                  }} />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                    onClick={() => console.log('Google login')}
                  >
                    <img 
                      src="https://www.google.com/favicon.ico" 
                      alt="Google"
                      style={{ width: '16px', height: '16px' }}
                    />
                    Google
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                    onClick={() => console.log('GitHub login')}
                  >
                    <img 
                      src="https://github.com/favicon.ico" 
                      alt="GitHub"
                      style={{ width: '16px', height: '16px' }}
                    />
                    GitHub
                  </button>
                </div>
              </div>
            </form>

            {/* Register Link */}
            <div style={{ textAlign: 'center' }} className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  style={{ 
                    color: '#667eea', 
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}
                  className="hover-link"
                >
                  Create one here
                </Link>
              </p>
              
              {/* Demo Credentials */}
              <div style={{ 
                fontSize: '13px', 
                color: 'var(--text-muted)',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '16px',
                marginTop: '16px'
              }}>
                <p style={{ fontWeight: '600', marginBottom: '8px' }}>
                  Demo Credentials:
                </p>
                <div style={{
                  background: 'var(--bg-tertiary)',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'monospace',
                  lineHeight: '1.6'
                }}>
                  <p>Email: demo@example.com</p>
                  <p>Password: demo123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom styles for this component */}
      <style jsx>{`
        .hover-link:hover {
          color: #5a67d8 !important;
          text-decoration: underline !important;
        }

        .password-toggle:hover {
          background: var(--bg-tertiary) !important;
        }

        .form-input:focus + .password-toggle {
          color: #667eea !important;
        }

        @media (max-width: 480px) {
          .card {
            margin: 0 -16px;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
}