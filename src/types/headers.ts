import type { LucideIcon } from "lucide-react";
import type { LibraryPageConfig } from "./library";

export interface HeaderCTAButtonsProps {
  isMobile?: boolean;
}

export interface HeaderMobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export interface HeaderNavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface LibraryHeaderProps {
  config: LibraryPageConfig;
}

export interface ServiceHeaderProps {
  title: string;
  description?: string;
}
