import { Calendar } from "lucide-react";
import type { Activity } from "../types/activities";

// Default styling configuration - same for all activities
const DEFAULT_ACTIVITY_STYLING = {
  icon: Calendar,
  color: "from-accent-500 to-accent-600",
  bgColor: "from-accent-50 to-accent-100",
};

interface StrapiActivity {
  id: number;
  activityId: string;
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
  console.log(strapiActivity);
  return {
    id: strapiActivity.activityId,
    title: strapiActivity.title,
    description: strapiActivity.description.map((desc) => desc.paragraph),
    details: strapiActivity.details,
    image: `${import.meta.env.VITE_STRAPI_URL || "http://localhost:1337"}${
      strapiActivity.mainImage.url
    }`,
    imageAlt: strapiActivity.imageAlt,
    images:
      strapiActivity.galleryImages?.map(
        (img) =>
          `${import.meta.env.VITE_STRAPI_URL || "http://localhost:1337"}${
            img.url
          }`
      ) || [],
    buttonText: strapiActivity.buttonText,
    hasRegistration: strapiActivity.hasRegistration,
    timerTitle: strapiActivity.timerTitle,
    date: new Date(strapiActivity.activityDate),
    // Apply default styling to all activities
    ...DEFAULT_ACTIVITY_STYLING,
  };
};

export const fetchActivitiesFromStrapi = async (): Promise<Activity[]> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_STRAPI_URL || "http://localhost:1337"
      }/api/activities?populate=*&sort=activityDate:asc`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid data format from Strapi");
    }

    return data.data.map(mapStrapiToActivity);
  } catch (error) {
    console.error("Error fetching activities from Strapi:", error);
    throw error; // Re-throw to let calling code handle the error
  }
};
