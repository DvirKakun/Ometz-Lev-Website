import type { FAQPageType, ProcessedFAQ } from "../types/faq";
import { FAQ_DOCUMENT_TYPES } from "../types/faq";
import {
  createPrismicClient,
  getPrismicText,
  handlePrismicError,
} from "./prismic-config";

// Process individual FAQ item from group
function processFAQItem(
  faqItem: any,
  index: number,
  docId: string
): ProcessedFAQ {
  return {
    id: `${docId}-faq-${index}`,
    question: getPrismicText(faqItem.question),
    answer: getPrismicText(faqItem.answer),
    order: faqItem.order || index + 1,
  };
}

// Generic function to fetch FAQs from Prismic by page type
export async function fetchFAQsFromPrismic(
  pageType: FAQPageType
): Promise<ProcessedFAQ[]> {
  try {
    const client = createPrismicClient();
    const documentType = FAQ_DOCUMENT_TYPES[pageType];

    // Get the single FAQ document for the page type
    const document = await client.getSingle(documentType);

    if (!document.data.faq || !Array.isArray(document.data.faq)) {
      return [];
    }

    // Process all FAQ items from the group
    const faqs = document.data.faq.map((faqItem, index) =>
      processFAQItem(faqItem, index, document.id)
    );

    // Sort by order field
    return faqs.sort((a, b) => a.order - b.order);
  } catch (error) {
    handlePrismicError(error, `${pageType} FAQs`);
    return [];
  }
}

// Specific fetch functions for each page type
export const fetchTherapyFAQs = () => fetchFAQsFromPrismic("therapy");
export const fetchTrainingFAQs = () => fetchFAQsFromPrismic("training");
export const fetchActivitiesFAQs = () => fetchFAQsFromPrismic("activities");
export const fetchSchoolsFAQs = () => fetchFAQsFromPrismic("schools");

// Helper function to get FAQ section configuration by page type
export const getFAQSectionConfig = (pageType: FAQPageType) => {
  const configs = {
    therapy: {
      title: "שאלות נפוצות על טיפול בעזרת כלבים",
      description:
        "מצאו תשובות לשאלות הנפוצות ביותר על השירותים הטיפוליים שלנו",
    },
    training: {
      title: "שאלות נפוצות על אילוף כלבים",
      description: "כל מה שרציתם לדעת על שירותי האילוף וההדרכה המקצועיים שלנו",
    },
    activities: {
      title: "שאלות נפוצות על הפעילויות",
      description: "מידע מפורט על הפעילויות, הקייטנות והסדנאות שאנו מציעים",
    },
    schools: {
      title: "שאלות נפוצות על סדנאות בבתי ספר",
      description:
        "מידע עבור מורים ומנהלים על הסדנאות החינוכיות המקצועיים שלנו",
    },
  };

  return configs[pageType];
};
