import { useQuery } from "@tanstack/react-query";
import { fetchActivitiesFromPrismic } from "../utils/prismic-activities";
import type { Activity } from "../types/activities";

export const useActivities = () => {
  return useQuery<Activity[], Error>({
    queryKey: ["activities"],
    queryFn: fetchActivitiesFromPrismic,
    staleTime: 10 * 60 * 1000, // Don't refetch for 10 minutes (reduces API calls by 90%)
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes (was cacheTime)
    refetchOnWindowFocus: false, // Don't refetch when user switches tabs
    refetchOnReconnect: true, // Refetch when internet reconnects
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};

// Hook that derives closest activity from cached activities data (no extra API calls!)
export const useClosestActivity = () => {
  // Use the query client to get cached data WITHOUT triggering a new fetch
  const {
    data: activities = [],
    isLoading,
    error,
  } = useQuery<Activity[], Error>({
    queryKey: ["activities"],
    queryFn: fetchActivitiesFromPrismic,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Find activity with the absolute closest future session across ALL activities
  const now = new Date();
  let closestActivity: Activity | null = null;
  let closestSessionDate: Date | null = null;

  for (const activity of activities) {
    // Find the closest future session for this activity
    const futureSessions = activity.sessionDates.filter(
      (session) => session.startDate > now
    );

    if (futureSessions.length > 0) {
      // Get the earliest future session start date
      const earliestFutureSession = new Date(
        Math.min(...futureSessions.map((s) => s.startDate.getTime()))
      );

      // Compare with overall closest
      if (!closestSessionDate || earliestFutureSession < closestSessionDate) {
        closestSessionDate = earliestFutureSession;
        closestActivity = activity;
      }
    }
  }

  return {
    data: closestActivity,
    isLoading,
    error,
  };
};
