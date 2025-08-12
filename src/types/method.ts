import { type LucideIcon } from "lucide-react";
import type { Service } from "./services";

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
  service: Service;
}

export interface MethodHeaderProps {
  config: HeaderConfig;
  service: Service;
}

export interface MethodPhilosophyProps {
  config: PhilosophyConfig;
  service: Service;
}

export interface MethodPrinciplesProps {
  principles: MethodPrinciple[];
  service: Service;
}

export interface MethodSectionProps {
  config: MethodConfig;
  service: Service;
}

export interface ProcessStepsProps {
  config: ProcessConfig;
  service: Service;
}
