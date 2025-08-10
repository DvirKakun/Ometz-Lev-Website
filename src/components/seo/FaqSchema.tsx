import { useEffect } from "react";
import { getFAQsByPageType } from "../../data/faq";
import type { FAQPageType } from "../../types/faq";

type Props = { pageType: FAQPageType };

export default function FaqSchema({ pageType }: Props) {
  const items = getFAQsByPageType(pageType);

  useEffect(() => {
    if (!items || items.length === 0) return;

    // Create JSON-LD schema for FAQ
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": items.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    // Create script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    script.id = `faq-schema-${pageType}`;

    // Add to document head
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const existingScript = document.getElementById(`faq-schema-${pageType}`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [items, pageType]);

  // This component doesn't render anything visible
  return null;
}