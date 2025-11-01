import React, { useState } from 'react';
import { 
  Heart, Github, Mail, Phone, MapPin, 
  Twitter, Linkedin, Instagram, Facebook,
  ArrowRight, Shield, Truck, CreditCard,
  Clock, ChevronUp, ExternalLink, Star,
  Award, Users, Package, HeadphonesIcon,
  Youtube, Send, MessageCircle
} from 'lucide-react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
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

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/kinshukkush', name: 'GitHub', color: '#333' },
    { icon: Twitter, href: 'https://x.com/KINSHUKSAXENA_', name: 'Twitter', color: '#1DA1F2' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kinshuk-saxena-/', name: 'LinkedIn', color: '#0A66C2' },
    { icon: Instagram, href: 'https://www.instagram.com/kinshuk._.saxena/', name: 'Instagram', color: '#E4405F' },
    { icon: Facebook, href: 'https://www.facebook.com/kinshuk.saxena.12/', name: 'Facebook', color: '#1877F2' },
    { icon: Youtube, href: 'https://www.youtube.com/@kinshuksaxena4645', name: 'YouTube', color: '#FF0000' },
    { icon: Send, href: 'https://t.me/Kinshuk_saxen', name: 'Telegram', color: '#0088cc' },
    { icon: MessageCircle, href: 'https://wa.me/919057538521', name: 'WhatsApp', color: '#25D366' }
  ];

  const features = [
    { icon: Truck, text: 'Free Shipping', subtext: 'On orders over ₹500' },
    { icon: Shield, text: 'Secure Payment', subtext: '100% Protected' },
    { icon: HeadphonesIcon, text: '24/7 Support', subtext: 'Always here to help' },
    { icon: Package, text: 'Easy Returns', subtext: '30-day return policy' }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: Package, value: '100K+', label: 'Products Delivered' },
    { icon: Award, value: '4.8/5', label: 'Customer Rating' },
    { icon: Star, value: '10+', label: 'Years Experience' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/' },
    { name: 'Cart', href: '/cart' },
    { name: 'Orders', href: '/order' },
    { name: 'Wishlist', href: '/cart' },
    { name: 'Track Order', href: '/order' }
  ];

  const policies = [
    { name: 'Privacy Policy', href: '/about' },
    { name: 'Terms of Service', href: '/about' },
    { name: 'Refund Policy', href: '/about' },
    { name: 'Shipping Policy', href: '/about' }
  ];

  return (
    <>
      <section className="features-section" style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        padding: '50px 0',
        marginTop: '60px'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {features.map((feature, index) => (
              <div key={index} className="feature-card card" style={{
                textAlign: 'center',
                padding: '28px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '14px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
                }}>
                  <feature.icon size={30} />
                </div>
                <h4 style={{ 
                  marginBottom: '6px', 
                  color: '#f1f5f9',
                  fontSize: '17px',
                  fontWeight: '600'
                }}>
                  {feature.text}
                </h4>
                <p style={{ 
                  color: '#cbd5e1', 
                  fontSize: '13px',
                  margin: 0
                }}>
                  {feature.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '50px 0',
        color: 'white'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '32px',
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px'
                }}>
                  <stat.icon size={28} style={{ marginRight: '10px', opacity: 0.9 }} />
                </div>
                <div style={{ 
                  fontSize: '32px', 
                  fontWeight: 'bold',
                  marginBottom: '6px',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  {stat.value}
                </div>
                <div style={{ 
                  fontSize: '13px', 
                  opacity: 0.9,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer style={{
        background: 'linear-gradient(180deg, #1a1f2e 0%, #0f1419 100%)',
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
          opacity: 0.03,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
          {/* Main Footer Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            padding: '50px 20px 30px',
            justifyItems: 'start'
          }}>
            {/* Company Info - Column 1 */}
            <div className="animate-fadeInUp" style={{ maxWidth: '340px', width: '100%' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)'
                }}>
                  M
                </div>
                <h3 style={{ fontSize: '24px', margin: 0, fontWeight: '700' }}>MERN Store</h3>
              </div>
              
              <p style={{ 
                color: '#cbd5e1', 
                lineHeight: '1.7', 
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                Your trusted destination for quality products. Experience exceptional shopping with cutting-edge technology and customer-first approach.
              </p>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: '#f472b6',
                fontSize: '13px',
                marginBottom: '24px',
                padding: '10px 14px',
                background: 'rgba(244, 114, 182, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(244, 114, 182, 0.2)'
              }}>
                <Heart size={16} fill="currentColor" />
                <span>Made with love using MERN Stack</span>
              </div>

              {/* Quick Links */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ marginBottom: '14px', fontSize: '15px', fontWeight: '600', color: '#f1f5f9' }}>
                  Quick Links
                </h4>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '8px' 
                }}>
                  {quickLinks.map((link) => (
                    <a 
                      key={link.name}
                      href={link.href}
                      className="footer-link" 
                      style={{ 
                        color: '#cbd5e1', 
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px'
                      }}
                    >
                      <ArrowRight size={12} style={{ opacity: 0, transition: 'all 0.2s ease' }} />
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div>
                <h4 style={{ marginBottom: '14px', fontSize: '15px', fontWeight: '600', color: '#f1f5f9' }}>
                  Policies
                </h4>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '8px' 
                }}>
                  {policies.map((policy) => (
                    <a 
                      key={policy.name}
                      href={policy.href}
                      className="footer-link" 
                      style={{ 
                        color: '#cbd5e1', 
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px'
                      }}
                    >
                      <ArrowRight size={12} style={{ opacity: 0, transition: 'all 0.2s ease' }} />
                      {policy.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Info - Column 2 */}
            <div className="animate-fadeInUp delay-100" style={{ maxWidth: '340px', width: '100%' }}>
              <h4 style={{ marginBottom: '20px', fontSize: '17px', fontWeight: '600', color: '#f1f5f9' }}>
                Get in Touch
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                <a 
                  href="mailto:kinshuksaxena3@gmail.com"
                  className="contact-item"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '12px', 
                    color: '#cbd5e1',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <Mail size={18} style={{ marginTop: '2px', flexShrink: 0, color: '#60a5fa' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '3px', color: '#f1f5f9', fontSize: '13px' }}>Email Us</div>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>kinshuksaxena3@gmail.com</div>
                  </div>
                </a>
                
                <a 
                  href="tel:+919057538521"
                  className="contact-item"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '12px', 
                    color: '#cbd5e1',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <Phone size={18} style={{ marginTop: '2px', flexShrink: 0, color: '#34d399' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '3px', color: '#f1f5f9', fontSize: '13px' }}>Call Us</div>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>+91 9057538521</div>
                    <div style={{ fontSize: '11px', opacity: 0.7 }}>Mon-Sat 9AM-6PM IST</div>
                  </div>
                </a>

                <div 
                  className="contact-item"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '12px', 
                    color: '#cbd5e1',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <MapPin size={18} style={{ marginTop: '2px', flexShrink: 0, color: '#f59e0b' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '3px', color: '#f1f5f9', fontSize: '13px' }}>Visit Us</div>
                    <div style={{ fontSize: '12px', opacity: 0.9, lineHeight: '1.5' }}>
                      165, Champa Nagar, Gujar Ki Thadi<br />
                      Jaipur, Rajasthan 302019
                    </div>
                    <a 
                      href="https://portfolio-frontend-mu-snowy.vercel.app/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        color: '#60a5fa',
                        textDecoration: 'none',
                        marginTop: '6px'
                      }}
                    >
                      Get Directions <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h5 style={{ 
                  fontSize: '14px', 
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '600',
                  color: '#f1f5f9'
                }}>
                  <Clock size={16} color="#f59e0b" /> Business Hours
                </h5>
                <div style={{ fontSize: '12px', lineHeight: '1.8', opacity: 0.9 }}>
                  <div><strong>Mon - Fri:</strong> 9:00 AM - 6:00 PM</div>
                  <div><strong>Saturday:</strong> 10:00 AM - 4:00 PM</div>
                  <div><strong>Sunday:</strong> Closed</div>
                </div>
              </div>
            </div>

            {/* Social Media & Additional Info - Column 3 */}
            <div className="animate-fadeInUp delay-200" style={{ maxWidth: '340px', width: '100%' }}>
              <h4 style={{ marginBottom: '20px', fontSize: '17px', fontWeight: '600', color: '#f1f5f9' }}>
                Connect With Us
              </h4>
              <p style={{ 
                color: '#cbd5e1', 
                fontSize: '13px', 
                marginBottom: '16px',
                lineHeight: '1.6' 
              }}>
                Follow us on social media for exclusive offers, product updates, and behind-the-scenes content!
              </p>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '10px',
                marginBottom: '28px'
              }}>
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
                      width: '100%',
                      height: '48px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>

              {/* Additional Info */}
              <div style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '16px'
              }}>
                <h5 style={{ 
                  fontSize: '14px', 
                  marginBottom: '12px',
                  fontWeight: '600',
                  color: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Shield size={16} color="#34d399" /> Secure Shopping
                </h5>
                <p style={{ fontSize: '12px', lineHeight: '1.7', opacity: 0.9, margin: 0 }}>
                  SSL encrypted checkout, multiple payment options, and secure data protection for your peace of mind.
                </p>
              </div>

              <div style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h5 style={{ 
                  fontSize: '14px', 
                  marginBottom: '12px',
                  fontWeight: '600',
                  color: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Award size={16} color="#fbbf24" /> Quality Guarantee
                </h5>
                <p style={{ fontSize: '12px', lineHeight: '1.7', opacity: 0.9, margin: 0 }}>
                  100% authentic products with manufacturer warranty. 30-day easy returns and hassle-free exchanges.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Footer - Centered Copyright */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px 20px',
            textAlign: 'center'
          }}>
            <p style={{ 
              margin: 0,
              color: '#f1f5f9',
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '0.3px'
            }}>
              &copy; {currentYear} MERN Store by Kinshuk Saxena. All rights reserved.
            </p>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="scroll-to-top"
            style={{
              position: 'fixed',
              bottom: '28px',
              right: '28px',
              width: '52px',
              height: '52px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
              zIndex: 1000,
              animation: 'fadeInUp 0.3s ease-out',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} strokeWidth={2.5} />
          </button>
        )}
      </footer>

      {/* Add custom styles */}
      <style jsx>{`
        .social-link:hover {
          transform: translateY(-4px) scale(1.05);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          border-color: transparent !important;
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
        }

        .footer-link:hover {
          color: #60a5fa !important;
          padding-left: 4px;
        }

        .footer-link:hover svg {
          opacity: 1 !important;
          transform: translateX(4px);
        }

        .contact-item:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          transform: translateX(4px);
          border-color: rgba(96, 165, 250, 0.3) !important;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(102, 126, 234, 0.5) !important;
          box-shadow: 0 12px 30px rgba(102, 126, 234, 0.2);
        }

        .scroll-to-top:hover {
          transform: translateY(-5px) scale(1.1) !important;
          box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5) !important;
        }

        @media (max-width: 768px) {
          .features-section .container > div {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          footer .container > div:first-of-type {
            grid-template-columns: 1fr;
            padding: 40px 20px 24px;
            gap: 36px;
          }

          .scroll-to-top {
            bottom: 20px !important;
            right: 20px !important;
            width: 46px !important;
            height: 46px !important;
          }

          .social-link {
            height: 42px !important;
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

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out backwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </>
  );
}
