import { Link } from "react-router-dom";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/kinshukkush", icon: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
  )},
  { name: "Twitter", href: "https://x.com/kinshuksaxena_", icon: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
  )},
  { name: "Instagram", href: "https://www.instagram.com/kinshuk._.saxena/", icon: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12c0 3.259.014 3.668.072 4.948.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03z"/></svg>
  )},
  { name: "LinkedIn", href: "https://www.linkedin.com/in/kinshuk-saxena-/", icon: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.05-8.82 0-9.737h3.554v1.378c-.009.015-.021.029-.033.042h.033v-.042c.43-.664 1.199-1.61 2.92-1.61 2.135 0 3.733 1.39 3.733 4.377v5.592zM5.337 9.432c-1.144 0-1.915-.759-1.915-1.71 0-.956.77-1.71 1.97-1.71 1.197 0 1.911.754 1.935 1.71 0 .951-.738 1.71-1.99 1.71zm1.581 11.02H3.715V9.715h3.203v10.737zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
  )},
  { name: "Portfolio", href: "https://kinshuk.unaux.com/", icon: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 13H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm0-11H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
  )},
];

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(180deg, #0D0D16 0%, #0A0A0F 100%)", borderTop: "1px solid rgba(184,115,51,0.15)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #B87333, #D4AF37)" }}>
                <span className="font-heading text-xl text-obsidian">M</span>
              </div>
              <span className="font-heading text-xl text-gradient-steel">MERN STORE</span>
            </div>
            <p className="text-steel text-sm font-body leading-relaxed mb-6">
              Premium e-commerce built on the MERN stack. Discover curated products with an unparalleled shopping experience.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#8A8A9A", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#B87333"; e.currentTarget.style.borderColor = "rgba(184,115,51,0.3)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(184,115,51,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#8A8A9A"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg text-gradient-copper tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[{ to: "/product", label: "Shop Now" }, { to: "/about", label: "About Us" }, { to: "/order", label: "Track Order" }, { to: "/cart", label: "My Cart" }].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-steel hover:text-chrome text-sm font-body transition-colors flex items-center gap-1.5 group">
                    <span className="text-copper opacity-0 group-hover:opacity-100 transition-opacity text-xs">›</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-lg text-gradient-copper tracking-wide mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {["Electronics", "Fashion", "Home & Living", "Sports", "Books", "General"].map((cat) => (
                <li key={cat}>
                  <Link to={`/product?category=${cat}`} className="text-steel hover:text-chrome text-sm font-body transition-colors flex items-center gap-1.5 group">
                    <span className="text-copper opacity-0 group-hover:opacity-100 transition-opacity text-xs">›</span>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg text-gradient-copper tracking-wide mb-4">Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: "✉", text: "kinshuksaxena3@gmail.com", href: "mailto:kinshuksaxena3@gmail.com" },
                { icon: "📞", text: "+91 9057538521", href: "tel:+919057538521" },
                { icon: "📍", text: "Jaipur, Rajasthan, India" },
              ].map(({ icon, text, href }) => (
                <li key={text}>
                  {href ? (
                    <a href={href} className="flex items-start gap-2.5 text-steel text-sm font-body hover:text-copper transition-colors">
                      <span className="text-copper mt-0.5">{icon}</span>
                      <span>{text}</span>
                    </a>
                  ) : (
                    <div className="flex items-start gap-2.5 text-steel text-sm font-body">
                      <span className="text-copper mt-0.5">{icon}</span>
                      <span>{text}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="metal-divider my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-steel text-xs font-body">
            © {new Date().getFullYear()} MERN Store. Built with ❤️ by <a href="https://github.com/kinshukkush" className="text-copper hover:text-copper-light transition-colors">Kinshuk</a>.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((t) => (
              <button key={t} className="text-steel hover:text-chrome text-xs font-body transition-colors cursor-pointer">{t}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
