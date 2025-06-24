export interface NavItem {
  to: string; // ABSOLUTE path
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}
