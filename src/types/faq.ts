import type { Service } from './services';

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