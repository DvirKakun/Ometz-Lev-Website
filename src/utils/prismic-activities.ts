import { Calendar } from "lucide-react";
import type { Activity, ActivityStatus } from "../types/activities";
import type { PrismicDocument } from "@prismicio/client";
import {
  createPrismicClient,
  getPrismicText,
  getPrismicTitle,
  getPrismicDate,
  handlePrismicError,
  getPrismicRichText,
} from "./prismic-config";

// Helper function to check if activity has special "בקרוב" date (02/06/1999)
function isSpecialComingSoonDate(startDate: Date): boolean {
  const activityYear = startDate.getFullYear();
  const activityMonth = startDate.getMonth(); // 0-indexed
  const activityDay = startDate.getDate();
  return activityYear === 1999 && activityMonth === 5 && activityDay === 2; // June 2, 1999
}

// Helper function to determine activity status
function calculateActivityStatus(startDate: Date, endDate: Date, hasRegistration: boolean): ActivityStatus {
  const now = new Date();
  
  // Check for special "בקרוב" date first
  if (isSpecialComingSoonDate(startDate)) {
    return "coming_soon";
  }
  
  // Check if activity ended
  if (now > endDate) {
    return "past";
  }
  
  // Check if activity is currently in progress
  if (now >= startDate && now <= endDate) {
    return "in_progress";
  }
  
  // Activity is in the future - check if registration is available
  if (hasRegistration && now < startDate) {
    return "registerable";
  }
  
  // Future activity without registration (fallback to coming soon)
  return "coming_soon";
}

// Helper function to get priority for sorting
function getActivityPriority(status: ActivityStatus): number {
  switch (status) {
    case "registerable": return 0; // Highest priority
    case "in_progress": return 1;
    case "coming_soon": return 2;
    case "past": return 3; // Lowest priority
    default: return 4;
  }
}

// Priority-based sorting function
function sortActivitiesByPriority(activities: Activity[]): Activity[] {
  return activities.sort((a, b) => {
    const priorityA = getActivityPriority(a.status);
    const priorityB = getActivityPriority(b.status);
    
    // First sort by priority
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    // Within same priority, sort by date
    if (a.status === "past") {
      // For past activities: most recent first
      return b.startDate.getTime() - a.startDate.getTime();
    } else {
      // For future/current activities: earliest first
      return a.startDate.getTime() - b.startDate.getTime();
    }
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
  const hasRegistration = Boolean(data.has_registration);
  const status = calculateActivityStatus(startDate, endDate, hasRegistration);

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
    hasRegistration,
    timerTitle: String(timerTitle || "Coming Soon"),
    date: startDate,
    startDate,
    endDate,
    sessions,
    registerFormTitle: String(registerFormTitle || "הרשמה לפעילות"),
    registerFormMessage: String(registerFormMessage || "הטופס התקבל בהצלחה"),
    status,
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
    return sortActivitiesByPriority(activities);
  } catch (error) {
    handlePrismicError(error, "activities");
    // Return empty array instead of throwing to prevent app crash
    return [];
  }
};
