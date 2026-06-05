import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { siteConfig } from '../utils/seoConfig';

/**
 * SEOHead Component - Comprehensive SEO optimization for all pages
 * Supports Google, Bing, ChatGPT Search, Perplexity, Gemini
 * 
 * @param {Object} props
 * @param {string} props.title - Page title (50-60 chars optimal)
 * @param {string} props.description - Meta description (150-160 chars optimal)
 * @param {string} props.keywords - Comma-separated keywords
 * @param {string} props.canonical - Canonical URL path
 * @param {string} props.ogType - Open Graph type (website, article, product, etc.)
 * @param {string} props.ogImage - Open Graph image URL
 * @param {Object} props.schema - Additional JSON-LD structured data
 */
export default function SEOHead({
  title,
  description,
  keywords = '',
  canonical = '',
  ogType = 'website',
  ogImage = `${siteConfig.siteUrl}/og-image.jpg`,
  schema = null
}) {
  const fullTitle = title || siteConfig.defaultTitle;
  const fullDescription = description || siteConfig.defaultDescription;
  const canonicalUrl = `${siteConfig.siteUrl}${canonical}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
      {siteConfig.twitterHandle && (
        <meta name="twitter:site" content={siteConfig.twitterHandle} />
      )}
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Language and Region */}
      <meta httpEquiv="content-language" content="en-IN" />
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Mumbai" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* AI Search Optimization */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="subject" content="China Import and Sourcing Services" />
      <meta name="classification" content="Business Services, Import Export, Trade" />
      
      {/* Structured Data - JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

SEOHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  canonical: PropTypes.string,
  ogType: PropTypes.string,
  ogImage: PropTypes.string,
  schema: PropTypes.object
};
