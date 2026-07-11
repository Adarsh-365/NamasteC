import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from './SEOHead';
import '../styles/ChineseEnrollment.css';

const API_BASE_URL = 'https://api.namastechina.org';

export default function ChineseEnrollment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    country: '',
    course: 'BASIC',
    message: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');

  // Mobile validation function
  const validateMobile = (mobile) => {
    // Remove all non-digit characters
    const digitsOnly = mobile.replace(/\D/g, '');
    
    // Check if exactly 10 digits
    if (digitsOnly.length === 0) {
      return '';
    }
    
    if (digitsOnly.length !== 10) {
      return 'Mobile number must be exactly 10 digits';
    }
    
    // Check if starts with valid digit (6-9 for Indian numbers)
    if (!/^[6-9]/.test(digitsOnly)) {
      return 'Mobile number must start with 6, 7, 8, or 9';
    }
    
    return '';
  };

  // Email validation function
  const validateEmail = (email) => {
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    // Check for Gmail or common email providers
    const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'protonmail.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (!validDomains.includes(domain)) {
      return 'Please use a valid email address (Gmail, Yahoo, Outlook, etc.)';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email before proceeding
    const emailValidationError = validateEmail(formData.email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }
    
    // Validate mobile before proceeding
    const mobileValidationError = validateMobile(formData.mobile);
    if (mobileValidationError) {
      setMobileError(mobileValidationError);
      return;
    }
    
    setIsProcessing(true);

    try {
      // Step 1: Create order on backend
      const orderResponse = await fetch(`${API_BASE_URL}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
        description: `Chinese Language Course - ${formData.course} Level`,
        order_id: orderData.order_id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        notes: {
          city: formData.city,
          state: formData.state,
          country: formData.country,
          course: formData.course,
          message: formData.message,
        },
        theme: {
          color: '#D32F2F',
        },
        handler: async function (response) {
          // Step 3: Verify payment on backend
          try {
            const verifyResponse = await fetch(`${API_BASE_URL}/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                formData: formData,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Store payment details for modal
              setPaymentDetails({
                paymentId: verifyData.payment_id,
                orderId: verifyData.order_id,
                studentName: formData.name,
                course: formData.course,
              });
              
              // Show success modal
              setShowSuccessModal(true);
              
              // Send confirmation via WhatsApp
              const text = `🎉 Payment Successful!\n\nPayment ID: ${verifyData.payment_id}\nOrder ID: ${verifyData.order_id}\n\nEnrollment Details:\nName: ${formData.name}\nMobile: ${formData.mobile}\nEmail: ${formData.email}\nCity: ${formData.city}\nState: ${formData.state}\nCountry: ${formData.country}\nCourse Level: ${formData.course}\nAdditional Info: ${formData.message}`;
              
              // Open WhatsApp after a short delay
              setTimeout(() => {
                window.open(`https://wa.me/919370947790?text=${encodeURIComponent(text)}`, '_blank');
              }, 2000);
              
              // Reset form
              setFormData({
                name: '',
                mobile: '',
                email: '',
                city: '',
                state: '',
                country: '',
                course: 'BASIC',
                message: ''
              });
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
        
        // Validate mobile in real-time
        if (digitsOnly.trim() === '') {
          setMobileError('');
        } else {
          const error = validateMobile(digitsOnly);
          setMobileError(error);
        }
      }
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate email in real-time as user types
    if (name === 'email') {
      if (value.trim() === '') {
        setEmailError('');
      } else {
        const error = validateEmail(value);
        setEmailError(error);
      }
    }
  };

  return (
    <>
      <SEOHead 
        title="Enroll Now - Chinese Language Course | Namaste China"
        description="Enroll in our practical Chinese language course. Perfect for Canton Fair visitors and business professionals traveling to China."
        keywords="chinese course enrollment, learn mandarin, canton fair preparation, business chinese"
      />

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
                <p className="success-greeting">Welcome to the course, {paymentDetails?.studentName}</p>
              </div>
              
              {/* Payment Details Card */}
              <div className="payment-details-card">
                <div className="detail-row">
                  <span className="detail-label">Course Selected</span>
                  <span className="detail-value course-badge">{paymentDetails?.course} Level</span>
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
                    <p>Course access details sent to your email</p>
                  </div>
                  <div className="next-step">
                    <div className="step-icon">📱</div>
                    <p>We'll contact you on WhatsApp shortly</p>
                  </div>
                  <div className="next-step">
                    <div className="step-icon">🎓</div>
                    <p>Start learning Chinese immediately</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="success-actions">
                <button 
                  className="btn-primary-action"
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/chinese-classes');
                  }}
                >
                  Go to Course Page
                </button>
                <button 
                  className="btn-secondary-action"
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

      <div className="enrollment-page">
        {/* Premium Dark Hero Section */}
        <section className="premium-hero">
          <div className="hero-container">
            {/* Left Content */}
            <div className="hero-left">
              <div className="hero-content">
                <h1 className="main-headline">
                  Planning to Visit China or the Canton Fair?
                </h1>
                <h2 className="sub-headline">
                  Learn Practical Chinese Before Your Journey! 🇨🇳
                </h2>
                <p className="subtitle">
                  Communicate confidently during <strong>business meetings</strong>, <strong>factory visits</strong>, <strong>supplier negotiations</strong>, <strong>shopping</strong>, <strong>travel</strong>, and <strong>daily conversations</strong>. Our beginner-friendly online course helps you speak practical Mandarin quickly with real-life lessons and speaking practice.
                </p>

                {/* Key Benefits */}
                <div className="key-benefits">
                  <div className="benefit-item">✔ Speak Essential Mandarin for Real Situations</div>
                  <div className="benefit-item">✔ Perfect for Canton Fair & China Business Trips</div>
                  <div className="benefit-item">✔ No Prior Chinese Knowledge Required</div>
                  <div className="benefit-item">✔ Learn Practical Conversations in Just a Few Weeks</div>
                  <div className="benefit-item">✔ Interactive Speaking & Listening Practice</div>
                  <div className="benefit-item">✔ Travel with Confidence Across China</div>
                </div>

                {/* CTA Button */}
                <div className="cta-container">
                  <button 
                    className="premium-cta-btn"
                    onClick={() => document.getElementById('enrollment-form').scrollIntoView({ behavior: 'smooth' })}
                  >
                    🚀 Start Learning Chinese Today
                  </button>
                  <p className="cta-subtitle">Limited-Time Launch Offer • Lifetime Access Included</p>
                </div>
              </div>
            </div>

            {/* Right Content - Illustration */}
            <div className="hero-right">
              <div className="illustration-container">
                <div className="illustration-card">
                  <div className="illustration-header">
                    <span className="flag-icon">🇨🇳</span>
                    <span className="learning-badge">Live Learning</span>
                  </div>
                  
                  <div className="illustration-content">
                    <div className="student-avatar">👨‍🎓</div>
                    <h3>Learn Mandarin Online</h3>
                    
                    <div className="speech-bubbles">
                      <div className="bubble bubble-1">
                        <span className="chinese">你好</span>
                        <span className="pinyin">Nǐ hǎo</span>
                      </div>
                      <div className="bubble bubble-2">
                        <span className="chinese">谢谢</span>
                        <span className="pinyin">Xièxiè</span>
                      </div>
                      <div className="bubble bubble-3">
                        <span className="chinese">多少钱？</span>
                        <span className="pinyin">Duōshao qián?</span>
                      </div>
                    </div>

                    <div className="landmarks">
                      <div className="landmark">🏯</div>
                      <div className="landmark">🏙️</div>
                      <div className="landmark">🏔️</div>
                    </div>

                    <div className="devices">
                      <div className="device laptop">💻</div>
                      <div className="device mobile">📱</div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="floating-element element-1">✨</div>
                <div className="floating-element element-2">🎓</div>
                <div className="floating-element element-3">💬</div>
              </div>
            </div>
          </div>
        </section>

        {/* Enrollment Form Section */}
        <section className="enrollment-form-section" id="enrollment-form">
          <div className="form-container">
            <div className="form-header">
              <h2>Complete Your Enrollment</h2>
              <p>Fill in your details and we'll get you started on your Chinese learning journey</p>
            </div>

            <form onSubmit={handleSubmit} className="enrollment-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number *</label>
                  <div className="input-with-validation">
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      placeholder="10 digit mobile number"
                      maxLength="10"
                      className={mobileError ? 'error' : (formData.mobile && !mobileError && formData.mobile.length === 10 ? 'valid' : '')}
                    />
                    {formData.mobile && !mobileError && formData.mobile.length === 10 && <span className="validation-icon success">✓</span>}
                    {mobileError && <span className="validation-icon error">✕</span>}
                  </div>
                  {mobileError && <span className="error-message">{mobileError}</span>}
                  {formData.mobile && !mobileError && formData.mobile.length === 10 && (
                    <span className="success-message">Valid mobile number</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <div className="input-with-validation">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@gmail.com"
                      className={emailError ? 'error' : (formData.email && !emailError ? 'valid' : '')}
                    />
                    {formData.email && !emailError && <span className="validation-icon success">✓</span>}
                    {emailError && <span className="validation-icon error">✕</span>}
                  </div>
                  {emailError && <span className="error-message">{emailError}</span>}
                  {formData.email && !emailError && (
                    <span className="success-message">Valid email address</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Enter your city"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="Enter your state"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    placeholder="Enter your country"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="course">Select Course Level *</label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                  >
                    <option value="BASIC">BASIC - Beginner Level</option>
                    <option value="ADVANCE">ADVANCE - Intermediate Level</option>
                    <option value="MASTER">MASTER - Advanced Level</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Additional Information (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your learning goals, Canton Fair plans, or any questions..."
                ></textarea>
              </div>

              <div className="form-footer">
                <button type="submit" className="submit-btn" disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : 'Start Learning Now'}
                </button>
                <p className="form-note">
                  Secure payment powered by Razorpay • Complete enrollment via WhatsApp
                </p>
              </div>
            </form>
          </div>
        </section>

        {/* Course Details Section - Below Form */}
        <section className="course-details-section">
          <div className="course-details-container">
            {/* Course Header */}
            <div className="course-header">
              <h2 className="course-title">Basic Chinese Course – Online</h2>
              <p className="course-subtitle">Learn Chinese from Scratch – Only ₹999</p>
              <p className="course-description">
                No prior knowledge required. This course is perfect for beginners, students, travelers, business owners, and anyone planning to visit China or the Canton Fair.
              </p>
            </div>

            {/* Information Cards */}
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">📅</div>
                <div className="info-text">Self-Paced Course</div>
              </div>
              <div className="info-card">
                <div className="info-icon">⏱</div>
                <div className="info-text">10 Video Lessons</div>
              </div>
              <div className="info-card">
                <div className="info-icon">💻</div>
                <div className="info-text">100% Online</div>
              </div>
              <div className="info-card">
                <div className="info-icon">📱</div>
                <div className="info-text">Lifetime Access</div>
              </div>
            </div>

            {/* Course Content */}
            <div className="course-content-wrapper">
              <h3 className="section-heading">Course Content (10 Video Lessons)</h3>
              <div className="course-lessons">
                <div className="lesson-item">
                  <span className="lesson-number">1</span>
                  <span className="lesson-title">Introduction to the Chinese Language</span>
                </div>
                <div className="lesson-item">
                  <span className="lesson-number">2</span>
                  <span className="lesson-title">Chinese Pronunciation (Pinyin)</span>
                </div>
                <div className="lesson-item">
                  <span className="lesson-number">3</span>
                  <span className="lesson-title">Greetings and Daily Expressions</span>
                </div>
                <div className="lesson-item">
                  <span className="lesson-number">4</span>
                  <span className="lesson-title">Numbers, Days, Dates, and Time</span>
                </div>
                <div className="lesson-item">
                  <span className="lesson-number">5</span>
                  <span className="lesson-title">Family and Common Vocabulary</span>
                </div>
                <div className="lesson-item">
                  <span className="lesson-number">6</span>
                  <span className="lesson-title">Asking Simple Questions</span>
                </div>
                <div className="lesson-item">
                  <span className="lesson-number">7</span>
                  <span className="lesson-title">Shopping and Money</span>
                </div>
                <div className="lesson-item">
                  <span className="lesson-number">8</span>
                  <span className="lesson-title">Food, Restaurant, and Travel Phrases</span>
                </div>
                <div className="lesson-item">
                  <span className="lesson-number">9</span>
                  <span className="lesson-title">Basic Business and Canton Fair Vocabulary</span>
                </div>
                <div className="lesson-item">
                  <span className="lesson-number">10</span>
                  <span className="lesson-title">Everyday Conversations and Practice</span>
                </div>
              </div>
            </div>

            {/* What You'll Get */}
            <div className="course-benefits-wrapper">
              <h3 className="section-heading">You'll Get</h3>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">🎥</div>
                  <div className="benefit-text">10 Recorded Video Lessons</div>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">♾️</div>
                  <div className="benefit-text">Lifetime Access</div>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">📄</div>
                  <div className="benefit-text">PDF Notes</div>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">✍️</div>
                  <div className="benefit-text">Practice Exercises</div>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">🏆</div>
                  <div className="benefit-text">Course Completion Certificate</div>
                </div>
              </div>
            </div>

            {/* Course Fee Highlight */}
            <div className="course-fee-box">
              <div className="fee-content">
                <h3>Course Fee: ₹999 Only</h3>
                <p>Start speaking basic Chinese with confidence and build a strong foundation for travel, business, and everyday communication.</p>
                <button 
                  className="enroll-now-btn"
                  onClick={() => document.getElementById('enrollment-form').scrollIntoView({ behavior: 'smooth' })}
                >
                  Enroll Now for ₹999
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="trust-section">
          <div className="trust-container">
            <h3>Why Choose Our Chinese Course?</h3>
            <div className="trust-grid">
              <div className="trust-card">
                <div className="trust-icon">🎯</div>
                <h4>Canton Fair Focused</h4>
                <p>Specifically designed for business travelers and Canton Fair attendees</p>
              </div>
              <div className="trust-card">
                <div className="trust-icon">⚡</div>
                <h4>Fast Results</h4>
                <p>Start speaking practical Chinese in just a few weeks</p>
              </div>
              <div className="trust-card">
                <div className="trust-icon">🏆</div>
                <h4>Expert Instructors</h4>
                <p>Learn from experienced Chinese language teachers</p>
              </div>
              <div className="trust-card">
                <div className="trust-icon">💰</div>
                <h4>Best Value</h4>
                <p>Lifetime access for a one-time investment of only ₹999</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
