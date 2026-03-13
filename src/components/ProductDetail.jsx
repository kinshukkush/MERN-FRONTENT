import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isLoggedIn } = { ...useCart(), ...useAuth() };
  const toast = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const fmtPrice = (p) => `₹${Number(p).toLocaleString("en-IN")}`;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        toast.error("Product not found.");
        navigate("/product");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id, navigate, toast]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.info("Please sign in to add items to cart.");
      navigate("/login");
      return;
    }

    setAdding(true);
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      toast.success(`${quantity} × ${product.name} added to cart!`);
      setQuantity(1);
    } catch (err) {
      toast.error("Failed to add to cart.");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-metal-radial flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-steel border-t-copper rounded-full animate-spin mx-auto" />
          <p className="text-steel font-body text-sm">Loading product…</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-metal-radial flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-7xl opacity-20">❌</div>
          <h2 className="font-heading text-4xl text-gradient-steel">PRODUCT NOT FOUND</h2>
          <p className="text-steel font-body text-sm">The product you're looking for doesn't exist.</p>
          <Link to="/product" className="btn-copper px-6 py-2.5 inline-block text-sm mt-4">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-metal-radial">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link to="/product" className="text-steel hover:text-copper transition-colors">Products</Link>
          <span className="text-steel">/</span>
          <span className="text-copper">{product.category}</span>
          <span className="text-steel">/</span>
          <span className="text-chrome truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-obsidian-700 relative group"
              style={{ background: "linear-gradient(135deg, rgba(184,115,51,0.1), rgba(212,175,55,0.08))" }}>
              <img
                src={product.imageUrl || `https://picsum.photos/seed/${product._id}/600/600`}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.src = `https://picsum.photos/seed/${product._id}/600/600`; }}
              />
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm flex items-center justify-center">
                  <span className="font-heading text-3xl text-steel-light">OUT OF STOCK</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            {/* Category badge */}
            {product.category && (
              <div className="inline-flex w-fit">
                <span className="badge badge-admin text-sm">{product.category}</span>
              </div>
            )}

            {/* Title & Description */}
            <div>
              <h1 className="font-heading text-4xl sm:text-5xl text-gradient-steel mb-3 leading-tight">
                {product.name}
              </h1>
              {product.description && (
                <p className="text-steel font-body text-sm leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            <div className="metal-divider" />

            {/* Price & Stock */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-steel text-xs font-body uppercase tracking-wider mb-2">Price</p>
                <span className="font-heading text-5xl text-gradient-gold">{fmtPrice(product.price)}</span>
              </div>
              <div className="text-right">
                <p className="text-steel text-xs font-body uppercase tracking-wider mb-2">Availability</p>
                <p className={`font-heading text-lg ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                  {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
                </p>
              </div>
            </div>

            <div className="metal-divider" />

            {/* Quantity & Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div>
                  <label className="metal-label mb-2 block">Quantity</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="btn-ghost px-4 py-2.5 text-lg"
                      disabled={quantity === 1}
                      style={{ opacity: quantity === 1 ? 0.4 : 1 }}>
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="metal-input w-20 px-4 py-2.5 text-center text-sm"
                      min="1"
                      max={product.stock}
                    />
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="btn-ghost px-4 py-2.5 text-lg"
                      disabled={quantity === product.stock}
                      style={{ opacity: quantity === product.stock ? 0.4 : 1 }}>
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className="btn-copper w-full py-3.5 text-base font-semibold tracking-wide"
                  style={{ opacity: adding ? 0.7 : 1 }}>
                  {adding ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding to Cart…
                    </span>
                  ) : "Add to Cart"}
                </button>
              </div>
            )}

            {product.stock === 0 && (
              <button
                disabled
                className="btn-copper w-full py-3.5 text-base font-semibold opacity-40 cursor-not-allowed">
                Out of Stock
              </button>
            )}

            <div className="metal-divider" />

            {/* Product Details */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-copper flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" />
                </svg>
                <div>
                  <p className="text-chrome font-body font-medium text-sm">Fast Delivery</p>
                  <p className="text-steel font-body text-xs">Delivery within 5-7 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-copper flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1V3a1 1 0 111 1v1h1V3a1 1 0 111 1v1h1V3a1 1 0 111 1v1h1V3a1 1 0 111 1v1h3a2 2 0 012 2v2h1a1 1 0 110 2h-1v1h1a1 1 0 110 2h-1v1h1a1 1 0 110 2h-1v3a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h1V3a1 1 0 011-1zm0 5a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0zm4 8a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-chrome font-body font-medium text-sm">30-Day Returns</p>
                  <p className="text-steel font-body text-xs">Easy returns within 30 days of purchase</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-copper flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1V3a1 1 0 111 1v1h1V3a1 1 0 111 1v1h1V3a1 1 0 111 1v1h1V3a1 1 0 111 1v1h3a2 2 0 012 2v2h1a1 1 0 110 2h-1v1h1a1 1 0 110 2h-1v1h1a1 1 0 110 2h-1v3a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h1V3a1 1 0 011-1zm3.707 9.293a1 1 0 000 1.414L9.414 13H6a1 1 0 100 2h3.414l-1.707 1.707a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 00-1.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-chrome font-body font-medium text-sm">Secure Payment</p>
                  <p className="text-steel font-body text-xs">All transactions are encrypted and secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="flex items-center justify-center mt-16 pt-8 border-t border-white/5">
          <Link to="/product" className="btn-ghost px-6 py-3 text-sm">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
