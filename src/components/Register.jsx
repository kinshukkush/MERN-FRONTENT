import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import api from "../utils/api";

function PasswordStrength({ password }) {
  const getScore = () => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  };
  const score = getScore();
  const colors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  if (!password) return null;
  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: i <= score ? colors[score] : "rgba(255,255,255,0.1)" }} />
        ))}
      </div>
      <p className="text-xs font-body" style={{ color: colors[score] }}>
        {labels[score]}
      </p>
    </div>
  );
}

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Invalid email address";
    if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await api.post("/api/users/register", {
        name: form.name, email: form.email, password: form.password,
      });
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setErrors({ server: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: "#0A0A0F" }}>
      {/* Brand panel */}
      <div className="hidden lg:flex flex-col gap-8 justify-center p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A0A0F 0%, #1A1A26 40%, #0D0D16 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -left-20 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)", animation: "pulse 7s ease-in-out infinite" }} />
          <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, rgba(184,115,51,0.5) 0%, transparent 70%)", animation: "pulse 5s ease-in-out infinite 1s" }} />
        </div>
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
            style={{ background: "linear-gradient(135deg, #D4AF37, #B87333)", boxShadow: "0 8px 32px rgba(212,175,55,0.4)" }}>
            <span className="text-3xl font-heading text-obsidian">M</span>
          </div>
          <h1 className="font-heading text-6xl text-gradient-gold leading-none mb-3">JOIN THE ELITE</h1>
          <p className="text-steel text-sm font-body tracking-widest uppercase">Create your account today</p>
        </div>
        <div className="relative z-10 space-y-4">
          {["Premium product catalog access", "Order tracking & history", "Exclusive member discounts"].map((f) => (
            <div key={f} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #B87333, #D4AF37)" }}>
                <svg className="w-3.5 h-3.5 text-obsidian" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-chrome text-sm font-body">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1 className="font-heading text-4xl text-gradient-gold">MERN STORE</h1>
          </div>

          <div className="glass-panel p-8">
            <h2 className="font-heading text-3xl text-gradient-gold mb-1">Create Account</h2>
            <p className="text-steel text-sm font-body mb-8">Join thousands of premium customers</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.server && (
                <div className="text-sm px-4 py-3 rounded-lg font-body"
                  style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", color: "#FCA5A5" }}>
                  ⚠ {errors.server}
                </div>
              )}

              <div>
                <label className="metal-label">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="John Doe" className="metal-input px-4 py-3 text-sm" autoComplete="name" />
                {errors.name && <p className="text-xs mt-1 font-body" style={{ color: "#FCA5A5" }}>{errors.name}</p>}
              </div>

              <div>
                <label className="metal-label">Email address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" className="metal-input px-4 py-3 text-sm" autoComplete="email" />
                {errors.email && <p className="text-xs mt-1 font-body" style={{ color: "#FCA5A5" }}>{errors.email}</p>}
              </div>

              <div>
                <label className="metal-label">Password</label>
                <div className="relative">
                  <input name="password" type={showPass ? "text" : "password"} value={form.password}
                    onChange={handleChange} placeholder="Min. 6 characters"
                    className="metal-input px-4 py-3 pr-11 text-sm" autoComplete="new-password" />
                  <button type="button" onClick={() => setShowPass((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-copper transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPass
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>
                      }
                    </svg>
                  </button>
                </div>
                <PasswordStrength password={form.password} />
                {errors.password && <p className="text-xs mt-1 font-body" style={{ color: "#FCA5A5" }}>{errors.password}</p>}
              </div>

              <div>
                <label className="metal-label">Confirm Password</label>
                <input name="confirmPassword" type="password" value={form.confirmPassword}
                  onChange={handleChange} placeholder="Re-enter password"
                  className="metal-input px-4 py-3 text-sm" autoComplete="new-password" />
                {errors.confirmPassword && <p className="text-xs mt-1 font-body" style={{ color: "#FCA5A5" }}>{errors.confirmPassword}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="btn-copper w-full py-3.5 text-sm font-semibold tracking-wide mt-2"
                style={{ opacity: loading ? 0.7 : 1 }}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account…
                  </span>
                ) : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm font-body">
              <span className="text-steel">Already have an account? </span>
              <Link to="/login" className="text-copper hover:text-copper-light font-medium transition-colors">
                Sign in →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}