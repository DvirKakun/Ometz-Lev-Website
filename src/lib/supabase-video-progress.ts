import { supabase } from './supabase';
import type { VideoProgress, VideoProgressUpdate } from '../types/video-progress';

/**
 * Get video progress for a specific video and user
 */
export async function getVideoProgress(
  userId: string,
  videoKey: string
): Promise<VideoProgress | null> {
  const { data, error } = await supabase
    .from('video_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('video_key', videoKey)
    .maybeSingle(); // Returns null if no rows found instead of throwing error

  if (error) {
    console.error('Error fetching video progress:', error);
    throw error;
  }

  return data;
}

/**
 * Get all video progress for a user
 */
export async function getAllVideoProgress(userId: string): Promise<VideoProgress[]> {
  const { data, error } = await supabase
    .from('video_progress')
    .select('*')
    .eq('user_id', userId)
    .order('last_watched_at', { ascending: false });

  if (error) {
    console.error('Error fetching all video progress:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get recently watched videos for a user
 */
export async function getRecentlyWatchedVideos(
  userId: string,
  limit: number = 10
): Promise<VideoProgress[]> {
  const { data, error } = await supabase
    .from('video_progress')
    .select('*')
    .eq('user_id', userId)
    .order('last_watched_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recently watched videos:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get videos in progress (not completed, progress > 0)
 */
export async function getVideosInProgress(userId: string): Promise<VideoProgress[]> {
  const { data, error } = await supabase
    .from('video_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('completed', false)
    .gt('progress_percent', 0)
    .order('last_watched_at', { ascending: false });

  if (error) {
    console.error('Error fetching videos in progress:', error);
    throw error;
  }

  return data || [];
}

/**
 * Save or update video progress
 */
export async function saveVideoProgress(
  userId: string,
  update: VideoProgressUpdate
): Promise<VideoProgress> {
  const { video_key, playback_position, duration } = update;

  // Calculate progress percentage
  const progress_percent = duration > 0 ? (playback_position / duration) * 100 : 0;

  // Mark as completed if watched >= 90% or reached the end
  const completed = progress_percent >= 90 || playback_position >= duration - 5; // 5 second buffer before end

  const progressData = {
    user_id: userId,
    video_key,
    playback_position,
    duration,
    progress_percent,
    last_watched_at: new Date().toISOString(),
    completed,
  };

  // Use upsert to insert or update
  const { data, error } = await supabase
    .from('video_progress')
    .upsert(progressData, {
      onConflict: 'user_id,video_key',
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving video progress:', error);
    throw error;
  }

  return data;
}

/**
 * Delete video progress for a specific video
 */
export async function deleteVideoProgress(
  userId: string,
  videoKey: string
): Promise<void> {
  const { error } = await supabase
    .from('video_progress')
    .delete()
    .eq('user_id', userId)
    .eq('video_key', videoKey);

  if (error) {
    console.error('Error deleting video progress:', error);
    throw error;
  }
}

/**
 * Mark video as completed
 */
export async function markVideoAsCompleted(
  userId: string,
  videoKey: string,
  duration: number
): Promise<VideoProgress> {
  const progressData = {
    user_id: userId,
    video_key: videoKey,
    playback_position: duration,
    duration,
    progress_percent: 100,
    last_watched_at: new Date().toISOString(),
    completed: true,
  };

  const { data, error } = await supabase
    .from('video_progress')
    .upsert(progressData, {
      onConflict: 'user_id,video_key',
    })
    .select()
    .single();

  if (error) {
    console.error('Error marking video as completed:', error);
    throw error;
  }

  return data;
}

/**
 * Reset video progress (start from beginning)
 */
export async function resetVideoProgress(
  userId: string,
  videoKey: string
): Promise<void> {
  await deleteVideoProgress(userId, videoKey);
}