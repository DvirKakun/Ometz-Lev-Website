import type { LucideIcon } from "lucide-react";

export interface ValueCardProps {
  value: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  index: number;
}
