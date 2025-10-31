import { Calendar } from "lucide-react";
import type { Activity } from "../types/activities";
import type { PrismicDocument } from "@prismicio/client";
import {
  createPrismicClient,
  getPrismicText,
  getPrismicTitle,
  getPrismicDate,
  handlePrismicError,
  getPrismicRichText,
} from "./prismic-config";

// Helper function to check if activity has ended (based on end date)
function isActivityPast(endDate: Date): boolean {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endDay = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  return endDay < today;
}

// Helper function to sort activities: future first, then past
function sortActivitiesByDate(activities: Activity[]): Activity[] {
  return activities.sort((a, b) => {
    const aIsPast = isActivityPast(a.endDate);
    const bIsPast = isActivityPast(b.endDate);

    // If one is past and other is future, future comes first
    if (aIsPast && !bIsPast) return 1;
    if (!aIsPast && bIsPast) return -1;

    // If both are future or both are past, sort by date (ascending)
    return a.startDate.getTime() - b.startDate.getTime();
  });
}

// Default styling configuration - same for all activities
const DEFAULT_ACTIVITY_STYLING = {
  icon: Calendar,
};

// Type for the complete Prismic document with any data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismicActivity = PrismicDocument<Record<string, any>>;

const mapPrismicToActivity = (prismicActivity: PrismicActivity): Activity => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = prismicActivity.data as any;

  const startDate = getPrismicDate(data.activity_start_date);
  const endDate = getPrismicDate(data.activity_end_date);
  const isPastActivity = isActivityPast(endDate);

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
        const text = getPrismicRichText(desc.paragraph);
        return String(text || ""); // Force string conversion
      })
      .filter((text: string) => text.length > 0) || [];

  const buttonText = getPrismicText(data.button_text);
  const timerTitle = getPrismicText(data.timer_title);
  const registerFormTitle = getPrismicText(data.activity_register_form_title);
  const registerFormMessage = getPrismicRichText(
    data.activity_register_form_message
  );
  const sessions = parseInt(data.activity_sessions || "1", 10);

  return {
    id: String(prismicActivity.id),
    title: String(title || "Activity"),
    description: description.map((d: any) => String(d)), // Force all to strings
    details: {
      ages: String(details.ages),
      duration: String(details.duration),
      note: String(details.note),
    },
    main_image: data.main_image,
    images: data.gallery_images || [],
    buttonText: String(buttonText || "Register"),
    hasRegistration: Boolean(data.has_registration),
    timerTitle: String(timerTitle || "Coming Soon"),
    date: startDate,
    startDate,
    endDate,
    sessions,
    registerFormTitle: String(registerFormTitle || "הרשמה לפעילות"),
    registerFormMessage: String(registerFormMessage || "הטופס התקבל בהצלחה"),
    isPast: isPastActivity,
    // Apply default styling to all activities
    ...DEFAULT_ACTIVITY_STYLING,
  };
};

export const fetchActivitiesFromPrismic = async (): Promise<Activity[]> => {
  try {
    const client = createPrismicClient();

    const response = await client.getAllByType("activity", {
      orderings: [
        { field: "my.activity.activity_start_date", direction: "asc" },
      ],
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
