import { useNavigate } from 'react-router-dom';
import SEOHead from './SEOHead';
import { siteConfig } from '../utils/seoConfig';

export default function About() {
  const navigate = useNavigate();

  // SEO Schema for About Page
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        mainEntity: {
          '@type': 'Organization',
          '@id': `${siteConfig.siteUrl}/#organization`,
          name: 'Namaste China',
          foundingDate: '2021',
          description: 'Leading India-China B2B trade facilitation company with offices in Mumbai and Guangzhou, helping Indian businesses import safely',
          numberOfEmployees: {
            '@type': 'QuantitativeValue',
            value: '25'
          },
          slogan: 'India\'s Gateway to China Business',
          knowsAbout: [
            'China Product Sourcing',
            'Import Export Services',
            'Supplier Verification',
            'Trade Consulting',
            'Canton Fair Delegation',
            'Factory Audits',
            'Customs Clearance'
          ]
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${siteConfig.siteUrl}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About Us',
            item: `${siteConfig.siteUrl}/about`
          }
        ]
      }
    ]
  };


  const handleContactClick = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const text = "Hi Namaste China, I am reviewing your trust system and would like to learn more about your company credentials and warehouse locations.";
    window.open(`https://wa.me/919370947790?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* SEO Head */}
      <SEOHead
        title="About Namaste China - India-China B2B Trade Experts Since 2021"
        description="Established 2021. Mumbai HQ + Guangzhou office. 500+ supplier audits completed. 15,000 sq ft Mumbai warehouse. 100% Canton Fair visa success rate. Expert China sourcing agents for Indian businesses."
        keywords="namaste china company, india china trade facilitator, b2b sourcing company, guangzhou office india, mumbai sourcing hub, trade delegation services"
        canonical="/about"
        schema={aboutSchema}
      />

      {/* HEADER */}
      <header className="page-header" style={{
        background: `linear-gradient(rgba(10, 61, 49, 0.92), rgba(10, 61, 49, 0.92)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <span className="gold-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>Corporate Profile & Trust Credentials</span>
        <h1>About Namaste China</h1>
        <p>Bridging the gap between Indian Buyers and Chinese Manufacturers with verified on-ground operations, warehouse hubs, and legal protections.</p>
      </header>

      {/* Trust & Company Credentials */}
      <section className="content-section">
        <div className="about-container">
          <div className="about-split-section" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="about-section-title">Who We Are</h2>
              <div className="text-block" style={{ marginBottom: '20px' }}>
                <p>
                  <strong>Namaste China</strong> is a project of <strong style={{ color: 'var(--primary-green)' }}>Vishwa Udyam Sahayata Foundation</strong>, a Mumbai-based business facilitation and trade advisory organization, active since 2021. Our primary mission is to simplify cross-border sourcing, eliminate middleman markups, and provide absolute payment and quality protection for Indian companies.
                </p>
                <br />
                <p>
                  Operating with active liaison desks in Mumbai, Guangzhou, and Foshan, we handle the entire sourcing cycle—from license screening to custom clearance—so you can import with complete peace of mind.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <a 
                  href="https://calendly.com/india-namaste1998/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary" 
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="fa-solid fa-calendar-days"></i> Schedule Meeting
                </a>
                <button className="btn-large btn-outline" onClick={handleWhatsApp} style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '6px', padding: '10px 20px' }}>
                  <i className="fa-brands fa-whatsapp" style={{ color: '#25D366', fontSize: '1.2rem' }}></i> Consult Sourcing Desk
                </button>
              </div>
            </div>

            {/* Footprint Visualizations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#fdfcf7', padding: '25px', borderRadius: '12px', border: '1px solid #e5dfd0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                <h4 style={{ color: 'var(--primary-green)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <i className="fa-solid fa-warehouse"></i> Mumbai Warehouse Hub
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.5' }}>
                  A 15,000 sq. ft. commercial logistics facility. All requested manufacturer product samples are logged here. Importers can visit to physically inspect and approve products before container shipment.
                </p>
              </div>

              <div style={{ background: '#fdfcf7', padding: '25px', borderRadius: '12px', border: '1px solid #e5dfd0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                <h4 style={{ color: 'var(--primary-green)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <i className="fa-solid fa-building-circle-check"></i> Guangzhou Audit Center
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.5' }}>
                  Located in the Liwan commercial trade district, Guangzhou. This team performs direct factory floor screenings, checks legal certifications, and drafts export agreements.
                </p>
              </div>

              <div style={{ background: '#fdfcf7', padding: '25px', borderRadius: '12px', border: '1px solid #e5dfd0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                <h4 style={{ color: 'var(--primary-green)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <i className="fa-solid fa-industry"></i> Foshan Sourcing Office
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.5' }}>
                  Located in Shunde, Foshan. Coordinates visits to furniture, ceramic tile, and building materials clusters, arranging local drivers and bilingual translators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Methodology & Process Evidence */}
      <section className="content-section alt-bg">
        <div className="about-container">
          <h2 className="about-section-title" style={{ textAlign: 'center', display: 'block', width: 'fit-content', margin: '0 auto 10px' }}>
            Trust Methodology & Evidence
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px', fontSize: '0.95rem' }}>
            How we protect your payments and verify order specifications.
          </p>

          <div className="info-grid">
            <div className="info-card" style={{ background: 'white' }}>
              <i className="fa-solid fa-clipboard-check"></i>
              <h3>1. AIC Registry Verification</h3>
              <p>We check the manufacturer's credentials in the Chinese government registration system (AIC), ensuring they are active and hold a valid export license.</p>
            </div>
            
            <div className="info-card" style={{ background: 'white' }}>
              <i className="fa-solid fa-barcode"></i>
              <h3>2. Physical Sample Logging</h3>
              <p>Requested products are shipped to Mumbai within one week. We inspect quality parameters (weight, dimensions, durability) in our local facility.</p>
            </div>
            
            <div className="info-card" style={{ background: 'white' }}>
              <i className="fa-solid fa-money-check-dollar"></i>
              <h3>3. Escrow Payment Guarantee</h3>
              <p>Importers transfer 50% advance for booking. The remaining 50% balance is paid only after the container has cleared customs and arrived in Mumbai.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION BANNER */}
      <section className="mission-banner" style={{ background: 'var(--primary-green)', margin: '60px auto', maxWidth: '1200px' }}>
        <h2>Our Core Commitment</h2>
        <p>
          "To serve as India's most transparent, legally sound gateway for importing goods from China, removing B2B payment risks and guaranteeing exact product specifications."
        </p>
      </section>
    </>
  );
}
