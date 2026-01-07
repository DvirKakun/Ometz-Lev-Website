import type { LucideIcon } from "lucide-react";
import type { LibraryPageConfig } from "./library";

export interface HeaderCTAButtonsProps {
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
  authDialogOpen?: boolean;
  setAuthDialogOpen?: (open: boolean) => void;
  userMenuOpen?: boolean;
  setUserMenuOpen?: (open: boolean) => void;
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
}

export interface LibraryHeaderProps {
  config: LibraryPageConfig;
}

export interface ServiceHeaderProps {
  title: string;
  description?: string;
}
