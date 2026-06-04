import React, { useState } from 'react';

export default function CantonFair() {
  const [selectedPhase, setSelectedPhase] = useState('phase2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requirements, setRequirements] = useState('');
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
          service: 'Canton Fair 2026 Delegation',
          requirement: `Selected Phase: ${selectedPhase === 'phase2' ? 'Phase 2 (April 23-29)' : 'Phase 3 (Apr 30-May 7)'}, Sourcing Goals: ${requirements}`
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Canton Fair delegation seat query submitted successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setRequirements('');
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
    const text = `Hi Namaste China, I am interested in joining the Canton Fair 2026 Delegation for ${selectedPhase === 'phase2' ? 'Phase 2' : 'Phase 3'}. Please send details.`;
    window.open(`https://wa.me/919370947790?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* HERO */}
      <header className="page-header" style={{
        background: `linear-gradient(rgba(10, 61, 49, 0.93), rgba(10, 61, 49, 0.93)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <span className="gold-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>Canton Fair 2026 Delegation</span>
        <h1>Canton Fair 2026 - Guangzhou</h1>
        <p>Join India's leading trade delegation for the world's largest import-export exhibition.</p>
        
        {/* Delegation Proof Badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '30px',
          flexWrap: 'wrap'
        }}>
          <span style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '4px', fontSize: '0.85rem' }}>
            <i className="fa-solid fa-users" style={{ color: 'var(--accent-green)' }}></i> 180+ Importers Served
          </span>
          <span style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '4px', fontSize: '0.85rem' }}>
            <i className="fa-solid fa-passport" style={{ color: 'var(--accent-green)' }}></i> 100% Visa Success Rate
          </span>
          <span style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '4px', fontSize: '0.85rem' }}>
            <i className="fa-solid fa-hotel" style={{ color: 'var(--accent-green)' }}></i> 5-Star Hotel Stay
          </span>
        </div>
      </header>

      {/* URGENCY ALERT BANNER */}
      <section className="container" style={{ marginTop: '30px', padding: '0 5%' }}>
        <div className="cf-urgency-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '1.8rem', color: 'var(--accent-gold)' }}></i>
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem' }}>Seat Limit Approaching</strong>
              <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>Only 12 registration seats remain for Phase 2 delegation. Deadlines close this month!</span>
            </div>
          </div>
          <button 
            className="btn-primary" 
            style={{ background: 'white', color: 'var(--china-red)', border: 'none', whiteSpace: 'nowrap' }}
            onClick={() => {
              const formEl = document.getElementById('cf-form');
              if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Register Seats Now
          </button>
        </div>
      </section>

      {/* INTERACTIVE PHASE SELECTOR & PRICING */}
      <section className="content-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Choose Your Canton Fair Phase</h2>
          <p style={{ textAlign: 'center', maxWidth: '650px', margin: '-20px auto 40px', color: 'var(--text-grey)', fontSize: '0.95rem' }}>
            Click below to toggle dates, industries, and corporate packages.
          </p>

          <div className="phase-selection-grid">
            {/* Phase 2 Selector */}
            <div 
              className={`phase-selector-card ${selectedPhase === 'phase2' ? 'selected' : ''}`}
              onClick={() => setSelectedPhase('phase2')}
            >
              <div style={{
                background: selectedPhase === 'phase2' ? 'var(--primary-green)' : '#f9f9f9',
                color: selectedPhase === 'phase2' ? 'white' : '#333',
                padding: '20px',
                textAlign: 'center'
              }}>
                <span className="gold-badge" style={{ marginBottom: '5px', display: 'inline-block' }}>Phase 2 Package</span>
                <h3>Consumer Goods & Building Materials</h3>
                <strong style={{ display: 'block', marginTop: '5px' }}>April 23 - 29, 2026</strong>
              </div>
              <div style={{ padding: '25px', background: 'white' }}>
                <h4 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>Core Categories:</h4>
                <ul style={{ paddingLeft: '15px', color: '#666', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  <li>Kitchenware, Tableware & Ceramics</li>
                  <li>Home Decorations, Gifts & Crafts</li>
                  <li>Building, Sanitary & Decorative Materials</li>
                  <li>Furniture & Gardening Products</li>
                </ul>
                <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Single Phase Cost:</span>
                  <strong style={{ fontSize: '1.4rem', color: 'var(--primary-green)' }}>₹1,85,000 + GST</strong>
                </div>
              </div>
            </div>

            {/* Phase 3 Selector */}
            <div 
              className={`phase-selector-card ${selectedPhase === 'phase3' ? 'selected' : ''}`}
              onClick={() => setSelectedPhase('phase3')}
            >
              <div style={{
                background: selectedPhase === 'phase3' ? 'var(--primary-green)' : '#f9f9f9',
                color: selectedPhase === 'phase3' ? 'white' : '#333',
                padding: '20px',
                textAlign: 'center'
              }}>
                <span className="gold-badge" style={{ marginBottom: '5px', display: 'inline-block' }}>Phase 3 Package</span>
                <h3>Textiles, Fashion & Health Products</h3>
                <strong style={{ display: 'block', marginTop: '5px' }}>Apr 30 - May 7, 2026</strong>
              </div>
              <div style={{ padding: '25px', background: 'white' }}>
                <h4 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>Core Categories:</h4>
                <ul style={{ paddingLeft: '15px', color: '#666', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  <li>Textiles, Fabrics, Yarns & Clothing</li>
                  <li>Shoes, Travel Bags & Suitcases</li>
                  <li>Medicines, Devices & Health Products</li>
                  <li>Office Supplies, Toys & Stationery</li>
                </ul>
                <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Single Phase Cost:</span>
                  <strong style={{ fontSize: '1.4rem', color: 'var(--primary-green)' }}>₹1,75,000 + GST</strong>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', background: '#fdfcf7', border: '1px solid #e5dfd0', borderRadius: '8px', padding: '25px', maxWidth: '800px', margin: '0 auto' }}>
            <h4 style={{ color: 'var(--primary-green)' }}><i className="fa-solid fa-percent"></i> Double Phase Sourcing Discount</h4>
            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>
              Want to attend both Phase 2 and Phase 3? Register for our complete double-phase delegation for <strong>₹3,10,000 + GST</strong> (includes visa extension and hotel allowance for transfer days).
            </p>
          </div>
        </div>
      </section>

      {/* ITINERARY */}
      <section className="content-section alt-bg">
        <div className="container">
          <h2 className="section-title">Tour Itinerary</h2>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <a 
              href="https://drive.google.com/file/d/14t3r1oSDbKU2kECaW-_CSVNBUhQmfRg3/view?usp=sharing" 
              target="_blank" 
              rel="noreferrer"
              className="btn-primary" 
              style={{ textDecoration: 'none' }}
            >
              <i className="fa-solid fa-file-pdf"></i> Download Complete Itinerary Brochure
            </a>
          </div>

          <div className="itinerary-container" style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { day: 'Day 01', title: 'Depart Mumbai / Delhi', desc: 'Board international flight to Guangzhou, China. Meet the delegation group at transit.' },
              { day: 'Day 02', title: 'Arrive in Guangzhou', desc: 'Transfer in premium AC coaches to our 5-star hotel (Sheraton/Westin). Welcome Indian dinner and registration badge briefing.' },
              { day: 'Day 03 - 07', title: 'Canton Fair Sourcing Days', desc: 'Daily breakfast buffet. Transfer to the Pazhou Complex. Explore thousands of verified suppliers. Evening networking dinners with logistics advisors.' },
              { day: 'Day 08', title: 'Departure & Flight to India', desc: 'Breakfast. Check out. Transfer to Guangzhou International Airport. Flight back to Mumbai.' }
            ].map((step) => (
              <div className="timeline-item" key={step.day} style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <div className="timeline-date" style={{ minWidth: '120px', textAlign: 'right' }}>
                  <span className="date-box" style={{ background: 'var(--primary-green)', color: 'white', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.9rem', display: 'inline-block' }}>{step.day}</span>
                </div>
                <div className="timeline-content" style={{ background: 'white', padding: '20px', borderRadius: '10px', borderLeft: '4px solid var(--accent-green)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', flex: 1 }}>
                  <h4 style={{ marginBottom: '5px', color: 'var(--primary-green)' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-grey)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* INCLUSIONS & EXCLUSIONS */}
      <section className="content-section">
        <div className="container">
          <div className="inc-exc-grid">
            {/* Inclusions */}
            <div className="list-box">
              <h3 style={{ color: 'var(--primary-green)', marginBottom: '20px' }}>Package Inclusions</h3>
              <ul className="check-list" style={{ listStyle: 'none' }}>
                {[
                  'Return Flight (Premium Airlines - Singapore/Cathay)',
                  'Normal Business Visa processing support (includes official invitations)',
                  '5-Star Luxury Hotel stay (Sheraton / Westin Guangzhou)',
                  'Daily breakfast buffet & Indian catering dinners',
                  'Pazhou complex daily coach shuttles',
                  'Basic Canton Fair Entry Registration Badge',
                  'English-Chinese trade interpreter allocation',
                  'Travel Insurance (Up to 55 years)'
                ].map((item) => (
                  <li key={item} style={{ marginBottom: '10px', display: 'flex', alignItems: 'start', gap: '10px', fontSize: '0.95rem' }}>
                    <i className="fa-solid fa-circle-check" style={{ color: 'green', marginTop: '4px' }}></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="list-box">
              <h3 style={{ color: 'var(--china-red)', marginBottom: '20px' }}>Package Exclusions</h3>
              <ul className="cross-list" style={{ listStyle: 'none' }}>
                {[
                  'Daily Lunch at Pazhou complex (available inside the venue)',
                  'GST @ 5% & TCS @ 5% on package cost (compulsory Government tax)',
                  'Customary tour guide gratuity - USD 25 per head',
                  'Personal minibar, laundry, or premium excess baggage fees',
                  'Custom sample shipping back to India (can be handled via our logistics desk)'
                ].map((item) => (
                  <li key={item} style={{ marginBottom: '10px', display: 'flex', alignItems: 'start', gap: '10px', fontSize: '0.95rem' }}>
                    <i className="fa-solid fa-circle-xmark" style={{ color: 'var(--china-red)', marginTop: '4px' }}></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cancellation policy and visa rejection support */}
          <div className="notes-box" style={{
            background: '#fdfcf7',
            borderLeft: '5px solid var(--accent-green)',
            padding: '25px',
            marginTop: '40px',
            borderRadius: '5px',
            border: '1px solid #e5dfd0',
            borderLeftWidth: '5px'
          }}>
            <h4 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>
              <i className="fa-solid fa-shield-halved"></i> Cancellation Policy & Visa Protection
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>
              We understand visa processing creates anxiety. In the event of a visa rejection by the Chinese Consulate, Namaste China provides a <strong>Full Refund</strong> of your package deposit, less a processing/consulate fee of ₹5,000. Book with absolute peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM */}
      <section className="content-section alt-bg" id="cf-form">
        <div className="about-container" style={{ maxWidth: '650px' }}>
          <form onSubmit={handleSubmit} className="form" style={{ margin: 0, width: '100%', maxWidth: 'none' }}>
            <h2 style={{ textAlign: 'center', color: 'var(--primary-green)' }}>Reserve Delegation Seat</h2>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
              Reserve your seat. Registration requires ₹50,000 deposit.
            </p>

            <label>Full Name *</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Sunil Singhal" 
              required 
            />

            <label>Business Email *</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="e.g. sunil@singhaltextiles.com" 
              required 
            />

            <label>Phone / Mobile (WhatsApp preferred) *</label>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="e.g. +91 98300 98300" 
              required
            />

            <label>Selected Delegation Phase *</label>
            <select value={selectedPhase} onChange={(e) => setSelectedPhase(e.target.value)}>
              <option value="phase2">Phase 2: Building Materials & Furniture (Apr 23 - 29)</option>
              <option value="phase3">Phase 3: Textiles & Apparel (Apr 30 - May 7)</option>
              <option value="both">Both Phases 2 & 3: Custom Double-Phase Sourcing</option>
            </select>

            <label>What products do you plan to source? (Helps guide matchmaking)</label>
            <textarea 
              value={requirements} 
              onChange={(e) => setRequirements(e.target.value)} 
              placeholder="E.g. Sourcing outdoor rattan furniture, sanitaries..." 
              rows="4"
            />

            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting Registration...' : 'Reserve Sourcing Seat'}
            </button>
            
            <button type="button" className="btn-large btn-outline" onClick={handleWhatsApp} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px', border: '2px solid #25D366', color: '#25D366' }}>
              <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.25rem' }}></i> Consult Booking Desk on WhatsApp
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
