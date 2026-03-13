import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import api from "../utils/api";

function LoginBrandPanel() {
  return (
    <div className="hidden lg:flex flex-col gap-6 justify-between p-12 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0A0A0F 0%, #1A1A26 40%, #0D0D16 100%)" }}>
      {/* Animated background rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(184,115,51,0.4) 0%, transparent 70%)", animation: "pulse 6s ease-in-out infinite" }} />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)", animation: "pulse 8s ease-in-out infinite 2s" }} />
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle at 30% 60%, rgba(184,115,51,0.06) 0%, transparent 50%)" }} />
      </div>

      <div className="relative z-10">
        {/* Logo mark */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
          style={{ background: "linear-gradient(135deg, #B87333, #D4AF37)", boxShadow: "0 8px 32px rgba(184,115,51,0.4)" }}>
          <span className="text-3xl font-heading text-obsidian">M</span>
        </div>
        <h1 className="font-heading text-6xl text-gradient-steel leading-none mb-3">MERN STORE</h1>
        <p className="text-steel text-sm font-body tracking-widest uppercase">Premium Collection</p>
      </div>

      <div className="relative z-10">
        <blockquote className="text-2xl font-heading text-gradient-gold leading-tight mb-4">
          "Crafted for those who demand the finest."
        </blockquote>
        <div className="metal-divider mb-4" />
        <div className="flex gap-8">
          {[["2K+", "Products"], ["50K+", "Happy Customers"], ["99.9%", "Uptime"]].map(([v, l]) => (
            <div key={l}>
              <div className="text-2xl font-heading text-gradient-copper">{v}</div>
              <div className="text-xs text-steel font-body uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const toast = useToast();

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill all fields."); triggerShake(); return; }
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/api/users/login", form);
      setUser(data);
      toast.success(`Welcome back, ${data.name || data.email}!`);
      navigate(data.role === "admin" ? "/admin" : "/product");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: "#0A0A0F" }}>
      <LoginBrandPanel />

      {/* Right — Login form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile brand header */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex w-14 h-14 rounded-xl items-center justify-center mb-3"
              style={{ background: "linear-gradient(135deg, #B87333, #D4AF37)" }}>
              <span className="text-2xl font-heading text-obsidian">M</span>
            </div>
            <h1 className="font-heading text-4xl text-gradient-steel">MERN STORE</h1>
          </div>

          <div className="glass-panel p-8">
            <h2 className="font-heading text-3xl text-gradient-copper mb-1">Sign In</h2>
            <p className="text-steel text-sm font-body mb-8">Access your premium account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="metal-label">Email address</label>
                <input
                  name="email" type="email" value={form.email}
                  onChange={handleChange} placeholder="you@example.com"
                  className="metal-input px-4 py-3 text-sm"
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="metal-label mb-0">Password</label>
                  <button type="button" onClick={() => setForgotOpen(true)}
                    className="text-xs text-copper hover:text-copper-light transition-colors font-body">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    name="password" type={showPassword ? "text" : "password"}
                    value={form.password} onChange={handleChange} placeholder="••••••••"
                    className="metal-input px-4 py-3 pr-11 text-sm"
                    autoComplete="current-password"
                  />
                  <button type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-copper transition-colors">
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className={`flex items-center gap-2 text-sm px-4 py-3 rounded-lg ${shake ? "animate-shake" : ""}`}
                  style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", color: "#FCA5A5" }}>
                  <span>⚠</span> {error}
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="btn-copper w-full py-3.5 text-sm font-semibold tracking-wide"
                style={{ opacity: loading ? 0.7 : 1 }}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm font-body">
              <span className="text-steel">Don't have an account? </span>
              <Link to="/register" className="text-copper hover:text-copper-light font-medium transition-colors">
                Create one →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot password modal */}
      {forgotOpen && (
        <div className="modal-overlay" onClick={() => setForgotOpen(false)}>
          <div className="modal-content p-8 max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-heading text-2xl text-gradient-copper mb-2">Reset Password</h3>
            <p className="text-steel text-sm font-body mb-6">
              Enter your email and we'll send you a reset link. (Feature coming soon — contact support for now.)
            </p>
            <input type="email" placeholder="your@email.com" className="metal-input px-4 py-3 text-sm mb-4" />
            <button className="btn-copper w-full py-3 text-sm" onClick={() => { toast.info("Reset link feature coming soon!"); setForgotOpen(false); }}>
              Send Reset Link
            </button>
            <button className="btn-ghost w-full py-3 text-sm mt-2" onClick={() => setForgotOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}