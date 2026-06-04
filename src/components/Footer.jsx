import React from 'react';

export default function Footer({ setCurrentPage }) {
  const handlePageSelect = (pageName) => {
    setCurrentPage(pageName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <div className="logo" style={{ color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-earth-asia" style={{ color: 'var(--accent-green)' }}></i>
            <span>Namaste China</span>
          </div>
          <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '15px' }}>
            Connecting Indian importers to verified Chinese manufacturers with trust, transparency, and compliance support. India's official gateway to safe China sourcing.
          </p>
          <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
            <p><i className="fa-solid fa-envelope"></i> support@namastechina.org</p>
            <p style={{ marginTop: '5px' }}><i className="fa-brands fa-whatsapp"></i> +91 93709 47790 (WhatsApp Sourcing Desk)</p>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>B2B Sourcing Services</h4>
          <ul>
            <li onClick={() => handlePageSelect('sourcing')}>Product Sourcing</li>
            <li onClick={() => handlePageSelect('verification')}>Supplier Verification & Audits</li>
            <li onClick={() => handlePageSelect('factoryvisits')}>Factory Visits & Tours</li>
            <li onClick={() => handlePageSelect('importassistance')}>Import Assistance & Logistics</li>
            <li onClick={() => handlePageSelect('tradeconsulting')}>China Trade Consulting</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Global Presence</h4>
          <ul style={{ fontSize: '0.85rem', opacity: 0.85, lineHeight: '1.6' }}>
            <li><strong>Mumbai Head Office:</strong></li>
            <li>Namaste India Group, Sourcing & Warehouse Hub, Mumbai, India</li>
            <li style={{ marginTop: '10px' }}><strong>Guangzhou Sourcing Center:</strong></li>
            <li>Liwan District, Guangzhou City, Guangdong Province, China</li>
            <li style={{ marginTop: '10px' }}><strong>Foshan Sourcing Office:</strong></li>
            <li>Shunde District, Foshan City, Guangdong Province, China</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Quick Actions</h4>
          <ul>
            <li onClick={() => handlePageSelect('about')}>About Us</li>
            <li onClick={() => handlePageSelect('membership')}>Membership Plans</li>
            <li onClick={() => handlePageSelect('cantonfair')}>Canton Fair 2026</li>
            <li onClick={() => handlePageSelect('contact')}>Consultation Hub</li>
            <li onClick={() => alert('Privacy Policy coming soon! Namaste China ensures complete data privacy for our B2B partners.')}>Privacy Policy</li>
            <li onClick={() => alert('Terms & Conditions document is being drafted for Canton Fair 2026. All booking deposits are legally structured.')}>Terms & Conditions</li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        &copy; 2026 Namaste China. All rights reserved. #IndiaGatewayToChinaBusiness
      </div>
    </footer>
  );
}
