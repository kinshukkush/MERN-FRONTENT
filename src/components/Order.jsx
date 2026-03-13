import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import api from "../utils/api";

const STATUS_CONFIG = {
  Pending:    { cls: "badge-pending",   icon: "⏳", step: 0 },
  Shipped:    { cls: "badge-shipped",   icon: "📦", step: 1 },
  "In Transit": { cls: "badge-transit", icon: "🚚", step: 2 },
  Delivered:  { cls: "badge-delivered", icon: "✓",  step: 3 },
  Cancelled:  { cls: "badge-cancelled", icon: "✕",  step: -1 },
};

const STEPS = ["Pending", "Shipped", "In Transit", "Delivered"];

function StatusStepper({ status }) {
  const stepIdx = STEPS.indexOf(status);
  if (stepIdx === -1) return null;
  return (
    <div className="flex items-center gap-0 mt-4">
      {STEPS.map((s, i) => {
        const active = i <= stepIdx;
        return (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-colors ${active ? "text-obsidian" : "text-steel"}`}
              style={active ? { background: "linear-gradient(135deg, #B87333, #D4AF37)", boxShadow: "0 0 12px rgba(184,115,51,0.4)" } : { background: "rgba(255,255,255,0.08)" }}>
              {i < stepIdx ? "✓" : i === stepIdx ? STATUS_CONFIG[s]?.icon || "●" : ""}
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-1 transition-all duration-500"
                style={{ background: i < stepIdx ? "linear-gradient(90deg, #B87333, #D4AF37)" : "rgba(255,255,255,0.1)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Order() {
  const { user } = useAuth();
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const fmtPrice = (p) => `₹${Number(p).toLocaleString("en-IN")}`;
  const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const email = encodeURIComponent(user.email);
        const { data } = await api.get(`/api/orders/user/${email}`);
        setOrders(data);
      } catch {
        toast.error("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchOrders();
  }, [user]);

  if (loading) return (
    <div className="min-h-screen bg-metal-radial flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-2 border-steel border-t-copper rounded-full animate-spin mx-auto" />
        <p className="text-steel font-body text-sm">Loading your orders…</p>
      </div>
    </div>
  );

  if (orders.length === 0) return (
    <div className="min-h-screen bg-metal-radial flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-7xl opacity-20">📦</div>
        <h2 className="font-heading text-4xl text-gradient-steel">NO ORDERS YET</h2>
        <p className="text-steel font-body text-sm">Your order history will appear here</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-metal-radial">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-heading text-5xl text-gradient-steel mb-2">MY ORDERS</h1>
        <p className="text-steel font-body text-sm mb-8">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>

        <div className="space-y-4">
          {orders.map((order) => {
            const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.Pending;
            const isOpen = expanded === order._id;
            return (
              <div key={order._id} className="metal-card overflow-hidden">
                <button className="w-full p-5 text-left" onClick={() => setExpanded(isOpen ? null : order._id)}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-body text-xs text-steel">Order #</span>
                        <span className="font-body text-xs text-chrome font-mono">{order._id.slice(-8).toUpperCase()}</span>
                        <span className={`badge ${cfg.cls}`}>{cfg.icon} {order.status}</span>
                      </div>
                      <p className="text-steel text-xs font-body">{fmtDate(order.createdAt)} · {order.items?.length || 0} item{order.items?.length !== 1 ? "s" : ""}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-heading text-2xl text-gradient-gold">{fmtPrice(order.totalAmount)}</span>
                      <svg className={`w-4 h-4 text-steel transition-transform ${isOpen ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                  {order.status !== "Cancelled" && <StatusStepper status={order.status} />}
                </button>

                {isOpen && (
                  <div className="border-t border-white/5 p-5 space-y-3 animate-slide-down">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-obsidian-700 flex-shrink-0">
                          <img src={item.imageUrl || `https://picsum.photos/seed/${item.productId}/200`}
                            alt={item.name} className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = "https://picsum.photos/seed/product/200"; }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-chrome text-sm font-body font-medium truncate">{item.name}</p>
                          <p className="text-steel text-xs font-body">Qty: {item.quantity} × {fmtPrice(item.price)}</p>
                        </div>
                        <span className="font-heading text-lg text-gradient-gold">{fmtPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="metal-divider" />
                    <div className="flex flex-col sm:flex-row gap-1 sm:justify-between text-xs font-body text-steel">
                      {order.promoCode && <span>Promo: <span className="text-copper">{order.promoCode}</span> (−{fmtPrice(order.discount)})</span>}
                      <span>Delivery: {order.deliveryCharge === 0 ? <span className="text-green-400">FREE</span> : fmtPrice(order.deliveryCharge)}</span>
                      <span className="font-semibold text-chrome">Total: {fmtPrice(order.totalAmount)}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
