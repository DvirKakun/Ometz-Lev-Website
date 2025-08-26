import type {
  FAQPageType,
  PrismicFAQDocument,
  ProcessedFAQ,
} from "../types/faq";
import { FAQ_DOCUMENT_TYPES } from "../types/faq";
import {
  createPrismicClient,
  getPrismicText,
  handlePrismicError,
} from "./prismic-config";

// Process individual FAQ from Prismic data
function processFAQ(faqDoc: PrismicFAQDocument): ProcessedFAQ {
  return {
    id: faqDoc.id,
    question: getPrismicText(faqDoc.data.question),
    answer: getPrismicText(faqDoc.data.answer),
    order: faqDoc.data.order || 999, // Default high order if not specified
  };
}

// Generic function to fetch FAQs from Prismic by page type
export async function fetchFAQsFromPrismic(pageType: FAQPageType): Promise<ProcessedFAQ[]> {
  try {
    const client = createPrismicClient();
    const documentType = FAQ_DOCUMENT_TYPES[pageType];
    
    // Fetch all FAQ documents for the specific page type
    const response = await client.getAllByType(documentType, {
      orderings: [
        { field: 'my.' + documentType + '.order', direction: 'asc' }
      ]
    });
    
    if (!response || response.length === 0) {
      console.warn(`No FAQ documents found for page type: ${pageType}`);
      return [];
    }
    
    // Process all FAQ documents
    const faqs = response.map((doc) => processFAQ(doc as PrismicFAQDocument));
    
    // Sort by order field as a backup (should already be sorted by Prismic query)
    return faqs.sort((a, b) => a.order - b.order);
  } catch (error) {
    handlePrismicError(error, `${pageType} FAQs`);
    
    // Return empty array on error
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
      description: "מצאו תשובות לשאלות הנפוצות ביותר על השירותים הטיפוליים שלנו"
    },
    training: {
      title: "שאלות נפוצות על אילוף כלבים",
      description: "כל מה שרציתם לדעת על שירותי האילוף וההדרכה המקצועיים שלנו"
    },
    activities: {
      title: "שאלות נפוצות על הפעילויות",
      description: "מידע מפורט על הפעילויות, הקייטנות והסדנאות שאנו מציעים"
    },
    schools: {
      title: "שאלות נפוצות על סדנאות בבתי ספר",
      description: "מידע עבור מורים ומנהלים על הסדנאות החינוכיות המקצועיים שלנו"
    }
  };
  
  return configs[pageType];
};