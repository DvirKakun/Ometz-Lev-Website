import { Calendar } from "lucide-react";
import type { Activity } from "../types/activities";
import {
  STRAPI_URL,
  createStrapiHeaders,
  getImageUrl,
  handleStrapiError,
  validateStrapiResponse,
} from "./strapi-config";

// Helper function to check if activity date has passed
function isActivityPast(activityDate: Date): boolean {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const activityDay = new Date(
    activityDate.getFullYear(),
    activityDate.getMonth(),
    activityDate.getDate()
  );
  return activityDay < today;
}

// Helper function to sort activities: future first, then past
function sortActivitiesByDate(activities: Activity[]): Activity[] {
  return activities.sort((a, b) => {
    const aIsPast = isActivityPast(a.date);
    const bIsPast = isActivityPast(b.date);

    // If one is past and other is future, future comes first
    if (aIsPast && !bIsPast) return 1;
    if (!aIsPast && bIsPast) return -1;

    // If both are future or both are past, sort by date (ascending)
    return a.date.getTime() - b.date.getTime();
  });
}

// Default styling configuration - same for all activities
const DEFAULT_ACTIVITY_STYLING = {
  icon: Calendar,
  color: "from-accent-500 to-accent-600",
  bgColor: "from-accent-50 to-accent-100",
};

interface StrapiActivity {
  id: number;
  title: string;
  description: Array<{ paragraph: string }>;
  details: {
    ages: string;
    duration: string;
    note: string;
  };
  mainImage: {
    url: string;
  };
  imageAlt: string;
  galleryImages?: Array<{ url: string }>;
  buttonText: string;
  hasRegistration: boolean;
  timerTitle: string;
  activityDate: string;
}

const mapStrapiToActivity = (strapiActivity: StrapiActivity): Activity => {
  const activityDate = new Date(strapiActivity.activityDate);
  const isPastActivity = isActivityPast(activityDate);

  return {
    id: strapiActivity.id.toString(),
    title: strapiActivity.title,
    description: strapiActivity.description.map((desc) => desc.paragraph),
    details: strapiActivity.details,
    image: getImageUrl(strapiActivity.mainImage.url),
    imageAlt: strapiActivity.imageAlt,
    images:
      strapiActivity.galleryImages?.map((img) => getImageUrl(img.url)) || [],
    buttonText: strapiActivity.buttonText,
    hasRegistration: strapiActivity.hasRegistration,
    timerTitle: strapiActivity.timerTitle,
    date: activityDate,
    isPast: isPastActivity,
    // Apply default styling to all activities
    ...DEFAULT_ACTIVITY_STYLING,
  };
};

export const fetchActivitiesFromStrapi = async (): Promise<Activity[]> => {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/activities?populate=*&sort=activityDate:asc`,
      {
        headers: createStrapiHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    validateStrapiResponse(data, "activities");

    const activities = data.data.map(mapStrapiToActivity);
    return sortActivitiesByDate(activities);
  } catch (error) {
    handleStrapiError(error, "activities");
    throw error; // Re-throw to let calling code handle the error
  }
};
