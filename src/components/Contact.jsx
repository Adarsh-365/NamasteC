import { useState, useEffect } from 'react';
import { submitToGoogleSheets, FORM_TYPES } from '../utils/googleSheets';
import SuccessModal from './SuccessModal';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Canton Fair 2026 Delegation');
  const [requirement, setRequirement] = useState('');
  const [utmSource, setUtmSource] = useState('organic_direct');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Capture URL parameters for CRM/UTM source tracking on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source') || document.referrer || 'organic_direct';
    setUtmSource(source);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !service) {
      alert('Please fill out Name, Business Email, WhatsApp Number, and select a Service.');
      return;
    }
    setSubmitting(true);
    try {
      // Submit to Google Sheets
      await submitToGoogleSheets(FORM_TYPES.CONTACT, {
        name,
        email,
        phone,
        service,
        requirement: `[Tracked Source: ${utmSource}] ${requirement}`
      });
      
      setShowSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setRequirement('');
    } catch (err) {
      console.error(err);
      alert('Failed to submit. Please try again or contact us via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `Hi Namaste China, I am inquiring about: "${service}". Sourcing Source: [${utmSource}]. Let's connect.`;
    window.open(`https://wa.me/919370947790?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <SuccessModal 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Inquiry Received!"
        message="Thank you for reaching out! Our trade advisors will contact you within 24 hours via email or WhatsApp."
      />
      <header className="page-header" style={{
        background: `linear-gradient(rgba(10, 61, 49, 0.93), rgba(10, 61, 49, 0.93)), url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <span className="gold-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>Consultation Hub</span>
        <h1>Connect with Our Trade Advisors</h1>
        <p>Coordinate supplier audits, register for Canton Fair, or schedule sample inspection reviews at our offices in Mumbai, Guangzhou, & Foshan.</p>
      </header>

      <section className="content-section">
        <div className="about-container contact-grid">
          
          {/* Sourcing Inquiry Form */}
          <div>
            <form onSubmit={handleSubmit} className="form" style={{ margin: 0, width: '100%', maxWidth: 'none', border: '1px solid #e5dfd0', background: 'white' }}>
              <h2 style={{ color: 'var(--primary-green)' }}>B2B Sourcing Advice Form</h2>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '20px' }}>
                Fill in your details below. An advisor from our Mumbai warehouse or Guangzhou desk will reach out within 24 hours.
              </p>

              <label>Full Name *</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="e.g. Anand Singhania" 
                required 
              />

              <label>Business Email *</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="e.g. anand@singhaniagroup.in" 
                required 
              />

              <label>WhatsApp Number *</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="e.g. +91 99999 88888" 
                required
              />

              <label>Select Sourcing Service *</label>
              <select value={service} onChange={(e) => setService(e.target.value)}>
                <option value="Canton Fair 2026 Delegation">Canton Fair 2026 Delegation Registration</option>
                <option value="Product Sourcing">China Product Sourcing & Sample Inspection</option>
                <option value="Supplier Verification">Chinese Supplier Verification & Audits</option>
                <option value="Factory Visits">Factory Visit & Itinerary Coordination</option>
                <option value="Import Assistance">Import/Export compliance & Logistics</option>
                <option value="Trade Consulting">General China Trade Consulting</option>
              </select>

              <label>Describe Sourcing Requirements / Sourcing Goals</label>
              <textarea 
                value={requirement} 
                onChange={(e) => setRequirement(e.target.value)} 
                placeholder="Details of materials, quantity, expected shipping dates, target factories..." 
                rows="4"
              />

              {/* Hidden CRM UTM Tracking Indicator */}
              <input type="hidden" value={utmSource} />

              <button type="submit" disabled={submitting}>
                {submitting ? 'Registering Sourcing Request...' : 'Register Sourcing Request'}
              </button>
            </form>
          </div>

          {/* Quick Contacts / WhatsApp */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 className="about-section-title">Instant Trade Support</h2>
            <p className="text-block" style={{ marginBottom: '20px' }}>
              Want to skip the form? Connect with our support desk on WhatsApp for immediate feedback on supplier validation, hotel reservations, or Canton Fair seats bookings.
            </p>
            
            <button 
              className="btn-large btn-fill" 
              onClick={handleWhatsApp} 
              style={{ background: '#25D366', color: 'white', border: 'none', width: 'fit-content', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.5rem' }}></i> Chat on WhatsApp Now
            </button>
            
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}>
              <i className="fa-regular fa-clock"></i> Guangzhou Desk online: 9:00 AM – 6:00 PM China Time (6:30 AM – 3:30 PM IST).
            </p>

            <div style={{ marginTop: '40px', borderTop: '1px solid #e5dfd0', paddingTop: '30px' }}>
              <h3>Our Global Offices:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginTop: '20px' }}>
                
                {/* Mumbai Office */}
                <div style={{ padding: '20px', background: '#fdfcf7', borderRadius: '10px', border: '2px solid var(--accent-green)' }}>
                  <strong style={{ color: 'var(--primary-green)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fa-solid fa-building"></i> Mumbai Office (India HQ)
                  </strong>
                  <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px', lineHeight: '1.6' }}>
                    Office No. 123, First Floor,<br />
                    Mahaveer Market, Plot No. 1,<br />
                    Sector 18, Vashi,<br />
                    Navi Mumbai - 400703,<br />
                    Maharashtra, India
                  </p>
                  <p style={{ fontSize: '0.85rem', marginTop: '10px', color: '#555' }}>
                    <em>📦 Contact for sample reviews, documentation, and India operations.</em>
                  </p>
                </div>

                {/* China Office */}
                <div style={{ padding: '20px', background: '#fdfcf7', borderRadius: '10px', border: '2px solid #d4af37' }}>
                  <strong style={{ color: '#d4af37', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fa-solid fa-building"></i> China Office (Foshan)
                  </strong>
                  <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px', lineHeight: '1.6' }}>
                    Xianghai International Financial Center<br />
                    (Poly Sky-North Tower),<br />
                    No. 7 Jin Yuan Road, Guicheng Subdistrict,<br />
                    Nanhai District, Foshan City,<br />
                    Guangdong Province, China
                  </p>
                  <p style={{ fontSize: '0.85rem', marginTop: '10px', color: '#555' }}>
                    <em>🏭 Contact for factory audits, supplier verification, and on-ground coordination.</em>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
