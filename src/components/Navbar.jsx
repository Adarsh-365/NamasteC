import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import BrandMark from './BrandMark';

export default function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePageSelect = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceSelect = (path) => {
    navigate(path);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <Link 
        to="/" 
        className="logo" 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: 'inherit', minWidth: 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <BrandMark height={72} />
      </Link>

      <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Home
          </NavLink>
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
                { label: 'China Product Sourcing', path: '/sourcing', icon: 'fa-box-open' },
                { label: 'Supplier Verification & Audits', path: '/verification', icon: 'fa-user-shield' },
                { label: 'Factory Visits & Tours', path: '/factory-visits', icon: 'fa-building-shield' },
                { label: 'Import Assistance & Logistics', path: '/import-assistance', icon: 'fa-truck-ramp-box' },
                { label: 'Trade Consulting & Advisory', path: '/trade-consulting', icon: 'fa-scale-balanced' }
              ].map((item) => (
                <li 
                  key={item.path}
                  onClick={() => handleServiceSelect(item.path)}
                  className="dropdown-item"
                >
                  <i className={`fa-solid ${item.icon}`} style={{ color: 'var(--primary-green)', width: '16px' }}></i>
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </li>

        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/membership" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Membership Plans
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/canton-fair" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Canton Fair 2026
          </NavLink>
        </li>
        {/* <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Contact Us
          </NavLink>
        </li> */}

        {/* Mobile contact button (will be visible only on mobile via CSS) */}
        <li className="mobile-auth-item">
          <button className="btn-primary" onClick={() => handlePageSelect('/contact')}>Contact Us</button>
        </li>
      </ul>

      <div className="auth-buttons">
        <button className="btn-primary" onClick={() => navigate('/contact')}>Contact Us</button>
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
