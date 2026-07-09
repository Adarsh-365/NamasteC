import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from './SEOHead';
import '../styles/ChineseClasses.css';

export default function ChineseClasses() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('lessons');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [learnersCount, setLearnersCount] = useState(0);
  const [lessonsCount, setLessonsCount] = useState(0);
  const [exercisesCount, setExercisesCount] = useState(0);
  const [faqOpen, setFaqOpen] = useState({});

  // Animated counters
  useEffect(() => {
    const animateCounter = (target, setter, duration = 2000) => {
      const increment = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16);
    };

    animateCounter(10000, setLearnersCount);
    animateCounter(500, setLessonsCount);
    animateCounter(100, setExercisesCount);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: 'Rahul Sharma',
      country: 'India',
      rating: 5,
      review: 'This course transformed my business communication skills. Now I can negotiate directly with Chinese suppliers!',
      photo: '👨‍💼'
    },
    {
      name: 'Priya Patel',
      country: 'India',
      rating: 5,
      review: 'The interactive exercises and AI practice made learning so much easier. I passed my HSK 3 exam!',
      photo: '👩‍💼'
    },
    {
      name: 'Amit Kumar',
      country: 'India',
      rating: 5,
      review: 'Excellent course structure. The pronunciation guide and speaking practice helped me gain confidence.',
      photo: '👨‍🎓'
    }
  ];

  const modules = [
    { id: 1, title: 'Chinese Basics', icon: '📚' },
    { id: 2, title: 'Pinyin Mastery', icon: '🔤' },
    { id: 3, title: 'Greetings & Introductions', icon: '👋' },
    { id: 4, title: 'Daily Conversations', icon: '💬' },
    { id: 5, title: 'Numbers & Time', icon: '🕐' },
    { id: 6, title: 'Shopping & Food', icon: '🛒' },
    { id: 7, title: 'Travel Chinese', icon: '✈️' },
    { id: 8, title: 'Family & Friends', icon: '👨‍👩‍👧' },
    { id: 9, title: 'Grammar Essentials', icon: '📖' },
    { id: 10, title: 'Reading Characters', icon: '汉' },
    { id: 11, title: 'Listening Practice', icon: '🎧' }
  ];

  const faqs = [
    { q: 'Is this course beginner friendly?', a: 'Yes! The course is designed for absolute beginners with no prior knowledge of Chinese.' },
    { q: 'Do I need prior knowledge?', a: 'No prior knowledge is required. We start from the very basics including Pinyin and pronunciation.' },
    { q: 'Can I learn on mobile?', a: 'Yes, our platform is fully mobile-responsive. Learn anytime, anywhere on your phone or tablet.' },
    { q: 'Are lessons self-paced?', a: 'Absolutely! Learn at your own pace with lifetime access to all course materials.' },
    { q: 'Is there a certificate?', a: 'Yes, you will receive a Certificate of Completion after finishing the course.' },
    { q: 'Do I get lifetime access?', a: 'Yes, once enrolled, you have lifetime access to all lessons and future updates.' },
    { q: 'Is speaking practice included?', a: 'Yes! We have AI-powered conversation practice and speaking exercises throughout the course.' },
    { q: 'Will I learn Chinese characters?', a: 'Yes, we teach both simplified Chinese characters and Pinyin pronunciation system.' }
  ];

  const toggleFaq = (index) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleEnroll = () => {
    navigate('/chinese-enrollment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCourseTiers = () => {
    const courseTiersSection = document.getElementById('course-tiers-section');
    if (courseTiersSection) {
      courseTiersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SEOHead 
        title="Learn Chinese Language Online - Mandarin Classes | Namaste China"
        description="Master Mandarin Chinese through structured lessons, interactive exercises, AI conversation practice, and HSK exam preparation. Beginner-friendly with lifetime access."
        keywords="learn chinese, mandarin classes, chinese language course, HSK preparation, learn mandarin online, chinese for business"
      />

      <div className="chinese-classes-page">
        {/* Hero Section */}
        <section className="hero-chinese">
          <div className="hero-content-chinese">
            <div className="hero-text-chinese">
              <h1>Speak Practical Chinese Before Your China Trip — Even If You Start From Zero</h1>
              <h2 className="hero-subtitle-heading">Learn practical Mandarin for business meetings, factory visits, shopping, hotels, restaurants, taxis, and everyday conversations.</h2>
              <p className="hero-subtitle">Navigate China confidently with structured online lessons designed for business professionals, Canton Fair visitors, and complete beginners.</p>
              
              <div className="hero-badges">
                <span className="badge-item">🎥 10 Recorded Video Lessons</span>
                <span className="badge-item">📄 PDF Notes</span>
                <span className="badge-item">♾️ Lifetime Access</span>
                <span className="badge-item">🎓 Certificate</span>
                <span className="badge-item">💰 Only ₹999</span>
              </div>

              <div className="hero-cta-buttons">
                <button className="btn-hero-primary" onClick={scrollToCourseTiers}>Start Learning Today</button>
              </div>
            </div>

            <div className="hero-illustration">
              <div className="illustration-placeholder">
                <span className="illustration-icon">📚</span>
                <span className="illustration-icon">🗣️</span>
                <span className="illustration-icon chinese-text">汉字</span>
                <span className="illustration-icon">🎓</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="trusted-section">
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Learners</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.9★</div>
              <div className="stat-label">Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Lessons</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Practice Exercises</div>
            </div>
          </div>
        </section>

        {/* Who Is This Course For */}
        <section className="section-container" style={{ background: '#ffffff' }}>
          <h2 className="section-heading" style={{ color: '#2c3e50' }}>Who Is This Course For?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <i className="fa-solid fa-plane-departure benefit-icon"></i>
              <h3>Visiting China</h3>
              <p>Communicate confidently during your trip</p>
            </div>
            <div className="benefit-card">
              <i className="fa-solid fa-building benefit-icon"></i>
              <h3>Canton Fair Visitors</h3>
              <p>Negotiate and connect with suppliers</p>
            </div>
            <div className="benefit-card">
              <i className="fa-solid fa-briefcase benefit-icon"></i>
              <h3>Business Professionals</h3>
              <p>Navigate meetings and factory visits</p>
            </div>
            <div className="benefit-card">
              <i className="fa-solid fa-box benefit-icon"></i>
              <h3>Import & Export Professionals</h3>
              <p>Build stronger supplier relationships</p>
            </div>
            <div className="benefit-card">
              <i className="fa-solid fa-graduation-cap benefit-icon"></i>
              <h3>Students</h3>
              <p>Learn a valuable language skill</p>
            </div>
            <div className="benefit-card">
              <i className="fa-solid fa-user benefit-icon"></i>
              <h3>Complete Beginners</h3>
              <p>Start from zero with simple lessons</p>
            </div>
          </div>
        </section>

        {/* Why Learn Chinese */}
        <section className="section-container" style={{ background: '#f8f9fa' }}>
          <h2 className="section-heading" style={{ color: '#2c3e50' }}>What You'll Be Able to Do</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <i className="fa-solid fa-comments benefit-icon"></i>
              <h3>Handle Daily Conversations</h3>
              <p>Order food, ask directions, shop, and chat naturally</p>
            </div>
            <div className="benefit-card">
              <i className="fa-solid fa-language benefit-icon"></i>
              <h3>Read Signs and Menus</h3>
              <p>Navigate airports, hotels, and restaurants independently</p>
            </div>
            <div className="benefit-card">
              <i className="fa-solid fa-headphones benefit-icon"></i>
              <h3>Understand Native Speakers</h3>
              <p>Follow conversations in shops, taxis, and meetings</p>
            </div>
            <div className="benefit-card">
              <i className="fa-solid fa-microphone benefit-icon"></i>
              <h3>Pronounce Words Correctly</h3>
              <p>Speak clearly so locals understand you easily</p>
            </div>
            <div className="benefit-card">
              <i className="fa-solid fa-yin-yang benefit-icon"></i>
              <h3>Understand Chinese Culture</h3>
              <p>Build trust and rapport with business partners</p>
            </div>
            <div className="benefit-card">
              <i className="fa-solid fa-plane benefit-icon"></i>
              <h3>Travel Without Stress</h3>
              <p>Get around China without needing a translator</p>
            </div>
            <div className="benefit-card">
              <i className="fa-solid fa-handshake benefit-icon"></i>
              <h3>Make Real Connections</h3>
              <p>Impress suppliers and colleagues with your language skills</p>
            </div>

          </div>
        </section>

        {/* Course Tiers */}
        <section className="section-container course-tiers-section" id="course-tiers-section" style={{ background: '#ffffff' }}>
          <h2 className="section-heading" style={{ color: '#2c3e50' }}>Choose the Best Learning Path for You</h2>
          <div className="course-tiers-grid">
            <div className="tier-card">
              <div className="tier-badge">BASIC</div>
              <h3>Beginner Level</h3>
              <p>Start speaking Chinese in everyday situations</p>
              <ul className="tier-features">
                <li>✓ Pronunciation basics</li>
                <li>✓ Greet people and introduce yourself</li>
                <li>✓ Order food and ask for help</li>
                <li>✓ Handle simple conversations</li>
              </ul>
              <button className="btn-tier" onClick={handleEnroll}>Start Learning Today</button>
            </div>
            <div className="tier-card featured">
              <div className="tier-badge">ADVANCE</div>
              <h3>Intermediate Level</h3>
              <p>Speak confidently in business and travel situations</p>
              <ul className="tier-features">
                <li>✓ Negotiate with suppliers</li>
                <li>✓ Discuss prices and terms</li>
                <li>✓ Travel across China independently</li>
                <li>✓ Understand cultural context</li>
              </ul>
              <button className="btn-tier" onClick={handleEnroll}>Start Learning Today</button>
            </div>
            <div className="tier-card">
              <div className="tier-badge">MASTER</div>
              <h3>Advanced Level</h3>
              <p>Communicate fluently in professional settings</p>
              <ul className="tier-features">
                <li>✓ Lead business meetings</li>
                <li>✓ Write professional emails</li>
                <li>✓ Read contracts and documents</li>
                <li>✓ Speak naturally and fluently</li>
              </ul>
              <button className="btn-tier" onClick={handleEnroll}>Start Learning Today</button>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '30px', padding: '20px', background: '#fff9e6', borderRadius: '10px', border: '1px solid #ffd700' }}>
            <p style={{ margin: '0', fontSize: '0.95rem', color: '#333' }}>
              <strong>New batches start every month.</strong> Limited batch sizes ensure better speaking practice and personalized attention.
            </p>
          </div>
        </section>

        {/* Learning Journey Timeline */}
        <section className="section-container timeline-section">
          <h2 className="section-heading-white">Your Learning Journey</h2>
          <div className="learning-timeline">
            {[
              { step: 1, title: 'Learn Pinyin', desc: 'Pronounce words correctly from day one' },
              { step: 2, title: 'Master Pronunciation', desc: 'Speak clearly so locals understand you' },
              { step: 3, title: 'Build Vocabulary', desc: 'Learn words you will use in airports, hotels, and meetings' },
              { step: 4, title: 'Learn Grammar', desc: 'Form sentences that make sense' },
              { step: 5, title: 'Practice Conversations', desc: 'Role-play real situations you will face' },
              { step: 6, title: 'Read Chinese Characters', desc: 'Navigate signs, menus, and addresses' },
              { step: 7, title: 'Complete Quizzes', desc: 'Check your progress with simple tests' },
              { step: 8, title: 'Earn Your Certificate', desc: 'Show proof of your language skills' }
            ].map((item) => (
              <div key={item.step} className="timeline-item">
                <div className="timeline-marker">{item.step}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Course Curriculum */}
        <section className="section-container" id="curriculum" style={{ background: '#f8f9fa' }}>
          <h2 className="section-heading" style={{ color: '#2c3e50' }}>What You'll Learn</h2>
          <div className="modules-grid">
            {modules.map((module) => (
              <div key={module.id} className="module-card">
                <div className="module-icon">{module.icon}</div>
                <h3>Module {module.id}</h3>
                <h4>{module.title}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-container testimonials-section" style={{ background: '#ffffff' }}>
          <h2 className="section-heading" style={{ color: '#2c3e50' }}>Why Students Love Learning With Us</h2>
          <div className="testimonial-carousel">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`testimonial-card ${index === activeTestimonial ? 'active' : ''}`}
                style={{ display: index === activeTestimonial ? 'flex' : 'none' }}
              >
                <div className="testimonial-photo">{testimonial.photo}</div>
                <div className="testimonial-content">
                  <div className="testimonial-stars" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
                    {'⭐'.repeat(testimonial.rating)}
                  </div>
                  <p className="testimonial-review" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                    "<strong>{testimonial.review.split('.')[0]}.</strong> {testimonial.review.split('.').slice(1).join('.')}"
                  </p>
                  <div className="testimonial-author">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.country}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                ></span>
              ))}
            </div>
          </div>
        </section>

        {/* Instructor Section */}
        <section className="section-container instructor-section" style={{ background: '#f8f9fa' }}>
          <h2 className="section-heading" style={{ color: '#2c3e50' }}>Learn From Experienced Chinese Language Experts</h2>
          <div className="instructor-card">
            <div className="instructor-photo">👨‍🏫</div>
            <div className="instructor-details">
              <h3>Professional Teachers Who Understand Your Goals</h3>
              <div className="instructor-stats">
                <div className="instructor-stat">
                  <i className="fa-solid fa-briefcase"></i>
                  <span>10+ Years Teaching Experience</span>
                </div>
                <div className="instructor-stat">
                  <i className="fa-solid fa-certificate"></i>
                  <span>HSK & TOCFL Certified</span>
                </div>
                <div className="instructor-stat">
                  <i className="fa-solid fa-language"></i>
                  <span>Fluent in English, Hindi & Mandarin</span>
                </div>
                <div className="instructor-stat">
                  <i className="fa-solid fa-users"></i>
                  <span>Helped 10,000+ Students Speak Chinese</span>
                </div>
              </div>
              <p className="instructor-bio">
                Learn from teachers who specialize in teaching Chinese to Indian business professionals. 
                They understand your challenges and focus on practical phrases you'll actually use in China.
              </p>
            </div>
          </div>
        </section>

        {/* Certificate Section */}
        <section className="section-container certificate-section">
          <div className="certificate-content">
            <div className="certificate-text">
              <h2>Earn a Certificate After Completing Your Course</h2>
              <p>Receive an official Certificate of Completion you can share on LinkedIn or add to your resume. Show employers and clients your commitment to learning Chinese.</p>
              <button className="btn-certificate" onClick={handleEnroll}>Start Learning Today</button>
            </div>
            <div className="certificate-mockup">
              <div className="certificate-frame">
                <div className="certificate-header">Certificate of Completion</div>
                <div className="certificate-body">
                  <p>This is to certify that</p>
                  <h3>[Your Name]</h3>
                  <p>has successfully completed</p>
                  <h4>Chinese Language Mastery Course</h4>
                  <div className="certificate-footer">
                    <span>🏆</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-container faq-section">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <h3>{faq.q}</h3>
                  <i className={`fa-solid fa-chevron-${faqOpen[index] ? 'up' : 'down'}`}></i>
                </div>
                {faqOpen[index] && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta-section">
          <div className="final-cta-content">
            <h2>Ready to Speak Chinese Confidently? 🇨🇳</h2>
            <p>Join hundreds of professionals learning practical Mandarin for business and travel. Reserve your seat before the next batch begins.</p>
            <button className="btn-final-cta" onClick={handleEnroll}>Start Learning Today</button>
          </div>
        </section>
      </div>
    </>
  );
}
