import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShoppingCart, Star, Heart, Eye, Package, Check, Plus, X } from "lucide-react";
import { AppContext } from "../App";

export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const { user, cart, setCart } = useContext(AppContext);

  // Dark mode theme
  const theme = {
    bg: '#0f172a',
    bgSecondary: '#1e293b',
    bgTertiary: '#334155',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    border: '#334155',
    cardBg: '#1e293b'
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products || []);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.qty = 1;
      setCart([...cart, product]);
    }
  };

  const isInCart = (productId) => {
    return cart.some(item => item._id === productId);
  };

  const toggleWishlist = (product) => {
    const isWishlisted = wishlist.some(item => item._id === product._id);
    if (isWishlisted) {
      setWishlist(wishlist.filter(item => item._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  const openQuickView = (product) => {
    setSelectedProduct(product);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="loading">
            <Package size={32} />
            <span style={{ marginLeft: '12px' }}>Loading products...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper fade-in">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}>
            Featured Products
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: theme.textSecondary,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover our carefully curated collection of premium products, 
            handpicked for quality and value.
          </p>
        </div>

        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}

        {products.length === 0 && !loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            color: theme.textSecondary
          }}>
            <Package size={64} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <h3 style={{ color: theme.text }}>No products available</h3>
            <p>Check back later for new arrivals!</p>
          </div>
        )}

        <div className="grid grid-3">
          {products.map((product) => (
            <div key={product._id} className="product-card fade-in" style={{
              transform: 'translateY(0)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ 
                position: 'relative', 
                overflow: 'hidden', 
                borderRadius: '12px 12px 0 0', 
                height: '250px',
                pointerEvents: 'none'
              }}>
                <img 
                  src={product.imgUrl || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'} 
                  alt={product.productName}
                  className="product-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    pointerEvents: 'none'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
                
                {/* Action Buttons */}
                <div 
                  className="product-actions"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    transition: 'opacity 0.3s ease',
                    zIndex: 100,
                    pointerEvents: 'auto'
                  }}>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toggleWishlist(product);
                    }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: 'none',
                      background: isInWishlist(product._id) ? '#ef4444' : 'rgba(255, 255, 255, 0.95)',
                      color: isInWishlist(product._id) ? 'white' : '#374151',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      zIndex: 101,
                      pointerEvents: 'auto'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    title={isInWishlist(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart size={18} fill={isInWishlist(product._id) ? 'white' : 'none'} />
                  </button>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      openQuickView(product);
                    }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: '#374151',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      zIndex: 101,
                      pointerEvents: 'auto'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    title="Quick view"
                  >
                    <Eye size={18} />
                  </button>
                </div>

                {/* Stock Badge */}
                {product.stock && product.stock > 0 && product.stock < 10 && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#ef4444',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    Only {product.stock} left!
                  </div>
                )}
              </div>
              
              <div className="product-content" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                minHeight: '280px'
              }}>
                <h3 className="product-title" style={{ 
                  minHeight: '50px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {product.productName}
                </h3>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  marginBottom: '8px'
                }}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < 4 ? "#fbbf24" : "none"} 
                      color="#fbbf24" 
                    />
                  ))}
                  <span style={{ 
                    fontSize: '12px', 
                    color: theme.textSecondary,
                    marginLeft: '8px'
                  }}>
                    (4.0) • 127 reviews
                  </span>
                </div>
                
                <p className="product-description" style={{
                  minHeight: '60px',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  marginBottom: '16px'
                }}>
                  {product.description || "Premium quality product with excellent features and durability."}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: 'auto',
                  paddingBottom: '16px'
                }}>
                  <div className="product-price">₹{product.price}</div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#059669',
                    background: '#d1fae5',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}>
                    In Stock
                  </div>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  disabled={isInCart(product._id)}
                  className={`btn ${isInCart(product._id) ? 'btn-success' : 'btn-primary'}`}
                  style={{ 
                    width: '100%',
                    cursor: isInCart(product._id) ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    marginTop: 'auto'
                  }}
                >
                  {isInCart(product._id) ? (
                    <>
                      <Check size={16} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick View Modal */}
        {selectedProduct && (
          <div className="quick-view-modal" onClick={closeQuickView}>
            <div className="quick-view-content" onClick={(e) => e.stopPropagation()}>
              <button className="quick-view-close" onClick={closeQuickView}>
                <X size={20} />
              </button>
              
              <div className="quick-view-body">
                <div>
                  <img 
                    src={selectedProduct.imgUrl || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'} 
                    alt={selectedProduct.productName}
                    className="quick-view-image"
                  />
                </div>
                
                <div className="quick-view-details">
                  <h2>{selectedProduct.productName}</h2>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    marginBottom: '16px'
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < 4 ? "#fbbf24" : "none"} 
                        color="#fbbf24" 
                      />
                    ))}
                    <span style={{ 
                      fontSize: '14px', 
                      color: theme.textSecondary,
                      marginLeft: '8px'
                    }}>
                      (4.0) • 127 reviews
                    </span>
                  </div>
                  
                  <div className="product-price">₹{selectedProduct.price}</div>
                  
                  <p className="product-description">
                    {selectedProduct.description || "Premium quality product with excellent features and durability. This item is crafted with attention to detail and designed to meet your expectations."}
                  </p>
                  
                  <div className="quick-view-stock">
                    <Package size={16} />
                    <span>
                      {selectedProduct.stock >= 10 
                        ? 'In Stock' 
                        : `Only ${selectedProduct.stock} left!`}
                    </span>
                  </div>
                  
                  <div style={{
                    background: theme.bgSecondary,
                    padding: '16px',
                    borderRadius: '12px',
                    marginBottom: '24px'
                  }}>
                    <h4 style={{ 
                      fontSize: '14px', 
                      fontWeight: 600,
                      marginBottom: '12px',
                      color: theme.text 
                    }}>
                      Product Features
                    </h4>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: theme.textSecondary }}>
                        <Check size={16} color="#10b981" />
                        Premium Quality Materials
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: theme.textSecondary }}>
                        <Check size={16} color="#10b981" />
                        Fast & Free Shipping
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: theme.textSecondary }}>
                        <Check size={16} color="#10b981" />
                        30-Day Money Back Guarantee
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: theme.textSecondary }}>
                        <Check size={16} color="#10b981" />
                        24/7 Customer Support
                      </li>
                    </ul>
                  </div>
                  
                  <div className="quick-view-actions">
                    <button 
                      onClick={() => {
                        addToCart(selectedProduct);
                        closeQuickView();
                      }}
                      disabled={isInCart(selectedProduct._id)}
                      className={`btn ${isInCart(selectedProduct._id) ? 'btn-success' : 'btn-primary'}`}
                      style={{ 
                        flex: 1,
                        cursor: isInCart(selectedProduct._id) ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      {isInCart(selectedProduct._id) ? (
                        <>
                          <Check size={16} />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={16} />
                          Add to Cart
                        </>
                      )}
                    </button>
                    
                    <button 
                      onClick={() => toggleWishlist(selectedProduct)}
                      style={{
                        background: isInWishlist(selectedProduct._id) ? '#ef4444' : theme.bgSecondary,
                        color: isInWishlist(selectedProduct._id) ? 'white' : theme.text,
                        border: 'none',
                        borderRadius: '12px',
                        padding: '12px 24px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 600,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Heart 
                        size={16} 
                        fill={isInWishlist(selectedProduct._id) ? 'white' : 'none'}
                      />
                      {isInWishlist(selectedProduct._id) ? 'Wishlisted' : 'Add to Wishlist'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {products.length > 0 && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '40px',
            padding: '20px',
            background: theme.bgSecondary,
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
            border: `1px solid ${theme.border}`
          }}>
            <h3 style={{ marginBottom: '8px', color: theme.text }}>Why Choose Our Products?</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginTop: '20px'
            }}>
              <div>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🚚</div>
                <strong style={{ color: theme.text }}>Free Shipping</strong>
                <p style={{ fontSize: '14px', color: theme.textSecondary, margin: '4px 0 0' }}>
                  On orders over ₹500
                </p>
              </div>
              <div>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔒</div>
                <strong style={{ color: theme.text }}>Secure Payment</strong>
                <p style={{ fontSize: '14px', color: theme.textSecondary, margin: '4px 0 0' }}>
                  100% secure transactions
                </p>
              </div>
              <div>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>↩️</div>
                <strong style={{ color: theme.text }}>Easy Returns</strong>
                <p style={{ fontSize: '14px', color: theme.textSecondary, margin: '4px 0 0' }}>
                  30-day return policy
                </p>
              </div>
              <div>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>⭐</div>
                <strong style={{ color: theme.text }}>Quality Guaranteed</strong>
                <p style={{ fontSize: '14px', color: theme.textSecondary, margin: '4px 0 0' }}>
                  Premium products only
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}