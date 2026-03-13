import { useState, useEffect, useCallback } from "react";
import { useToast } from "../context/ToastContext";
import api from "../utils/api";

const STATUS_OPTIONS = ["Pending", "Shipped", "In Transit", "Delivered", "Cancelled"];
const STATUS_BADGE = { Pending: "badge-pending", Shipped: "badge-shipped", "In Transit": "badge-transit", Delivered: "badge-delivered", Cancelled: "badge-cancelled" };

export default function Orders() {
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updating, setUpdating] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 10, search, status: statusFilter });
      const { data } = await api.get(`/api/orders?${params}`);
      setOrders(data.orders || []);
      setTotalPages(data.total || 1);
    } catch { toast.error("Failed to load orders."); }
    finally { setLoading(false); }
  }, [page, search, statusFilter]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (orderId, status) => {
    setUpdating(orderId);
    try {
      await api.patch(`/api/orders/${orderId}`, { status });
      toast.success(`Order status → ${status}`);
      fetchOrders();
    } catch { toast.error("Failed to update status."); }
    finally { setUpdating(null); }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Delete this order permanently?")) return;
    try {
      await api.delete(`/api/orders/${orderId}`);
      toast.success("Order deleted.");
      fetchOrders();
    } catch { toast.error("Delete failed."); }
  };

  const fmtPrice = (p) => `₹${Number(p).toLocaleString("en-IN")}`;
  const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-4xl text-gradient-steel mb-1">ORDERS</h1>
        <p className="text-steel text-xs font-body">Manage and update order statuses</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by email…" className="metal-input pl-9 pr-4 py-2.5 text-sm w-full" />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="metal-input px-4 py-2.5 text-sm cursor-pointer max-w-[180px]">
          <option value="" style={{ background: "#1A1A26" }}>All Statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s} style={{ background: "#1A1A26" }}>{s}</option>)}
        </select>
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
                <th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th><th>Actions</th>
              </tr></thead>
              <tbody>
                {orders.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-12 text-steel">No orders found</td></tr>
                )}
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td className="font-mono text-xs">{o._id.slice(-8).toUpperCase()}</td>
                    <td className="text-xs text-steel max-w-[140px] truncate">{o.userEmail}</td>
                    <td className="text-xs">{o.items?.length || 0} item{o.items?.length !== 1 ? "s" : ""}</td>
                    <td className="font-heading text-lg text-gradient-gold">{fmtPrice(o.totalAmount)}</td>
                    <td>
                      {updating === o._id ? (
                        <div className="w-5 h-5 border-2 border-steel border-t-copper rounded-full animate-spin" />
                      ) : (
                        <select value={o.status}
                          onChange={(e) => updateStatus(o._id, e.target.value)}
                          className={`badge cursor-pointer bg-transparent border-0 outline-none font-body text-xs ${STATUS_BADGE[o.status] || "badge-user"}`}
                          style={{ background: "transparent" }}>
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s} style={{ background: "#1A1A26", color: "#C0C0D0" }}>{s}</option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="text-xs text-steel">{fmtDate(o.createdAt)}</td>
                    <td>
                      <button onClick={() => deleteOrder(o._id)} className="btn-danger px-3 py-1.5 text-xs">Delete</button>
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
    </div>
  );
}