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
function isSpecialComingSoonDate(date: Date): boolean {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed
  const day = date.getDate();
  return year === 1999 && month === 5 && day === 2; // June 2, 1999
}

// Helper function to determine activity status based on session dates
function calculateActivityStatus(
  sessionDates: Array<{ startDate: Date; endDate: Date }>,
  hasRegistration: boolean
): ActivityStatus {
  const now = new Date();

  // Check for special "בקרוב" date in FIRST session
  if (sessionDates.length > 0 && isSpecialComingSoonDate(sessionDates[0].startDate)) {
    return "coming_soon";
  }

  // Check if ANY session is currently active
  const hasActiveSession = sessionDates.some(
    (session) => now >= session.startDate && now <= session.endDate
  );

  // Check if ANY session hasn't started yet
  const hasFutureSession = sessionDates.some(
    (session) => now < session.startDate
  );

  // Check if ALL sessions are past
  const allSessionsPast = sessionDates.every(
    (session) => now > session.endDate
  );

  // Status logic:
  // 1. If ALL sessions are past -> "past"
  if (allSessionsPast) {
    return "past";
  }

  // 2. If a session is active -> "in_progress"
  if (hasActiveSession) {
    return "in_progress";
  }

  // 3. If no session has started and registration is available -> "registerable"
  if (!hasActiveSession && hasFutureSession && hasRegistration) {
    return "registerable";
  }

  // 4. Fallback to coming_soon
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

    // Within same priority, sort by date (using activity.date which is earliest session start)
    if (a.status === "past") {
      // For past activities: most recent first
      return b.date.getTime() - a.date.getTime();
    } else {
      // For future/current activities: earliest first
      return a.date.getTime() - b.date.getTime();
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

  // Parse session dates from Prismic group
  const sessionDates: Array<{ startDate: Date; endDate: Date }> = [];
  if (data.session_dates && Array.isArray(data.session_dates)) {
    data.session_dates.forEach((sessionItem: any) => {
      const sessionStart = getPrismicDate(sessionItem.session_start_date);
      const sessionEnd = getPrismicDate(sessionItem.session_end_date);
      if (sessionStart && sessionEnd) {
        sessionDates.push({ startDate: sessionStart, endDate: sessionEnd });
      }
    });
  }

  const sessions = parseInt(data.activity_sessions || "1", 10);

  // Validation: warn if mismatch
  if (sessionDates.length !== sessions) {
    console.warn(
      `Activity "${data.title?.[0]?.text || 'Unknown'}" has mismatched sessions: ${sessions} sessions configured but ${sessionDates.length} date ranges provided`
    );
  }

  // Calculate dates for countdown and future sessions
  const now = new Date();

  // Get future sessions (sessions that haven't started yet)
  const futureSessions = sessionDates.filter(
    (session) => now < session.startDate
  );

  const hasFutureSessions = futureSessions.length > 0;

  // For countdown: use earliest FUTURE session if available, otherwise use absolute earliest
  const earliestFutureStart = futureSessions.length > 0
    ? new Date(Math.min(...futureSessions.map((s) => s.startDate.getTime())))
    : null;

  const allStartDates = sessionDates.map((s) => s.startDate);
  const absoluteEarliestStart = sessionDates.length > 0
    ? new Date(Math.min(...allStartDates.map((d) => d.getTime())))
    : new Date();

  // Use earliest future session if exists, otherwise fall back to absolute earliest
  const countdownDate = earliestFutureStart || absoluteEarliestStart;

  const hasRegistration = Boolean(data.has_registration);
  const status = calculateActivityStatus(sessionDates, hasRegistration);

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
    date: countdownDate, // For countdown timer - uses earliest future session, or absolute earliest
    sessions,
    sessionDates,
    hasFutureSessions,
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
