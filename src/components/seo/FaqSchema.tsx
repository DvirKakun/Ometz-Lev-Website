import { useFAQItems } from "../../hooks/useFAQ";
import type { FAQPageType } from "../../types/faq";

type Props = { pageType: FAQPageType };

export default function FaqSchema({ pageType }: Props) {
  const { data: items, isLoading } = useFAQItems(pageType);

  if (isLoading || !items || items.length === 0) return null;

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
