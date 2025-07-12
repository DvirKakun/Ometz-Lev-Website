import { useQuery } from "@tanstack/react-query";
import { fetchSlideHeroImagesFromStrapi } from "../utils/strapi-slide-hero-images";

// Custom hook for fetching slide hero images with caching
export function useSlideHeroImages() {
  return useQuery({
    queryKey: ["slide-hero-images"],
    queryFn: () => fetchSlideHeroImagesFromStrapi(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}