import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  // State for search input
  const [searchVal, setSearchVal] = useState('');
  
  // State for request/sell toggle
  const [toggleActive, setToggleActive] = useState('rfq'); // 'rfq' or 'sell'

  // State for bottom lookup box
  const [lookupVal, setLookupVal] = useState('');

  // State for Products Catalog
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // State for Freight Quote Calculator
  const [shipFrom, setShipFrom] = useState('Guangzhou, China');
  const [shipTo, setShipTo] = useState('Mumbai, India');
  const [shipWeight, setShipWeight] = useState(1000);
  const [freightQuotes, setFreightQuotes] = useState([
    { carrier: 'Maersk Line', days: '14-18 Days', price: 1800 },
    { carrier: 'MSC Shipping', days: '16-20 Days', price: 1720 },
    { carrier: 'COSCO Group', days: '12-15 Days', price: 1950 }
  ]);
  const [loadingQuotes, setLoadingQuotes] = useState(false);

  // Fetch products on mount and when search parameters change
  const fetchProducts = async (query = '') => {
    setLoadingProducts(true);
    try {
      const url = query 
        ? `http://localhost:5000/api/products?q=${encodeURIComponent(query)}`
        : 'http://localhost:5000/api/products';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (val) => {
    fetchProducts(val);
    const gridEl = document.getElementById('products-catalog');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetQuotes = async (e) => {
    e.preventDefault();
    if (!shipFrom.trim() || !shipTo.trim() || !shipWeight) {
      alert('Please fill in all freight fields.');
      return;
    }
    setLoadingQuotes(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/freight/quotes?from=${encodeURIComponent(shipFrom)}&to=${encodeURIComponent(shipTo)}&weight=${shipWeight}`
      );
      if (response.ok) {
        const data = await response.json();
        setFreightQuotes(data);
      }
    } catch (err) {
      console.error('Failed to fetch quotes:', err);
      alert('Could not calculate quotes from API.');
    } finally {
      setLoadingQuotes(false);
    }
  };

  const handleCategoryClick = (catName) => {
    setSearchVal(catName);
    fetchProducts(catName);
    const catalogSection = document.getElementById('products-catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 2. REPOSITIONED HERO SECTION */}
      <header className="hero" style={{ padding: '90px 20px 70px', background: 'linear-gradient(rgba(10, 61, 49, 0.95), rgba(10, 61, 49, 0.95)), url("https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <span className="gold-badge" style={{ marginBottom: '15px', display: 'inline-block' }}>India's Gateway to China Business</span>
        <h1 style={{ fontSize: '3rem', maxWidth: '900px', margin: '0 auto 20px', lineHeight: '1.2' }}>
          Accelerate Sourcing. Eliminate Import Risk.
        </h1>
        <p style={{ maxWidth: '750px', margin: '0 auto 35px', fontSize: '1.15rem', opacity: 0.9, lineHeight: '1.6' }}>
          Connect directly with verified Chinese manufacturers. Physically inspect samples in our <strong>Mumbai Warehouse</strong>, join our guided <strong>Canton Fair 2026 delegation</strong>, and secure door-to-door shipping compliance.
        </p>

        {/* Intent-based Split CTAs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <button 
            className="btn-large btn-fill" 
            style={{ background: 'var(--accent-gold)', color: 'var(--primary-green)', fontWeight: 'bold' }}
            onClick={() => navigate('/canton-fair')}
          >
            <i className="fa-solid fa-plane-departure" style={{ marginRight: '8px' }}></i> Canton Fair 2026 Delegation
          </button>
          
          <button 
            className="btn-large btn-outline" 
            style={{ background: 'transparent', color: 'white', border: '2px solid white' }}
            onClick={() => navigate('/sourcing')}
          >
             Start Sourcing Request
          </button>
        </div>

        {/* Dynamic Search Box */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search verified products or suppliers... (e.g. Steel, Electronics)"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSearch(searchVal);
            }}
          />
          <button onClick={() => handleSearch(searchVal)}>Search</button>
        </div>
        
        <div className="hero-tags">
          Popular Searches:{' '}
          {['Construction', 'Electronics', 'Apparel', 'Chemicals'].map((tag) => (
            <span key={tag} onClick={() => { setSearchVal(tag); handleSearch(tag); }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Trust Proof Points Above the Fold */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          maxWidth: '1100px',
          margin: '50px auto 0',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: '30px'
        }}>
          {[
            { icon: 'fa-warehouse', title: 'Mumbai Warehouse', desc: 'Inspect samples locally in India' },
            { icon: 'fa-building-shield', title: 'Guangzhou Footprint', desc: 'On-ground audits & MoU signing' },
            { icon: 'fa-truck-fast', title: 'Duty-Paid Delivery', desc: 'Full customs clearance assistance' }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', textAlign: 'left' }}>
              <i className={`fa-solid ${item.icon}`} style={{ fontSize: '1.8rem', color: 'var(--accent-gold)' }}></i>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'white' }}>{item.title}</h4>
                <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* 3. REQUEST/SELL TOGGLE SECTION */}
      <div className="toggle-section">
        <div className="toggle-box">
          <div 
            className={`toggle-btn ${toggleActive === 'rfq' ? 'active' : ''}`}
            onClick={() => setToggleActive('rfq')}
          >
            <i className="fa-solid fa-file-invoice"></i> Request for Quotation
          </div>
          <div 
            className={`toggle-btn ${toggleActive === 'sell' ? 'active' : ''}`}
            onClick={() => {
              setToggleActive('sell');
              navigate('/signup');
            }}
          >
            <i className="fa-solid fa-truck-fast"></i> Sell On Namaste China
          </div>
        </div>
      </div>

      {/* 4. SIX CORE SERVICES HUB */}
      <section className="section" style={{ background: '#white', padding: '40px 5%' }}>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Six Core India-China Trade Services</h2>
        <p style={{ textAlign: 'center', maxWidth: '650px', margin: '-20px auto 40px', color: 'var(--text-grey)', fontSize: '0.95rem' }}>
          Outcome-led B2B trade structures verified by our local Mumbai and Guangdong teams.
        </p>

        <div className="service-hub-grid">
          {[
            {
              icon: 'fa-plane-departure',
              title: 'Canton Fair 2026 Delegation',
              desc: 'Join India\'s leading trade travel package. Includes invitation letters, visa processing, 5-star hotels, transfers, and English-Chinese trade interpreters.',
              cta: 'Register for Delegation',
              page: 'canton-fair'
            },
            {
              icon: 'fa-box-open',
              title: 'China Product Sourcing',
              desc: 'Find verified direct manufacturers. We source, negotiate pricing, and ship sample units to our Mumbai warehouse for your physical approval.',
              cta: 'Request Sourcing Plan',
              page: 'sourcing'
            },
            {
              icon: 'fa-user-shield',
              title: 'Supplier Verification & Audits',
              desc: 'Prevent payment fraud. Our Guangzhou office checks business registry licenses (AIC) and performs physical factory floor checkups.',
              cta: 'Request Supplier Audit',
              page: 'verification'
            },
            {
              icon: 'fa-building-shield',
              title: 'Factory Visits & Tours',
              desc: 'Coordinate travel directly to manufacturing zones in Foshan, Shenzhen, and Yiwu. We arrange drivers and expert trade guides.',
              cta: 'Plan Factory Visit',
              page: 'factory-visits'
            },
            {
              icon: 'fa-truck-ramp-box',
              title: 'Import Assistance & Logistics',
              desc: 'Calculate tariffs, check compliance (BIS/EPR), and book sea container freight (FCL/LCL) or air cargo with full tracking.',
              cta: 'Get Shipping Rates',
              page: 'import-assistance'
            },
            {
              icon: 'fa-scale-balanced',
              title: 'China Trade Consulting',
              desc: 'Analyze transaction risks, calculate complete landed costs, draft legally protective bilingual MoUs, and resolve disputes.',
              cta: 'Schedule Consultation',
              page: 'trade-consulting'
            }
          ].map((item, index) => (
            <div className="service-hub-card" key={index}>
              <div>
                <div className="service-hub-icon">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <button 
                className="btn-primary" 
                style={{ width: 'fit-content', marginTop: '10px' }}
                onClick={() => {
                  navigate(`/${item.page}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {item.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DASHBOARD LAYOUT (3 Columns) */}
      <section className="dashboard-section">
        <div className="dashboard-grid">
          
          {/* LEFT COLUMN: Categories */}
          <aside className="dash-sidebar">
            <div className="sidebar-header">
              <i className="fa-solid fa-list-ul"></i> Product Sectors
            </div>
            <ul className="cat-list">
              {[
                'Auto Vehicle & Accessories',
                'Beauty & Personal Care',
                'Consumer Electronics',
                'Electronic Components',
                'Fashion Accessories',
                'Food & Beverages',
                'Furniture & Home Decor',
                'Health Care',
                'Home Appliances',
                'Industrial Supplies'
              ].map((cat) => (
                <li key={cat}>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick(cat); }}>
                    {cat} <i className="fa-solid fa-chevron-right"></i>
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* MIDDLE COLUMN: Main Banner */}
          <main className="dash-main">
            <div className="main-banner" style={{ background: 'linear-gradient(rgba(10, 61, 49, 0.9), rgba(10, 61, 49, 0.9)), url("https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover' }}>
              <div className="banner-txt">
                <span className="gold-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>Mumbai Sourcing Hub</span>
                <h2>Physical Sample Verification</h2>
                <p>
                  Chinese manufacturers partner with us through formal trade MoUs, and product samples are sourced
                  and stored at our Mumbai warehouse. Indian buyers can easily inspect and approve samples
                  locally. After approval, we manage supplier coordination, quality testing, compliance,
                  logistics, and final delivery—making cross-border sourcing simple, transparent, and reliable.
                </p>
                <button 
                  className="btn-primary" 
                  style={{ background: 'white', color: 'var(--primary-green)' }}
                  onClick={() => navigate('/about')}
                >
                  Learn About Our Footprint
                </button>
              </div>
            </div>

            {/* Bottom Sourcing lookup */}
            <div className="lookup-box">
              <h3>Describe Sourcing Needs:</h3>
              <div className="lookup-input">
                <input 
                  type="text" 
                  placeholder="What item are you looking for? (e.g. Copper wire, Ceramic tiles)"
                  value={lookupVal}
                  onChange={(e) => setLookupVal(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSearch(lookupVal);
                  }}
                />
                <button onClick={() => handleSearch(lookupVal)}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </main>

          {/* RIGHT COLUMN: Active B2B Partners */}
          <aside className="dash-right">
            <div className="sidebar-header">
              Active Trade Partners
              <a href="#" onClick={(e) => { e.preventDefault(); alert('We have over 500+ active trade partners. Contact support for introductions.'); }} style={{ fontSize: '0.8rem', color: 'var(--accent-green)' }}>
                See All
              </a>
            </div>
            <div className="company-list">
              {[
                { letter: 'A', name: 'Alpha Tech Ltd.', sector: 'Consumer Electronics' },
                { letter: 'B', name: 'Best Beauty Co.', sector: 'Cosmetics & Care' },
                { letter: 'C', name: 'Core Logistics', sector: 'Freight & Clearing' },
                { letter: 'D', name: 'Delta Fabrics', sector: 'Apparel & Textiles' },
                { letter: 'E', name: 'Echo Foods Inc.', sector: 'Food & Beverage' }
              ].map((co) => (
                <div className="company-item" key={co.name}>
                  <div className="co-logo">{co.letter}</div>
                  <div className="co-info">
                    <strong>{co.name}</strong>
                    <span>{co.sector}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>

        </div>
      </section>

      {/* 6. INSTANT FREIGHT CALCULATOR */}
      {/* <section className="section" style={{ background: '#fdfcf7', padding: '60px 5%' }}>
        <h2 className="section-title">Instant Sea/Air Freight Quotes</h2>
        <div className="freight-container">
          <form className="freight-inputs" onSubmit={handleGetQuotes}>
            <div className="input-group">
              <label>Ship From (China Port)</label>
              <input 
                type="text" 
                value={shipFrom} 
                onChange={(e) => setShipFrom(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>Ship To (India Port)</label>
              <input 
                type="text" 
                value={shipTo} 
                onChange={(e) => setShipTo(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>Weight (kg)</label>
              <input 
                type="number" 
                value={shipWeight} 
                onChange={(e) => setShipWeight(Number(e.target.value))} 
              />
            </div>
            <button className="btn-primary" type="submit" disabled={loadingQuotes}>
              {loadingQuotes ? 'Calculating...' : 'Get Rates'}
            </button>
          </form>
          
          <div className="freight-cards">
            {freightQuotes.map((q) => (
              <div className="quote-card" key={q.carrier}>
                <div>
                  <h3>{q.carrier}</h3>
                  <p>{q.days}</p>
                </div>
                <div className="quote-price">${q.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 7. TRENDING PRODUCTS CATALOG */}
      <section className="section" id="products-catalog">
        <h2 className="section-title">Trending Sourced B2B Items</h2>
        {loadingProducts ? (
          <p style={{ textAlign: 'center', color: '#666' }}>Loading B2B products catalog...</p>
        ) : (
          <div className="scroll-container">
            {products.map((prod) => (
              <div className="product-card" key={prod.id}>
                <div className="p-img" style={{ background: '#fdfcf7' }}>
                  {prod.image_url.includes('placeholder') ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--primary-green)' }}>
                      <i className="fa-solid fa-cubes" style={{ fontSize: '2rem', marginBottom: '8px' }}></i>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{prod.title.split(' ')[1] || 'B2B Item'}</span>
                    </div>
                  ) : (
                    <img src={prod.image_url} alt={prod.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  )}
                </div>
                <div className="p-info">
                  <span className="gold-badge" style={{ fontSize: '0.65rem' }}>Verified Sourced</span>
                  <h4 style={{ marginTop: '8px' }}>{prod.title}</h4>
                  <div className="p-row">
                    <div className="origin">
                      <i className="fa-solid fa-earth-asia" style={{ color: 'var(--primary-green)' }}></i> <span>China Factory</span>
                    </div>
                    <div className="price">${prod.price.toFixed(2)}</div>
                  </div>
                  <button className="btn-buy" style={{ width: '100%', marginTop: '10px' }} onClick={() => {
                    navigate('/sourcing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}>Request Sample</button>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <p style={{ textAlign: 'center', color: '#666', width: '100%' }}>No matching verified items found. Describe your needs above to source customized items.</p>
            )}
          </div>
        )}
      </section>

      {/* 8. SOURCING STEPS */}
      <section className="section" style={{ background: '#fdfcf7' }}>
        <h2 className="section-title">Risk-Free Sourcing Process</h2>
        <div className="sourcing-steps">
          <div className="step-list">
            {[
              { num: 1, title: 'Submit Requirements', desc: 'List your product specifications, target pricing, and quantities in our B2B hub.' },
              { num: 2, title: 'Inspect Local Samples', desc: 'Review the actual product sample physically at our Mumbai warehouse.' },
              { num: 3, title: 'Secure Container Delivery', desc: 'Commit to bulk order. We handle container loading, compliance checks, and customs clearing.' }
            ].map((step) => (
              <div className="step" key={step.num}>
                <div className="step-num">{step.num}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
            <button className="btn-primary" style={{ width: 'fit-content' }} onClick={() => navigate('/membership')}>
              Compare Membership Plans
            </button>
          </div>
          <div className="sourcing-img" style={{ display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid #e5dfd0', background: 'white' }}>
            <h3 style={{ color: 'var(--primary-green)' }}><i className="fa-solid fa-square-poll-horizontal"></i> Trust Metrics:</h3>
            <div className="home-metrics-grid">
              <div style={{ padding: '15px', background: '#fdfcf7', borderRadius: '8px', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--primary-green)', margin: 0 }}>7 Days</h2>
                <p style={{ fontSize: '0.75rem', color: '#666' }}>Sample Delivery to Mumbai</p>
              </div>
              <div style={{ padding: '15px', background: '#fdfcf7', borderRadius: '8px', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--primary-green)', margin: 0 }}>100%</h2>
                <p style={{ fontSize: '0.75rem', color: '#666' }}>Verified AIC Chinese Licenses</p>
              </div>
              <div style={{ padding: '15px', background: '#fdfcf7', borderRadius: '8px', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--primary-green)', margin: 0 }}>500+</h2>
                <p style={{ fontSize: '0.75rem', color: '#666' }}>Indian B2B Importers Served</p>
              </div>
              <div style={{ padding: '15px', background: '#fdfcf7', borderRadius: '8px', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--primary-green)', margin: 0 }}>0%</h2>
                <p style={{ fontSize: '0.75rem', color: '#666' }}>Middleman Markup (Direct Factory Pricing)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CALENDAR */}
      <section className="section">
        <h2 className="section-title">Guided Trade Delegations</h2>
        <div className="split-section">
          <div className="green-box">
            <h2>Canton Fair 2026</h2>
            <p>Travel with India's premier B2B trade delegation to Guangzhou, China. Full assistance provided.</p>
            <button 
              className="btn-primary" 
              style={{ background: 'white', color: 'var(--primary-green)', marginTop: '20px' }}
              onClick={() => navigate('/canton-fair')}
            >
              Browse Delegation Packages
            </button>
          </div>
          <div className="event-grid">
            {[
              { title: 'Canton Fair Phase 1', details: '🇨🇳 Guangzhou • Electronics & Machinery • April 2026' },
              { title: 'Canton Fair Phase 2', details: '🇨🇳 Guangzhou • Furniture & Decor • April 2026' },
              { title: 'Canton Fair Phase 3', details: '🇨🇳 Guangzhou • Apparel & Textles • May 2026' },
              { title: 'Yiwu Commodities Fair', details: '🇨🇳 Yiwu • Retail & Small Commodities • October 2026' }
            ].map((evt, idx) => (
              <div className="event-card" key={idx} style={{ cursor: 'pointer' }} onClick={() => navigate('/canton-fair')}>
                <h4>{evt.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>{evt.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. BOTTOM CTA */}
      <div className="cta-section" style={{ padding: '80px 20px', borderTop: '1px solid #e5dfd0', background: 'linear-gradient(135deg, #fdfcf7 0%, #ffffff 100%)' }}>
        <h2>Join Namaste China to scale your sourcing safely!</h2>
        <div className="cta-buttons">
          <button className="btn-large btn-fill" style={{ borderRadius: '6px' }} onClick={() => navigate('/signup')}>Register as Buyer</button>
          <button className="btn-large btn-outline" style={{ borderRadius: '6px' }} onClick={() => navigate('/signup')}>Register as Supplier</button>
        </div>
      </div>
    </>
  );
}
