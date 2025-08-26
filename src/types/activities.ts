import type { LucideIcon } from "lucide-react";
import type { ImageField } from "@prismicio/types";

// Prismic gallery image structure
export interface PrismicGalleryImage {
  image: ImageField;
}

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
  main_image: ImageField;
  images?: PrismicGalleryImage[];
  icon: LucideIcon;
  buttonText: string;
  hasRegistration: boolean;
  timerTitle: string;
  date: Date;
  isPast?: boolean;
}

export interface ActivitySectionProps {
  activity: Activity;
  onRegisterClick?: () => void;
}
