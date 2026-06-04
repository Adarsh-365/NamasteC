import React, { useState } from 'react';

export default function Membership() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('MSME Sourcing');
  const [selectedDuration, setSelectedDuration] = useState('1 Year');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const openInquiryModal = (planName, durationName) => {
    setSelectedPlan(planName);
    setSelectedDuration(durationName);
    setModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
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
          service: `Membership Enrollment: ${selectedPlan}`,
          requirement: `Duration: ${selectedDuration}`
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Membership enrollment inquiry submitted successfully! Our onboarding team will contact you.');
        setName('');
        setEmail('');
        setPhone('');
        setModalOpen(false);
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
    const text = `Hi Namaste China, I want to enroll in the "${selectedPlan}" (${selectedDuration}) B2B Sourcing Membership.`;
    window.open(`https://wa.me/919370947790?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* HERO */}
      <header className="page-header" style={{
        background: `linear-gradient(rgba(10, 61, 49, 0.94), rgba(10, 61, 49, 0.94)), url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <span className="gold-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>Corporate Trade Memberships</span>
        <h1>China Business Membership</h1>
        <p>Establish a verified supply chain in China with predefined factory visit allowances, verified audits, and dedicated trade advisory.</p>
      </header>

      {/* SEGMENTED PRICING CARDS */}
      <section className="content-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Outcome-Led Membership Plans</h2>
          <p style={{ textAlign: 'center', maxWidth: '650px', margin: '-20px auto 40px', color: 'var(--text-grey)', fontSize: '0.95rem' }}>
            Choose the package tailored to your importing volume and operational scope.
          </p>

          <div className="pricing-grid">

            {/* Plan 1 */}
            <div className="price-card" style={{ background: 'white', padding: '40px', borderRadius: '12px', border: '1px solid #e5dfd0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <span className="gold-badge">MSME Plan</span>
              <h3 style={{ margin: '10px 0 5px', fontSize: '1.6rem', color: 'var(--primary-green)' }}>MSME Sourcing</h3>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '20px' }}>
                Designed for retail traders, startups, and small business owners importing up to 3 containers annually.
              </p>
              
              <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '15px 0', margin: '20px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>1 Year Subscription:</span>
                  <strong>₹15,000 + GST</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>3 Year Subscription:</span>
                  <strong>₹60,000 + GST</strong>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: '#555', marginBottom: '30px', lineHeight: '2.2' }}>
                <li><i className="fa-solid fa-check" style={{ color: 'green', marginRight: '8px' }}></i> <strong>3 Factory Visits Allowance</strong> per year</li>
                <li><i className="fa-solid fa-check" style={{ color: 'green', marginRight: '8px' }}></i> Supplier registry & AIC validation check</li>
                <li><i className="fa-solid fa-check" style={{ color: 'green', marginRight: '8px' }}></i> Basic customs compliance & HS Code reviews</li>
                <li><i className="fa-solid fa-check" style={{ color: 'green', marginRight: '8px' }}></i> 1 English-Chinese interpreter local contact</li>
                <li><i className="fa-solid fa-xmark" style={{ color: 'red', marginRight: '8px' }}></i> Mumbai sample warehouse storage (ad-hoc only)</li>
              </ul>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn-primary" 
                  style={{ flex: 1 }}
                  onClick={() => openInquiryModal('MSME Sourcing', '1 Year')}
                >
                  Get Started
                </button>
                <a 
                  href="https://drive.google.com/file/d/14t3r1oSDbKU2kECaW-_CSVNBUhQmfRg3/view?usp=sharing" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-large btn-outline"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '6px' }}
                  title="Download Brochure"
                >
                  <i className="fa-solid fa-file-pdf"></i>
                </a>
              </div>
            </div>

            {/* Plan 2 */}
            <div className="price-card featured" style={{ 
              background: 'white', 
              padding: '40px', 
              borderRadius: '12px', 
              border: '2px solid var(--accent-green)', 
              boxShadow: '0 8px 30px rgba(10, 61, 49, 0.08)',
              position: 'relative' 
            }}>
              <div style={{
                position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)',
                background: 'var(--accent-green)', color: 'var(--primary-green)',
                padding: '5px 15px', borderRadius: '5px', fontWeight: 800, fontSize: '0.8rem'
              }}>
                RECOMMENDED FOR VOLUME IMPORTERS
              </div>

              <span className="gold-badge" style={{ marginTop: '10px', display: 'inline-block' }}>Enterprise Plan</span>
              <h3 style={{ margin: '10px 0 5px', fontSize: '1.6rem', color: 'var(--primary-green)' }}>General Industries</h3>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '20px' }}>
                Designed for manufacturers, industrial distributors, and wholesale traders importing 5+ containers annually.
              </p>
              
              <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '15px 0', margin: '20px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>1 Year Subscription:</span>
                  <strong>₹30,000 + GST</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>3 Year Subscription:</span>
                  <strong>₹1,00,000 + GST</strong>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: '#555', marginBottom: '30px', lineHeight: '2.2' }}>
                <li><i className="fa-solid fa-check" style={{ color: 'green', marginRight: '8px' }}></i> <strong>5 Factory Visits Allowance</strong> per year</li>
                <li><i className="fa-solid fa-check" style={{ color: 'green', marginRight: '8px' }}></i> Direct manufacturer MoU drafting & sign-offs</li>
                <li><i className="fa-solid fa-check" style={{ color: 'green', marginRight: '8px' }}></i> Full physical factory floor audits in Guangzhou</li>
                <li><i className="fa-solid fa-check" style={{ color: 'green', marginRight: '8px' }}></i> Free sample cataloging in our Mumbai warehouse</li>
                <li><i className="fa-solid fa-check" style={{ color: 'green', marginRight: '8px' }}></i> Direct trade dispute mediation by local desk</li>
              </ul>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn-primary" 
                  style={{ flex: 1, background: 'var(--accent-green)', color: 'var(--primary-green)' }}
                  onClick={() => openInquiryModal('General Industries', '1 Year')}
                >
                  Get Started
                </button>
                <a 
                  href="https://drive.google.com/file/d/14t3r1oSDbKU2kECaW-_CSVNBUhQmfRg3/view?usp=sharing" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-large btn-outline"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '6px', border: '2px solid var(--accent-green)', color: 'var(--accent-green)' }}
                  title="Download Brochure"
                >
                  <i className="fa-solid fa-file-pdf"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICE DELIVERY METHODOLOGY */}
      <section className="content-section alt-bg">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>How Services Are Delivered</h2>
          <p style={{ textAlign: 'center', maxWidth: '650px', margin: '-20px auto 40px', color: 'var(--text-grey)', fontSize: '0.95rem' }}>
            No complicated processes. Our members book resources on-demand through our trade helpdesk.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '25px'
          }}>
            {[
              { icon: 'fa-ticket', title: '1. On-Demand Ticket Bookings', desc: 'When you identify a factory you wish to inspect or visit, simply open a ticket. We assign local translators and drivers within 48 hours.' },
              { icon: 'fa-warehouse', title: '2. Mumbai Sample Storage', desc: 'Sourced samples are logged and placed in your assigned inventory area in Mumbai. We notify you to schedule a local physical check.' },
              { icon: 'fa-file-shield', title: '3. Digital Audit Deliveries', desc: 'Guangzhou audit reports are compiled with HD video footage and registry PDF translations, sent directly to your dashboard.' }
            ].map((method, idx) => (
              <div key={idx} style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #eee' }}>
                <i className={`fa-solid ${method.icon}`} style={{ fontSize: '1.8rem', color: 'var(--primary-green)', marginBottom: '15px', display: 'block' }}></i>
                <h4>{method.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '8px', lineHeight: '1.5' }}>{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED FEATURES MATRIX */}
      <section className="content-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Membership Entitlement Matrix</h2>

          <div className="table-wrapper" style={{ overflowX: 'auto', marginTop: '20px' }}>
            <table className="comp-table" style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
              <thead>
                <tr>
                  <th style={{ background: 'var(--primary-green)', color: 'white', padding: '15px', textAlign: 'left' }}>Sourcing Benefits & Allowances</th>
                  <th style={{ background: 'var(--primary-green)', color: 'white', padding: '15px', textAlign: 'left' }}>MSME Sourcing</th>
                  <th style={{ background: 'var(--primary-green)', color: 'white', padding: '15px', textAlign: 'left' }}>General Industries</th>
                </tr>
              </thead>
              <tbody>
                <tr className="cat-header"><td colSpan="3" style={{ background: '#fcfbf7', fontWeight: 700, color: 'var(--primary-green)', padding: '15px' }}>🏢 Physical Factory Inspections</td></tr>
                <tr><td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>Annual Factory Visits Allowance</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>3 Visits</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>5 Visits</td></tr>
                <tr><td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>English-Chinese Interpreter Support</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'green', fontWeight: 'bold' }}><i className="fa-solid fa-check"></i> Included</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'green', fontWeight: 'bold' }}><i className="fa-solid fa-check"></i> Included</td></tr>
                <tr><td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>Factory Car & Driver Coordination</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'red' }}><i className="fa-solid fa-xmark"></i> Add-on cost</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'green', fontWeight: 'bold' }}><i className="fa-solid fa-check"></i> Included</td></tr>

                <tr className="cat-header"><td colSpan="3" style={{ background: '#fcfbf7', fontWeight: 700, color: 'var(--primary-green)', padding: '15px' }}>🛡️ Risk Audits & Verification</td></tr>
                <tr><td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>AIC Business Registration Screenings</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'green', fontWeight: 'bold' }}><i className="fa-solid fa-check"></i> Included</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'green', fontWeight: 'bold' }}><i className="fa-solid fa-check"></i> Included</td></tr>
                <tr><td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>Chinese Bank Account Matching</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'green', fontWeight: 'bold' }}><i className="fa-solid fa-check"></i> Included</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'green', fontWeight: 'bold' }}><i className="fa-solid fa-check"></i> Included</td></tr>
                <tr><td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>Full Physical Production Line Audits</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'red' }}><i className="fa-solid fa-xmark"></i> Add-on cost</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'green', fontWeight: 'bold' }}><i className="fa-solid fa-check"></i> Included</td></tr>

                <tr className="cat-header"><td colSpan="3" style={{ background: '#fcfbf7', fontWeight: 700, color: 'var(--primary-green)', padding: '15px' }}>📦 Sourcing & Sample Logistics</td></tr>
                <tr><td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>Fast Sourcing Requests Support</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'green', fontWeight: 'bold' }}><i className="fa-solid fa-check"></i> Standard priority</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'green', fontWeight: 'bold' }}><i className="fa-solid fa-check"></i> High VIP priority</td></tr>
                <tr><td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>Mumbai Sample Storage facility</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'red' }}><i className="fa-solid fa-xmark"></i> Add-on cost</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'green', fontWeight: 'bold' }}><i className="fa-solid fa-check"></i> Included (up to 30 days)</td></tr>
                <tr><td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>Bilateral MoU Drafting</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'red' }}><i className="fa-solid fa-xmark"></i> Not Included</td><td style={{ padding: '15px', borderBottom: '1px solid #eee', color: 'green', fontWeight: 'bold' }}><i className="fa-solid fa-check"></i> Included</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ONSITE INQUIRY/REGISTRATION MODAL */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setModalOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div style={{ padding: '40px' }}>
              <h3 style={{ color: 'var(--primary-green)', marginBottom: '10px', fontSize: '1.4rem' }}>
                Join Membership Program
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '25px' }}>
                You have selected the <strong>{selectedPlan} ({selectedDuration})</strong>. Fill out the enrollment form to receive onboarding invoices and documents.
              </p>

              <form onSubmit={handleModalSubmit} className="form" style={{ margin: 0, padding: 0, boxShadow: 'none', width: '100%' }}>
                <label>Contact Name *</label>
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

                <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                  <button type="submit" style={{ flex: 1, margin: 0 }} disabled={submitting}>
                    {submitting ? 'Enrolling...' : 'Submit Enrollment'}
                  </button>
                  <button 
                    type="button" 
                    onClick={handleWhatsApp} 
                    style={{ flex: 1, margin: 0, background: '#25D366', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> WhatsApp Join
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
