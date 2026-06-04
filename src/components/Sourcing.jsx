import React, { useState } from 'react';

export default function Sourcing({ setCurrentPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productType, setProductType] = useState('');
  const [quantity, setQuantity] = useState('');
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
          phone,
          service: 'Product Sourcing',
          requirement: `Product Type: ${productType}, Est. Quantity: ${quantity}`
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Sourcing inquiry submitted successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setProductType('');
        setQuantity('');
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
    const text = `Hi Namaste China, I would like to inquire about Sourcing & Sample Inspection for: ${productType || 'B2B Products'}`;
    window.open(`https://wa.me/919370947790?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <header className="page-header" style={{
        background: `linear-gradient(rgba(10, 61, 49, 0.9), rgba(10, 61, 49, 0.9)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <span className="gold-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>Sourcing & Warehouse Hub</span>
        <h1>China Product Sourcing</h1>
        <p>Source directly from top-tier Chinese manufacturers with local sample approval at our Mumbai warehouse.</p>
      </header>

      {/* Intro Section */}
      <section className="content-section">
        <div className="about-container">
          <div className="about-split-section" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="about-section-title">Eliminating Cross-Border Sourcing Risks</h2>
              <p className="text-block">
                For most Indian importers, the biggest risk when buying from China is receiving goods that do not match the expected quality. Namaste China solves this by acting as your on-ground sourcing partner in Guangzhou and Foshan.
                <br /><br />
                We negotiate directly with factories, obtain product samples, and ship them to our **Mumbai Sourcing Warehouse** in just one week. You inspect the sample locally in India before committing to bulk manufacturing.
              </p>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => {
                  const formEl = document.getElementById('sourcing-form');
                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                }}>Request Sourcing Quote</button>
                <button className="btn-large btn-outline" onClick={handleWhatsApp} style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '6px', padding: '10px 20px' }}>
                  <i className="fa-brands fa-whatsapp" style={{ color: '#25D366', fontSize: '1.2rem' }}></i> Consult on WhatsApp
                </button>
              </div>
            </div>
            
            <div style={{ background: '#fdfcf7', padding: '30px', borderRadius: '12px', border: '1px solid #e5dfd0', boxShadow: '0 5px 20px rgba(0,0,0,0.02)' }}>
              <h3 style={{ color: 'var(--primary-green)', marginBottom: '15px' }}><i className="fa-solid fa-building-circle-check"></i> Sourcing Highlights:</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  { title: 'Local Inspection', desc: 'Approve samples physically at our Mumbai warehouse.' },
                  { title: 'Factory Price Negotiation', desc: 'Direct contracts signed under formal trade MoUs.' },
                  { title: 'Secure Payment Flow', desc: '50% deposit, with the balance due only after local check.' },
                  { title: 'Quality Assurance', desc: 'On-ground checking at Chinese factories before container loading.' }
                ].map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '15px', display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <i className="fa-solid fa-circle-check" style={{ color: 'var(--accent-green)', marginTop: '4px' }}></i>
                    <div>
                      <strong>{item.title}</strong>
                      <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '2px' }}>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Workflow */}
      <section className="content-section alt-bg">
        <div className="about-container">
          <h2 className="about-section-title" style={{ textAlign: 'center', display: 'block', width: 'fit-content', margin: '0 auto 40px' }}>
            Our 3-Step Sourcing Workflow
          </h2>
          
          <div className="step-container-horizontal">
            <div className="step-item-horizontal">
              <div className="step-number-circle">1</div>
              <h3>Submit Inquiry</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
                Define product technical specifications, target pricing, and estimated order quantity.
              </p>
            </div>
            
            <div className="step-item-horizontal">
              <div className="step-number-circle">2</div>
              <h3>Verify & Sample</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
                We screen suppliers, verify credentials, and ship physical samples to Mumbai in 7 days.
              </p>
            </div>
            
            <div className="step-item-horizontal">
              <div className="step-number-circle">3</div>
              <h3>Approve & Order</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
                Inspect the sample physically. Upon approval, we execute the order with full contract protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="content-section" id="sourcing-form">
        <div className="about-container" style={{ maxWidth: '650px' }}>
          <form onSubmit={handleSubmit} className="form" style={{ margin: 0, width: '100%', maxWidth: 'none' }}>
            <h2 style={{ textAlign: 'center', color: 'var(--primary-green)' }}>Start Sourcing Request</h2>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
              Connect with our procurement specialists in Mumbai and Guangzhou.
            </p>

            <label>Full Name *</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Amit Patel" 
              required 
            />

            <label>Business Email *</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="e.g. amit@fabrics.in" 
              required 
            />

            <label>Phone / Mobile</label>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="e.g. +91 98200 12345" 
            />

            <label>What Product Do You Need? *</label>
            <input 
              type="text" 
              value={productType} 
              onChange={(e) => setProductType(e.target.value)} 
              placeholder="e.g. LED displays, ceramic tiles, auto spare parts" 
              required 
            />

            <label>Estimated Order Quantity (Monthly / Bulk)</label>
            <input 
              type="text" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              placeholder="e.g. 5,000 units, 2 containers" 
            />

            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting Sourcing Ticket...' : 'Request Verification & Sourcing'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
