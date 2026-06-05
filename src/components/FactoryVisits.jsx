import { useState } from 'react';
import { submitToGoogleSheets, FORM_TYPES } from '../utils/googleSheets';
import SuccessModal from './SuccessModal';

export default function FactoryVisits() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetCities, setTargetCities] = useState('Guangzhou');
  const [productFocus, setProductFocus] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Submit to Google Sheets
      await submitToGoogleSheets(FORM_TYPES.FACTORY_VISIT, {
        name,
        email,
        phone,
        targetCities,
        productFocus,
        travelDates
      });
      
      setShowSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setProductFocus('');
      setTravelDates('');
    } catch (err) {
      console.error(err);
      alert('Failed to submit. Please try again or contact us via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `Hi Namaste China, I am planning a China Factory Visit for: ${productFocus || 'B2B Products'}`;
    window.open(`https://wa.me/919370947790?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <SuccessModal 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Factory Visit Request Received!"
        message="Our coordination team will prepare a customized itinerary and contact you within 24-48 hours."
      />
      <header className="page-header" style={{
        background: `linear-gradient(rgba(10, 61, 49, 0.9), rgba(10, 61, 49, 0.9)), url('https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <span className="gold-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>Guided B2B Trade Travel</span>
        <h1>Factory Visits & Business Tours</h1>
        <p>Plan customized routes, secure business visa invitations, and hire professional trade interpreters to negotiate on the factory floor.</p>
      </header>

      {/* Services Section */}
      <section className="content-section">
        <div className="about-container">
          <div className="about-split-section" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="about-section-title">Seamless Factory Floor Coordination</h2>
              <p className="text-block">
                Visiting a Chinese factory in person is key to establishing a strong long-term trade relationship. However, language barriers, local transport, and navigating industrial zones can be highly challenging.
                <br /><br />
                Namaste China handles the entire travel setup for you. We coordinate factory appointments, arrange comfortable local transport, handle airport transfers, and assign a professional English-Chinese trade interpreter to guide you on specifications and quality protocols.
              </p>
              
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => {
                  const formEl = document.getElementById('visit-form');
                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                }}>Plan Custom Itinerary</button>
                <button className="btn-large btn-outline" onClick={handleWhatsApp} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid #25D366', color: '#25D366', borderRadius: '6px', padding: '10px 20px' }}>
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> Consult on WhatsApp
                </button>
              </div>
            </div>

            <div style={{ background: '#fdfcf7', padding: '30px', borderRadius: '12px', border: '1px solid #e5dfd0' }}>
              <h3 style={{ color: 'var(--primary-green)', marginBottom: '15px' }}><i className="fa-solid fa-plane-arrival"></i> Comprehensive Tour Coverage:</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  { title: 'Visa Invitation Letters (MOU)', desc: 'Official invitation letters for normal single-entry business visas.' },
                  { title: 'Translator Coordination', desc: 'Bilingual trade experts specialized in technical manufacturing terms.' },
                  { title: 'Industrial Clusters Guidance', desc: 'Foshan for furniture/ceramics, Guangzhou for electronics, Shenzhen for tech.' },
                  { title: 'Local Logistical Management', desc: 'Hotel booking assistance, bullet train coordination, and airport pickups.' }
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

      {/* Industrial Clusters / Cities */}
      <section className="content-section alt-bg">
        <div className="about-container">
          <h2 className="about-section-title" style={{ textAlign: 'center', display: 'block', width: 'fit-content', margin: '0 auto 40px' }}>
            Hub Cities We Support
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { city: 'Guangzhou', products: 'Electronics, Garments, Toys, Logistics, Trade Exhibitions' },
              { city: 'Foshan', products: 'Furniture, Ceramic Tiles, Sanitary Ware, Decorative Materials' },
              { city: 'Shenzhen', products: 'LED Displays, Telecommunications, Smart Devices, Precision Tools' },
              { city: 'Yiwu', products: 'General Merchandise, Small Commodity Hub, Retail Accessories' }
            ].map((hub) => (
              <div key={hub.city} style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #eee', textAlign: 'center' }}>
                <i className="fa-solid fa-city" style={{ fontSize: '1.5rem', color: 'var(--primary-green)', marginBottom: '15px', display: 'block' }}></i>
                <h4>{hub.city}</h4>
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '8px', lineHeight: '1.5' }}>{hub.products}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="content-section" id="visit-form">
        <div className="about-container" style={{ maxWidth: '650px' }}>
          <form onSubmit={handleSubmit} className="form" style={{ margin: 0, width: '100%', maxWidth: 'none' }}>
            <h2 style={{ textAlign: 'center', color: 'var(--primary-green)' }}>Book Factory Visit Tour</h2>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
              Our offices in Guangzhou and Mumbai will coordinate your business tour.
            </p>

            <label>Full Name *</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Ramesh Kumar" 
              required 
            />

            <label>Business Email *</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="e.g. ramesh@tiles.in" 
              required 
            />

            <label>Phone / Mobile</label>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="e.g. +91 99999 88888" 
            />

            <label>Select Target Sourcing City *</label>
            <select value={targetCities} onChange={(e) => setTargetCities(e.target.value)}>
              <option value="Guangzhou">Guangzhou (Electronics & General Goods)</option>
              <option value="Foshan">Foshan (Furniture & Building Materials)</option>
              <option value="Shenzhen">Shenzhen (Tech & Hardware)</option>
              <option value="Yiwu">Yiwu (Small Commodity Markets)</option>
              <option value="Multi-city Trip">Multi-City Customized Tour</option>
            </select>

            <label>Product Sourcing Focus *</label>
            <input 
              type="text" 
              value={productFocus} 
              onChange={(e) => setProductFocus(e.target.value)} 
              placeholder="e.g. Luxury sofas, machinery, phone screens" 
              required 
            />

            <label>Estimated Travel Dates</label>
            <input 
              type="text" 
              value={travelDates} 
              onChange={(e) => setTravelDates(e.target.value)} 
              placeholder="e.g. October 2026, Canton Fair Phase 2" 
            />

            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting Travel Ticket...' : 'Book Business Visit Plan'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
