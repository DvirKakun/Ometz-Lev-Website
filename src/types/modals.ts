import type { LucideIcon } from "lucide-react";

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ContactModalFormProps {
  onSuccess: () => void;
  onError: () => void;
}

export interface SummerCampModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activityData?: {
    sessions: number;
    title: string;
    registerFormTitle: string;
    registerFormMessage: React.ReactNode;
  };
}

export interface SummerCampModalFormProps {
  onSuccess: () => void;
  onError: () => void;
  activityData?: {
    sessions: number;
    title: string;
    registerFormTitle: string;
    registerFormMessage: React.ReactNode;
  };
}

export interface ModalErrorProps {
  message: string;
  className?: string;
}

export interface ModalHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  iconSize?: "sm" | "md" | "lg";
  titleSize?: "text-lg" | "text-xl";
  subtitleSize?: "text-xs" | "text-sm";
  marginBottom?: string;
  className?: string;
}

export interface ModalSuccessProps {
  content?: string | React.ReactNode;
  iconMarginBottom?: "mb-1" | "mb-3";
  contentAlignment?: "text-center" | "text-right";
  icon?: LucideIcon;
  className?: string;
}

export interface VideoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: string | null;
  pageType?: "training" | "therapy";
}

export interface ArticleModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  articleId: string | null;
  pageType?: "training" | "therapy";
}

export interface OfferingModalProps {
  offering: import("./service_offerings").ProcessedFullOffering | null;
  isOpen: boolean;
  onClose: () => void;
}
