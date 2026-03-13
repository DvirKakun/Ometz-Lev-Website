/**
 * Notification system type definitions
 */

// Notification category keys matching database columns
// Note: "activities" covers both new activities and activity registration notifications
export type NotificationCategory =
  | 'training_videos'
  | 'therapy_videos'
  | 'activities'
  | 'training_article'
  | 'therapy_article'
  | 'new_product';

// Internal notification types (used by backend for sending)
export type InternalNotificationType =
  | 'training_videos'
  | 'therapy_videos'
  | 'new_activity'
  | 'activity_registration'
  | 'training_article'
  | 'therapy_article'
  | 'new_product';

// Category display info with Hebrew labels
export interface NotificationCategoryInfo {
  key: NotificationCategory;
  label: string; // Hebrew label
  description: string; // Hebrew description
}

// User preferences state (6 categories)
export interface NotificationPreferences {
  training_videos: boolean;
  therapy_videos: boolean;
  activities: boolean; // Covers both new activities and activity registration
  training_article: boolean;
  therapy_article: boolean;
  new_product: boolean;
}

// Full preferences record from database
export interface NotificationPreferencesRecord extends NotificationPreferences {
  id: string;
  user_id: string;
  unsubscribe_token: string;
  created_at: string;
  updated_at: string;
}

// Props for NotificationPreferences component
export interface NotificationPreferencesProps {
  preferences: NotificationPreferences;
  onChange: (preferences: NotificationPreferences) => void;
  disabled?: boolean;
  showSelectAll?: boolean;
}

// Database insert/update type (without id and timestamps)
export interface NotificationPreferencesInsert {
  user_id: string;
  training_videos?: boolean;
  therapy_videos?: boolean;
  activities?: boolean;
  training_article?: boolean;
  therapy_article?: boolean;
  new_product?: boolean;
}

// Sent notification record
export interface SentNotificationRecord {
  id: string;
  notification_type: InternalNotificationType;
  content_id: string;
  sent_at: string;
  recipients_count: number;
}

/**
 * Maps internal notification types to user-facing categories
 */
export const NOTIFICATION_TYPE_TO_CATEGORY: Record<InternalNotificationType, NotificationCategory> = {
  training_videos: 'training_videos',
  therapy_videos: 'therapy_videos',
  new_activity: 'activities',
  activity_registration: 'activities',
  training_article: 'training_article',
  therapy_article: 'therapy_article',
  new_product: 'new_product',
};