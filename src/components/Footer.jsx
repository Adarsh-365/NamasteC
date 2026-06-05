import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Footer() {
  const navigate = useNavigate();
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const handlePageSelect = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919370947790?text=Hi%20Namaste%20China%2C%20I%20would%20like%20to%20discuss%20sourcing%20from%20China.', '_blank');
  };

  const handleConsultation = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          footer > div > div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 768px) {
          footer > div > div {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 35px !important;
          }
          
          footer {
            padding: 50px 5% 0 !important;
          }
        }
        
        @media (max-width: 480px) {
          footer > div > div {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          
          footer {
            padding: 40px 5% 0 !important;
          }
          
          .pre-footer-cta {
            padding: 40px 5% !important;
          }
          
          .pre-footer-cta h2 {
            font-size: 1.8rem !important;
          }
          
          .pre-footer-cta p {
            font-size: 1rem !important;
          }
          
          .pre-footer-badges {
            gap: 20px !important;
          }
          
          .pre-footer-badges > div {
            font-size: 0.85rem !important;
          }
          
          .pre-footer-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
          
          .pre-footer-buttons button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
      
      {/* Pre-Footer CTA Section */}
      <section className="pre-footer-cta" style={{
        background: 'linear-gradient(135deg, var(--primary-green) 0%, #0a5a47 100%)',
        padding: '60px 5%',
        marginTop: '80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.4
        }}></div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '15px', lineHeight: '1.2' }}>
            Ready to Source Products from China?
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.9)', marginBottom: '35px', maxWidth: '700px', margin: '0 auto 35px' }}>
            Get expert guidance from our Mumbai and China teams. We handle everything from supplier verification to doorstep delivery.
          </p>
          
          {/* Trust Badges */}
          <div className="pre-footer-badges" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '35px',
            flexWrap: 'wrap',
            marginBottom: '40px'
          }}>
            {[
              { icon: 'fa-shield-halved', text: '500+ Suppliers Verified' },
              { icon: 'fa-users', text: '100+ Indian Businesses Served' },
              { icon: 'fa-earth-asia', text: 'On-Ground Team in China' },
              { icon: 'fa-truck-fast', text: 'End-to-End Import Support' }
            ].map((badge, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
                <i className={`fa-solid ${badge.icon}`} style={{ fontSize: '1.3rem', color: 'var(--accent-green)' }}></i>
                <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>{badge.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="pre-footer-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={handleConsultation}
              style={{
                background: 'white',
                color: 'var(--primary-green)',
                border: 'none',
                padding: '16px 40px',
                fontSize: '1.1rem',
                fontWeight: '700',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
              }}
            >
              <i className="fa-solid fa-calendar-check"></i>
              Book Free Consultation
            </button>
            
            <button 
              onClick={handleWhatsApp}
              style={{
                background: '#25D366',
                color: 'white',
                border: '2px solid white',
                padding: '16px 40px',
                fontSize: '1.1rem',
                fontWeight: '700',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
              }}
            >
              <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.3rem' }}></i>
              WhatsApp Us Now
            </button>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer style={{ background: 'linear-gradient(135deg, #0a3d31 0%, #0d4d3e 100%)', color: 'white', padding: '60px 5% 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '40px', 
            marginBottom: '50px',
          }}>
          
          {/* Company Info */}
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <i className="fa-solid fa-earth-asia" style={{ fontSize: '2rem', color: 'var(--accent-green)' }}></i>
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Namaste China</h3>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.7', opacity: 0.85, marginBottom: '25px' }}>
              India's trusted gateway to verified Chinese manufacturers. We bridge borders with transparency, compliance, and on-ground support.
            </p>
            
            {/* Social Links with Enhanced Styling */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
              {[
                { icon: 'fa-linkedin', link: '#', color: '#0A66C2', name: 'LinkedIn' },
                { icon: 'fa-whatsapp', link: 'https://wa.me/919370947790', color: '#25D366', name: 'WhatsApp' },
                { icon: 'fa-facebook', link: '#', color: '#1877F2', name: 'Facebook' },
                { icon: 'fa-instagram', link: 'https://www.instagram.com/namastechina5/', color: '#E4405F', name: 'Instagram' }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  onMouseEnter={() => setHoveredSocial(idx)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{ 
                    width: '45px', 
                    height: '45px', 
                    borderRadius: '50%', 
                    background: hoveredSocial === idx ? social.color : 'rgba(255,255,255,0.1)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    border: hoveredSocial === idx ? `2px solid ${social.color}` : '2px solid rgba(255,255,255,0.2)',
                    transform: hoveredSocial === idx ? 'translateY(-5px) scale(1.1)' : 'translateY(0) scale(1)',
                    boxShadow: hoveredSocial === idx ? `0 5px 15px ${social.color}40` : 'none'
                  }}
                >
                  <i className={`fa-brands ${social.icon}`} style={{ fontSize: '1.2rem', color: 'white' }}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div style={{ minWidth: 0 }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--accent-green)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2.2' }}>
              {[
                { label: 'Product Sourcing', path: '/sourcing' },
                { label: 'Supplier Verification', path: '/verification' },
                { label: 'Factory Visits', path: '/factory-visits' },
                { label: 'Import Assistance', path: '/import-assistance' },
                { label: 'Trade Consulting', path: '/trade-consulting' },
                { label: 'Canton Fair 2026', path: '/canton-fair' }
              ].map((item, idx) => (
                <li 
                  key={idx}
                  onClick={() => handlePageSelect(item.path)}
                  style={{ 
                    opacity: 0.8, 
                    cursor: 'pointer', 
                    transition: 'all 0.3s ease',
                    paddingLeft: '0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.paddingLeft = '10px';
                    e.currentTarget.style.color = 'var(--accent-green)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                    e.currentTarget.style.paddingLeft = '0';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem', marginRight: '8px' }}></i>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div style={{ minWidth: 0 }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--accent-green)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2.2' }}>
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Membership Plans', path: '/membership' },
                { label: 'Contact Us', path: '/contact' }
              ].map((item, idx) => (
                <li 
                  key={idx}
                  onClick={() => handlePageSelect(item.path)}
                  style={{ 
                    opacity: 0.8, 
                    cursor: 'pointer', 
                    transition: 'all 0.3s ease',
                    paddingLeft: '0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.paddingLeft = '10px';
                    e.currentTarget.style.color = 'var(--accent-green)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                    e.currentTarget.style.paddingLeft = '0';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem', marginRight: '8px' }}></i>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info with Full Addresses */}
          <div style={{ minWidth: 0 }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--accent-green)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Us</h4>
            
            {/* Mumbai Office */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                <i className="fa-solid fa-location-dot"></i> India Office
              </p>
              <p style={{ fontSize: '0.8rem', opacity: 0.85, lineHeight: '1.5', margin: 0 }}>
                Office No. 123, First Floor,<br />
                Mahaveer Market, Plot No. 1,<br />
                Sector 18, Vashi,<br />
                Navi Mumbai - 400703
              </p>
            </div>

            {/* China Office */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontWeight: '600', marginBottom: '8px', color: '#d4af37', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                <i className="fa-solid fa-location-dot"></i> China Office
              </p>
              <p style={{ fontSize: '0.8rem', opacity: 0.85, lineHeight: '1.5', margin: 0 }}>
                Xianghai International Financial Center<br />
                (Poly Sky-North Tower),<br />
                No. 7 Jin Yuan Road,<br />
                Nanhai District, Foshan City
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '0.85rem', wordBreak: 'break-word' }}>
                <i className="fa-solid fa-envelope" style={{ color: 'var(--accent-green)', width: '18px', flexShrink: 0 }}></i>
                <a href="mailto:support@namastechina.org" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-green)'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                  support@namastechina.org
                </a>
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <i className="fa-brands fa-whatsapp" style={{ color: '#25D366', width: '18px', flexShrink: 0 }}></i>
                <a href="https://wa.me/919370947790" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#25D366'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                  +91 93709 47790
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '25px', 
          paddingBottom: '25px',
          marginTop: '40px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '15px'
          }}>
            <p style={{ fontSize: '0.9rem', opacity: 0.7, margin: 0 }}>
              © 2026 Namaste China. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.85rem', opacity: 0.7 }}>
              <span>Privacy Policy</span>
              <span style={{ opacity: 0.4 }}>|</span>
              <span>Terms & Conditions</span>
              <span style={{ opacity: 0.4 }}>|</span>
              <span>Refund Policy</span>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', opacity: 0.5, margin: 0, textAlign: 'center', fontStyle: 'italic' }}>
            🇮🇳 Bridging Indian Businesses with Chinese Manufacturers 🇨🇳
          </p>
        </div>
        </div>
      </footer>
    </>
  );
}
