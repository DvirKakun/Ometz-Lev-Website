import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchArticlesFromPrismic } from "../utils/prismic-articles";
import { fetchCategoriesFromPrismic } from "../utils/prismic-categories";
import { fetchActivitiesFromPrismic } from "../utils/prismic-activities";
import { fetchProfileImageFromPrismic } from "../utils/prismic-profile-image";
import { fetchHeroSlidesFromPrismic } from "../utils/prismic-hero-slides";

// Types for prefetching options
type PrefetchOptions = {
  articles?: boolean;
  trainingArticles?: boolean;
  therapyArticles?: boolean;
  categories?: boolean;
  activities?: boolean;
  profileImage?: boolean;
  heroSlides?: boolean;
};

// Hook for prefetching data during loading screens
export function usePrefetchData(options: PrefetchOptions = {}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const prefetchPromises: Promise<void>[] = [];

    // Prefetch categories (used by both training and therapy articles)
    if (options.categories || options.articles || options.trainingArticles || options.therapyArticles) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["categories"],
          queryFn: () => fetchCategoriesFromPrismic(),
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch training articles
    if (options.articles || options.trainingArticles) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["articles", "training"],
          queryFn: () => fetchArticlesFromPrismic("training"),
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch therapy articles
    if (options.articles || options.therapyArticles) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["articles", "therapy"],
          queryFn: () => fetchArticlesFromPrismic("therapy"),
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch activities
    if (options.activities) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["activities"],
          queryFn: fetchActivitiesFromPrismic,
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch profile image
    if (options.profileImage) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["profile-image"],
          queryFn: () => fetchProfileImageFromPrismic(),
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch hero slides for homepage
    if (options.heroSlides) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["hero-slider"],
          queryFn: () => fetchHeroSlidesFromPrismic(),
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Execute all prefetch operations in parallel
    Promise.all(prefetchPromises).catch((error) => {
      console.warn("Some data prefetching failed:", error);
      // Don't throw - let the app continue loading even if prefetching fails
    });
  }, [queryClient, options]);
}

// Specific prefetch hooks for different routes
export function usePrefetchHomePage() {
  return usePrefetchData({
    heroSlides: true,
    profileImage: true,
    activities: true,
    articles: true, // Both training and therapy for demo articles
    categories: true,
  });
}

export function usePrefetchTrainingPage() {
  return usePrefetchData({
    trainingArticles: true,
    categories: true,
    profileImage: true,
  });
}

export function usePrefetchTherapyPage() {
  return usePrefetchData({
    therapyArticles: true,
    categories: true,
    profileImage: true,
  });
}

export function usePrefetchActivitiesPage() {
  return usePrefetchData({
    activities: true,
    profileImage: true,
  });
}

export function usePrefetchArticlesLibrary(pageType: "training" | "therapy") {
  return usePrefetchData({
    trainingArticles: pageType === "training",
    therapyArticles: pageType === "therapy",
    categories: true,
  });
}

// Hook for preloading images from URLs
export function usePreloadImages(imageUrls: string[]) {
  useEffect(() => {
    const preloadPromises = imageUrls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
      });
    });

    Promise.all(preloadPromises).catch((error) => {
      console.warn("Some images failed to preload:", error);
      // Don't throw - let the app continue loading even if image preloading fails
    });
  }, [imageUrls]);
}

// Hook for conditional prefetching based on route
export function usePrefetchForRoute(pathname: string) {
  const isTrainingArticles = pathname.startsWith("/training-articles-library");
  const isTherapyArticles = pathname.startsWith("/therapy-articles-library");
  const isTraining = pathname.startsWith("/training") && !isTrainingArticles;
  const isTherapy = pathname.startsWith("/therapy") && !isTherapyArticles;
  const isActivities = pathname.startsWith("/activities");

  // Always call all hooks, but with conditional options
  usePrefetchData({
    trainingArticles: isTrainingArticles || isTraining,
    therapyArticles: isTherapyArticles || isTherapy,
    categories: isTrainingArticles || isTherapyArticles || isTraining || isTherapy,
    activities: isActivities,
    profileImage: isTraining || isTherapy || isActivities,
  });
}