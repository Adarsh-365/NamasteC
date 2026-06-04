import React, { useState } from 'react';

export default function Verification({ setCurrentPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [supplierUrl, setSupplierUrl] = useState('');
  const [auditType, setAuditType] = useState('Basic Validation');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          service: 'Supplier Verification',
          requirement: `Supplier URL/Name: ${supplierUrl} (Company: ${companyName}), Audit Choice: ${auditType}`
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Audit request submitted successfully!');
        setName('');
        setEmail('');
        setCompanyName('');
        setSupplierUrl('');
      } else {
        alert(data.error || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to the Consultation API.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `Hi Namaste China, I would like to request supplier verification for: ${companyName || 'Chinese Supplier'}`;
    window.open(`https://wa.me/919370947790?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <header className="page-header" style={{
        background: `linear-gradient(rgba(10, 61, 49, 0.9), rgba(10, 61, 49, 0.9)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <span className="gold-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>Fraud Prevention & Due Diligence</span>
        <h1>Supplier Verification Services</h1>
        <p>Before transferring funds to China, let our Guangzhou audit team verify the registry records and factory floor operations.</p>
      </header>

      {/* Audit Checklist */}
      <section className="content-section">
        <div className="about-container">
          <div className="about-split-section" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="about-section-title">Why Supplier Verification is Mandatory</h2>
              <p className="text-block">
                Trading online is quick, but it makes it easy for trading companies to pose as genuine manufacturers. Over 40% of suppliers listed online are middlemen, inflating costs, and many are active shell companies.
                <br /><br />
                Our verification checks ensure you deal with authorized suppliers. We physically check operations, check legal licenses, verify certifications, inspect bank details, and verify previous shipment logs.
              </p>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <a 
                  href="https://drive.google.com/file/d/14t3r1oSDbKU2kECaW-_CSVNBUhQmfRg3/view?usp=sharing" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-primary" 
                  style={{ textDecoration: 'none', background: 'var(--primary-green)', color: 'white' }}
                >
                  <i className="fa-solid fa-file-pdf"></i> Download Sample Audit Report
                </a>
              </div>
            </div>

            <div style={{ background: '#fdfcf7', padding: '30px', borderRadius: '12px', border: '1px solid #e5dfd0' }}>
              <h3 style={{ color: 'var(--primary-green)', marginBottom: '15px' }}><i className="fa-solid fa-clipboard-list"></i> Verification Checklist:</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Official registration check at the Chinese market authority (AIC).',
                  'Validation of production capacity and technical machinery.',
                  'Checking bank details against commercial registry records.',
                  'On-ground warehouse and factory floor audit in Guangdong.',
                  'Verification of ISO, CE, and trade certifications.',
                  'Credit standing and litigation review.'
                ].map((check, idx) => (
                  <li key={idx} style={{ marginBottom: '10px', display: 'flex', gap: '10px', fontSize: '0.9rem' }}>
                    <i className="fa-solid fa-shield-halved" style={{ color: 'var(--accent-green)', marginTop: '3px' }}></i>
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing and Service Levels */}
      <section className="content-section alt-bg">
        <div className="about-container">
          <h2 className="about-section-title" style={{ textAlign: 'center', display: 'block', width: 'fit-content', margin: '0 auto 40px' }}>
            Verification Packages
          </h2>

          <div className="pricing-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* Package 1 */}
            <div className="price-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #eee' }}>
              <h3>Registry Check</h3>
              <div className="plan-box" style={{ margin: '20px 0', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                <span className="plan-price" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-green)' }}>₹2,500</span>
                <span style={{ fontSize: '0.85rem', color: '#666', display: 'block' }}>Per Supplier Check</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: '#555', marginBottom: '20px', lineHeight: '2' }}>
                <li><i className="fa-solid fa-check" style={{ color: 'green' }}></i> AIC License verification</li>
                <li><i className="fa-solid fa-check" style={{ color: 'green' }}></i> Bank account matching</li>
                <li><i className="fa-solid fa-check" style={{ color: 'green' }}></i> Export status check</li>
                <li><i className="fa-solid fa-xmark" style={{ color: 'red' }}></i> Physical factory visit</li>
                <li><i className="fa-solid fa-xmark" style={{ color: 'red' }}></i> Machinery testing check</li>
              </ul>
              <button className="btn-primary" style={{ width: '100%' }} onClick={() => {
                setAuditType('Basic Validation');
                const formEl = document.getElementById('audit-form');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}>Book Registry Audit</button>
            </div>

            {/* Package 2 */}
            <div className="price-card featured" style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '2px solid var(--accent-green)', position: 'relative' }}>
              <div style={{
                position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)',
                background: 'var(--accent-green)', color: 'var(--primary-green)',
                padding: '5px 15px', borderRadius: '5px', fontWeight: 800, fontSize: '0.8rem'
              }}>
                RECOMMENDED
              </div>
              <h3>Full Factory Audit</h3>
              <div className="plan-box" style={{ margin: '20px 0', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                <span className="plan-price" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-green)' }}>₹7,500</span>
                <span style={{ fontSize: '0.85rem', color: '#666', display: 'block' }}>Per On-site Audit</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: '#555', marginBottom: '20px', lineHeight: '2' }}>
                <li><i className="fa-solid fa-check" style={{ color: 'green' }}></i> All Registry checks included</li>
                <li><i className="fa-solid fa-check" style={{ color: 'green' }}></i> On-site factory floor inspection</li>
                <li><i className="fa-solid fa-check" style={{ color: 'green' }}></i> Real-time photos and video</li>
                <li><i className="fa-solid fa-check" style={{ color: 'green' }}></i> Production capacity checking</li>
                <li><i className="fa-solid fa-check" style={{ color: 'green' }}></i> QC process & packaging inspection</li>
              </ul>
              <button className="btn-primary" style={{ width: '100%', background: 'var(--accent-green)', color: 'var(--primary-green)' }} onClick={() => {
                setAuditType('On-Site Audit');
                const formEl = document.getElementById('audit-form');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}>Book Factory Audit</button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="content-section" id="audit-form">
        <div className="about-container" style={{ maxWidth: '650px' }}>
          <form onSubmit={handleSubmit} className="form" style={{ margin: 0, width: '100%', maxWidth: 'none' }}>
            <h2 style={{ textAlign: 'center', color: 'var(--primary-green)' }}>Request Verification Audit</h2>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
              Ensure your international transactions are fully secured.
            </p>

            <label>Full Name *</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Vikram Mehta" 
              required 
            />

            <label>Business Email *</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="e.g. vikram@imports.in" 
              required 
            />

            <label>Supplier / Company Name *</label>
            <input 
              type="text" 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)} 
              placeholder="e.g. Guangzhou Top Electronics Ltd." 
              required 
            />

            <label>Supplier Website / Alibaba Link</label>
            <input 
              type="text" 
              value={supplierUrl} 
              onChange={(e) => setSupplierUrl(e.target.value)} 
              placeholder="e.g. https://topsensor.en.alibaba.com" 
            />

            <label>Audit Selection *</label>
            <select value={auditType} onChange={(e) => setAuditType(e.target.value)}>
              <option value="Basic Validation">Registry Check Only (₹2,500)</option>
              <option value="On-Site Audit">Full On-Site Factory Audit (₹7,500)</option>
            </select>

            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting Audit Booking...' : 'Request Validation & Sourcing'}
            </button>
            
            <button type="button" className="btn-large btn-outline" onClick={handleWhatsApp} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px', border: '2px solid #25D366', color: '#25D366' }}>
              <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.25rem' }}></i> Send Supplier details on WhatsApp
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
