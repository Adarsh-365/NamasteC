// SEO Configuration for Namaste China
// Centralized SEO metadata for all pages

export const siteConfig = {
  siteName: 'Namaste China',
  siteUrl: 'https://www.namastechina.org',
  defaultTitle: 'Namaste China - China Product Sourcing & Import Services India',
  defaultDescription: 'India\'s leading China sourcing agent. Canton Fair delegation, supplier verification, factory audits, and import logistics from Guangzhou to Mumbai. Trusted by 500+ Indian importers.',
  twitterHandle: '@NamasteChina',
  fbAppId: '',
  organizationName: 'Namaste China',
  foundingDate: '2021',
  logo: 'https://www.namastechina.org/images/logo.png',
  phone: '+91-9370947790',
  email: 'india.namaste1998@gmail.com',
  address: {
    street: 'Office No. 123, First Floor, Mahaveer Market',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    postalCode: '400703',
    country: 'India'
  },
  chinaOffice: {
    street: 'Xianghai International Financial Center, No. 7 Jin Yuan Road',
    city: 'Foshan',
    state: 'Guangdong',
    country: 'China'
  },
  social: {
    facebook: 'https://www.facebook.com/namastechina',
    linkedin: 'https://www.linkedin.com/company/namaste-china',
    youtube: 'https://www.youtube.com/@namastechina',
    whatsapp: 'https://wa.me/919370947790'
  }
};

// Page-specific SEO configurations
export const pageConfig = {
  home: {
    title: 'China Product Sourcing & Import Services India | Namaste China',
    description: 'Source directly from verified Chinese manufacturers. Canton Fair 2026 delegation, supplier verification, Mumbai warehouse inspection. 500+ Indian businesses trust us for China imports.',
    keywords: 'china product sourcing india, import from china, china sourcing agent, supplier verification, canton fair india, guangzhou sourcing',
    canonical: '/',
    ogType: 'website'
  },
  about: {
    title: 'About Us - India-China B2B Trade Experts | Namaste China',
    description: 'Established 2021. Mumbai & Guangzhou offices. 500+ verified supplier audits. Expert China sourcing agents helping Indian businesses import safely with warehouse verification.',

    keywords: 'namaste china company, india china trade, b2b sourcing company, guangzhou office india, mumbai sourcing hub',
    canonical: '/about',
    ogType: 'website'
  },
  membership: {
    title: 'China Sourcing Membership Plans for Indian Businesses | Namaste China',
    description: 'MSME & Enterprise sourcing memberships. Factory visit allowances, supplier audits, Mumbai sample warehouse access. Secure your China supply chain with annual plans.',
    keywords: 'china sourcing membership, factory visit package, supplier audit service, b2b membership india, sourcing plan',
    canonical: '/membership',
    ogType: 'product'
  },
  cantonFair: {
    title: 'Canton Fair 2026 Delegation from India - Guangzhou Trade Fair | Namaste China',
    description: 'Join India\'s premier Canton Fair 2026 delegation. April & May phases. Visa support, 4-star hotels, interpreters, airport transfers. 100% visa success rate since 2021.',
    keywords: 'canton fair 2026 india, guangzhou trade fair, canton fair delegation, china trade exhibition, business visa china',
    canonical: '/canton-fair',
    ogType: 'event'
  },
  contact: {
    title: 'Contact Us - Mumbai & Guangzhou Offices | Namaste China',
    description: 'Get sourcing quotes within 24hrs. Mumbai HQ: Vashi, Navi Mumbai. China Office: Foshan, Guangdong. WhatsApp: +91-9370947790. Email: india.namaste1998@gmail.com',
    keywords: 'contact china sourcing agent, mumbai sourcing office, guangzhou trade office, sourcing consultation',
    canonical: '/contact',
    ogType: 'website'
  },
  sourcing: {
    title: 'China Product Sourcing & Sample Inspection Mumbai | Namaste China',
    description: 'Source products from verified Chinese factories. Physical sample inspection at Mumbai warehouse. Direct manufacturer pricing. AIC-verified suppliers only.',
    keywords: 'china product sourcing, sample inspection mumbai, factory sourcing guangzhou, product procurement china',
    canonical: '/sourcing',
    ogType: 'service'
  },
  verification: {
    title: 'Chinese Supplier Verification & Factory Audit Services | Namaste China',
    description: 'Avoid payment scams. AIC registry checks ₹2,500. On-site factory audits ₹7,500. Guangzhou-based auditors. Physical inspection with video documentation.',
    keywords: 'supplier verification china, factory audit guangzhou, AIC registry check, chinese supplier background check',

    canonical: '/verification',
    ogType: 'service'
  },
  factoryVisits: {
    title: 'China Factory Visits & Business Travel Coordination | Namaste China',
    description: 'Organized factory tours to Guangzhou, Foshan, Shenzhen, Yiwu. Business visa invitations, interpreters, hotel bookings, local transport coordination.',
    keywords: 'china factory visit, guangzhou business tour, factory inspection trip, foshan sourcing tour, trade interpreter',
    canonical: '/factory-visits',
    ogType: 'service'
  },
  importAssistance: {
    title: 'China Import Logistics & Customs Clearance India | Namaste China',
    description: 'End-to-end import logistics. HS Code classification, BIS compliance, container booking (FCL/LCL), customs clearance Mumbai/JNPT, door-to-door delivery.',
    keywords: 'china import logistics, customs clearance mumbai, FCL LCL shipping, HS code classification, import compliance india',
    canonical: '/import-assistance',
    ogType: 'service'
  },
  tradeConsulting: {
    title: 'China Trade Advisory & Business Consulting Services | Namaste China',
    description: 'Expert trade consulting. Landed cost calculation, risk assessment, bilateral contract drafting, dispute resolution. Mumbai & Guangzhou advisors.',
    keywords: 'china trade consulting, import advisory india, trade risk assessment, bilateral contract china india',
    canonical: '/trade-consulting',
    ogType: 'service'
  }
};

// Generate structured data for Organization
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.siteUrl}/#organization`,
  name: siteConfig.organizationName,
  url: siteConfig.siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: siteConfig.logo
  },
  foundingDate: siteConfig.foundingDate,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'customer service',
      areaServed: ['IN', 'CN'],
      availableLanguage: ['English', 'Hindi', 'Chinese']
    }
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country
  },
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.linkedin,
    siteConfig.social.youtube
  ]
});
