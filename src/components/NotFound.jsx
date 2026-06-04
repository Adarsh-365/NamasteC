import React from 'react';

export default function NotFound({ setCurrentPage }) {
  return (
    <>
      <header className="page-header" style={{ background: 'var(--china-red)', color: 'white', textAlign: 'center', padding: '80px 20px' }}>
        <h1><i className="fa-solid fa-triangle-exclamation"></i> Page Not Found (404)</h1>
        <p>The URL you are looking for does not exist or has been moved.</p>
      </header>

      <section className="content-section" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '20px', color: 'var(--primary-green)' }}>Looking for Namaste China Services?</h2>
          <p style={{ color: 'var(--text-grey)', marginBottom: '30px' }}>
            We've redesigned our platform to position it as India's Gateway to China Business. Let us help you find what you need.
          </p>
          <div className="cta-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button className="btn-large btn-fill" onClick={() => setCurrentPage('home')}>
              Go to Home Page
            </button>
            <button className="btn-large btn-outline" onClick={() => setCurrentPage('contact')}>
              Contact B2B Consultation Hub
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
