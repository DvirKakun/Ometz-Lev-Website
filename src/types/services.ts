import type { LucideIcon } from "lucide-react";

export interface Feature {
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
  color: string;
  bgColor: string;
  hoverColor: string;
  features: Feature[];
  cta: CtaItem[];
}

export interface ServiceCardProps {
  service: Service;
  index: number;
}
