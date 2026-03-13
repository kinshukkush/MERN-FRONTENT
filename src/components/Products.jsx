import { useState, useEffect, useCallback } from "react";
import { useToast } from "../context/ToastContext";
import api from "../utils/api";

const CATEGORIES = ["Electronics", "Fashion", "Home & Living", "Sports", "Books", "General"];
const EMPTY_FORM = { name: "", description: "", price: "", category: "General", imageUrl: "", stock: "" };

function ProductModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  useEffect(() => { setForm(initial || EMPTY_FORM); }, [initial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ ...form, price: Number(form.price), stock: Number(form.stock) });
    setSaving(false);
  };

  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-heading text-2xl text-gradient-copper mb-5">{initial?._id ? "EDIT PRODUCT" : "ADD PRODUCT"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[{ key: "name", label: "Product Name", placeholder: "e.g. Wireless Headphones" },
            { key: "description", label: "Description", placeholder: "Short description…" },
            { key: "imageUrl", label: "Image URL", placeholder: "https://…" },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="metal-label">{label}</label>
              <input value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                placeholder={placeholder} className="metal-input px-4 py-2.5 text-sm" />
            </div>
          ))}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="metal-label">Price (₹)</label>
              <input type="number" min="0" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                placeholder="999" className="metal-input px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="metal-label">Stock</label>
              <input type="number" min="0" value={form.stock} onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))}
                placeholder="50" className="metal-input px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="metal-label">Category</label>
              <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                className="metal-input px-3 py-2.5 text-sm cursor-pointer">
                {CATEGORIES.map((c) => <option key={c} value={c} style={{ background: "#1A1A26" }}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-copper flex-1 py-3 text-sm">
              {saving ? "Saving…" : initial?._id ? "Update Product" : "Add Product"}
            </button>
            <button type="button" onClick={onClose} className="btn-ghost flex-1 py-3 text-sm">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirm({ open, onClose, onConfirm, name }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content p-6 max-w-sm text-center" onClick={(e) => e.stopPropagation()}>
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="font-heading text-xl text-gradient-steel mb-2">DELETE PRODUCT?</h3>
        <p className="text-steel text-sm font-body mb-6">"{name}" will be permanently removed.</p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="btn-danger flex-1 py-3 text-sm font-medium">Delete</button>
          <button onClick={onClose} className="btn-ghost flex-1 py-3 text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/products?page=${page}&limit=10&search=${search}`);
      setProducts(data.products || []);
      setTotalPages(data.total || 1);
    } catch { toast.error("Failed to load products."); }
    finally { setLoading(false); }
  }, [page, search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleSave = async (form) => {
    try {
      if (editProduct?._id) {
        await api.patch(`/api/products/${editProduct._id}`, form);
        toast.success("Product updated!");
      } else {
        await api.post("/api/products", form);
        toast.success("Product added!");
      }
      setModalOpen(false); setEditProduct(null);
      fetchProducts();
    } catch (err) { toast.error(err.response?.data?.message || "Save failed."); }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/products/${deleteTarget._id}`);
      toast.success("Product deleted.");
      setDeleteTarget(null); fetchProducts();
    } catch { toast.error("Delete failed."); }
  };

  const fmtPrice = (p) => `₹${Number(p).toLocaleString("en-IN")}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="font-heading text-4xl text-gradient-steel mb-1">PRODUCTS</h1>
          <p className="text-steel text-xs font-body">Manage your product catalog</p>
        </div>
        <button onClick={() => { setEditProduct(null); setModalOpen(true); }}
          className="btn-copper px-6 py-2.5 text-sm">+ Add Product</button>
      </div>

      <div className="relative max-w-sm">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search products…" className="metal-input pl-9 pr-4 py-2.5 text-sm w-full" />
      </div>

      <div className="metal-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-steel border-t-copper rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="metal-table">
              <thead><tr>
                <th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th>
              </tr></thead>
              <tbody>
                {products.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-12 text-steel">No products found</td></tr>
                )}
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-obsidian-700">
                        <img src={p.imageUrl || `https://picsum.photos/seed/${p._id}/200`} alt={p.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = `https://picsum.photos/seed/${p._id}/200`; }} />
                      </div>
                    </td>
                    <td className="font-medium max-w-[180px] truncate">{p.name}</td>
                    <td><span className="badge badge-admin text-[10px]">{p.category || "General"}</span></td>
                    <td className="font-heading text-lg text-gradient-gold">{fmtPrice(p.price)}</td>
                    <td className={p.stock === 0 ? "text-red-400" : "text-green-400"}>{p.stock}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditProduct(p); setModalOpen(true); }}
                          className="btn-ghost px-3 py-1.5 text-xs">Edit</button>
                        <button onClick={() => setDeleteTarget(p)}
                          className="btn-danger px-3 py-1.5 text-xs">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="btn-ghost px-4 py-2 text-sm" style={{ opacity: page === 1 ? 0.4 : 1 }}>← Prev</button>
          <span className="text-steel font-body text-sm">Page {page} / {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-ghost px-4 py-2 text-sm" style={{ opacity: page === totalPages ? 0.4 : 1 }}>Next →</button>
        </div>
      )}

      <ProductModal open={modalOpen} onClose={() => { setModalOpen(false); setEditProduct(null); }}
        onSave={handleSave} initial={editProduct} />
      <DeleteConfirm open={!!deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete} name={deleteTarget?.name} />
    </div>
  );
}