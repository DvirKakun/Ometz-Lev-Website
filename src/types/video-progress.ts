export interface VideoProgress {
  user_id: string;
  video_key: string;
  playback_position: number; // Current playback position in seconds
  duration: number; // Total video duration in seconds
  progress_percent: number; // Calculated percentage (0-100)
  last_watched_at: string; // ISO timestamp
  completed: boolean; // True if watched >= 90% or reached end
}

export interface VideoProgressUpdate {
  video_key: string;
  playback_position: number;
  duration: number;
}

export interface VideoProgressInsert {
  user_id: string;
  video_key: string;
  playback_position: number;
  duration: number;
  progress_percent: number;
  last_watched_at: string;
  completed: boolean;
}