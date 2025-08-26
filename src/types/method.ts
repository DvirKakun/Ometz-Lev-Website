import { type LucideIcon } from "lucide-react";

export interface MethodPrinciple {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface AboutConfig {
  name: string;
  description: string;
  altText?: string;
  imageSrc?: string;
}

export interface HeaderConfig {
  title: string;
  subtitle: string;
}

export interface PhilosophyConfig {
  paragraphs: string[];
}

export interface ProcessConfig {
  title: string;
  steps: ProcessStep[];
}

export interface MethodConfig {
  header: HeaderConfig;
  about: AboutConfig;
  philosophy: PhilosophyConfig;
  principles: MethodPrinciple[];
  process: ProcessConfig;
}

export interface AboutIntroProps {
  config: AboutConfig;
}

export interface MethodHeaderProps {
  config: HeaderConfig;
}

export interface MethodPhilosophyProps {
  config: PhilosophyConfig;
}

export interface MethodPrinciplesProps {
  principles: MethodPrinciple[];
}

export interface MethodSectionProps {
  config: MethodConfig;
}

export interface ProcessStepsProps {
  config: ProcessConfig;
}
