import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string;
}

export default function SEO({ 
  title, 
  description, 
  canonical = 'https://drivetaxi.co.uk',
  ogImage = 'https://drivetaxi.co.uk/og-image.jpg',
  keywords = 'St Andrews taxi, airport transfer, taxi service Fife'
}: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    const metaTags = {
      'description': description,
      'keywords': keywords,
      'og:title': title,
      'og:description': description,
      'og:url': canonical,
      'og:image': ogImage,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      const isOg = name.startsWith('og:');
      const isTwitter = name.startsWith('twitter:');
      
      let selector: string;
      if (isOg) {
        selector = `meta[property="${name}"]`;
      } else if (isTwitter) {
        selector = `meta[name="${name}"]`;
      } else {
        selector = `meta[name="${name}"]`;
      }
      
      const meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (meta) {
        meta.content = content;
      }
    });

    // Update canonical link
    const canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalLink) {
      canonicalLink.href = canonical;
    }
  }, [title, description, canonical, ogImage, keywords]);

  return null;
}
