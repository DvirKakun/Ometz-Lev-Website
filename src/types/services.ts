import type { LucideIcon } from "lucide-react";
import type {
  ProcessedFullOffering,
  ProcessedSimpleOffering,
} from "./service_offerings";

export interface Offering {
  title: string;
  description: string;
  whatsappMessage: string;
  ctaTitle: string;
}

export interface CtaItem {
  text: string;
  icon: LucideIcon;
  href: string;
}

export interface Service {
  path: string;
  title: string;
  description: string;
  icon: LucideIcon;
  offerings: (ProcessedFullOffering | ProcessedSimpleOffering)[];
  cta: CtaItem[];
}

export interface ServiceCardProps {
  service: Service;
  index: number;
}
