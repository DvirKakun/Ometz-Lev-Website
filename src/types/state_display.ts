import type { LucideIcon } from "lucide-react";

export interface StateDisplayProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconClassName?: string;
  showAction?: boolean;
  actionText?: string;
  onAction?: () => void;
  actionVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}
