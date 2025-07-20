import { Calendar } from "lucide-react";
import type { Activity } from "../types/activities";
import type { PrismicDocument } from "@prismicio/client";
import {
  createPrismicClient,
  getPrismicImageUrl,
  getPrismicText,
  getPrismicTitle,
  getPrismicDate,
  handlePrismicError,
  getPrismicRichText,
} from "./prismic-config";

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

// Type for the complete Prismic document with any data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismicActivity = PrismicDocument<Record<string, any>>;

const mapPrismicToActivity = (prismicActivity: PrismicActivity): Activity => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = prismicActivity.data as any;

  const activityDate = getPrismicDate(data.activity_date);
  const isPastActivity = isActivityPast(activityDate);

  // Extract details (taking first item from group, or create default)
  const rawDetails = data.details?.[0] || {};
  const details = {
    ages: getPrismicText(rawDetails.ages) || "",
    duration: getPrismicText(rawDetails.duration) || "",
    note: getPrismicText(rawDetails.note) || "",
  };

  // Process each field safely
  const title = getPrismicTitle(data.title);
  const description =
    data.description
      ?.map((desc: any) => {
        // eslint-disable-line @typescript-eslint/no-explicit-any
        const text = getPrismicRichText(desc.paragraph);
        return String(text || ""); // Force string conversion
      })
      .filter((text: string) => text.length > 0) || [];

  const imageAlt = getPrismicText(data.image_alt);
  const buttonText = getPrismicText(data.button_text);
  const timerTitle = getPrismicText(data.timer_title);

  return {
    id: String(prismicActivity.id),
    title: String(title || "Activity"),
    description: description.map((d: any) => String(d)), // Force all to strings
    details: {
      ages: String(details.ages),
      duration: String(details.duration),
      note: String(details.note),
    },
    image: getPrismicImageUrl(data.main_image) || "",
    imageAlt: String(imageAlt || "Activity image"),
    images:
      data.gallery_images?.map(
        (img: any) => getPrismicImageUrl(img.image) || "" // eslint-disable-line @typescript-eslint/no-explicit-any
      ) || [],
    buttonText: String(buttonText || "Register"),
    hasRegistration: Boolean(data.has_registration),
    timerTitle: String(timerTitle || "Coming Soon"),
    date: activityDate,
    isPast: isPastActivity,
    // Apply default styling to all activities
    ...DEFAULT_ACTIVITY_STYLING,
  };
};

export const fetchActivitiesFromPrismic = async (): Promise<Activity[]> => {
  try {
    const client = createPrismicClient();

    const response = await client.getAllByType("activity", {
      orderings: [{ field: "my.activity.activity_date", direction: "asc" }],
    });

    if (!response || !Array.isArray(response)) {
      return [];
    }

    if (response.length === 0) {
      return [];
    }

    const activities = response.map(mapPrismicToActivity);
    return sortActivitiesByDate(activities);
  } catch (error) {
    handlePrismicError(error, "activities");
    // Return empty array instead of throwing to prevent app crash
    return [];
  }
};
