import type {
  NotificationCategoryInfo,
  NotificationPreferences,
} from "../types/notifications";

/**
 * List of all notification categories with Hebrew labels
 * Note: "activities" covers both new activities and activity registration notifications
 */
export const NOTIFICATION_CATEGORIES: NotificationCategoryInfo[] = [
  {
    key: "training_videos",
    label: "סרטונים של אילוף כלבים",
    description: "עדכונים על סרטוני אילוף כלבים",
  },
  {
    key: "therapy_videos",
    label: "סרטונים של כלבנות טיפולית",
    description: "עדכונים על סרטוני כלבנות טיפולית",
  },
  {
    key: "activities",
    label: "פעילויות",
    description: "עדכונים על פעילויות",
  },
  {
    key: "training_article",
    label: "מדריך חדש באילוף כלבים",
    description: "עדכונים על מדריכים חדשים באילוף כלבים",
  },
  {
    key: "therapy_article",
    label: "מדריך חדש בכלבנות טיפולית",
    description: "עדכונים על מדריכים חדשים בכלבנות טיפולית",
  },
  {
    key: "new_product",
    label: "מוצר חדש",
    description: "עדכונים על מוצרים חדשים שעלו לאתר",
  },
];

/**
 * Default preferences - all categories enabled
 */
export const DEFAULT_PREFERENCES: NotificationPreferences = {
  training_videos: true,
  therapy_videos: true,
  activities: true,
  training_article: true,
  therapy_article: true,
  new_product: true,
};

/**
 * Empty preferences - all categories disabled
 */
export const EMPTY_PREFERENCES: NotificationPreferences = {
  training_videos: false,
  therapy_videos: false,
  activities: false,
  training_article: false,
  therapy_article: false,
  new_product: false,
};

/**
 * Check if all preferences are enabled
 */
export function areAllPreferencesEnabled(
  preferences: NotificationPreferences,
): boolean {
  return Object.values(preferences).every((value) => value === true);
}

/**
 * Check if all preferences are disabled
 */
export function areAllPreferencesDisabled(
  preferences: NotificationPreferences,
): boolean {
  return Object.values(preferences).every((value) => value === false);
}

/**
 * Get the count of enabled preferences
 */
export function getEnabledPreferencesCount(
  preferences: NotificationPreferences,
): number {
  return Object.values(preferences).filter((value) => value === true).length;
}
