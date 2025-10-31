import type { LucideIcon } from "lucide-react";
import type { ImageField } from "@prismicio/types";

// Activity status enum for priority-based sorting and component logic
export type ActivityStatus = 
  | "registerable"  // Priority 0: Can register + has countdown
  | "in_progress"   // Priority 1: Currently active
  | "coming_soon"   // Priority 2: Special "בקרוב" status
  | "past";         // Priority 3: Activity ended

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
  date: Date; // Keep for backward compatibility with timer
  startDate: Date;
  endDate: Date;
  sessions: number; // 1-4
  registerFormTitle: string;
  registerFormMessage: React.ReactNode;
  status: ActivityStatus;
}

export interface ActivitySectionProps {
  activity: Activity;
  onRegisterClick?: () => void;
  onImageClick?: (imageUrl: string, index: number, alt: string, totalImages: number) => void;
}
