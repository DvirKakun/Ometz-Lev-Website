import type { Service } from "./services";

export interface CollapsibleFeaturesProps {
  service: Service;
}

export interface CtaButtonsProps {
  service: Service;
  scrollToSection: (href: string) => void;
}

export interface FeaturesAccordionProps {
  service: Service;
}
