import { useQuery } from "@tanstack/react-query";
import { fetchHealthTermsButtonFromPrismic } from "../utils/prismic-health-terms-button";

// Custom hook for fetching health terms button with caching
export function useHealthTermsButton() {
  return useQuery({
    queryKey: ["health-terms-button"],
    queryFn: () => fetchHealthTermsButtonFromPrismic(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}