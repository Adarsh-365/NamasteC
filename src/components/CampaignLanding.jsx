import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import '../styles/CampaignLanding.css';

const CampaignLanding = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    productRequirement: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'Campaign Landing Page'
        })
      });

      setShowSuccess(true);
      setFormData({ name: '', phone: '', company: '', productRequirement: '' });
      
      if (window.fbq) {
        window.fbq('track', 'Lead', { content_name: 'China Sourcing Plan', value: 1.00, currency: 'INR' });
      }

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error:', error);
      alert('Submission successful! We will contact you soon.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calendlyLink = "https://calendly.com/india-namaste1998/30min";
  const whatsappLink = "https://wa.me/919820298048?text=Hi,%20I%20want%20to%20discuss%20China%20sourcing";

  const stats = [
    { number: '500+', label: 'Supplier Verifications' },
    { number: '100+', label: 'Factory Visits' },
    { number: '50+', label: 'Canton Fair Delegations' },
    { number: '2021', label: 'Operating Since' }
  ];

  const services = [
    { icon: '✓', title: 'Supplier Verification', desc: 'Avoid scams and fake factories with on-ground audits.' },
    { icon: '✓', title: 'Factory Visit Support', desc: 'Inspect manufacturing capabilities before ordering.' },
    { icon: '✓', title: 'Trade Fair Assistance', desc: 'Complete Canton Fair planning and support.' },
    { icon: '✓', title: 'China Import Consulting', desc: 'End-to-end sourcing guidance from experts.' },
    { icon: '✓', title: 'Logistics Coordination', desc: 'Shipping and documentation assistance.' },
    { icon: '✓', title: 'India-China Business Desk', desc: 'Single point of contact for all your needs.' }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'RK Electronics',
      industry: 'Electronics',
      text: 'Namaste China helped us find a verified supplier and saved months of sourcing effort.',
      rating: 5
    },
    {
      name: 'Priya Shah',
      company: 'HomeStyle Imports',
      industry: 'Home Decor',
      text: 'Their Canton Fair delegation service was seamless. Every detail was handled professionally.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      company: 'TechBuild Manufacturing',
      industry: 'Manufacturing',
      text: 'Factory verification saved us from a potential scam. Highly recommend their services.',
      rating: 5
    }
  ];

  const faqs = [
    { q: 'How do you verify suppliers?', a: 'We conduct on-ground factory visits, verify business licenses, check export history, assess production capacity, and inspect quality systems. You receive a detailed verification report with photos and recommendations.' },
    { q: 'Do you visit factories?', a: 'Yes, our Guangzhou-based team conducts physical factory visits. We can arrange visits for you or go on your behalf to inspect facilities, meet management, and verify capabilities.' },
    { q: 'Do you help first-time importers?', a: 'Absolutely! We specialize in guiding first-time importers through the entire process - from finding suppliers to customs clearance. Our team explains each step clearly.' },
    { q: 'Which industries do you support?', a: 'We work across all industries including electronics, textiles, home goods, machinery, auto parts, furniture, toys, and more. Our sourcing specialists have experience in diverse product categories.' },
    { q: 'How much does supplier verification cost?', a: 'Verification costs vary based on scope and location. Basic verification starts from reasonable rates. Book a free consultation to get a customized quote for your requirement.' },
    { q: 'Do you arrange Canton Fair visits?', a: 'Yes! We organize complete Canton Fair delegations including visa assistance, hotel bookings, exhibition passes, translator support, factory visit arrangements, and business matchmaking.' }
  ];

  return (
    <>
      <Helmet>
        <title>Source Directly From Verified Chinese Manufacturers | Namaste China</title>
        <meta name="description" content="Join professionally managed Canton Fair delegations, verify suppliers, visit factories and import confidently with on-ground support in India and China." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Source Directly From Verified Chinese Manufacturers" />
        <meta property="og:description" content="Professional China sourcing support with Mumbai office and Guangzhou team." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": { "@type": "Answer", "text": faq.a }
            }))
          })}
        </script>
      </Helmet>

      <div className="campaign-page">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-left">
              <div className="hero-badge">🇮🇳 India-China Trade Partner 🇨🇳</div>
              <h1 className="hero-title">
                Source Directly From<br />
                <span className="gradient-text">Verified Chinese Manufacturers</span>
              </h1>
              <p className="hero-subtitle">
                Join our professionally managed Canton Fair delegations, verify suppliers, 
                visit factories and import confidently with on-ground support in India and China.
              </p>
              
              <div className="trust-badges">
                <div className="badge">✓ Mumbai Office</div>
                <div className="badge">✓ Guangzhou Support Team</div>
                <div className="badge">✓ 500+ Supplier Verifications</div>
                <div className="badge">✓ Active Since 2021</div>
              </div>

              <div className="hero-ctas">
                <a href={calendlyLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Request Free Consultation
                </a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <span className="whatsapp-icon">💬</span> Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="hero-right">
              <div className="form-card">
                <div className="form-header">
                  <h3>Get Your China Sourcing Plan</h3>
                  <p>Tell us your requirement. We'll create a custom strategy.</p>
                </div>
                <form onSubmit={handleSubmit} className="lead-form">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-field"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-field"
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="form-field"
                  />
                  <textarea
                    name="productRequirement"
                    placeholder="What products are you looking to source?"
                    value={formData.productRequirement}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="form-field"
                  ></textarea>
                  <button type="submit" disabled={isSubmitting} className="btn-submit">
                    {isSubmitting ? 'Submitting...' : 'Get My China Sourcing Plan'}
                  </button>
                  <p className="form-note">✓ Response within 24 hours</p>
                </form>
                {showSuccess && (
                  <div className="success-alert">
                    ✓ Thank you! We'll contact you within 24 hours.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="stats-bar">
          <div className="stats-container">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-section">
          <div className="container">
            <h2 className="section-title">Why Choose Namaste China?</h2>
            <p className="section-subtitle">Complete China sourcing support with India and China presence</p>
            <div className="services-grid">
              {services.map((service, idx) => (
                <div key={idx} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="process-section">
          <div className="container">
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">Simple 5-step process to successful China sourcing</p>
            <div className="process-timeline">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3>Tell Us Your Requirement</h3>
                <p>Share product details and business goals</p>
              </div>
              <div className="process-arrow">→</div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h3>Supplier Identification</h3>
                <p>We find matching verified manufacturers</p>
              </div>
              <div className="process-arrow">→</div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h3>Verification & Factory Checks</h3>
                <p>On-ground audits and quality inspection</p>
              </div>
              <div className="process-arrow">→</div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h3>Negotiation Support</h3>
                <p>Best pricing and terms assistance</p>
              </div>
              <div className="process-arrow">→</div>
              <div className="process-step">
                <div className="step-number">5</div>
                <h3>Import Execution</h3>
                <p>Logistics and customs clearance support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof
        <section className="testimonials-section">
          <div className="container">
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">Trusted by Indian businesses across industries</p>
            <div className="testimonials-grid">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="testimonial-card">
                  <div className="testimonial-stars">{'★'.repeat(testimonial.rating)}</div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{testimonial.name[0]}</div>
                    <div className="author-info">
                      <div className="author-name">{testimonial.name}</div>
                      <div className="author-company">{testimonial.company}</div>
                      <div className="author-industry">{testimonial.industry}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Canton Fair Section */}
        <section className="canton-fair-section">
          <div className="container">
            <div className="canton-content">
              <div className="canton-left">
                <div className="section-badge">🎯 Limited Seats Available</div>
                <h2 className="canton-title">Canton Fair 2026 Delegation</h2>
                <p className="canton-desc">
                  Join India's most professional Canton Fair delegation with complete support from visa to business matchmaking.
                </p>
                <ul className="canton-benefits">
                  <li>✓ Visa assistance and invitation letters</li>
                  <li>✓ Hotel booking and accommodation support</li>
                  <li>✓ Factory visit arrangements</li>
                  <li>✓ Business matchmaking with suppliers</li>
                  <li>✓ Professional translator support</li>
                  <li>✓ Networking with other Indian businesses</li>
                </ul>
                <a href={calendlyLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Reserve Your Seat
                </a>
              </div>
              <div className="canton-right">
                <img src="/images/Ex1.jpeg" alt="Canton Fair Delegation" className="canton-image" />
              </div>
            </div>
          </div>
        </section>

        {/* Verification Comparison */}
        <section className="comparison-section">
          <div className="container">
            <h2 className="section-title">Why Supplier Verification Matters</h2>
            <p className="section-subtitle">Protect your business from fraud and quality issues</p>
            <div className="comparison-table">
              <div className="comparison-col danger">
                <h3>❌ Without Verification</h3>
                <ul>
                  <li>Risk of fake factories</li>
                  <li>Unknown production capacity</li>
                  <li>No quality assurance</li>
                  <li>Potential payment scams</li>
                  <li>Uncertain export history</li>
                  <li>No legal protection</li>
                </ul>
              </div>
              <div className="comparison-col success">
                <h3>✅ Verified Suppliers</h3>
                <ul>
                  <li>Factory existence confirmed</li>
                  <li>Production capacity verified</li>
                  <li>Quality systems inspected</li>
                  <li>Business licenses checked</li>
                  <li>Export history validated</li>
                  <li>Detailed verification report</li>
                </ul>
              </div>
            </div>
            <div className="cta-center">
              <a href={calendlyLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book Supplier Verification
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="container">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, idx) => (
                <div key={idx} className="faq-item">
                  <button
                    className={`faq-question ${openFaq === idx ? 'active' : ''}`}
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    {faq.q}
                    <span className="faq-icon">{openFaq === idx ? '−' : '+'}</span>
                  </button>
                  {openFaq === idx && (
                    <div className="faq-answer">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta">
          <div className="container">
            <h2 className="cta-title">Ready to Start Sourcing From China?</h2>
            <p className="cta-subtitle">
              Get free consultation and discover how we can help you succeed in China trade
            </p>
            <div className="cta-buttons">
              <a href={calendlyLink} target="_blank" rel="noopener noreferrer" className="btn-primary large">
                Schedule Free Consultation
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-secondary large">
                <span className="whatsapp-icon">💬</span> WhatsApp: +91 98202 98048
              </a>
            </div>
            <p className="cta-trust">✓ Mumbai Office | ✓ Guangzhou Team | ✓ 500+ Verified Suppliers</p>
          </div>
        </section>

        {/* Sticky Mobile CTA */}
        <div className="mobile-sticky-cta">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mobile-cta-btn whatsapp">
            WhatsApp Consultation
          </a>
          <a href={calendlyLink} target="_blank" rel="noopener noreferrer" className="mobile-cta-btn calendly">
            Book Call
          </a>
        </div>
      </div>
    </>
  );
};

export default CampaignLanding;
