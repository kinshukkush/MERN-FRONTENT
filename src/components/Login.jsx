import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import axios from "axios";
import { AppContext } from "../App";

export default function Login() {
  // Add comprehensive CSS for input styling
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .login-input {
        width: 100% !important;
        padding: 14px 16px !important;
        background: rgba(51, 65, 85, 0.5) !important;
        border: 1px solid rgba(148, 163, 184, 0.2) !important;
        border-radius: 12px !important;
        color: #f1f5f9 !important;
        font-size: 15px !important;
        outline: none !important;
        transition: all 0.3s ease !important;
        box-sizing: border-box !important;
        font-family: inherit !important;
      }
      .login-input::placeholder {
        color: rgba(148, 163, 184, 0.6) !important;
        opacity: 1 !important;
      }
      .login-input:focus {
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        background: rgba(51, 65, 85, 0.8) !important;
      }
      .login-input:disabled {
        opacity: 0.5 !important;
        cursor: not-allowed !important;
      }
      .login-input:-webkit-autofill,
      .login-input:-webkit-autofill:hover,
      .login-input:-webkit-autofill:focus {
        -webkit-text-fill-color: #f1f5f9 !important;
        -webkit-box-shadow: 0 0 0px 1000px rgba(51, 65, 85, 0.5) inset !important;
        transition: background-color 5000s ease-in-out 0s !important;
        border: 1px solid rgba(148, 163, 184, 0.2) !important;
      }
      .login-password-input {
        padding-right: 48px !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

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
    <div style={{ 
      minHeight: '100vh',
      background: '#0f172a',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0
      }}>
        {/* Floating Circles - Left Side */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '0s'
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 15s ease-in-out infinite',
          animationDelay: '2s'
        }} />
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '15%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 18s ease-in-out infinite',
          animationDelay: '4s'
        }} />

        {/* Floating Circles - Right Side */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 22s ease-in-out infinite',
          animationDelay: '1s'
        }} />
        <div style={{
          position: 'absolute',
          top: '65%',
          right: '5%',
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 16s ease-in-out infinite',
          animationDelay: '3s'
        }} />
        <div style={{
          position: 'absolute',
          top: '40%',
          right: '12%',
          width: '220px',
          height: '220px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 19s ease-in-out infinite',
          animationDelay: '5s'
        }} />

        {/* Diagonal Moving Lines */}
        <svg style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.1
        }}>
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="20%" x2="100%" y2="30%" stroke="url(#lineGradient1)" strokeWidth="2">
            <animate attributeName="x1" values="-100%;100%" dur="15s" repeatCount="indefinite" />
            <animate attributeName="x2" values="0%;200%" dur="15s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="70%" x2="100%" y2="80%" stroke="url(#lineGradient2)" strokeWidth="2">
            <animate attributeName="x1" values="100%;-100%" dur="20s" repeatCount="indefinite" />
            <animate attributeName="x2" values="200%;0%" dur="20s" repeatCount="indefinite" />
          </line>
        </svg>

        {/* Grid Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Login Card Container */}
      <div style={{ 
        maxWidth: '460px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        animation: 'fadeInUp 0.8s ease-out'
      }}>
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ 
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
              animation: 'pulse 3s ease-in-out infinite',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-5px',
                left: '-5px',
                right: '-5px',
                bottom: '-5px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                borderRadius: '50%',
                opacity: 0.3,
                animation: 'ripple 2s ease-out infinite'
              }} />
              <LogIn size={36} color="white" style={{ position: 'relative', zIndex: 1 }} />
            </div>
            <h1 style={{ 
              fontSize: '2rem',
              marginBottom: '8px',
              color: '#f1f5f9',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Welcome Back!
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '16px' }}>
              Sign in to continue your shopping journey
            </p>
          </div>

          {/* Messages */}
          {error && (
            <div style={{
              background: 'rgba(127, 29, 29, 0.5)',
              color: '#fecaca',
              padding: '14px 16px',
              borderRadius: '12px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid rgba(153, 27, 27, 0.3)',
              animation: 'slideInRight 0.3s ease-out'
            }}>
              <AlertCircle size={20} />
              <span style={{ fontSize: '14px' }}>{error}</span>
            </div>
          )}

          {successMessage && (
            <div style={{
              background: 'rgba(20, 83, 45, 0.5)',
              color: '#bbf7d0',
              padding: '14px 16px',
              borderRadius: '12px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid rgba(22, 101, 52, 0.3)',
              animation: 'slideInRight 0.3s ease-out'
            }}>
              <CheckCircle size={20} />
              <span style={{ fontSize: '14px' }}>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                color: '#f1f5f9',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
                disabled={loading}
                className="login-input"
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                color: '#f1f5f9',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                <Lock size={16} />
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  autoComplete="current-password"
                  disabled={loading}
                  className="login-input login-password-input"
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
                    color: '#cbd5e1',
                    padding: '6px',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(51, 65, 85, 0.8)';
                    e.target.style.color = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'none';
                    e.target.style.color = '#cbd5e1';
                  }}
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
            }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#cbd5e1'
              }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ 
                    cursor: 'pointer',
                    width: '16px',
                    height: '16px'
                  }}
                />
                Remember me
              </label>
              
              <Link 
                to="/forgot-password" 
                style={{ 
                  color: '#60a5fa', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                onMouseLeave={(e) => e.target.style.color = '#60a5fa'}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              style={{ 
                width: '100%',
                padding: '14px 24px',
                background: loading ? 'rgba(59, 130, 246, 0.5)' : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(59, 130, 246, 0.4)',
                marginBottom: '24px'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.4)';
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div style={{ 
              textAlign: 'center', 
              position: 'relative',
              marginBottom: '24px'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '1px',
                background: 'rgba(148, 163, 184, 0.2)'
              }} />
              <span style={{
                background: 'rgba(30, 41, 59, 0.8)',
                padding: '0 16px',
                color: '#94a3b8',
                fontSize: '13px',
                position: 'relative',
                zIndex: 1
              }}>
                Or continue with
              </span>
            </div>

            {/* Social Login */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'rgba(51, 65, 85, 0.5)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '12px',
                  color: '#f1f5f9',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(51, 65, 85, 0.8)';
                  e.target.style.borderColor = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                  e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                }}
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '18px', height: '18px' }} />
                Google
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'rgba(51, 65, 85, 0.5)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '12px',
                  color: '#f1f5f9',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(51, 65, 85, 0.8)';
                  e.target.style.borderColor = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                  e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                }}
              >
                <img src="https://github.com/favicon.ico" alt="GitHub" style={{ width: '18px', height: '18px' }} />
                GitHub
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
            <p style={{ color: '#cbd5e1', marginBottom: '16px', fontSize: '14px' }}>
              Don't have an account?{' '}
              <Link 
                to="/register" 
                style={{ 
                  color: '#60a5fa', 
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                onMouseLeave={(e) => e.target.style.color = '#60a5fa'}
              >
                Create one here
              </Link>
            </p>
            
            {/* Demo Credentials */}
            <div style={{ 
              fontSize: '13px', 
              color: '#94a3b8',
              marginTop: '20px'
            }}>
              <p style={{ fontWeight: '600', marginBottom: '12px', color: '#cbd5e1' }}>
                🎯 Demo Credentials:
              </p>
              <div style={{
                background: 'rgba(51, 65, 85, 0.5)',
                padding: '16px',
                borderRadius: '12px',
                fontFamily: 'monospace',
                lineHeight: '1.8',
                border: '1px solid rgba(148, 163, 184, 0.1)'
              }}>
                <p style={{ color: '#60a5fa' }}>📧 demo@example.com</p>
                <p style={{ color: '#a78bfa' }}>🔐 demo123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -20px) scale(1.05);
          }
          50% {
            transform: translate(-15px, 15px) scale(0.95);
          }
          75% {
            transform: translate(15px, 10px) scale(1.02);
          }
        }

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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 640px) {
          .floating-circle {
            width: 150px !important;
            height: 150px !important;
          }
        }
      `}</style>
    </div>
  );
}