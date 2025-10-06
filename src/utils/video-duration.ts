/**
 * Utility functions for handling video duration
 */

/**
 * Format duration in seconds to MM:SS or HH:MM:SS format
 */
export function formatDuration(durationInSeconds: number): string {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

/**
 * Get video duration from video URL
 * Returns a promise that resolves to duration string in MM:SS or HH:MM:SS format
 */
export async function getVideoDuration(videoUrl: string): Promise<string> {
  if (!videoUrl) {
    return "--:--";
  }

  return new Promise((resolve) => {
    console.log("Getting duration for video URL:", videoUrl);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true; // Ensure no audio plays
    video.playsInline = true; // Better mobile support

    const cleanup = () => {
      video.removeAttribute("src");
      video.load();
    };

    video.onloadedmetadata = () => {
      const duration = video.duration;

      cleanup();

      if (isNaN(duration) || !isFinite(duration)) {
        resolve("--:--");
      } else {
        resolve(formatDuration(duration));
      }
    };

    video.onerror = () => {
      cleanup();
      resolve("--:--");
    };

    video.onabort = () => {
      cleanup();
      resolve("--:--");
    };

    // Set source last to trigger loading
    video.src = videoUrl;
  });
}

/**
 * Parse duration string (MM:SS or HH:MM:SS) to total seconds
 */
export function parseDurationToSeconds(duration: string): number {
  if (!duration) return 0;

  const parts = duration.split(":").map(Number);

  if (parts.length === 2) {
    // MM:SS format
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    // HH:MM:SS format
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  return 0;
}

/**
 * Calculate total duration from array of duration strings
 */
export function calculateTotalDuration(durations: (string | undefined)[]): {
  totalMinutes: number;
  formattedDuration: string;
} {
  const totalSeconds = durations
    .filter(Boolean)
    .reduce((total, duration) => total + parseDurationToSeconds(duration!), 0);

  const totalMinutes = Math.round(totalSeconds / 60);
  const formattedDuration = formatDuration(totalSeconds);

  return { totalMinutes, formattedDuration };
}

/**
 * React hook to get video duration
 */
import { useState, useEffect } from "react";

export function useVideoDuration(videoUrl: string) {
  const [duration, setDuration] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoUrl) {
      setDuration(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    getVideoDuration(videoUrl)
      .then((durationStr) => {
        setDuration(durationStr);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Failed to get video duration");
        setDuration(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [videoUrl]);

  return { duration, isLoading, error };
}
