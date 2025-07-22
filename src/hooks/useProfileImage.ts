import { useQuery } from "@tanstack/react-query";
import { fetchProfileImageFromPrismic } from "../utils/prismic-profile-image";

// Custom hook for fetching profile image with caching
export function useProfileImage() {
  return useQuery({
    queryKey: ["profile-image"],
    queryFn: () => fetchProfileImageFromPrismic(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
