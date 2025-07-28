import { useQuery } from "@tanstack/react-query";
import { fetchVideosFromPrismic } from "../utils/prismic-videos";
import type { Video } from "../types/videos";

// Custom hook for fetching videos with caching
export function useVideos(page: "training" | "therapy" = "training") {
  return useQuery({
    queryKey: ["videos", page],
    queryFn: () => fetchVideosFromPrismic(page),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Helper hook to get videos by category
export function useVideosByCategory(
  categoryId: string,
  page: "training" | "therapy" = "training"
) {
  const { data: videos = [], ...rest } = useVideos(page);

  const filteredVideos =
    categoryId === "all"
      ? videos
      : videos.filter((video: Video) =>
          video.categories.includes(categoryId)
        );

  return {
    data: filteredVideos,
    ...rest,
  };
}

// Helper hook to get videos by level
export function useVideosByLevel(
  levelId: string,
  page: "training" | "therapy" = "training"
) {
  const { data: videos = [], ...rest } = useVideos(page);

  const filteredVideos =
    levelId === "all"
      ? videos
      : videos.filter((video: Video) => video.levelId === levelId);

  return {
    data: filteredVideos,
    ...rest,
  };
}

// Helper hook to get videos by both category and level
export function useVideosByCategoryAndLevel(
  categoryId: string,
  levelId: string,
  page: "training" | "therapy" = "training"
) {
  const { data: videos = [], ...rest } = useVideos(page);

  const filteredVideos = videos.filter((video: Video) => {
    const matchesCategory = categoryId === "all" || video.categories.includes(categoryId);
    const matchesLevel = levelId === "all" || video.levelId === levelId;
    return matchesCategory && matchesLevel;
  });

  return {
    data: filteredVideos,
    ...rest,
  };
}

// Helper hook for demo videos (3 videos from different categories/levels)
export function useDemoVideos(page: "training" | "therapy" = "training") {
  const { data: videos = [], ...rest } = useVideos(page);

  return {
    data: videos.slice(0, 3),
    ...rest,
  };
}

// Helper hook for video statistics
export function useVideoStats(page: "training" | "therapy" = "training") {
  const { data: videos = [] } = useVideos(page);

  const videoCount = videos.length;

  // Count videos by level
  const videosByLevel = videos.reduce((acc: Record<string, number>, video: Video) => {
    acc[video.levelId] = (acc[video.levelId] || 0) + 1;
    return acc;
  }, {});

  return {
    videoCount,
    videosByLevel,
  };
}

// Helper hook to get video count per category for a specific page
export function useVideoCountPerCategory(
  page: "training" | "therapy" = "training"
) {
  const { data: videos = [] } = useVideos(page);

  const getCountForCategory = (categoryId: string): number => {
    if (categoryId === "all") return videos.length;

    return videos.filter((video: Video) =>
      video.categories.includes(categoryId)
    ).length;
  };

  return { getCountForCategory };
}

// Helper hook to get video count per level for a specific page
export function useVideoCountPerLevel(
  page: "training" | "therapy" = "training"
) {
  const { data: videos = [] } = useVideos(page);

  const getCountForLevel = (levelId: string): number => {
    if (levelId === "all") return videos.length;

    return videos.filter((video: Video) => video.levelId === levelId).length;
  };

  return { getCountForLevel };
}

// Helper hook to get videos by multiple categories (videos must include ALL selected categories)
export function useVideosByMultipleCategories(
  selectedCategories: string[],
  page: "training" | "therapy" = "training"
) {
  const { data: videos = [], ...rest } = useVideos(page);

  const filteredVideos =
    selectedCategories.length === 0 || selectedCategories.includes("all")
      ? videos // Show all videos if no categories selected or "all" is selected
      : videos.filter((video: Video) =>
          selectedCategories.every((categoryId) =>
            video.categories.includes(categoryId)
          )
        );

  return {
    data: filteredVideos,
    ...rest,
  };
}