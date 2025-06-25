import type { LucideIcon } from "lucide-react";

export interface ActivityDetails {
  ages: string;
  duration: string;
  note: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string[];
  details: ActivityDetails;
  image: string;
  imageAlt: string;
  images?: string[];
  icon: LucideIcon;
  color: string;
  bgColor: string;
  buttonText: string;
  hasRegistration: boolean;
}

export interface ActivitySectionProps {
  activity: Activity;
  onRegisterClick?: () => void;
}