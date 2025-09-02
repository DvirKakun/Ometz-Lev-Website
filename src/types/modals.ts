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
}

export interface SummerCampModalFormProps {
  onSuccess: () => void;
  onError: () => void;
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
  title: string;
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
