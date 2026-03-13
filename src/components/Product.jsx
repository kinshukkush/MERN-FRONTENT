import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const CATEGORIES = ["All", "Electronics", "Fashion", "Home & Living", "Sports", "Books", "General"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
];

function ProductSkeleton() {
  return (
    <div className="metal-card overflow-hidden">
      <div className="skeleton h-52 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-8 w-full rounded" />
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart, adding }) {
  const fmtPrice = (p) => `₹${Number(p).toLocaleString("en-IN")}`;
  return (
    <Link to={`/product/${product._id}`} className="product-card flex flex-col group cursor-pointer">
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        <img
          src={product.imageUrl || `https://picsum.photos/seed/${product._id}/400/300`}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = `https://picsum.photos/seed/${product._id}/400/300`; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent pointer-events-none" />
        {product.category && (
          <span className="absolute top-3 left-3 badge badge-admin text-[10px]">{product.category}</span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-obsidian/60 backdrop-blur-sm">
            <span className="font-heading text-xl text-steel-light">OUT OF STOCK</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="flex-1">
          <h3 className="font-body font-semibold text-chrome text-sm leading-tight mb-1 line-clamp-2 group-hover:text-copper transition-colors">{product.name}</h3>
          {product.description && (
            <p className="text-steel text-xs font-body line-clamp-1">{product.description}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-heading text-xl text-gradient-gold">{fmtPrice(product.price)}</span>
          {product.stock > 0 && <span className="text-xs text-steel font-body">{product.stock} left</span>}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={product.stock === 0 || adding === product._id}
          className="btn-copper w-full py-2.5 text-sm"
          style={{ opacity: product.stock === 0 ? 0.4 : 1 }}>
          {adding === product._id ? (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Adding…
            </span>
          ) : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [adding, setAdding] = useState(null);
  const { addToCart, isLoggedIn } = { ...useCart(), ...useAuth() };
  const toast = useToast();
  const navigate = useNavigate();

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { setPage(1); }, [category]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 12, search: debouncedSearch });
      if (category !== "All") params.set("category", category);
      const { data } = await api.get(`/api/products/all?${params}`);
      let items = data.products || [];
      if (sort === "price_asc") items = [...items].sort((a, b) => a.price - b.price);
      if (sort === "price_desc") items = [...items].sort((a, b) => b.price - a.price);
      setProducts(items);
      setTotalPages(data.total || 1);
    } catch {
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, category, sort]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleAddToCart = async (product) => {
    const { isLoggedIn } = { isLoggedIn: !!JSON.parse(localStorage.getItem("user") || "null")?.token };
    if (!isLoggedIn) { toast.info("Please sign in to add items to cart."); navigate("/login"); return; }
    setAdding(product._id);
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAdding(null), 800);
  };

  return (
    <div className="min-h-screen bg-metal-radial">
      {/* Hero Banner */}
      <div className="relative overflow-hidden py-16 px-4 text-center"
        style={{ background: "linear-gradient(180deg, rgba(184,115,51,0.1) 0%, transparent 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20"
            style={{ background: "radial-gradient(ellipse, rgba(184,115,51,0.4) 0%, transparent 70%)" }} />
        </div>
        <h1 className="font-heading text-5xl sm:text-7xl text-gradient-steel mb-3 relative z-10">PREMIUM COLLECTION</h1>
        <p className="text-steel font-body text-sm sm:text-base tracking-widest uppercase relative z-10">Crafted for the discerning buyer</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…" className="metal-input pl-9 pr-4 py-2.5 text-sm w-full" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="metal-input px-4 py-2.5 text-sm cursor-pointer">
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value} style={{ background: "#1A1A26" }}>{o.label}</option>)}
          </select>
        </div>

        {/* Category tabs */}
        <div className="relative flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-1">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${category === cat ? "text-obsidian" : "text-steel hover:text-chrome"}`}
              style={category === cat ? { background: "linear-gradient(135deg, #B87333, #D4AF37)", boxShadow: "0 4px 16px rgba(184,115,51,0.3)" } : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-7xl mb-4 opacity-20">🛒</div>
            <h3 className="font-heading text-2xl text-gradient-steel mb-2">NO PRODUCTS FOUND</h3>
            <p className="text-steel font-body text-sm">Try a different search or category</p>
            <button onClick={() => { setSearch(""); setCategory("All"); }} className="btn-ghost px-6 py-2.5 mt-4 text-sm">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-scale-fade">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} onAddToCart={handleAddToCart} adding={adding} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="btn-ghost px-4 py-2 text-sm" style={{ opacity: page === 1 ? 0.4 : 1 }}>← Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg text-sm font-body transition-all ${p === page ? "text-obsidian" : "text-steel hover:text-chrome"}`}
                style={p === page ? { background: "linear-gradient(135deg, #B87333, #D4AF37)" } : { background: "rgba(255,255,255,0.05)" }}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="btn-ghost px-4 py-2 text-sm" style={{ opacity: page === totalPages ? 0.4 : 1 }}>Next →</button>
          </div>
        )}
      </div>
    </div>
  );
}