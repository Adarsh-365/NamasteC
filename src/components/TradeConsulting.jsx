import { useState } from 'react';
import { submitToGoogleSheets, FORM_TYPES } from '../utils/googleSheets';
import SuccessModal from './SuccessModal';

export default function TradeConsulting() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consultationTopic, setConsultationTopic] = useState('Pre-Transaction Risk');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Submit to Google Sheets
      await submitToGoogleSheets(FORM_TYPES.TRADE_CONSULTING, {
        name,
        email,
        phone,
        consultationTopic,
        details
      });
      
      setShowSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setDetails('');
    } catch (err) {
      console.error(err);
      alert('Failed to submit. Please try again or contact us via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `Hi Namaste China, I would like to book a Trade Consulting session regarding: ${consultationTopic}`;
    window.open(`https://wa.me/919370947790?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <SuccessModal 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Consultation Request Received!"
        message="Our senior trade advisors will review your requirements and schedule a callback within 24 hours."
      />
      <header className="page-header" style={{
        background: `linear-gradient(rgba(10, 61, 49, 0.9), rgba(10, 61, 49, 0.9)), url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <span className="gold-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>Strategic Trade Advisory</span>
        <h1>China Trade Consulting</h1>
        <p>Minimize transaction risks, draft legally binding bilateral trade agreements, and estimate total landed costs before ordering.</p>
      </header>

      {/* Intro info */}
      <section className="content-section">
        <div className="about-container">
          <div className="about-split-section" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="about-section-title">Strategic Sourcing Advisory for Enterprises</h2>
              <p className="text-block">
                For medium and large-scale importers, strategic sourcing requires more than just finding a manufacturer. It requires mapping logistics pipelines, structuring credit/payment guarantees, verifying patent compliance, and evaluating regional tax incentives.
                <br /><br />
                Our senior trade advisors in Mumbai and Guangzhou help you build secure supply lines, evaluate tariffs under standard bilateral trade frameworks, and establish dispute resolution mechanisms.
              </p>
              
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => {
                  const formEl = document.getElementById('consult-form');
                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                }}>Request Consulting Callback</button>
                <button className="btn-large btn-outline" onClick={handleWhatsApp} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid #25D366', color: '#25D366', padding: '10px 20px', borderRadius: '6px' }}>
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> Chat with Lead Advisor
                </button>
              </div>
            </div>

            <div style={{ background: '#fdfcf7', padding: '30px', borderRadius: '12px', border: '1px solid #e5dfd0' }}>
              <h3 style={{ color: 'var(--primary-green)', marginBottom: '15px' }}><i className="fa-solid fa-scale-balanced"></i> Advisory Areas:</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  { title: 'Pre-Transaction Risk Assessment', desc: 'Identify litigation background and financial status of manufacturers.' },
                  { title: 'Bilateral Contract Drafting', desc: 'Legally binding agreements valid under both Indian and Chinese law.' },
                  { title: 'Landed Cost Optimization', desc: 'Calculate customs duty, handling charges, and shipping costs accurately.' },
                  { title: 'Supplier Conflict Resolution', desc: 'Dispute management and mediation by our local Guangzhou trade desk.' }
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

      {/* Form */}
      <section className="content-section alt-bg" id="consult-form">
        <div className="about-container" style={{ maxWidth: '650px' }}>
          <form onSubmit={handleSubmit} className="form" style={{ margin: 0, width: '100%', maxWidth: 'none' }}>
            <h2 style={{ textAlign: 'center', color: 'var(--primary-green)' }}>Schedule an Advisory Call</h2>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
              Our trade consultants will contact you within 24 hours.
            </p>

            <label>Full Name *</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Sanjeev Bajaj" 
              required 
            />

            <label>Business Email *</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="e.g. sanjeev@bajajimports.com" 
              required 
            />

            <label>Phone / Mobile</label>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="e.g. +91 98111 22222" 
            />

            <label>Consultation Focus *</label>
            <select value={consultationTopic} onChange={(e) => setConsultationTopic(e.target.value)}>
              <option value="Pre-Transaction Risk">Pre-Transaction Risk & Sourcing Strategy</option>
              <option value="Customs Tariffs">Customs Tariffs & Landed Cost Calculations</option>
              <option value="Trade Contract Review">Bilateral MoU & Trade Contract Review</option>
              <option value="Conflict Mediation">Supplier Dispute Mediation</option>
            </select>

            <label>Describe Sourcing Challenges / Consulting Scope *</label>
            <textarea 
              value={details} 
              onChange={(e) => setDetails(e.target.value)} 
              placeholder="Provide a summary of your importing issues or strategic consulting requirements..." 
              rows="5"
              required
            />

            <button type="submit" disabled={submitting}>
              {submitting ? 'Scheduling Sourcing Advisory...' : 'Schedule Sourcing Consultation'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
