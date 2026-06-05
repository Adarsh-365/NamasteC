import { useState } from 'react';
import { submitToGoogleSheets, FORM_TYPES } from '../utils/googleSheets';
import SuccessModal from './SuccessModal';

export default function ImportAssistance() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cargoDetails, setCargoDetails] = useState('');
  const [freightType, setFreightType] = useState('Sea Freight (LCL)');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessLogistics, setShowSuccessLogistics] = useState(false);
  const [showSuccessFreight, setShowSuccessFreight] = useState(false);

  // Freight Quote Calculator States
  const [shipFrom, setShipFrom] = useState('Shenzhen, China');
  const [shipTo, setShipTo] = useState('Mumbai, India');
  const [shipWeight, setShipWeight] = useState(1000);
  const [quotes, setQuotes] = useState([
    { carrier: 'Maersk Line', days: '14-18 Days', price: 1800 },
    { carrier: 'MSC Shipping', days: '16-20 Days', price: 1720 },
    { carrier: 'COSCO Group', days: '12-15 Days', price: 1950 }
  ]);
  const [calculating, setCalculating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Submit logistics inquiry to Google Sheets
      await submitToGoogleSheets(FORM_TYPES.LOGISTICS, {
        name,
        email,
        phone,
        freightType,
        cargoDetails
      });
      
      setShowSuccessLogistics(true);
      setName('');
      setEmail('');
      setPhone('');
      setCargoDetails('');
    } catch (err) {
      console.error(err);
      alert('Failed to submit. Please try again or contact us via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGetQuotes = async (e) => {
    e.preventDefault();
    setCalculating(true);
    try {
      // Submit freight calculation to Google Sheets
      await submitToGoogleSheets(FORM_TYPES.FREIGHT_CALC, {
        shipFrom,
        shipTo,
        shipWeight
      });
      
      // Keep the mock quotes for now since backend is removed
      setShowSuccessFreight(true);
    } catch (err) {
      console.error(err);
      alert('Failed to submit quote request.');
    } finally {
      setCalculating(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `Hi Namaste China, I need customs & logistics assistance for: ${cargoDetails || 'B2B cargo'}`;
    window.open(`https://wa.me/919370947790?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <SuccessModal 
        isOpen={showSuccessLogistics}
        onClose={() => setShowSuccessLogistics(false)}
        title="Logistics Inquiry Received!"
        message="Our customs & shipping team will review your cargo details and send you a detailed quote within 24-48 hours."
      />
      <SuccessModal 
        isOpen={showSuccessFreight}
        onClose={() => setShowSuccessFreight(false)}
        title="Freight Quote Request Received!"
        message="Our logistics team will calculate accurate shipping rates and contact you within 24 hours."
      />
      <header className="page-header" style={{
        background: `linear-gradient(rgba(10, 61, 49, 0.9), rgba(10, 61, 49, 0.9)), url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <span className="gold-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>Customs & Sea-Air Logistics</span>
        <h1>Import Assistance & Compliance</h1>
        <p>Navigate complex customs regulations, calculate import duties, arrange container logistics, and secure safe doorstep delivery in India.</p>
      </header>

      {/* Compliance / Customs details */}
      <section className="content-section">
        <div className="about-container">
          <div className="about-split-section" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="about-section-title">Hassle-Free Customs Clearance & Compliance</h2>
              <p className="text-block">
                Importing goods from China involves managing complex trade regulations, custom inspections, and duty rates. Wrong HS Code classification or incomplete paperwork (such as BIS, WPC, or EPR certificates in India) can lead to expensive custom penalties and terminal delays.
                <br /><br />
                Our trade compliance team handles the entire documentation review before your container leaves the Chinese port, ensuring full adherence to Indian Customs rules and secure clearance at Mumbai, Nhava Sheva, or Delhi ICDs.
              </p>
              
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => {
                  const formEl = document.getElementById('logistics-form');
                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                }}>Request Logistics Quote</button>
                <button className="btn-large btn-outline" onClick={handleWhatsApp} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid #25D366', color: '#25D366', padding: '10px 20px', borderRadius: '6px' }}>
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> Consult Sourcing Desk
                </button>
              </div>
            </div>

            <div style={{ background: '#fdfcf7', padding: '30px', borderRadius: '12px', border: '1px solid #e5dfd0' }}>
              <h3 style={{ color: 'var(--primary-green)', marginBottom: '15px' }}><i className="fa-solid fa-anchor"></i> Our Logistics Inclusions:</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  { title: 'HS Code Verification', desc: 'Expert tariff matching to prevent duty overpayments.' },
                  { title: 'BIS / Certification support', desc: 'Guidance on mandatory certificates for Indian regulations.' },
                  { title: 'Container Booking (FCL / LCL)', desc: 'Secure space allocations from top carriers at competitive rates.' },
                  { title: 'Door-to-Door Delivery', desc: 'Customs clearance + inland transport straight to your warehouse.' }
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

      {/* Interactive Freight Quotes calculator */}
      <section className="content-section alt-bg">
        <div className="about-container">
          <h2 className="about-section-title" style={{ textAlign: 'center', display: 'block', width: 'fit-content', margin: '0 auto 40px' }}>
            Instant Freight Quote Calculator
          </h2>

          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 5px 20px rgba(0,0,0,0.02)' }}>
            <form className="freight-inputs" onSubmit={handleGetQuotes} style={{ border: 'none', padding: 0, boxShadow: 'none' }}>
              <div className="input-group">
                <label>Ship From (China Port)</label>
                <input 
                  type="text" 
                  value={shipFrom} 
                  onChange={(e) => setShipFrom(e.target.value)} 
                />
              </div>
              <div className="input-group">
                <label>Ship To (India Port / ICD)</label>
                <input 
                  type="text" 
                  value={shipTo} 
                  onChange={(e) => setShipTo(e.target.value)} 
                />
              </div>
              <div className="input-group">
                <label>Total Cargo Weight (kg)</label>
                <input 
                  type="number" 
                  value={shipWeight} 
                  onChange={(e) => setShipWeight(Number(e.target.value))} 
                />
              </div>
              <button className="btn-primary" type="submit" disabled={calculating}>
                {calculating ? 'Calculating...' : 'Fetch Quotes'}
              </button>
            </form>

            <div className="freight-cards" style={{ marginTop: '30px' }}>
              {quotes.map((q) => (
                <div className="quote-card" key={q.carrier} style={{ border: '1px solid #eee' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{q.carrier}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>Estimated Transit: {q.days}</p>
                  </div>
                  <div className="quote-price" style={{ color: 'var(--primary-green)', fontSize: '1.4rem' }}>
                    ${q.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="content-section" id="logistics-form">
        <div className="about-container" style={{ maxWidth: '650px' }}>
          <form onSubmit={handleSubmit} className="form" style={{ margin: 0, width: '100%', maxWidth: 'none' }}>
            <h2 style={{ textAlign: 'center', color: 'var(--primary-green)' }}>Customs & Shipping Inquiry</h2>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
              Receive detailed cargo clearance quotes and timelines.
            </p>

            <label>Full Name *</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Priyesh Shah" 
              required 
            />

            <label>Business Email *</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="e.g. priyesh@metalparts.in" 
              required 
            />

            <label>Phone / Mobile</label>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="e.g. +91 90000 12345" 
            />

            <label>Select Shipping Mode *</label>
            <select value={freightType} onChange={(e) => setFreightType(e.target.value)}>
              <option value="Sea Freight (LCL)">Sea Freight LCL (Less than Container Load)</option>
              <option value="Sea Freight (FCL)">Sea Freight FCL (Full Container Load)</option>
              <option value="Air Freight">Air Cargo (Express Sourcing)</option>
              <option value="Customs Only">Customs Clearance Only (India Ports)</option>
            </select>

            <label>Describe Your Cargo Details *</label>
            <textarea 
              value={cargoDetails} 
              onChange={(e) => setCargoDetails(e.target.value)} 
              placeholder="E.g. 500kg aluminum bearings, HS Code 848210, shipping from Foshan to Mumbai port..." 
              rows="4"
              required
            />

            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting Shipping Inquiry...' : 'Submit Logistics Request'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
