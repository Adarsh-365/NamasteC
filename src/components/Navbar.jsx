import React, { useState } from 'react';

export default function Navbar({ currentPage, setCurrentPage }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePageSelect = (pageName) => {
    setCurrentPage(pageName);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceSelect = (pageName) => {
    setCurrentPage(pageName);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => handlePageSelect('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <i className="fa-solid fa-earth-asia" style={{ color: 'var(--accent-green)' }}></i>
        <span>Namaste China</span>
      </div>

      <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <li 
          className={currentPage === 'home' ? 'active' : ''} 
          onClick={() => handlePageSelect('home')}
        >
          Home
        </li>
        
        {/* Services Dropdown */}
        <li 
          className="services-dropdown-container"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <span 
            style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            B2B Services <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.75rem' }}></i>
          </span>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              {[
                { label: 'China Product Sourcing', page: 'sourcing', icon: 'fa-box-open' },
                { label: 'Supplier Verification & Audits', page: 'verification', icon: 'fa-user-shield' },
                { label: 'Factory Visits & Tours', page: 'factoryvisits', icon: 'fa-building-shield' },
                { label: 'Import Assistance & Logistics', page: 'importassistance', icon: 'fa-truck-ramp-box' },
                { label: 'Trade Consulting & Advisory', page: 'tradeconsulting', icon: 'fa-scale-balanced' }
              ].map((item) => (
                <li 
                  key={item.page}
                  onClick={() => handleServiceSelect(item.page)}
                  className="dropdown-item"
                >
                  <i className={`fa-solid ${item.icon}`} style={{ color: 'var(--primary-green)', width: '16px' }}></i>
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </li>

        <li 
          className={currentPage === 'about' ? 'active' : ''} 
          onClick={() => handlePageSelect('about')}
        >
          About Us
        </li>
        <li 
          className={currentPage === 'membership' ? 'active' : ''} 
          onClick={() => handlePageSelect('membership')}
        >
          Membership Plans
        </li>
        <li 
          className={currentPage === 'cantonfair' ? 'active' : ''} 
          onClick={() => handlePageSelect('cantonfair')}
        >
          Canton Fair 2026
        </li>
        <li 
          className={currentPage === 'contact' ? 'active' : ''} 
          onClick={() => handlePageSelect('contact')}
        >
          Contact Us
        </li>

        {/* Mobile auth links (will be visible only on mobile via CSS) */}
        <li className="mobile-auth-item">
          <button className="btn-text mobile-login-btn" onClick={() => handlePageSelect('login')}>Log In</button>
          <button className="btn-primary mobile-join-btn" onClick={() => handlePageSelect('signup')}>Join Free</button>
        </li>
      </ul>

      <div className="auth-buttons">
        <button className="btn-text" onClick={() => setCurrentPage('login')}>Log In</button>
        <button className="btn-primary" onClick={() => setCurrentPage('signup')}>Join Free</button>
      </div>

      {/* Hamburger icon for mobile menu toggler */}
      <button 
        className="nav-hamburger" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        <i className={mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </button>
    </nav>
  );
}
