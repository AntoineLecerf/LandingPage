import { useEffect } from 'react';

/**
 * SEOHead component
 * Dynamically injects and updates document metadata, meta descriptions, OpenGraph, Twitter Cards and Schema.org JSON-LD
 */
const SEOHead = ({
  title = "Guide Gratuit 2026 : Rentabilité & Circuits Courts pour Artisans Bouchers | 1001 Goûts",
  description = "Téléchargez le livre blanc 2026 dédié aux artisans bouchers : optimisez vos marges brutes, maîtrisez vos coûts d'énergie et développez votre clientèle locale en circuits courts à 0% de commission.",
  keywords = "boucherie artisanale, artisan boucher, rentabilité boucherie, circuits courts, livre blanc boucherie, marge brute boucherie, 1001 goûts, application boucher",
  ogImage = "/guide-boucherie-cover.jpg",
  ogUrl = "https://www.1001gouts.com/bouchers",
  type = "website"
}) => {
  useEffect(() => {
    // 1. Page Title
    document.title = title;

    // Helper to create or update meta tag
    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('author', '1001 Goûts');
    setMeta('robots', 'index, follow');

    // 3. OpenGraph Tags (Facebook, LinkedIn, WhatsApp)
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', `${window.location.origin}${ogImage}`, true);
    setMeta('og:url', ogUrl || window.location.href, true);
    setMeta('og:type', type, true);
    setMeta('og:site_name', '1001 Goûts', true);
    setMeta('og:locale', 'fr_FR', true);

    // 4. Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', `${window.location.origin}${ogImage}`);

    // 5. Schema.org JSON-LD Structured Data
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "name": "1001 Goûts",
          "url": "https://www.1001gouts.com",
          "logo": `${window.location.origin}/1001GOUTS-LOGO-BLC.png`,
          "description": "L'application dédiée aux artisans de bouche et producteurs locaux sans intermédiaire."
        },
        {
          "@type": "DigitalDocument",
          "name": "Livre Blanc 2026 : Guide Complet de l'Artisan Boucher",
          "description": description,
          "image": `${window.location.origin}${ogImage}`,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
          },
          "publisher": {
            "@type": "Organization",
            "name": "1001 Goûts"
          }
        }
      ]
    };

    let script = document.getElementById('schema-jsonld-bouchers');
    if (!script) {
      script = document.createElement('script');
      script.id = 'schema-jsonld-bouchers';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData);
  }, [title, description, keywords, ogImage, ogUrl, type]);

  return null;
};

export default SEOHead;
