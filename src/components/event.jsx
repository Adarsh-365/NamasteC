import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import '../styles/Event.css';
import eventMainImg from '../assets/event_main.JPG';

// Import all event photos
const eventPhotos = import.meta.glob('../assets/images/*.JPG', { eager: true, import: 'default' });

export default function NaviMumbaiSummit() {
  const [openFaq, setOpenFaq] = useState(null);
  const [bookingPass, setBookingPass] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: ''
  });
  const [currentPhotoSet, setCurrentPhotoSet] = useState(0);

  // Convert photo object to array
  const photoArray = Object.entries(eventPhotos).map(([path, url]) => url);
  const photosPerSet = 6;
  const totalSets = Math.ceil(photoArray.length / photosPerSet);

  // Auto-rotate photos every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoSet((prev) => (prev + 1) % totalSets);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSets]);

  // Get current 6 photos
  const getCurrentPhotos = () => {
    const startIndex = currentPhotoSet * photosPerSet;
    return photoArray.slice(startIndex, startIndex + photosPerSet);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Redirecting to payment gateway...');
    setBookingPass(null);
  };

  const agendaItems = [
    { time: '10:00', title: 'Welcome & inauguration' },
    { time: '10:30', title: 'India Post business opportunities' },
    { time: '11:30', title: 'GeM tender opportunities' },
    { time: '1:00', title: 'Women + SC/ST entrepreneurship' },
    { time: '2:00', title: 'Import-export opportunities' },
    { time: '3:00', title: 'Namaste India initiatives' },
    { time: '3:30', title: 'Lunch + business networking' },
  ];

  const valueProps = [
    { num: '01', title: 'Government opportunities', desc: 'Understand GeM tenders and India Post business services.' },
    { num: '02', title: 'Global market access', desc: 'Explore import-export, sourcing and expansion opportunities.' },
    { num: '03', title: 'Stronger connections', desc: 'Meet founders, MSMEs, experts and potential collaborators.' },
    { num: '04', title: 'Inclusive growth', desc: 'Discover support for women and SC/ST entrepreneurs.' }
  ];

  const attendees = [
    'Entrepreneurs & MSMEs',
    'Startups & manufacturers',
    'Importers & exporters',
    'Women entrepreneurs',
    'Consultants & professionals',
    'Students & aspiring founders'
  ];

  const faqs = [
    { q: 'Where will the summit take place?', a: 'The summit will take place in Navi Mumbai. The confirmed venue address, map, parking details and nearby transport options will be displayed once finalized.' },
    { q: 'What does my delegate pass include?', a: 'Every package includes summit access and the benefits listed under the selected delegate category. Gold delegates receive additional lunch, seating and networking benefits.' },
    { q: 'Will I receive confirmation after payment?', a: 'Yes. Delegates will receive confirmation through email and WhatsApp immediately after successful payment.' },
    { q: 'Can I transfer or cancel my pass?', a: 'The final cancellation, transfer and refund policy will be displayed before checkout.' },
    { q: 'Will I receive an invoice?', a: 'A payment receipt will be issued automatically. GST invoice availability and applicable taxes will be clearly mentioned on the checkout page.' }
  ];

  return (
    <>
      <Helmet>
        <title>Navi Mumbai Growth Summit 2026 | Business Networking Event</title>
        <meta name="description" content="Join the premier business summit on September 12, 2026. Discover government opportunities, global trade insights, and network with entrepreneurs, MSMEs, and industry experts." />
      </Helmet>

      <div className="event-page">
        {/* Announcement Bar */}
        <div className="announcement-bar">
          EARLY-BIRD DELEGATE REGISTRATION NOW OPEN
        </div>

        {/* Hero Section */}
        <section className="event-hero">
          <div className="event-hero-content">
            <div className="hero-layout">
              {/* Left Side - Content */}
              <div className="hero-text-section">
                <div className="summit-badge">ONE-DAY PREMIUM BUSINESS SUMMIT</div>
                
                <h1 className="event-hero-title">
                  NAVI MUMBAI <br />
                  <span className="highlight">GROWTH SUMMIT 2026</span>
                </h1>

                <p className="event-hero-subtitle">
                  Connect with entrepreneurs. Discover government and global trade opportunities. Build partnerships that move your business forward.
                </p>

                <div className="event-date-box">
                  <span className="date-highlight">SATURDAY, 12 SEPTEMBER 2026</span>
                  <span className="time-info">10:00 AM - 4:30 PM</span>
                  <span className="location-info">NAVI MUMBAI</span>
                </div>

                <div className="event-cta-buttons">
                  <button onClick={scrollToPricing} className="btn-primary-event">
                    CHOOSE YOUR DELEGATE PASS →
                  </button>
                  <span className="event-notice">Limited capacity • Secure online payment</span>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="hero-image-section">
                <img src={eventMainImg} alt="Navi Mumbai Growth Summit 2026" className="hero-event-image" />
              </div>
            </div>
          </div>
        </section>

        {/* Event Highlights Grid - 2x2 */}
        <section className="event-highlights-grid-section">
          <div className="event-container">
            <div className="highlights-grid-2x2">
              {photoArray.slice(0, 4).map((url, idx) => (
                <div key={idx} className="highlight-photo-card">
                  <img 
                    src={url} 
                    alt={`Summit highlight ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="event-stats-section">
          <div className="event-container">
            <div className="stats-grid-event">
              <div className="stat-card-event">
                <div className="stat-num">7+</div>
                <div className="stat-label-event">Focused sessions</div>
              </div>
              <div className="stat-card-event">
                <div className="stat-num">1 DAY</div>
                <div className="stat-label-event">Practical learning</div>
              </div>
              <div className="stat-card-event">
                <div className="stat-num">HIGH-VALUE</div>
                <div className="stat-label-event">Business networking</div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props Section */}
        <section className="event-value-section">
          <div className="event-container">
            <h2 className="section-title-event">WHAT YOU WILL WALK AWAY WITH</h2>
            
            <div className="value-grid">
              {valueProps.map((item, idx) => (
                <div key={idx} className="value-card-event">
                  <div className="value-number">{item.num}</div>
                  <div className="value-content">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agenda Section */}
        <section className="event-agenda-section">
          <div className="event-container">
            <h2 className="section-title-event">A DAY BUILT FOR BUSINESS GROWTH</h2>
            <p className="section-subtitle-event">A focused agenda - enough detail to build confidence</p>
            
            <div className="agenda-grid">
              {agendaItems.map((item, idx) => (
                <div key={idx} className="agenda-item-event">
                  <div className="agenda-time-badge">{item.time}</div>
                  <div className="agenda-title">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="event-pricing-section">
          <div className="event-container">
            <h2 className="section-title-event white">CHOOSE YOUR DELEGATE PASS</h2>
            <p className="section-subtitle-event white">Simple pricing. Secure checkout. Instant confirmation.</p>
            
            <div className="pricing-grid">
              {/* Silver Pass */}
              <div className="pricing-card-event">
                <h3 className="pass-name">SILVER DELEGATE</h3>
                <div className="pass-price">
                  <span className="price-amount">INR 1,000</span>
                  <span className="price-unit">per participant</span>
                </div>
                <div className="pass-features">
                  <p className="features-header">Full-day access</p>
                  <ul>
                    <li>✓ Morning tea / coffee</li>
                    <li>✓ All standard summit sessions</li>
                    <li>✓ Networking pass</li>
                    <li>✓ Afternoon tea</li>
                  </ul>
                </div>
                <button onClick={() => setBookingPass('Silver Pass (INR 1,000)')} className="btn-book-pass">
                  BOOK THIS PASS
                </button>
              </div>

              {/* Gold Pass */}
              <div className="pricing-card-event featured">
                <div className="recommended-badge">RECOMMENDED</div>
                <h3 className="pass-name">GOLD DELEGATE</h3>
                <div className="pass-price">
                  <span className="price-amount">INR 3,150</span>
                  <span className="price-unit">per participant</span>
                </div>
                <div className="pass-features">
                  <p className="features-header">Best summit experience</p>
                  <ul>
                    <li>✓ Everything in Silver</li>
                    <li>✓ Lunch pass</li>
                    <li>✓ Main-stage access</li>
                    <li>✓ Priority seating + enhanced networking</li>
                  </ul>
                </div>
                <button onClick={() => setBookingPass('Gold Pass (INR 3,150)')} className="btn-book-pass gold">
                  BOOK THIS PASS
                </button>
              </div>
            </div>

            <p className="pricing-note">Payment buttons connect to your gateway checkout links</p>
          </div>
        </section>

        {/* Who Should Attend */}
        <section className="event-attendee-section">
          <div className="event-container">
            <h2 className="section-title-event white">WHO SHOULD ATTEND?</h2>
            
            <div className="attendee-grid">
              {attendees.map((attendee, idx) => (
                <div key={idx} className="attendee-card">
                  ✓ {attendee}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Previous Events Section */}
        <section className="event-previous-section">
          <div className="event-container">
            <h2 className="section-title-event">GLIMPSES FROM PREVIOUS EVENTS</h2>
            <p className="section-subtitle-event">See what our past summits looked like</p>
            
            <div className="previous-events-grid">
              {getCurrentPhotos().map((url, idx) => (
                <div key={`${currentPhotoSet}-${idx}`} className="event-photo-card">
                  <img 
                    src={url} 
                    alt={`Event moment ${idx + 1}`}
                  />
                </div>
              ))}
            </div>

            {/* Pagination dots */}
            <div className="photo-pagination">
              {Array.from({ length: totalSets }).map((_, idx) => (
                <button
                  key={idx}
                  className={`pagination-dot ${currentPhotoSet === idx ? 'active' : ''}`}
                  onClick={() => setCurrentPhotoSet(idx)}
                  aria-label={`View photo set ${idx + 1}`}
                />
              ))}
            </div>

            {/* Preload all images */}
            <div style={{ display: 'none' }}>
              {photoArray.map((url, idx) => (
                <img key={idx} src={url} alt="" />
              ))}
            </div>
          </div>
        </section>

        {/* YouTube Video Section */}
        <section className="event-video-section">
          <div className="event-container">
            <h2 className="section-title-event white">WATCH OUR PREVIOUS SUMMIT HIGHLIGHTS</h2>
            <p className="section-subtitle-event white">Experience the energy and insights from our past events</p>
            
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/hSLZkM2AzJY"
                title="Navi Mumbai Summit Highlights"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="youtube-video"
              ></iframe>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="event-faq-section">
          <div className="event-container">
            <h2 className="section-title-event">FREQUENTLY ASKED QUESTIONS</h2>
            
            <div className="faq-list">
              {faqs.map((faq, idx) => (
                <div key={idx} className="faq-item">
                  <button 
                    className={`faq-question ${openFaq === idx ? 'active' : ''}`}
                    onClick={() => toggleFaq(idx)}
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <span className="faq-icon">{openFaq === idx ? '−' : '+'}</span>
                  </button>
                  {openFaq === idx && (
                    <div className="faq-answer">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Modal */}
        {bookingPass && (
          <div className="booking-modal-overlay" onClick={() => setBookingPass(null)}>
            <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setBookingPass(null)}>×</button>
              
              <h3>Complete Your Registration</h3>
              <p className="modal-subtitle">You have selected: <strong>{bookingPass}</strong></p>
              
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
                
                <button type="submit" className="btn-submit-modal">
                  PROCEED TO PAYMENT →
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
