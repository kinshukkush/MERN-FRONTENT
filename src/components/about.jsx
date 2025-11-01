import React, { useState, useEffect } from 'react';
import img from '../assets/img.png';
import { 
  ShoppingBag, Heart, Shield, Award, Users, 
  TrendingUp, Globe, Package, Clock, Star,
  CheckCircle, Target, Zap, Truck, HeadphonesIcon,
  Code, Database, Server, Layout
} from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Users, value: '50,000+', label: 'Happy Customers', color: '#3b82f6' },
    { icon: Package, value: '100,000+', label: 'Products Delivered', color: '#10b981' },
    { icon: Globe, value: '50+', label: 'Cities Covered', color: '#f59e0b' },
    { icon: Award, value: '4.8/5', label: 'Customer Rating', color: '#ec4899' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We prioritize your data security and privacy with SSL encryption and secure payment gateways.',
      color: '#3b82f6'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond to ensure a seamless shopping experience.',
      color: '#ec4899'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: '100% authentic products with manufacturer warranty. We never compromise on quality.',
      color: '#f59e0b'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Built with cutting-edge MERN stack technology to provide the best e-commerce experience.',
      color: '#8b5cf6'
    }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free shipping on orders over ₹500 with express delivery options'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you anytime'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Multiple payment options with 100% secure transactions'
    },
    {
      icon: Package,
      title: 'Easy Returns',
      description: '30-day hassle-free return and exchange policy'
    }
  ];

  const techStack = [
    { icon: Layout, name: 'React.js', description: 'Dynamic UI', color: '#61dafb' },
    { icon: Server, name: 'Node.js', description: 'Backend Runtime', color: '#68a063' },
    { icon: Code, name: 'Express.js', description: 'Web Framework', color: '#000000' },
    { icon: Database, name: 'MongoDB', description: 'Database', color: '#47a248' }
  ];

  const milestones = [
    { year: '2020', event: 'MERN Store Founded', description: 'Started with a vision to revolutionize online shopping' },
    { year: '2021', event: '10,000 Customers', description: 'Reached our first major milestone with 10K happy customers' },
    { year: '2023', event: 'Expanded Coverage', description: 'Extended delivery services to 50+ cities across India' },
    { year: '2025', event: 'Industry Leader', description: '50,000+ customers and 4.8/5 rating making us a trusted name' }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      overflow: 'hidden'
    }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '100px 20px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="container" style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            animation: 'fadeInUp 0.8s ease-out'
          }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: '800',
              color: 'white',
              marginBottom: '20px',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              About MERN Store
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: 'rgba(255,255,255,0.95)',
              maxWidth: '700px',
              margin: '0 auto 30px',
              lineHeight: '1.8'
            }}>
              Your trusted e-commerce destination built with modern technology and customer-first approach
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.2)',
                padding: '10px 20px',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)'
              }}>
                <Star size={20} fill="white" />
                <span style={{ color: 'white', fontWeight: '600' }}>4.8/5 Rating</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.2)',
                padding: '10px 20px',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)'
              }}>
                <Users size={20} color="white" />
                <span style={{ color: 'white', fontWeight: '600' }}>50K+ Customers</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.2)',
                padding: '10px 20px',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)'
              }}>
                <TrendingUp size={20} color="white" />
                <span style={{ color: 'white', fontWeight: '600' }}>100K+ Orders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        id="stats"
        className="animate-on-scroll"
        style={{
          padding: '60px 20px',
          background: 'var(--bg-secondary)',
          transform: isVisible.stats ? 'translateY(0)' : 'translateY(50px)',
          opacity: isVisible.stats ? 1 : 0,
          transition: 'all 0.8s ease-out'
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            {stats.map((stat, index) => (
              <div 
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '32px 24px',
                  background: 'var(--bg-primary)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`
                }}
                className="stat-card"
              >
                <div style={{
                  width: '70px',
                  height: '70px',
                  margin: '0 auto 20px',
                  background: `${stat.color}15`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <stat.icon size={32} color={stat.color} />
                </div>
                <h3 style={{ 
                  fontSize: '36px', 
                  fontWeight: 'bold',
                  color: 'var(--text-primary)',
                  marginBottom: '8px'
                }}>
                  {stat.value}
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)',
                  fontSize: '15px',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section 
        id="story"
        className="animate-on-scroll"
        style={{
          padding: '80px 20px',
          transform: isVisible.story ? 'translateY(0)' : 'translateY(50px)',
          opacity: isVisible.story ? 1 : 0,
          transition: 'all 0.8s ease-out'
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '60px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ 
                fontSize: '40px', 
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '20px'
              }}>
                Our Story
              </h2>
              <p style={{ 
                fontSize: '16px',
                lineHeight: '1.8',
                color: 'var(--text-secondary)',
                marginBottom: '20px'
              }}>
                MERN Store was founded in 2020 with a simple yet powerful vision: to create an e-commerce platform that combines cutting-edge technology with exceptional customer service. What started as a small venture has grown into a trusted shopping destination for over 50,000 customers across India.
              </p>
              <p style={{ 
                fontSize: '16px',
                lineHeight: '1.8',
                color: 'var(--text-secondary)',
                marginBottom: '20px'
              }}>
                Built using the modern MERN stack (MongoDB, Express.js, React, Node.js), our platform delivers a seamless, fast, and secure shopping experience. We believe in transparency, quality, and putting our customers first in everything we do.
              </p>
              <p style={{ 
                fontSize: '16px',
                lineHeight: '1.8',
                color: 'var(--text-secondary)',
                marginBottom: '30px'
              }}>
                Every product we offer is carefully selected and verified for authenticity. Our dedicated team works tirelessly to ensure your shopping experience is nothing short of exceptional, from browsing to delivery and beyond.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)'
              }}>
                <Heart size={24} color="#ec4899" fill="#ec4899" />
                <span style={{ 
                  fontSize: '15px',
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}>
                  Made with love using MERN Stack Technology
                </span>
              </div>
            </div>
            
            <div style={{ 
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={img} 
                alt="MERN Store Team"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '20px'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ 
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '8px'
                }}>
                  Trusted by Thousands
                </h4>
                <p style={{ 
                  fontSize: '14px',
                  color: '#64748b',
                  margin: 0
                }}>
                  Join our growing community of satisfied customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section 
        id="values"
        className="animate-on-scroll"
        style={{
          padding: '80px 20px',
          background: 'var(--bg-secondary)',
          transform: isVisible.values ? 'translateY(0)' : 'translateY(50px)',
          opacity: isVisible.values ? 1 : 0,
          transition: 'all 0.8s ease-out'
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ 
              fontSize: '40px', 
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '16px'
            }}>
              Our Core Values
            </h2>
            <p style={{ 
              fontSize: '18px',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              The principles that guide everything we do
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {values.map((value, index) => (
              <div 
                key={index}
                style={{
                  padding: '32px',
                  background: 'var(--bg-primary)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s backwards`
                }}
                className="value-card"
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: `${value.color}15`,
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <value.icon size={32} color={value.color} />
                </div>
                <h3 style={{ 
                  fontSize: '22px',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '12px'
                }}>
                  {value.title}
                </h3>
                <p style={{ 
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: 'var(--text-secondary)',
                  margin: 0
                }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section 
        id="tech"
        className="animate-on-scroll"
        style={{
          padding: '80px 20px',
          transform: isVisible.tech ? 'translateY(0)' : 'translateY(50px)',
          opacity: isVisible.tech ? 1 : 0,
          transition: 'all 0.8s ease-out'
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ 
              fontSize: '40px', 
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '16px'
            }}>
              Built with MERN Stack
            </h2>
            <p style={{ 
              fontSize: '18px',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Cutting-edge technology stack powering a seamless shopping experience
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '50px'
          }}>
            {techStack.map((tech, index) => (
              <div 
                key={index}
                style={{
                  padding: '28px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`
                }}
                className="tech-card"
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: `${tech.color}15`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <tech.icon size={30} color={tech.color} />
                </div>
                <h4 style={{ 
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '6px'
                }}>
                  {tech.name}
                </h4>
                <p style={{ 
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  margin: 0
                }}>
                  {tech.description}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '40px',
            borderRadius: '20px',
            textAlign: 'center',
            color: 'white'
          }}>
            <Code size={48} style={{ marginBottom: '20px' }} />
            <h3 style={{ 
              fontSize: '28px',
              fontWeight: '700',
              marginBottom: '12px'
            }}>
              Modern, Fast & Secure
            </h3>
            <p style={{ 
              fontSize: '16px',
              opacity: 0.95,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Our platform is built using industry-leading technologies to ensure maximum performance, security, and scalability for the best shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features"
        className="animate-on-scroll"
        style={{
          padding: '80px 20px',
          background: 'var(--bg-secondary)',
          transform: isVisible.features ? 'translateY(0)' : 'translateY(50px)',
          opacity: isVisible.features ? 1 : 0,
          transition: 'all 0.8s ease-out'
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ 
              fontSize: '40px', 
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '16px'
            }}>
              Why Choose Us
            </h2>
            <p style={{ 
              fontSize: '18px',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              We offer everything you need for a perfect shopping experience
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px'
          }}>
            {features.map((feature, index) => (
              <div 
                key={index}
                style={{
                  padding: '32px',
                  background: 'var(--bg-primary)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`
                }}
                className="feature-card-about"
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
                }}>
                  <feature.icon size={28} color="white" />
                </div>
                <h3 style={{ 
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '10px'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: 'var(--text-secondary)',
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline/Milestones Section */}
      <section 
        id="timeline"
        className="animate-on-scroll"
        style={{
          padding: '80px 20px',
          transform: isVisible.timeline ? 'translateY(0)' : 'translateY(50px)',
          opacity: isVisible.timeline ? 1 : 0,
          transition: 'all 0.8s ease-out'
        }}
      >
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ 
              fontSize: '40px', 
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '16px'
            }}>
              Our Journey
            </h2>
            <p style={{ 
              fontSize: '18px',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Key milestones that shaped MERN Store
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '32px',
                  marginBottom: '40px',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s backwards`
                }}
              >
                <div style={{
                  textAlign: 'right',
                  paddingTop: '8px'
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '8px 20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '30px',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '16px'
                  }}>
                    {milestone.year}
                  </div>
                </div>
                <div style={{
                  padding: '24px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: '-12px',
                    top: '28px',
                    width: '24px',
                    height: '24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    border: '4px solid var(--bg-primary)'
                  }} />
                  <h4 style={{ 
                    fontSize: '20px',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    marginBottom: '8px'
                  }}>
                    {milestone.event}
                  </h4>
                  <p style={{ 
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: '1.6'
                  }}>
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <ShoppingBag size={60} style={{ marginBottom: '24px' }} />
          <h2 style={{ 
            fontSize: '42px', 
            fontWeight: '800',
            marginBottom: '20px',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Start Shopping Today
          </h2>
          <p style={{ 
            fontSize: '18px',
            marginBottom: '32px',
            opacity: 0.95,
            lineHeight: '1.7'
          }}>
            Experience the best online shopping with MERN Store. Quality products, secure payments, and fast delivery - all in one place.
          </p>
          <a 
            href="/"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              background: 'white',
              color: '#667eea',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease'
            }}
            className="cta-button"
          >
            Browse Products
          </a>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
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

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          border-color: var(--primary-color);
        }

        .value-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        }

        .tech-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }

        .feature-card-about:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(102, 126, 234, 0.2);
          border-color: #667eea;
        }

        .cta-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 36px !important;
          }
          
          h2 {
            font-size: 32px !important;
          }

          .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
