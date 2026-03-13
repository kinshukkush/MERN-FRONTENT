import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import api from "../utils/api";

export default function Profile() {
  const { user, setUser } = useAuth();
  const toast = useToast();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ orders: 0, spent: 0 });

  const [form, setForm] = useState({ name: "", phone: "", address: { line1: "", city: "", state: "", pincode: "" } });
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwError, setPwError] = useState("");
  const [changingPw, setChangingPw] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/users/${user.id}/profile`);
        setProfile(data);
        setForm({ name: data.name || "", phone: data.phone || "", address: data.address || { line1: "", city: "", state: "", pincode: "" } });
      } catch { toast.error("Failed to load profile."); }
      finally { setLoading(false); }
    };
    const fetchStats = async () => {
      try {
        const email = encodeURIComponent(user.email);
        const { data } = await api.get(`/api/orders/user/${email}`);
        const orders = data;
        const spent = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
        setStats({ orders: orders.length, spent });
      } catch {}
    };
    if (user?.id) { fetchProfile(); fetchStats(); }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.patch(`/api/users/${user.id}/profile`, form);
      setProfile(data);
      setUser({ ...user, name: data.name });
      toast.success("Profile updated!");
    } catch { toast.error("Failed to update profile."); }
    finally { setSaving(false); }
  };

  const handleChangePassword = async () => {
    if (pwForm.newPassword !== pwForm.confirmPassword) { setPwError("Passwords do not match"); return; }
    if (pwForm.newPassword.length < 6) { setPwError("Minimum 6 characters"); return; }
    setChangingPw(true); setPwError("");
    try {
      await api.patch(`/api/users/${user.id}/password`, { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password changed successfully!");
    } catch (err) {
      setPwError(err.response?.data?.message || "Failed. Check current password.");
    } finally { setChangingPw(false); }
  };

  const fmtPrice = (p) => `₹${Number(p).toLocaleString("en-IN")}`;

  if (loading) return (
    <div className="min-h-screen bg-metal-radial flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-steel border-t-copper rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-metal-radial">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-heading text-5xl text-gradient-steel mb-8">MY PROFILE</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: "Total Orders", value: stats.orders },
            { label: "Total Spent", value: fmtPrice(stats.spent) },
          ].map(({ label, value }) => (
            <div key={label} className="stat-card">
              <p className="text-steel text-xs font-body uppercase tracking-wider mb-1">{label}</p>
              <p className="font-heading text-3xl text-gradient-gold">{value}</p>
            </div>
          ))}
        </div>

        {/* Profile form */}
        <div className="metal-card p-6 mb-6">
          <h2 className="font-heading text-2xl text-gradient-copper mb-5">PERSONAL INFORMATION</h2>

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="metal-label">Full Name</label>
                <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="John Doe" className="metal-input px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="metal-label">Email (read-only)</label>
                <input value={user.email} readOnly
                  className="metal-input px-4 py-3 text-sm opacity-50 cursor-not-allowed" />
              </div>
            </div>
            <div>
              <label className="metal-label">Phone Number</label>
              <input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="+91 98765 43210" className="metal-input px-4 py-3 text-sm" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="metal-label">Address Line 1</label>
                <input value={form.address.line1} onChange={(e) => setForm((p) => ({ ...p, address: { ...p.address, line1: e.target.value } }))}
                  placeholder="123, Main Street" className="metal-input px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="metal-label">City</label>
                <input value={form.address.city} onChange={(e) => setForm((p) => ({ ...p, address: { ...p.address, city: e.target.value } }))}
                  placeholder="Noida" className="metal-input px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="metal-label">State</label>
                <input value={form.address.state} onChange={(e) => setForm((p) => ({ ...p, address: { ...p.address, state: e.target.value } }))}
                  placeholder="Uttar Pradesh" className="metal-input px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="metal-label">Pincode</label>
                <input value={form.address.pincode} onChange={(e) => setForm((p) => ({ ...p, address: { ...p.address, pincode: e.target.value } }))}
                  placeholder="201301" className="metal-input px-4 py-3 text-sm" />
              </div>
            </div>
            <button onClick={handleSave} disabled={saving} className="btn-copper px-8 py-3 text-sm">
              {saving ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</span> : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Change password */}
        <div className="metal-card p-6">
          <h2 className="font-heading text-2xl text-gradient-copper mb-5">CHANGE PASSWORD</h2>
          <div className="space-y-4">
            {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
              <div key={field}>
                <label className="metal-label">{field === "currentPassword" ? "Current Password" : field === "newPassword" ? "New Password" : "Confirm New Password"}</label>
                <input type="password" value={pwForm[field]}
                  onChange={(e) => setPwForm((p) => ({ ...p, [field]: e.target.value }))}
                  placeholder="••••••••" className="metal-input px-4 py-3 text-sm" />
              </div>
            ))}
            {pwError && <p className="text-sm font-body" style={{ color: "#FCA5A5" }}>⚠ {pwError}</p>}
            <button onClick={handleChangePassword} disabled={changingPw} className="btn-ghost px-8 py-3 text-sm">
              {changingPw ? "Changing…" : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
