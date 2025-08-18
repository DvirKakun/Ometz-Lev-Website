export interface SubNavItem {
  to: string;
  label: string;
}

export interface NavItem {
  to?: string; // ABSOLUTE path - optional for items with submenus
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  submenu?: SubNavItem[];
}
