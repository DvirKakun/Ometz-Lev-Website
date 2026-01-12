import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import {
  getVideoProgress,
  getAllVideoProgress,
  getRecentlyWatchedVideos,
  getVideosInProgress,
  saveVideoProgress,
  deleteVideoProgress,
  markVideoAsCompleted,
  resetVideoProgress,
} from '../lib/supabase-video-progress';
import type { VideoProgressUpdate } from '../types/video-progress';

/**
 * Hook to get video progress for a specific video
 */
export function useVideoProgress(videoKey: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['videoProgress', user?.id, videoKey],
    queryFn: () => {
      if (!user?.id || !videoKey) return null;
      return getVideoProgress(user.id, videoKey);
    },
    enabled: !!user?.id && !!videoKey,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to get all video progress for the current user
 */
export function useAllVideoProgress() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['allVideoProgress', user?.id],
    queryFn: () => {
      if (!user?.id) return [];
      return getAllVideoProgress(user.id);
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to get recently watched videos
 */
export function useRecentlyWatchedVideos(limit: number = 10) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['recentlyWatchedVideos', user?.id, limit],
    queryFn: () => {
      if (!user?.id) return [];
      return getRecentlyWatchedVideos(user.id, limit);
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to get videos in progress (not completed)
 */
export function useVideosInProgress() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['videosInProgress', user?.id],
    queryFn: () => {
      if (!user?.id) return [];
      return getVideosInProgress(user.id);
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to save video progress
 */
export function useSaveVideoProgress() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (update: VideoProgressUpdate) => {
      if (!user?.id) {
        throw new Error('User must be logged in to save progress');
      }
      return saveVideoProgress(user.id, update);
    },
    onSuccess: (data) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({
        queryKey: ['videoProgress', user?.id, data.video_key],
      });
      queryClient.invalidateQueries({
        queryKey: ['allVideoProgress', user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['recentlyWatchedVideos', user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['videosInProgress', user?.id],
      });
    },
  });
}

/**
 * Hook to delete video progress
 */
export function useDeleteVideoProgress() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoKey: string) => {
      if (!user?.id) {
        throw new Error('User must be logged in to delete progress');
      }
      return deleteVideoProgress(user.id, videoKey);
    },
    onSuccess: (_, videoKey) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ['videoProgress', user?.id, videoKey],
      });
      queryClient.invalidateQueries({
        queryKey: ['allVideoProgress', user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['videosInProgress', user?.id],
      });
    },
  });
}

/**
 * Hook to mark video as completed
 */
export function useMarkVideoAsCompleted() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ videoKey, duration }: { videoKey: string; duration: number }) => {
      if (!user?.id) {
        throw new Error('User must be logged in to mark as completed');
      }
      return markVideoAsCompleted(user.id, videoKey, duration);
    },
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ['videoProgress', user?.id, data.video_key],
      });
      queryClient.invalidateQueries({
        queryKey: ['allVideoProgress', user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['videosInProgress', user?.id],
      });
    },
  });
}

/**
 * Hook to reset video progress (start from beginning)
 */
export function useResetVideoProgress() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoKey: string) => {
      if (!user?.id) {
        throw new Error('User must be logged in to reset progress');
      }
      return resetVideoProgress(user.id, videoKey);
    },
    onSuccess: (_, videoKey) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ['videoProgress', user?.id, videoKey],
      });
      queryClient.invalidateQueries({
        queryKey: ['allVideoProgress', user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['videosInProgress', user?.id],
      });
    },
  });
}