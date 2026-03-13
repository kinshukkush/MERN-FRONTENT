import { useState, useEffect, useRef } from "react";
import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

function useCountUp(target) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current || !target) return;
    started.current = true;
    const duration = 1200;
    const start = Date.now();
    const step = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);
  return count;
}

function StatCard({ label, value, icon, color, prefix = "", suffix = "" }) {
  const count = useCountUp(typeof value === "number" ? value : 0);
  return (
    <div className="stat-card group">
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{icon}</div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity"
          style={{ background: color }} />
      </div>
      <div className="font-heading text-4xl mb-1" style={{ color }}>
        {prefix}{typeof value === "number" ? count.toLocaleString() : value}{suffix}
      </div>
      <div className="text-steel text-xs font-body uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function Admin() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          api.get("/api/users?limit=1"),
          api.get("/api/products?limit=1"),
          api.get("/api/orders?limit=5"),
        ]);
        const revenue = (ordersRes.data.orders || []).reduce((s, o) => s + (o.totalAmount || 0), 0);
        setStats({
          users: usersRes.data.count || 0,
          products: productsRes.data.count || 0,
          orders: ordersRes.data.count || 0,
          revenue,
        });
        setRecentOrders(ordersRes.data.orders?.slice(0, 5) || []);
      } catch {}
    };
    fetchStats();
  }, []);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-body transition-all ${isActive ? "text-obsidian font-medium" : "text-steel hover:text-chrome hover:bg-white/05"}`;

  const sidebarActiveStyle = { background: "linear-gradient(135deg, #B87333, #D4AF37)" };

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: "⬛", end: true },
    { to: "/admin/users", label: "Users", icon: "👥" },
    { to: "/admin/products", label: "Products", icon: "📦" },
    { to: "/admin/orders", label: "Orders", icon: "🧾" },
  ];

  return (
    <div className="min-h-screen flex bg-metal-radial">
      {/* Sidebar */}
      <aside className={`sidebar flex-shrink-0 transition-all duration-300 ${sidebarOpen ? "w-56" : "w-16"}`} style={{ minHeight: "calc(100vh - 64px)" }}>
        <div className="flex flex-col h-full py-6">
          <button onClick={() => setSidebarOpen((p) => !p)}
            className="mx-3 mb-6 p-2 rounded-lg text-steel hover:text-chrome hover:bg-white/5 transition-colors text-center">
            {sidebarOpen ? "◀" : "▶"}
          </button>
          <nav className="flex flex-col gap-1 px-3 flex-1">
            {navItems.map(({ to, label, icon, end }) => (
              <NavLink key={to} to={to} end={end}
                style={({ isActive }) => isActive ? sidebarActiveStyle : {}}
                className={navLinkClass}>
                <span className="text-base flex-shrink-0">{icon}</span>
                {sidebarOpen && <span>{label}</span>}
              </NavLink>
            ))}
          </nav>
          <div className="px-3 pt-4 border-t border-white/05">
            <NavLink to="/product"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-body text-steel hover:text-chrome hover:bg-white/05 transition-all">
              <span>🏪</span>{sidebarOpen && "Store Front"}
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Check if we're on the root admin page to show dashboard */}
        <div className="p-6 lg:p-8">
          {/* Dashboard content (only on index) */}
          <Outlet context={{ stats, recentOrders }} />
          {/* Fallback for /admin route — shows when no child route Outlet renders */}
        </div>
      </div>
    </div>
  );
}

// This is the admin index/dashboard, rendered at /admin
export function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          api.get("/api/users?limit=1"),
          api.get("/api/products?limit=1"),
          api.get("/api/orders?limit=5"),
        ]);
        const allOrdersRevenue = ordersRes.data.orders || [];
        const revenue = allOrdersRevenue.reduce((s, o) => s + (o.totalAmount || 0), 0);
        setStats({
          users: usersRes.data.count || 0,
          products: productsRes.data.count || 0,
          orders: ordersRes.data.count || 0,
          revenue,
        });
        setRecentOrders(allOrdersRevenue.slice(0, 5));
      } catch {}
    };
    fetchStats();
  }, []);

  const fmtPrice = (p) => `₹${Number(p).toLocaleString("en-IN")}`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-5xl text-gradient-steel mb-1">DASHBOARD</h1>
        <p className="text-steel text-sm font-body">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard label="Total Users"    value={stats.users}    icon="👥" color="#B87333" />
        <StatCard label="Total Products" value={stats.products} icon="📦" color="#C0C0D0" />
        <StatCard label="Total Orders"   value={stats.orders}   icon="🧾" color="#D4AF37" />
        <StatCard label="Revenue"        value={stats.revenue}  icon="💰" color="#22c55e" prefix="₹" />
      </div>

      <div>
        <h2 className="font-heading text-2xl text-gradient-copper mb-4">RECENT ORDERS</h2>
        <div className="metal-card overflow-hidden">
          <table className="metal-table">
            <thead><tr>
              <th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th>
            </tr></thead>
            <tbody>
              {recentOrders.length === 0 && (
                <tr><td colSpan={5} className="text-center py-8 text-steel">No orders yet</td></tr>
              )}
              {recentOrders.map((o) => (
                <tr key={o._id}>
                  <td className="font-mono text-xs">{o._id.slice(-8).toUpperCase()}</td>
                  <td className="text-xs">{o.userEmail}</td>
                  <td className="font-heading text-lg text-gradient-gold">{fmtPrice(o.totalAmount)}</td>
                  <td><span className={`badge badge-${o.status?.toLowerCase().replace(" ", "-") === "in-transit" ? "transit" : o.status?.toLowerCase()}`}>{o.status}</span></td>
                  <td className="text-xs text-steel">{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[{ to: "/admin/products", label: "Manage Products", icon: "📦", desc: "Add, edit, delete products" },
          { to: "/admin/orders", label: "Manage Orders", icon: "🧾", desc: "Update order statuses" },
          { to: "/admin", label: "Manage Users", icon: "👥", desc: "View and edit users" }
        ].map(({ to, label, icon, desc }) => (
          <Link key={to} to={to}
            className="metal-card p-6 group hover:border-copper transition-all">
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="font-heading text-xl text-gradient-copper mb-1">{label}</h3>
            <p className="text-steel text-xs font-body">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
