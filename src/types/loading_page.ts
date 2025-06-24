import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface LoadingBackgroundProps {
  children: ReactNode;
  bgColor: string;
  color: string;
}

export interface LoadingCardProps {
  children: ReactNode;
}

export interface LoadingContentProps {
  title: string;
  color: string;
}

export interface LoadingProgressProps {
  color: string;
}

export interface LoadingSpinnerProps {
  color: string;
  icon: LucideIcon;
}
