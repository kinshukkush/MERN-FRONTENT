import { useEffect, useRef, useState } from "react";

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef({ started: false });
  useEffect(() => {
    if (ref.current.started) return;
    ref.current.started = true;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

function StatCounter({ value, label, prefix = "", suffix = "" }) {
  const count = useCountUp(value);
  return (
    <div className="text-center">
      <div className="font-heading text-5xl sm:text-6xl text-gradient-copper mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-steel font-body text-sm uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function About() {
  const [visible, setVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const teamMembers = [
    { name: "Kinshuk", role: "Full-Stack Developer", emoji: "🧑‍💻", desc: "MERN stack specialist with a passion for premium UX" },
    { name: "Design AI", role: "UI/UX Architect", emoji: "🎨", desc: "Crafting metalastic interfaces that feel physical and alive" },
    { name: "MongoDB", role: "Data Backbone", emoji: "🍃", desc: "Lightning-fast document storage powering every transaction" },
  ];

  return (
    <div className="min-h-screen bg-metal-radial">
      {/* Hero */}
      <div className="relative overflow-hidden py-24 px-4 text-center"
        style={{ background: "linear-gradient(180deg, rgba(212,175,55,0.08) 0%, transparent 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10"
            style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.5) 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-6"
            style={{ background: "rgba(184,115,51,0.15)", border: "1px solid rgba(184,115,51,0.3)", color: "#D4915A" }}>
            Our Story
          </span>
          <h1 className="font-heading text-6xl sm:text-8xl text-gradient-gold leading-none mb-6">MERN STORE</h1>
          <div className="metal-divider mb-6" />
          <p className="text-chrome font-body text-lg leading-relaxed">
            Born from the belief that e-commerce can be both functional and beautiful.
            We built MERN Store as a premium shopping destination where every pixel, every interaction,
            and every product is crafted with deliberate intention.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            { icon: "🎯", title: "OUR MISSION", desc: "To deliver a premium shopping experience that respects your time, your money, and your intelligence. No gimmicks — just quality products at fair prices." },
            { icon: "⚡", title: "OUR VISION", desc: "A world where digital commerce feels as satisfying as holding a well-crafted physical object. Every touchpoint engineered for maximum delight." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="metal-card p-8">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-heading text-2xl text-gradient-copper mb-3">{title}</h3>
              <p className="text-steel font-body text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Stats counter */}
        <div ref={statsRef} className="metal-card p-10 mb-16">
          <h2 className="font-heading text-3xl text-gradient-steel text-center mb-10">BY THE NUMBERS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {visible && (
              <>
                <StatCounter value={2000} suffix="+" label="Products" />
                <StatCounter value={50000} suffix="+" label="Customers" />
                <StatCounter value={99} suffix="%" label="Satisfaction" />
                <StatCounter value={150} suffix="+" label="Categories" />
              </>
            )}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="font-heading text-4xl text-gradient-steel text-center mb-10">THE TEAM</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {teamMembers.map((m) => (
              <div key={m.name} className="metal-card p-6 text-center group">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, rgba(184,115,51,0.2), rgba(212,175,55,0.1))", border: "2px solid rgba(184,115,51,0.25)" }}>
                  {m.emoji}
                </div>
                <h3 className="font-heading text-xl text-gradient-copper mb-1">{m.name}</h3>
                <p className="text-steel text-xs font-body uppercase tracking-wider mb-3">{m.role}</p>
                <p className="text-steel text-sm font-body leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="metal-card p-8">
          <h2 className="font-heading text-3xl text-gradient-steel text-center mb-8">TECH STACK</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "React 19", icon: "⚛️", desc: "Frontend" },
              { name: "Vite", icon: "⚡", desc: "Build Tool" },
              { name: "Node.js + Express", icon: "🟢", desc: "Backend" },
              { name: "MongoDB Atlas", icon: "🍃", desc: "Database" },
              { name: "JWT Auth", icon: "🔑", desc: "Security" },
              { name: "Tailwind CSS", icon: "🎨", desc: "Styling" },
              { name: "Vercel", icon: "▲", desc: "Deployment" },
              { name: "Axios", icon: "📡", desc: "HTTP Client" },
            ].map(({ name, icon, desc }) => (
              <div key={name} className="flex flex-col items-center p-4 rounded-xl text-center transition-all hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="text-2xl mb-2">{icon}</span>
                <span className="text-chrome text-xs font-body font-medium">{name}</span>
                <span className="text-steel text-[10px] font-body uppercase tracking-wider">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
