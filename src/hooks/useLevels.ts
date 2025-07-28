import { useQuery } from "@tanstack/react-query";
import { fetchLevelsFromPrismic } from "../utils/prismic-levels";

// Custom hook for fetching levels with caching (global levels)
export function useLevels() {
  return useQuery({
    queryKey: ["levels"],
    queryFn: () => fetchLevelsFromPrismic(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Helper hook to get level name and color
export function useLevelInfo(levelId: string) {
  const { data: levels = [] } = useLevels();

  const level = levels.find((l) => l.id === levelId);

  return {
    name: level?.name || levelId,
    color: level?.color || "slate",
  };
}