import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import '../styles/Event.css';
import eventMainImg from '../assets/event_main.JPG';

// Import all event photos
const eventPhotos = import.meta.glob('../assets/images/*.JPG', { eager: true, import: 'default' });

const API_BASE_URL = 'https://api.namastechina.org';

export default function NaviMumbaiSummit() {
  const [openFaq, setOpenFaq] = useState(null);
  const [bookingPass, setBookingPass] = useState(null);
  const [passType, setPassType] = useState(''); // 'silver' or 'gold'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    company_name: '',
    city: '',
    ton_over: '',
    nature_of_business: '',
    prod_serv_details: '',
    challenges: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [currentPhotoSet, setCurrentPhotoSet] = useState(0);

  // Convert photo object to array
  const photoArray = Object.values(eventPhotos);
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
    const { name, value } = e.target;
    
    // For mobile field, only allow digits and limit to 10
    if (name === 'mobile') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setFormData({
          ...formData,
          [name]: digitsOnly
        });
      }
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Capture these values at the start to ensure they're available in all scopes
    const currentPassType = passType;
    const guestType = passType === 'silver' ? 'Silver' : 'Gold';
    const paymentValue = passType === 'silver' ? 1000 : 3150;

    // Debug: Log the values being sent
    console.log('Payment Details:', {
      currentPassType,
      guestType,
      paymentValue,
      formData
    });

    try {
      // Determine which API endpoint to use based on pass type
      const apiEndpoint = currentPassType === 'silver' 
        ? `${API_BASE_URL}/silvebook`
        : `${API_BASE_URL}/goldbook`;

      // Determine amount based on pass type
      const amount = currentPassType === 'silver' ? 100000 : 315000; // in paise (₹1000 or ₹3150)

      // Step 1: Create order on backend
      const orderResponse = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'INR',
          guestType: guestType,
          paymentValue: paymentValue
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // Step 2: Open Razorpay checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Namaste China',
        description: `${guestType} Delegate Pass - Navi Mumbai Growth Summit 2026`,
        order_id: orderData.order_id,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        notes: {
          company_name: formData.company_name,
          city: formData.city,
          ton_over: formData.ton_over,
          nature_of_business: formData.nature_of_business,
          prod_serv_details: formData.prod_serv_details,
          challenges: formData.challenges,
          pass_type: currentPassType,
          guest_type: guestType,
          payment_value: paymentValue
        },
        theme: {
          color: '#D32F2F',
        },
        handler: async function (response) {
          // Step 3: Verify payment on backend
          try {
            // Debug: Log what we're sending to verify-payment-book
            console.log('Sending to verify-payment-book:', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              formData: {
                ...formData,
                pass_type: currentPassType,
                guestType: guestType,
                paymentValue: paymentValue
              }
            });

            const verifyResponse = await fetch(`${API_BASE_URL}/verify-payment-book`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                formData: {
                  ...formData,
                  pass_type: currentPassType,
                  guestType: guestType,
                  paymentValue: paymentValue
                },
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Store payment details for modal
              setPaymentDetails({
                paymentId: verifyData.payment_id,
                orderId: verifyData.order_id,
                participantName: formData.fullName,
                passType: `${guestType} Delegate`,
              });
              
              // Show success modal
              setShowSuccessModal(true);
              
              // Send confirmation via WhatsApp
              const passPrice = `₹${paymentValue.toLocaleString('en-IN')}`;
              const text = `🎉 Payment Successful!\n\nPayment ID: ${verifyData.payment_id}\nOrder ID: ${verifyData.order_id}\n\nPass Type: ${guestType} Delegate (${passPrice})\n\nDelegate Details:\nName: ${formData.fullName}\nMobile: ${formData.mobile}\nEmail: ${formData.email}\nCompany: ${formData.company_name}\nCity: ${formData.city}\nTurnover: ${formData.ton_over}\nBusiness Nature: ${formData.nature_of_business}\nProducts/Services: ${formData.prod_serv_details}\nChallenges: ${formData.challenges}`;
              
              // Open WhatsApp after a short delay
              setTimeout(() => {
                window.open(`https://wa.me/919370947790?text=${encodeURIComponent(text)}`, '_blank');
              }, 2000);
              
              // Reset form
              setFormData({
                fullName: '',
                email: '',
                mobile: '',
                company_name: '',
                city: '',
                ton_over: '',
                nature_of_business: '',
                prod_serv_details: '',
                challenges: ''
              });
              
              // Close modal
              setBookingPass(null);
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Verification error:', error);
            alert('Payment verification failed. Please contact support with your payment details.');
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            alert('Payment cancelled. Please try again when ready.');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
      setIsProcessing(false);
    }
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
                  <span className="price-amount">INR 900 + 18% GST</span>
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
                <button onClick={() => {
                  setBookingPass('Silver Pass (INR 1,000)');
                  setPassType('silver');
                }} className="btn-book-pass">
                  BOOK THIS PASS
                </button>
              </div>

              {/* Gold Pass */}
              <div className="pricing-card-event featured">
                <div className="recommended-badge">RECOMMENDED</div>
                <h3 className="pass-name">GOLD DELEGATE</h3>
                <div className="pass-price">
                  <span className="price-amount">INR 2,700  + 18% GST</span>
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
                <button onClick={() => {
                  setBookingPass('Gold Pass (INR 3,150)');
                  setPassType('gold');
                }} className="btn-book-pass gold">
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
                {/* Row 1 - 2 columns */}
                <div className="form-row-two-col">
                  <div className="form-group-modal">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label htmlFor="mobile">Mobile Number *</label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      placeholder="10 digit mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      maxLength="10"
                    />
                  </div>
                </div>

                {/* Row 2 - 2 columns */}
                <div className="form-row-two-col">
                  <div className="form-group-modal">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label htmlFor="company_name">Company Name *</label>
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      placeholder="Your company name"
                      value={formData.company_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Row 3 - 2 columns */}
                <div className="form-row-two-col">
                  <div className="form-group-modal">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Your city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                 <div className="form-group-modal">
                  <label htmlFor="ton_over">Company Turnover *</label>

                  <select
                    id="ton_over"
                    name="ton_over"
                    value={formData.ton_over}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select annual turnover</option>
                    <option value="< 1 Cr">Less than ₹1 Cr</option>
                    <option value="1 - 3 Cr">₹1 Cr - ₹3 Cr</option>
                    <option value="> 3 Cr">More than ₹3 Cr</option>
                  </select>
                </div>
                </div>

                {/* Row 4 - 2 columns */}
                <div className="form-row-two-col">
                  <div className="form-group-modal">
                    <label htmlFor="nature_of_business">Nature of Business *</label>
                    <input
                      type="text"
                      id="nature_of_business"
                      name="nature_of_business"
                      placeholder="E.g., Manufacturing, Trading"
                      value={formData.nature_of_business}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group-modal">
                    <label htmlFor="prod_serv_details">Product / Service Details *</label>
                    <input
                      type="text"
                      id="prod_serv_details"
                      name="prod_serv_details"
                      placeholder="What do you offer?"
                      value={formData.prod_serv_details}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Row 5 - Full width */}
                <div className="form-group-modal full-width">
                  <label htmlFor="challenges">Challenges Faced Doing Business *</label>
                  <textarea
                    id="challenges"
                    name="challenges"
                    placeholder="Tell us about the challenges you face..."
                    value={formData.challenges}
                    onChange={handleChange}
                    required
                    rows="3"
                  />
                </div>
                
                <button type="submit" className="btn-submit-modal" disabled={isProcessing}>
                  {isProcessing ? 'PROCESSING...' : 'PROCEED TO PAYMENT →'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="success-modal-overlay" onClick={() => setShowSuccessModal(false)}>
            <div className="success-modal" onClick={(e) => e.stopPropagation()}>
              <div className="success-modal-content">
                {/* Success Icon - Green Checkmark */}
                <div className="success-icon-circle">
                  <svg className="success-checkmark-icon" viewBox="0 0 52 52">
                    <circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="#10B981"/>
                    <path className="success-checkmark-check" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" d="M14 27l8 8 16-16"/>
                  </svg>
                </div>
                
                {/* Main Message */}
                <div className="success-header">
                  <h2>Payment Successful!</h2>
                  <p className="success-greeting">Welcome to the summit, {paymentDetails?.participantName}</p>
                </div>
                
                {/* Payment Details Card */}
                <div className="payment-details-card">
                  <div className="detail-row">
                    <span className="detail-label">Pass Type</span>
                    <span className="detail-value course-badge">{paymentDetails?.passType}</span>
                  </div>
                  <div className="detail-divider"></div>
                  <div className="detail-row">
                    <span className="detail-label">Payment ID</span>
                    <span className="detail-value payment-id">{paymentDetails?.paymentId}</span>
                  </div>
                </div>

                {/* What's Next Section */}
                <div className="whats-next-section">
                  <h3 className="whats-next-title">What happens next?</h3>
                  <div className="next-steps">
                    <div className="next-step">
                      <div className="step-icon">📧</div>
                      <p>Confirmation email sent with event details</p>
                    </div>
                    <div className="next-step">
                      <div className="step-icon">📱</div>
                      <p>We'll contact you on WhatsApp shortly</p>
                    </div>
                    <div className="next-step">
                      <div className="step-icon">🎫</div>
                      <p>Your delegate pass will be ready at the venue</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="success-actions">
                  <button 
                    className="btn-primary-action"
                    onClick={() => setShowSuccessModal(false)}
                  >
                    Close
                  </button>
                </div>

                {/* Footer Note */}
                <p className="success-footer-note">
                  Need help? Contact us on WhatsApp at +91 93709 47790
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
