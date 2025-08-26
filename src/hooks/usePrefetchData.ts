import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchArticlesFromPrismic } from "../utils/prismic-articles";
import { fetchCategoriesFromPrismic } from "../utils/prismic-categories";
import { fetchActivitiesFromPrismic } from "../utils/prismic-activities";
import { fetchProfileImageFromPrismic } from "../utils/prismic-profile-image";
import { fetchHeroSlidesFromPrismic } from "../utils/prismic-hero-slides";
import { 
  fetchTherapyOfferings,
  fetchTrainingOfferings,
  fetchActivitiesOfferings,
  fetchSchoolsOfferings
} from "../utils/prismic-service-offerings";
import {
  fetchTherapyFAQs,
  fetchTrainingFAQs,
  fetchActivitiesFAQs,
  fetchSchoolsFAQs,
} from "../utils/prismic-faq";

// Types for prefetching options
type PrefetchOptions = {
  articles?: boolean;
  trainingArticles?: boolean;
  therapyArticles?: boolean;
  categories?: boolean;
  activities?: boolean;
  profileImage?: boolean;
  heroSlides?: boolean;
  therapyOfferings?: boolean;
  trainingOfferings?: boolean;
  activitiesOfferings?: boolean;
  schoolsOfferings?: boolean;
  therapyFAQs?: boolean;
  trainingFAQs?: boolean;
  activitiesFAQs?: boolean;
  schoolsFAQs?: boolean;
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

    // Prefetch therapy offerings
    if (options.therapyOfferings) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["therapy-offerings"],
          queryFn: fetchTherapyOfferings,
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch training offerings
    if (options.trainingOfferings) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["training-offerings"],
          queryFn: fetchTrainingOfferings,
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch activities offerings
    if (options.activitiesOfferings) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["activities-offerings"],
          queryFn: fetchActivitiesOfferings,
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch schools offerings
    if (options.schoolsOfferings) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["schools-offerings"],
          queryFn: fetchSchoolsOfferings,
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch therapy FAQs
    if (options.therapyFAQs) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["faqs-therapy"],
          queryFn: fetchTherapyFAQs,
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch training FAQs
    if (options.trainingFAQs) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["faqs-training"],
          queryFn: fetchTrainingFAQs,
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch activities FAQs
    if (options.activitiesFAQs) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["faqs-activities"],
          queryFn: fetchActivitiesFAQs,
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch schools FAQs
    if (options.schoolsFAQs) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["faqs-schools"],
          queryFn: fetchSchoolsFAQs,
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
    therapyOfferings: true, // For therapy service card
    trainingOfferings: true, // For training service card
    activitiesOfferings: true, // For activities service card
    schoolsOfferings: true, // For schools service card
  });
}

export function usePrefetchTrainingPage() {
  return usePrefetchData({
    trainingArticles: true,
    categories: true,
    profileImage: true,
    trainingOfferings: true, // For training page offerings
    trainingFAQs: true, // For training page FAQs
  });
}

export function usePrefetchTherapyPage() {
  return usePrefetchData({
    therapyArticles: true,
    categories: true,
    profileImage: true,
    therapyOfferings: true, // For therapy page offerings
    therapyFAQs: true, // For therapy page FAQs
  });
}

export function usePrefetchActivitiesPage() {
  return usePrefetchData({
    activities: true,
    profileImage: true,
    activitiesOfferings: true, // For activities page offerings
    activitiesFAQs: true, // For activities page FAQs
  });
}

export function usePrefetchSchoolsPage() {
  return usePrefetchData({
    profileImage: true,
    schoolsOfferings: true, // For schools page offerings
    schoolsFAQs: true, // For schools page FAQs
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
  const isSchools = pathname.startsWith("/schools");

  // Always call all hooks, but with conditional options
  usePrefetchData({
    trainingArticles: isTrainingArticles || isTraining,
    therapyArticles: isTherapyArticles || isTherapy,
    categories: isTrainingArticles || isTherapyArticles || isTraining || isTherapy,
    activities: isActivities,
    profileImage: isTraining || isTherapy || isActivities || isSchools,
    therapyOfferings: isTherapy, // Prefetch therapy offerings for therapy page
    trainingOfferings: isTraining, // Prefetch training offerings for training page
    activitiesOfferings: isActivities, // Prefetch activities offerings for activities page
    schoolsOfferings: isSchools, // Prefetch schools offerings for schools page
    therapyFAQs: isTherapy, // Prefetch therapy FAQs for therapy page
    trainingFAQs: isTraining, // Prefetch training FAQs for training page
    activitiesFAQs: isActivities, // Prefetch activities FAQs for activities page
    schoolsFAQs: isSchools, // Prefetch schools FAQs for schools page
  });
}