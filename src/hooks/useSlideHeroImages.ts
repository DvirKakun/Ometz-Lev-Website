import { useQuery } from "@tanstack/react-query";
import { fetchHeroSlidesFromPrismic } from "../utils/prismic-hero-slides";

// Custom hook for fetching slide hero images with caching
export function useSlideHeroImages() {
  return useQuery({
    queryKey: ["hero-slider"],
    queryFn: () => fetchHeroSlidesFromPrismic(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
