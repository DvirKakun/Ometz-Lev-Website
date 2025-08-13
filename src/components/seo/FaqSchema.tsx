import { getFAQsByPageType } from "../../data/faq";
import type { FAQPageType } from "../../types/faq";

type Props = { pageType: FAQPageType };

export default function FaqSchema({ pageType }: Props) {
  const items = getFAQsByPageType(pageType);

  if (!items || items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
