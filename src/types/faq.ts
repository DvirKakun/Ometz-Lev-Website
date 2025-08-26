import type { Service } from './services';
import type { RichTextField } from '@prismicio/types';

export type FAQPageType = 'therapy' | 'training' | 'activities' | 'schools';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order?: number;
}

export interface FAQSectionProps {
  pageType: FAQPageType;
  service?: Service;
  className?: string;
}

export interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export interface FAQHeaderProps {
  title: string;
  description: string;
  service?: Service;
  className?: string;
}

// Prismic FAQ types based on the structure provided
export interface PrismicFAQFields {
  question: RichTextField;
  answer: RichTextField;
  order: number;
}

export interface PrismicFAQDocument {
  id: string;
  uid: string | null;
  url: string | null;
  type: string;
  href: string;
  tags: string[];
  first_publication_date: string;
  last_publication_date: string;
  slugs: string[];
  linked_documents: unknown[];
  lang: string;
  alternate_languages: unknown[];
  data: PrismicFAQFields;
}

export interface ProcessedFAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

// Configuration for FAQ document types in Prismic
export const FAQ_DOCUMENT_TYPES = {
  therapy: 'faq-therapy',
  training: 'faq-training',
  activities: 'faq-activities',
  schools: 'faq-schools',
} as const;