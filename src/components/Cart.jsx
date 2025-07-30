import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  CreditCard, 
  ArrowLeft,
  Tag,
  Truck,
  Shield,
  RefreshCw,
  Info,
  X,
  Check,
  Moon,
  Sun,
  Wallet,
  Smartphone,
  Building
} from "lucide-react";
import { AppContext } from "../App";
import axios from "axios";

export default function Cart() {
  const { user, cart, setCart, isDarkMode, setIsDarkMode } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    bankAccount: ""
  });
  
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode);
  };

  // Available promo codes
  const promoCodes = {
    "SAVE10": 0.10,
    "SAVE20": 0.20,
    "FIRSTORDER": 0.15
  };

  // Payment methods
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, color: '#3b82f6' },
    { id: 'upi', name: 'UPI Payment', icon: Smartphone, color: '#10b981' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, color: '#f59e0b' },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet, color: '#8b5cf6' }
  ];

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decrement = (id, qty) => {
    if (qty > 1) {
      const updatedCart = cart.map((product) =>
        product._id === id ? { ...product, qty: qty - 1 } : product
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(product => product._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSuccess("Item removed from cart");
    setTimeout(() => setSuccess(""), 3000);
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCart([]);
      localStorage.removeItem('cart');
      setSuccess("Cart cleared successfully");
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const applyPromoCode = () => {
    const upperPromo = promoCode.toUpperCase();
    if (promoCodes[upperPromo]) {
      setDiscount(promoCodes[upperPromo]);
      setAppliedPromo(upperPromo);
      setSuccess(`Promo code ${upperPromo} applied! You saved ${promoCodes[upperPromo] * 100}%`);
      setError("");
    } else {
      setError("Invalid promo code");
      setSuccess("");
      setDiscount(0);
      setAppliedPromo("");
    }
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
  };

  const removePromoCode = () => {
    setDiscount(0);
    setAppliedPromo("");
    setPromoCode("");
    setSuccess("Promo code removed");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPayment) {
      setError("Please select a payment method");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue: total,
        subtotal: orderValue,
        discount: discountAmount,
        shipping,
        tax,
        items: cart,
        promoCode: appliedPromo,
        paymentMethod: selectedPayment,
        paymentStatus: 'completed'
      };
      
      const response = await axios.post(url, newOrder, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data) {
        setCart([]);
        localStorage.removeItem('cart');
        setShowPaymentModal(false);
        navigate("/order", { state: { orderId: response.data._id } });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const initiateCheckout = () => {
    if (!user?.token) {
      navigate("/login", { state: { from: '/cart' } });
      return;
    }
    setShowPaymentModal(true);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => sum + value.qty * value.price, 0)
    );
  }, [cart]);

  // Theme colors
  const theme = {
    bg: isDarkMode ? '#0f172a' : '#ffffff',
    bgSecondary: isDarkMode ? '#1e293b' : '#f9fafb',
    bgTertiary: isDarkMode ? '#334155' : '#f3f4f6',
    text: isDarkMode ? '#f1f5f9' : '#111827',
    textSecondary: isDarkMode ? '#cbd5e1' : '#6b7280',
    border: isDarkMode ? '#334155' : '#e5e7eb',
    cardBg: isDarkMode ? '#1e293b' : '#ffffff',
    hover: isDarkMode ? '#334155' : '#f3f4f6'
  };

  // Calculations
  const cartItemCount = cart.reduce((total, item) => total + (item.qty || 0), 0);
  const shipping = orderValue > 50 ? 0 : 9.99;
  const tax = orderValue * 0.08;
  const discountAmount = orderValue * discount;
  const total = orderValue - discountAmount + shipping + tax;

  return (
    <div className="page-wrapper" style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh' }}>
      <div className="container">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: theme.cardBg,
            border: `1px solid ${theme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          {isDarkMode ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} color="#6366f1" />}
        </button>

        {/* Header Section */}
        <div style={{ marginBottom: '24px' }}>
          <button 
            onClick={() => navigate('/')}
            className="btn btn-secondary"
            style={{ 
              marginBottom: '16px',
              backgroundColor: theme.bgSecondary,
              color: theme.text,
              border: `1px solid ${theme.border}`
            }}
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </button>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                marginBottom: '8px',
                color: theme.text
              }}>
                <ShoppingBag size={32} />
                Shopping Cart
              </h1>
              <p style={{ color: theme.textSecondary }}>
                {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            
            {cart.length > 0 && (
              <button 
                onClick={clearCart}
                className="btn btn-outline-danger"
                style={{
                  backgroundColor: 'transparent',
                  color: '#ef4444',
                  border: '1px solid #ef4444'
                }}
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="alert alert-danger fade-in" style={{ 
            backgroundColor: isDarkMode ? '#7f1d1d' : '#f8d7da', 
            color: isDarkMode ? '#fecaca' : '#721c24',
            padding: '12px 20px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            border: `1px solid ${isDarkMode ? '#991b1b' : '#f5c6cb'}`
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success fade-in" style={{ 
            backgroundColor: isDarkMode ? '#14532d' : '#d4edda', 
            color: isDarkMode ? '#bbf7d0' : '#155724',
            padding: '12px 20px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            border: `1px solid ${isDarkMode ? '#166534' : '#c3e6cb'}`
          }}>
            {success}
          </div>
        )}

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="card" style={{ 
            textAlign: 'center', 
            padding: '80px 20px',
            backgroundColor: theme.cardBg,
            border: `1px solid ${theme.border}`,
            boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <ShoppingBag size={80} style={{ margin: '0 auto 24px', opacity: 0.2 }} />
            <h2 style={{ marginBottom: '16px', color: theme.text }}>Your cart is empty</h2>
            <p style={{ color: theme.textSecondary, marginBottom: '32px', fontSize: '18px' }}>
              Looks like you haven't added any items to your cart yet.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="btn btn-primary btn-lg"
              style={{ padding: '12px 32px' }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: window.innerWidth > 768 ? '2fr 1fr' : '1fr', 
            gap: '24px' 
          }}>
            {/* Cart Items */}
            <div>
              <div className="card" style={{ 
                padding: '24px',
                backgroundColor: theme.cardBg,
                border: `1px solid ${theme.border}`,
                boxShadow: isDarkMode ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.06)'
              }}>
                <h3 style={{ marginBottom: '24px', fontSize: '20px', color: theme.text }}>Cart Items</h3>
                
                {cart.map((item) => (
                  <div key={item._id} className="cart-item" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '16px',
                    marginBottom: '16px',
                    backgroundColor: theme.bgSecondary,
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    border: `1px solid ${theme.border}`
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.hover}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.bgSecondary}
                  >
                    <img 
                      src={item.imgUrl || 'https://via.placeholder.com/150'} 
                      alt={item.productName}
                      onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                      style={{ 
                        width: '100px', 
                        height: '100px', 
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginRight: '20px'
                      }}
                    />
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{ marginBottom: '8px', fontSize: '18px', color: theme.text }}>{item.productName}</h4>
                      <p style={{ color: theme.textSecondary, fontSize: '14px', marginBottom: '12px' }}>
                        ${item.price.toFixed(2)} each
                      </p>
                      
                      <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center' }}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            decrement(item._id, item.qty);
                          }}
                          className="quantity-btn"
                          disabled={item.qty <= 1}
                          style={{
                            width: '32px',
                            height: '32px',
                            border: `1px solid ${theme.border}`,
                            borderRadius: '6px',
                            backgroundColor: item.qty <= 1 ? theme.bgTertiary : theme.cardBg,
                            cursor: item.qty <= 1 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: theme.text
                                                      }}
                        >
                          <Minus size={16} />
                        </button>
                        
                        <span style={{ 
                          margin: '0 16px', 
                          fontSize: '16px', 
                          fontWeight: '600',
                          minWidth: '40px',
                          textAlign: 'center',
                          color: theme.text
                        }}>
                          {item.qty}
                        </span>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            increment(item._id, item.qty);
                          }}
                          className="quantity-btn"
                          style={{
                            width: '32px',
                            height: '32px',
                            border: `1px solid ${theme.border}`,
                            borderRadius: '6px',
                            backgroundColor: theme.cardBg,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            color: theme.text
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.hover}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.cardBg}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right', minWidth: '120px' }}>
                      <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: theme.text }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item._id);
                        }}
                        className="btn btn-danger btn-sm"
                        style={{
                          padding: '6px 12px',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginLeft: 'auto'
                        }}
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginTop: '24px'
              }}>
                <div className="trust-badge" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  backgroundColor: theme.cardBg,
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`
                }}>
                  <Truck size={24} color="#3b82f6" />
                  <div>
                    <h5 style={{ margin: 0, fontSize: '14px', color: theme.text }}>Free Shipping</h5>
                    <p style={{ margin: 0, fontSize: '12px', color: theme.textSecondary }}>On orders over $50</p>
                  </div>
                </div>

                <div className="trust-badge" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  backgroundColor: theme.cardBg,
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`
                }}>
                  <Shield size={24} color="#10b981" />
                  <div>
                    <h5 style={{ margin: 0, fontSize: '14px', color: theme.text }}>Secure Checkout</h5>
                    <p style={{ margin: 0, fontSize: '12px', color: theme.textSecondary }}>SSL Encrypted</p>
                  </div>
                </div>

                <div className="trust-badge" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  backgroundColor: theme.cardBg,
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`
                }}>
                  <RefreshCw size={24} color="#f59e0b" />
                  <div>
                    <h5 style={{ margin: 0, fontSize: '14px', color: theme.text }}>Easy Returns</h5>
                    <p style={{ margin: 0, fontSize: '12px', color: theme.textSecondary }}>30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="card" style={{ 
                position: 'sticky', 
                top: '20px',
                padding: '24px',
                backgroundColor: theme.cardBg,
                border: `1px solid ${theme.border}`,
                boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ marginBottom: '24px', fontSize: '20px', color: theme.text }}>Order Summary</h3>
                
                {/* Promo Code Section */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'block', color: theme.text }}>
                    Promo Code
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: `1px solid ${theme.border}`,
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: theme.bgSecondary,
                        color: theme.text
                      }}
                    />
                    {!appliedPromo ? (
                      <button
                        onClick={applyPromoCode}
                        className="btn btn-secondary btn-sm"
                        style={{ 
                          padding: '8px 16px',
                          backgroundColor: theme.bgTertiary,
                          color: theme.text
                        }}
                      >
                        Apply
                      </button>
                    ) : (
                      <button
                        onClick={removePromoCode}
                        className="btn btn-outline-danger btn-sm"
                        style={{ padding: '8px 16px' }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div style={{ 
                    marginTop: '8px', 
                    fontSize: '12px', 
                    color: theme.textSecondary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Info size={12} />
                    Try: SAVE10, SAVE20, or FIRSTORDER
                  </div>
                </div>

                {/* Price Breakdown */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: theme.text }}>Subtotal ({cartItemCount} items)</span>
                    <span style={{ fontWeight: '500', color: theme.text }}>${orderValue.toFixed(2)}</span>
                  </div>
                  
                  {appliedPromo && (
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      marginBottom: '12px',
                      color: '#10b981'
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Tag size={14} />
                        Discount ({appliedPromo})
                      </span>
                      <span style={{ fontWeight: '500' }}>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: theme.text }}>Shipping</span>
                    <span style={{ 
                      fontWeight: '500',
                      color: shipping === 0 ? '#10b981' : theme.text
                    }}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: theme.text }}>Tax (8%)</span>
                    <span style={{ fontWeight: '500', color: theme.text }}>${tax.toFixed(2)}</span>
                  </div>
                  
                  <hr style={{ margin: '16px 0', borderColor: theme.border }} />
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '20px', 
                    fontWeight: '700',
                    color: theme.text
                  }}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Shipping Progress */}
                {orderValue < 50 && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ 
                      background: isDarkMode ? '#422006' : '#fef3c7', 
                      color: isDarkMode ? '#fbbf24' : '#92400e', 
                      padding: '12px', 
                      borderRadius: '8px', 
                      fontSize: '14px', 
                      marginBottom: '8px',
                      textAlign: 'center'
                    }}>
                      Add ${(50 - orderValue).toFixed(2)} more for free shipping!
                    </div>
                    <div style={{ 
                      height: '8px', 
                      backgroundColor: theme.bgTertiary, 
                      borderRadius: '4px', 
                      overflow: 'hidden' 
                    }}>
                      <div style={{ 
                        height: '100%', 
                        backgroundColor: '#f59e0b', 
                        width: `${(orderValue / 50) * 100}%`,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <button 
                  onClick={initiateCheckout}
                  disabled={loading || cart.length === 0}
                  className="btn btn-primary"
                  style={{ 
                    width: '100%', 
                    padding: '14px',
                    fontSize: '16px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginBottom: '16px'
                  }}
                >
                  <CreditCard size={20} />
                  {loading ? 'Processing...' : `Checkout • $${total.toFixed(2)}`}
                </button>

                {/* Security & Policy Info */}
                <div style={{ 
                  fontSize: '12px', 
                  color: theme.textSecondary, 
                  textAlign: 'center',
                  lineHeight: '1.6'
                }}>
                  <div style={{ marginBottom: '8px' }}>
                    🔒 Secure 256-bit SSL encryption
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '16px',
                    flexWrap: 'wrap'
                  }}>
                    <span>✓ 30-day returns</span>
                    <span>✓ 24/7 support</span>
                    <span>✓ 100% secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}>
            <div style={{
              backgroundColor: theme.cardBg,
              borderRadius: '16px',
              padding: '32px',
              width: '90%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: `1px solid ${theme.border}`
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '24px' 
              }}>
                <h2 style={{ margin: 0, color: theme.text }}>Select Payment Method</h2>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: theme.text
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Payment Methods */}
              <div style={{ marginBottom: '24px' }}>
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px',
                      marginBottom: '12px',
                      backgroundColor: selectedPayment === method.id ? method.color + '20' : theme.bgSecondary,
                      border: `2px solid ${selectedPayment === method.id ? method.color : theme.border}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <method.icon size={24} color={method.color} style={{ marginRight: '16px' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, color: theme.text }}>{method.name}</h4>
                    </div>
                    {selectedPayment === method.id && (
                      <Check size={20} color={method.color} />
                    )}
                  </div>
                ))}
              </div>

              {/* Payment Form */}
              {selectedPayment === 'card' && (
                <div style={{ marginBottom: '24px' }}>
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '12px',
                      border: `1px solid ${theme.border}`,
                      borderRadius: '8px',
                      backgroundColor: theme.bgSecondary,
                      color: theme.text
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={paymentDetails.cardName}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '12px',
                      border: `1px solid ${theme.border}`,
                      borderRadius: '8px',
                      backgroundColor: theme.bgSecondary,
                      color: theme.text
                    }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                      style={{
                        padding: '12px',
                        border: `1px solid ${theme.border}`,
                        borderRadius: '8px',
                        backgroundColor: theme.bgSecondary,
                        color: theme.text
                      }}
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                      style={{
                        padding: '12px',
                        border: `1px solid ${theme.border}`,
                        borderRadius: '8px',
                        backgroundColor: theme.bgSecondary,
                        color: theme.text
                      }}
                    />
                  </div>
                </div>
              )}

              {selectedPayment === 'upi' && (
                <div style={{ marginBottom: '24px' }}>
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g., yourname@upi)"
                    value={paymentDetails.upiId}
                    onChange={(e) => setPaymentDetails({...paymentDetails, upiId: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${theme.border}`,
                      borderRadius: '8px',
                      backgroundColor: theme.bgSecondary,
                      color: theme.text
                    }}
                  />
                </div>
              )}

              {selectedPayment === 'netbanking' && (
                <div style={{ marginBottom: '24px' }}>
                  <select
                    value={paymentDetails.bankAccount}
                    onChange={(e) => setPaymentDetails({...paymentDetails, bankAccount: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${theme.border}`,
                      borderRadius: '8px',
                      backgroundColor: theme.bgSecondary,
                      color: theme.text
                    }}
                  >
                    <option value="">Select Bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Bank</option>
                  </select>
                </div>
              )}

              {selectedPayment === 'wallet' && (
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '12px' 
                  }}>
                    {['PayPal', 'Google Pay', 'Apple Pay', 'Amazon Pay'].map((wallet) => (
                      <button
                        key={wallet}
                        onClick={() => setPaymentDetails({...paymentDetails, wallet})}
                        style={{
                          padding: '16px',
                          border: `2px solid ${paymentDetails.wallet === wallet ? '#8b5cf6' : theme.border}`,
                          borderRadius: '8px',
                          backgroundColor: paymentDetails.wallet === wallet ? '#8b5cf620' : theme.bgSecondary,
                          color: theme.text,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {wallet}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Summary in Modal */}
              <div style={{
                backgroundColor: theme.bgSecondary,
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <h4 style={{ margin: '0 0 12px 0', color: theme.text }}>Order Summary</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: theme.textSecondary }}>Subtotal</span>
                  <span style={{ color: theme.text }}>${orderValue.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#10b981' }}>
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: theme.textSecondary }}>Shipping</span>
                  <span style={{ color: theme.text }}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: theme.textSecondary }}>Tax</span>
                  <span style={{ color: theme.text }}>${tax.toFixed(2)}</span>
                </div>
                <hr style={{ borderColor: theme.border, margin: '12px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700' }}>
                  <span style={{ color: theme.text }}>Total</span>
                  <span style={{ color: theme.text }}>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="btn btn-secondary"
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: theme.bgSecondary,
                    color: theme.text,
                    border: `1px solid ${theme.border}`
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePaymentSubmit}
                  disabled={!selectedPayment || loading}
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {loading ? (
                    'Processing...'
                  ) : (
                    <>
                      <Shield size={16} />
                      Pay ${total.toFixed(2)}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          padding: 40px 20px;
          transition: background-color 0.3s ease;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .card {
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .btn {
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background-color: #3b82f6;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .btn-primary:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }

        .btn-secondary {
          background-color: #e5e7eb;
          color: #374151;
        }

        .btn-secondary:hover {
          background-color: #d1d5db;
          transform: translateY(-1px);
        }

        .btn-danger {
          background-color: #ef4444;
          color: white;
        }

        .btn-danger:hover {
          background-color: #dc2626;
          transform: translateY(-1px);
        }

        .btn-outline-danger {
          background-color: transparent;
          color: #ef4444;
          border: 1px solid #ef4444;
        }

        .btn-outline-danger:hover {
          background-color: #ef4444;
          color: white;
        }

        .btn-sm {
          padding: 4px 8px;
          font-size: 14px;
        }

        .btn-lg {
          padding: 12px 24px;
          font-size: 16px;
        }

        .fade-in {
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cart-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .trust-badge {
          transition: all 0.3s ease;
        }

        .trust-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        input, select {
          transition: all 0.2s ease;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 16px;
          }
          
          .card {
            padding: 16px;
          }

          .cart-item {
            flex-direction: column;
            text-align: center;
          }

          .cart-item img {
            margin: 0 auto 16px;
          }

          .quantity-controls {
            justify-content: center;
            margin-bottom: 16px;
          }
        }
      `}</style>
    </div>
  );
}