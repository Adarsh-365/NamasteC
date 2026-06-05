import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const handlePageSelect = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'linear-gradient(135deg, #0a3d31 0%, #0d4d3e 100%)', color: 'white', padding: '80px 5% 0', marginTop: '80px' }}>
      {/* Main Footer Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '50px', marginBottom: '60px' }}>
          
          {/* Company Info - LEFT MOST */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <i className="fa-solid fa-earth-asia" style={{ fontSize: '2rem', color: 'var(--accent-green)' }}></i>
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Namaste China</h3>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.7', opacity: 0.85, marginBottom: '25px' }}>
              India's trusted gateway to verified Chinese manufacturers. We bridge borders with transparency, compliance, and on-ground support.
            </p>
            
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
              {[
                { icon: 'fa-linkedin', link: '#', color: '#0A66C2' },
                { icon: 'fa-whatsapp', link: 'https://wa.me/919370947790', color: '#25D366' },
                { icon: 'fa-facebook', link: '#', color: '#1877F2' },
                { icon: 'fa-instagram', link: 'https://www.instagram.com/namastechina5/', color: '#E4405F' }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    width: '45px', 
                    height: '45px', 
                    borderRadius: '50%', 
                    background: 'rgba(255,255,255,0.1)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = social.color;
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <i className={`fa-brands ${social.icon}`} style={{ fontSize: '1.2rem', color: 'white' }}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '25px', color: 'var(--accent-green)', fontWeight: '700' }}>Our Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2.2' }}>
              {[
                { label: 'Product Sourcing', path: '/sourcing' },
                { label: 'Supplier Verification', path: '/verification' },
                { label: 'Factory Visits & Tours', path: '/factory-visits' },
                { label: 'Import & Logistics', path: '/import-assistance' },
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
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '25px', color: 'var(--accent-green)', fontWeight: '700' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2.2' }}>
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Membership Plans', path: '/membership' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'Privacy Policy', action: () => alert('Privacy Policy: Namaste China ensures complete data privacy for our B2B partners. Detailed policy coming soon.') },
                { label: 'Terms & Conditions', action: () => alert('Terms & Conditions document is being prepared. All transactions are legally structured.') }
              ].map((item, idx) => (
                <li 
                  key={idx}
                  onClick={() => item.path ? handlePageSelect(item.path) : item.action()}
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

          {/* Contact Info - RIGHT MOST */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '25px', color: 'var(--accent-green)', fontWeight: '700' }}>Contact Us</h4>
            
            {/* Address */}
            <div style={{ marginBottom: '25px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', borderLeft: '4px solid var(--accent-green)' }}>
              <p style={{ fontWeight: '600', marginBottom: '10px', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-location-dot"></i> Mumbai Office
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: '1.6', marginBottom: '15px' }}>
                Office No. 19 & 20, Sector 16B,<br />
                Ulwe, Navi Mumbai 410206<br />
                Maharashtra, India
              </p>
              
              {/* Google Map Embed */}
              <div style={{ marginTop: '15px', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.3857907265634!2d73.0053!3d18.9698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e902f23fffff%3A0xfdc431c6bd23f16e!2sOffice%20No.%2019%20%26%2020%2C%20Sector%2016B%2C%20Ulwe%2C%20Navi%20Mumbai!5e0!3m2!1sen!2sin!4v1635678901234!5m2!1sen!2sin"
                  width="100%"
                  height="150"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Namaste China Mumbai Office Location"
                ></iframe>
              </div>
            </div>

            {/* Contact Details */}
            <div style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: '2.2' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <i className="fa-solid fa-envelope" style={{ color: 'var(--accent-green)', width: '20px', fontSize: '1.1rem' }}></i>
                <a href="mailto:support@namastechina.org" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-green)'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                  support@namastechina.org
                </a>
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fa-brands fa-whatsapp" style={{ color: 'var(--accent-green)', width: '20px', fontSize: '1.1rem' }}></i>
                <a href="https://wa.me/919370947790" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-green)'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                  +91 93709 47790
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '30px', 
          paddingBottom: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{ fontSize: '0.9rem', opacity: 0.7, margin: 0 }}>
            © 2026 Namaste China. All rights reserved.
          </p>
          <p style={{ fontSize: '0.85rem', opacity: 0.6, margin: 0, fontStyle: 'italic' }}>
            #IndiaGatewayToChinaBusiness
          </p>
        </div>
      </div>
    </footer>
  );
}
