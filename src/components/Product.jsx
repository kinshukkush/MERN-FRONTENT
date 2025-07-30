import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShoppingCart, Star, Heart, Eye, Package } from "lucide-react";
import { AppContext } from "../App";

export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const { user, cart, setCart } = useContext(AppContext);

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
            color: '#6b7280',
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
            color: '#6b7280'
          }}>
            <Package size={64} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <h3>No products available</h3>
            <p>Check back later for new arrivals!</p>
          </div>
        )}

        <div className="grid grid-3">
          {products.map((product) => (
            <div key={product._id} className="product-card fade-in">
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={product.imgUrl || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'} 
                  alt={product.productName}
                  className="product-image"
                  style={{ transition: 'transform 0.3s ease' }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <button style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    <Heart size={16} />
                  </button>
                  <button style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    <Eye size={16} />
                  </button>
                </div>
              </div>
              
              <div className="product-content">
                <h3 className="product-title">{product.productName}</h3>
                
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
                    color: '#6b7280',
                    marginLeft: '8px'
                  }}>
                    (4.0) • 127 reviews
                  </span>
                </div>
                
                <p className="product-description">
                  {product.description || "Premium quality product with excellent features and durability."}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div className="product-price">${product.price}</div>
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
                  onClick={() => addToCart(product)}
                  disabled={isInCart(product._id)}
                  className={`btn ${isInCart(product._id) ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ 
                    width: '100%',
                    opacity: isInCart(product._id) ? 0.7 : 1,
                    cursor: isInCart(product._id) ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ShoppingCart size={16} />
                  {isInCart(product._id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length > 0 && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '40px',
            padding: '20px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ marginBottom: '8px' }}>Why Choose Our Products?</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginTop: '20px'
            }}>
              <div>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🚚</div>
                <strong>Free Shipping</strong>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0' }}>
                  On orders over $50
                </p>
              </div>
              <div>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔒</div>
                <strong>Secure Payment</strong>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0' }}>
                  100% secure transactions
                </p>
              </div>
              <div>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>↩️</div>
                <strong>Easy Returns</strong>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0' }}>
                  30-day return policy
                </p>
              </div>
              <div>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>⭐</div>
                <strong>Quality Guaranteed</strong>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0' }}>
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