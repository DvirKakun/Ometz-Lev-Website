import { supabase } from './supabase';
import type {
  NotificationPreferences,
  NotificationPreferencesRecord,
  NotificationPreferencesInsert,
} from '../types/notifications';
import { DEFAULT_PREFERENCES } from '../data/notification-categories';

/**
 * Get notification preferences for a specific user
 */
export async function getNotificationPreferences(
  userId: string
): Promise<NotificationPreferencesRecord | null> {
  const { data, error } = await supabase
    .from('user_notification_preferences')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching notification preferences:', error);
    throw error;
  }

  return data;
}

/**
 * Get notification preferences by unsubscribe token (for email unsubscribe links)
 */
export async function getPreferencesByToken(
  token: string
): Promise<NotificationPreferencesRecord | null> {
  const { data, error } = await supabase
    .from('user_notification_preferences')
    .select('*')
    .eq('unsubscribe_token', token)
    .maybeSingle();

  if (error) {
    console.error('Error fetching preferences by token:', error);
    throw error;
  }

  return data;
}

/**
 * Create default notification preferences for a new user
 */
export async function createDefaultPreferences(
  userId: string,
  enableNotifications: boolean = true
): Promise<NotificationPreferencesRecord> {
  const preferences: NotificationPreferencesInsert = {
    user_id: userId,
    ...(enableNotifications ? DEFAULT_PREFERENCES : {
      training_videos: false,
      therapy_videos: false,
      activities: false,
      training_article: false,
      therapy_article: false,
      new_product: false,
    }),
  };

  const { data, error } = await supabase
    .from('user_notification_preferences')
    .insert(preferences)
    .select()
    .single();

  if (error) {
    console.error('Error creating notification preferences:', error);
    throw error;
  }

  return data;
}

/**
 * Save or update notification preferences for a user
 */
export async function saveNotificationPreferences(
  userId: string,
  preferences: NotificationPreferences
): Promise<NotificationPreferencesRecord> {
  const preferencesData = {
    user_id: userId,
    ...preferences,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('user_notification_preferences')
    .upsert(preferencesData, {
      onConflict: 'user_id',
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving notification preferences:', error);
    throw error;
  }

  return data;
}

/**
 * Update preferences by unsubscribe token (for email unsubscribe)
 * Also regenerates the token for security
 */
export async function updatePreferencesByToken(
  token: string,
  preferences: Partial<NotificationPreferences>
): Promise<NotificationPreferencesRecord | null> {
  // First, find the record with this token
  const existing = await getPreferencesByToken(token);
  if (!existing) {
    return null;
  }

  // Update preferences and regenerate token
  const { data, error } = await supabase
    .from('user_notification_preferences')
    .update({
      ...preferences,
      unsubscribe_token: crypto.randomUUID(), // Regenerate token for security
      updated_at: new Date().toISOString(),
    })
    .eq('id', existing.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating preferences by token:', error);
    throw error;
  }

  return data;
}

/**
 * Unsubscribe from all notifications using token
 */
export async function unsubscribeAll(
  token: string
): Promise<NotificationPreferencesRecord | null> {
  return updatePreferencesByToken(token, {
    training_videos: false,
    therapy_videos: false,
    activities: false,
    training_article: false,
    therapy_article: false,
    new_product: false,
  });
}

/**
 * Unsubscribe from a specific category using token
 */
export async function unsubscribeFromCategory(
  token: string,
  category: keyof NotificationPreferences
): Promise<NotificationPreferencesRecord | null> {
  return updatePreferencesByToken(token, {
    [category]: false,
  });
}

/**
 * Delete notification preferences for a user
 */
export async function deleteNotificationPreferences(
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from('user_notification_preferences')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error deleting notification preferences:', error);
    throw error;
  }
}

/**
 * Get or create preferences for a user
 * Returns existing preferences or creates new ones with defaults
 */
export async function getOrCreatePreferences(
  userId: string,
  enableNotifications: boolean = true
): Promise<NotificationPreferencesRecord> {
  const existing = await getNotificationPreferences(userId);
  if (existing) {
    return existing;
  }
  return createDefaultPreferences(userId, enableNotifications);
}