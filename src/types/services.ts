import type { LucideIcon } from "lucide-react";

export interface Service {
  path: string;
  title: string;
  icon: LucideIcon;
  description: string;
  features: string[];
  color: string;
  bgColor: string;
  hoverColor: string;
}
