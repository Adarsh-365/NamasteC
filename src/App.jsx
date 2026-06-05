import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Membership from './components/Membership';
import CantonFair from './components/CantonFair';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Merchant from './components/Merchant';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

// Import newly created B2B Service pages
import Sourcing from './components/Sourcing';
import Verification from './components/Verification';
import FactoryVisits from './components/FactoryVisits';
import ImportAssistance from './components/ImportAssistance';
import TradeConsulting from './components/TradeConsulting';

import './index.css';

function App() {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  // SEO Optimizer: Dynamically update header titles & descriptions on route change
  useEffect(() => {
    let title = "Namaste China - India's Gateway to China Business";
    let description = "Namaste China is India's premier B2B trade gateway. Join Canton Fair 2026 delegations, verify Chinese suppliers, schedule factory visits, and simplify customs compliance.";
    
    const path = location.pathname;
    
    if (path === '/' || path === '/home') {
      title = "Namaste China - India's Gateway to China Business | B2B Sourcing";
      description = "Source bulk products directly from verified Chinese factories. Secure local sample inspections at our Mumbai warehouse, and manage customs compliance.";
    } else if (path === '/about') {
      title = "About Us - Global Operating Footprint | Namaste China";
      description = "Bridges the gap between Indian buyers and Chinese manufacturers with active footprints in Mumbai, Guangzhou, and Foshan.";
    } else if (path === '/membership') {
      title = "China Trade Sourcing Membership Plans | Namaste China";
      description = "Outcome-led China sourcing packages tailored for Indian MSMEs and Enterprise industries. Verify suppliers and secure factory visit allowances.";
    } else if (path === '/canton-fair') {
      title = "Canton Fair 2026 Delegation from India - Guangzhou | Namaste China";
      description = "Join India's leading Canton Fair 2026 delegation. Complete itineraries, visa coordination, 5-star hotel bookings, and Indian catering.";
    } else if (path === '/contact') {
      title = "B2B Consultation Hub - Contact Namaste China";
      description = "Get pre-transaction trade advice, schedule supplier validation audits, or coordinate factory tours with our Mumbai and Guangzhou offices.";
    } else if (path === '/sourcing') {
      title = "China Product Sourcing & Sample Inspection | Namaste China";
      description = "Order product samples and inspect them locally in India. Sourcing specialists screen Chinese manufacturers under strict MoU terms.";
    } else if (path === '/verification') {
      title = "Chinese Supplier Verification & On-Site Audits | Namaste China";
      description = "Avoid payment scams. Book registration reviews and full physical factory audits conducted by our local Guangzhou auditors.";
    } else if (path === '/factory-visits') {
      title = "China Factory Visits & Translator Services | Namaste China";
      description = "Arrange business travel to Guangzhou, Foshan, or Shenzhen. Secure invitation letters and hire bilingual English-Chinese interpreters.";
    } else if (path === '/import-assistance') {
      title = "Customs Clearance & Container Logistics | Namaste China";
      description = "Classify HS Codes, estimate customs tariffs, manage import paperwork, and coordinate sea (FCL/LCL) and air freight cargo transport.";
    } else if (path === '/trade-consulting') {
      title = "China Trade Advisory & Landed Cost Consulting | Namaste China";
      description = "Analyze trade risks, draft legally sound bilateral purchase contracts, and determine complete landed pricing to India.";
    } else if (path === '/login') {
      title = "Log In - Namaste China B2B Platform";
    } else if (path === '/signup') {
      title = "Join Free - Namaste China B2B Platform";
    }
    
    document.title = title;
    
    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }
    
    // Update Canonical URL link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const canonicalPath = path === '/' ? '' : path.substring(1);
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://www.namastechina.org/${canonicalPath}`);
    }

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleGlobalWhatsApp = () => {
    const text = "Hi Namaste China, I am inquiring about India-China B2B trade services (Sourcing, Supplier Verification, Canton Fair). Let's connect.";
    window.open(`https://wa.me/919370947790?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/canton-fair" element={<CantonFair />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sourcing" element={<Sourcing />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/factory-visits" element={<FactoryVisits />} />
          <Route path="/import-assistance" element={<ImportAssistance />} />
          <Route path="/trade-consulting" element={<TradeConsulting />} />
          <Route 
            path="/login" 
            element={
              <Login 
                setUsername={setUsername} 
                setRole={setRole} 
              />
            } 
          />
          <Route 
            path="/signup" 
            element={
              <SignUp 
                setUsername={setUsername} 
                setRole={setRole} 
              />
            } 
          />
          <Route 
            path="/merchant" 
            element={
              role === 'merchant' ? (
                <Merchant username={username} />
              ) : (
                <Home />
              )
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {/* Floating WhatsApp Action Button for B2B Sourcing Journey */}
      <div 
        className="whatsapp-float" 
        onClick={handleGlobalWhatsApp} 
        title="Chat with Trade Desk"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </div>
      <div className="whatsapp-float-text">WhatsApp Trade Desk</div>

      <Footer />
    </>
  );
}

export default App;
