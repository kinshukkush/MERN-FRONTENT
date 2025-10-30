import React, { useState } from 'react';
import { 
  Heart, Github, Mail, Phone, MapPin, 
  Twitter, Linkedin, Instagram, Facebook,
  Send, ArrowRight, Shield, Truck, CreditCard,
  Clock, ChevronUp, ExternalLink, Star
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button when scrolled down
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    // Show success message
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers', badge: 'Hiring' },
      { name: 'Press Kit', href: '/press' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' }
    ],
    customerService: [
      { name: 'Help Center', href: '/help' },
      { name: 'Track Order', href: '/track' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Size Guide', href: '/size-guide' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Disclaimer', href: '/disclaimer' }
    ]
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/kinshukkush', name: 'GitHub' },
    { icon: Twitter, href: 'https://x.com/KINSHUKSAXENA_', name: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kinshuk-saxena-/', name: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/kinshuk._.saxena/', name: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/kinshuk.saxena.12/', name: 'Facebook' }
  ];

  const features = [
    { icon: Truck, text: 'Free Shipping', subtext: 'On orders over ₹500' },
    { icon: Shield, text: 'Secure Payment', subtext: '100% Protected' },
    { icon: Clock, text: '24/7 Support', subtext: 'Always here to help' },
    { icon: CreditCard, text: 'Easy Returns', subtext: '30-day return policy' }
  ];

  return (
    <>
      {/* Features Section */}
      <section className="features-section" style={{
        background: 'var(--bg-secondary)',
        padding: '40px 0',
        marginTop: '60px'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            {features.map((feature, index) => (
              <div key={index} className="feature-card card" style={{
                textAlign: 'center',
                padding: '24px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  margin: '0 auto 16px',
                  background: 'var(--gradient-primary)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <feature.icon size={28} />
                </div>
                <h4 style={{ 
                  marginBottom: '8px', 
                  color: 'var(--text-primary)',
                  fontSize: '18px'
                }}>
                  {feature.text}
                </h4>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '14px' 
                }}>
                  {feature.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Newsletter Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px',
            margin: '0 0 40px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              marginBottom: '16px', 
              fontSize: '28px',
              background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Stay Updated!
            </h3>
            <p style={{ 
              color: '#e5e7eb', 
              marginBottom: '24px',
              maxWidth: '500px',
              margin: '0 auto 24px'
            }}>
              Subscribe to our newsletter and get exclusive offers, new product launches, and 10% off your first order!
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{
              display: 'flex',
              gap: '12px',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="form-input"
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)'
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap'
                }}
              >
                Subscribe <Send size={16} />
              </button>
            </form>
            <p style={{ 
              color: '#9ca3af', 
              fontSize: '12px', 
              marginTop: '12px' 
            }}>
              <Star size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Join 10,000+ happy customers
            </p>
          </div>

          {/* Main Footer Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            padding: '40px 0'
          }}>
            {/* Company Info */}
            <div className="animate-fadeInUp">
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  M
                </div>
                <h3 style={{ fontSize: '24px', margin: 0 }}>MERN Store</h3>
              </div>
              
              <p style={{ 
                color: '#d1d5db', 
                lineHeight: '1.8', 
                marginBottom: '20px' 
              }}>
                Your trusted destination for quality products. We're committed to providing 
                exceptional shopping experiences with cutting-edge technology and customer-first approach.
              </p>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: '#f472b6',
                fontSize: '14px'
              }}>
                <Heart size={16} fill="currentColor" />
                <span>Made with love using MERN Stack</span>
              </div>

              {/* Social Links */}
              <div style={{ marginTop: '24px' }}>
                <h4 style={{ marginBottom: '16px', fontSize: '16px' }}>Connect With Us</h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 'var(--radius-md)',
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      aria-label={social.name}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Links Sections */}
            <div className="animate-fadeInUp delay-100">
              <h4 style={{ marginBottom: '20px', fontSize: '18px' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {footerLinks.company.map(link => (
                  <li key={link.name} style={{ marginBottom: '12px' }}>
                    <a 
                      href={link.href} 
                      className="footer-link"
                      style={{ 
                        color: '#d1d5db', 
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      {link.name}
                      {link.badge && (
                        <span style={{
                          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}>
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fadeInUp delay-200">
              <h4 style={{ marginBottom: '20px', fontSize: '18px' }}>Customer Service</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {footerLinks.customerService.map(link => (
                  <li key={link.name} style={{ marginBottom: '12px' }}>
                    <a 
                      href={link.href}
                      className="footer-link" 
                      style={{ 
                        color: '#d1d5db', 
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {link.name}
                      <ArrowRight size={14} style={{ opacity: 0, transition: 'all 0.2s ease' }} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div className="animate-fadeInUp delay-300">
              <h4 style={{ marginBottom: '20px', fontSize: '18px' }}>Get in Touch</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a 
                  href="mailto:kinshuksaxena3@gmail.com"
                  className="contact-item"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '12px', 
                    color: '#d1d5db',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                                  <Mail size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: '500' }}>Email Us</div>
                    <div style={{ fontSize: '14px', opacity: 0.8 }}>kinshuksaxena3@gmail.com</div>
                  </div>
                </a>
                
                <a 
                  href="tel:+919057538521"
                  className="contact-item"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '12px', 
                    color: '#d1d5db',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Phone size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: '500' }}>Call Us</div>
                    <div style={{ fontSize: '14px', opacity: 0.8 }}>+91 9057538521</div>
                    <div style={{ fontSize: '12px', opacity: 0.6 }}>Mon-Sat 9AM-6PM IST</div>
                  </div>
                </a>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '12px', 
                  color: '#d1d5db' 
                }}>
                  <MapPin size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: '500' }}>Visit Us</div>
                    <div style={{ fontSize: '14px', opacity: 0.8 }}>
                      165, Champa Nagar<br />
                      Gujar Ki Thadi<br />
                      Jaipur, Rajasthan 302019
                    </div>
                    <a 
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        color: '#60a5fa',
                        textDecoration: 'none',
                        marginTop: '8px'
                      }}
                    >
                      Get Directions <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div style={{
                marginTop: '24px',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h5 style={{ 
                  fontSize: '14px', 
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Clock size={16} /> Business Hours
                </h5>
                <div style={{ fontSize: '13px', lineHeight: '1.8', opacity: 0.8 }}>
                  <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                  <div>Saturday: 10:00 AM - 4:00 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods & Certifications */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '32px 0',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px'
          }}>
            <div>
              <h5 style={{ fontSize: '14px', marginBottom: '12px', opacity: 0.8 }}>
                Accepted Payment Methods
              </h5>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['Visa', 'Mastercard', 'PayPal', 'Razorpay', 'UPI', 'Net Banking'].map((method) => (
                  <div
                    key={method}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 style={{ fontSize: '14px', marginBottom: '12px', opacity: 0.8 }}>
                Certifications & Security
              </h5>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={20} />
                  <span style={{ fontSize: '13px' }}>SSL Secured</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Star size={20} />
                  <span style={{ fontSize: '13px' }}>4.8/5 Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div style={{
            padding: '24px 0',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            color: '#9ca3af',
            fontSize: '14px'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <span>&copy; {currentYear} MERN Store by Kinshuk Saxena. All rights reserved.</span>
              <span style={{ opacity: 0.5 }}>|</span>
              <div style={{ display: 'flex', gap: '16px' }}>
                {footerLinks.legal.map((link, index) => (
                  <React.Fragment key={link.name}>
                    <a 
                      href={link.href}
                      style={{ 
                        color: '#9ca3af', 
                        textDecoration: 'none',
                        transition: 'color 0.2s ease'
                      }}
                      className="footer-link"
                    >
                      {link.name}
                    </a>
                    {index < footerLinks.legal.length - 1 && 
                      <span style={{ opacity: 0.5 }}>|</span>
                    }
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <select 
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 12px',
                  color: 'white',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="es">Español</option>
              </select>
              
              <select 
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 12px',
                  color: 'white',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="scroll-to-top"
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              zIndex: 1000,
              animation: 'fadeInUp 0.3s ease-out',
              transition: 'transform 0.2s ease'
            }}
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} />
          </button>
        )}
      </footer>

      {/* Add custom styles */}
      <style jsx>{`
        .social-link:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          border-color: transparent !important;
        }

        .footer-link:hover {
          color: #60a5fa !important;
          padding-left: 8px;
        }

        .footer-link:hover svg {
          opacity: 1 !important;
        }

        .contact-item:hover {
          color: #60a5fa !important;
          transform: translateX(4px);
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }

        .scroll-to-top:hover {
          transform: translateY(-3px) !important;
        }

        @media (max-width: 768px) {
          .features-section .container > div {
            grid-template-columns: 1fr;
          }

          footer .container > div {
            grid-template-columns: 1fr;
          }

          .footer-link {
            display: inline-block;
            padding: 4px 0;
          }

          .scroll-to-top {
            bottom: 16px !important;
            right: 16px !important;
            width: 40px !important;
            height: 40px !important;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}