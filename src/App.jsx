import React, { useState, useEffect } from 'react';
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
  const [currentPage, setCurrentPage] = useState('home');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  // Handle URL changes or basic url-based routing recovery
  useEffect(() => {
    const handleHashAndPath = () => {
      const path = window.location.pathname;
      if (path.includes('canton-fair') || path.includes('cantonfair')) {
        setCurrentPage('cantonfair');
      } else if (path.includes('about')) {
        setCurrentPage('about');
      } else if (path.includes('membership')) {
        setCurrentPage('membership');
      } else if (path.includes('contact')) {
        setCurrentPage('contact');
      } else if (path.includes('sourcing')) {
        setCurrentPage('sourcing');
      } else if (path.includes('verification') || path.includes('audit')) {
        setCurrentPage('verification');
      } else if (path.includes('factory-visits') || path.includes('factory-tour')) {
        setCurrentPage('factoryvisits');
      } else if (path.includes('import-assistance') || path.includes('logistics')) {
        setCurrentPage('importassistance');
      } else if (path.includes('trade-consulting') || path.includes('consulting')) {
        setCurrentPage('tradeconsulting');
      } else if (path.includes('login')) {
        setCurrentPage('login');
      } else if (path.includes('signup')) {
        setCurrentPage('signup');
      } else if (path.includes('index.html')) {
        setCurrentPage('home');
        window.history.replaceState({}, '', '/');
      }
    };
    
    handleHashAndPath();
    window.addEventListener('popstate', handleHashAndPath);
    return () => window.removeEventListener('popstate', handleHashAndPath);
  }, []);

  // SEO Optimizer: Dynamically update header titles & descriptions on route state change
  useEffect(() => {
    let title = "Namaste China - India's Gateway to China Business";
    let description = "Namaste China is India's premier B2B trade gateway. Join Canton Fair 2026 delegations, verify Chinese suppliers, schedule factory visits, and simplify customs compliance.";
    
    switch (currentPage) {
      case 'home':
        title = "Namaste China - India's Gateway to China Business | B2B Sourcing";
        description = "Source bulk products directly from verified Chinese factories. Secure local sample inspections at our Mumbai warehouse, and manage customs compliance.";
        break;
      case 'about':
        title = "About Us - Global Operating Footprint | Namaste China";
        description = "Bridges the gap between Indian buyers and Chinese manufacturers with active footprints in Mumbai, Guangzhou, and Foshan.";
        break;
      case 'membership':
        title = "China Trade Sourcing Membership Plans | Namaste China";
        description = "Outcome-led China sourcing packages tailored for Indian MSMEs and Enterprise industries. Verify suppliers and secure factory visit allowances.";
        break;
      case 'cantonfair':
        title = "Canton Fair 2026 Delegation from India - Guangzhou | Namaste China";
        description = "Join India's leading Canton Fair 2026 delegation. Complete itineraries, visa coordination, 5-star hotel bookings, and Indian catering.";
        break;
      case 'contact':
        title = "B2B Consultation Hub - Contact Namaste China";
        description = "Get pre-transaction trade advice, schedule supplier validation audits, or coordinate factory tours with our Mumbai and Guangzhou offices.";
        break;
      case 'sourcing':
        title = "China Product Sourcing & Sample Inspection | Namaste China";
        description = "Order product samples and inspect them locally in India. Sourcing specialists screen Chinese manufacturers under strict MoU terms.";
        break;
      case 'verification':
        title = "Chinese Supplier Verification & On-Site Audits | Namaste China";
        description = "Avoid payment scams. Book registration reviews and full physical factory audits conducted by our local Guangzhou auditors.";
        break;
      case 'factoryvisits':
        title = "China Factory Visits & Translator Services | Namaste China";
        description = "Arrange business travel to Guangzhou, Foshan, or Shenzhen. Secure invitation letters and hire bilingual English-Chinese interpreters.";
        break;
      case 'importassistance':
        title = "Customs Clearance & Container Logistics | Namaste China";
        description = "Classify HS Codes, estimate customs tariffs, manage import paperwork, and coordinate sea (FCL/LCL) and air freight cargo transport.";
        break;
      case 'tradeconsulting':
        title = "China Trade Advisory & Landed Cost Consulting | Namaste China";
        description = "Analyze trade risks, draft legally sound bilateral purchase contracts, and determine complete landed pricing to India.";
        break;
      case 'login':
        title = "Log In - Namaste China B2B Platform";
        break;
      case 'signup':
        title = "Join Free - Namaste China B2B Platform";
        break;
      case 'notfound':
        title = "404 Page Not Found - Namaste China";
        break;
      default:
        title = "Namaste China - India's Gateway to China Business";
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
    let relativePath = currentPage === 'home' ? '' : currentPage;
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://www.namastechina.org/${relativePath}`);
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'membership':
        return <Membership setCurrentPage={setCurrentPage} />;
      case 'cantonfair':
        return <CantonFair setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <Contact setCurrentPage={setCurrentPage} />;
      case 'sourcing':
        return <Sourcing setCurrentPage={setCurrentPage} />;
      case 'verification':
        return <Verification setCurrentPage={setCurrentPage} />;
      case 'factoryvisits':
        return <FactoryVisits setCurrentPage={setCurrentPage} />;
      case 'importassistance':
        return <ImportAssistance setCurrentPage={setCurrentPage} />;
      case 'tradeconsulting':
        return <TradeConsulting setCurrentPage={setCurrentPage} />;
      case 'login':
        return (
          <Login 
            setCurrentPage={setCurrentPage} 
            setUsername={setUsername} 
            setRole={setRole} 
          />
        );
      case 'signup':
        return (
          <SignUp 
            setCurrentPage={setCurrentPage} 
            setUsername={setUsername} 
            setRole={setRole} 
          />
        );
      case 'merchant':
        if (role === 'merchant') {
          return <Merchant username={username} />;
        }
        return <Home setCurrentPage={setCurrentPage} />;
      case 'notfound':
        return <NotFound setCurrentPage={setCurrentPage} />;
      default:
        return <NotFound setCurrentPage={setCurrentPage} />;
    }
  };

  const handleGlobalWhatsApp = () => {
    const text = "Hi Namaste China, I am inquiring about India-China B2B trade services (Sourcing, Supplier Verification, Canton Fair). Let's connect.";
    window.open(`https://wa.me/919370947790?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container">
        {renderPage()}
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

      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
