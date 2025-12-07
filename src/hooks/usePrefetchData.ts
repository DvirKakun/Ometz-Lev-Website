import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchArticlesFromPrismic } from "../utils/prismic-articles";
import { fetchVideosFromPrismic } from "../utils/prismic-videos";
import { fetchCategoriesFromPrismic } from "../utils/prismic-categories";
import { fetchActivitiesFromPrismic } from "../utils/prismic-activities";
import { fetchProfileImageFromPrismic } from "../utils/prismic-profile-image";
import { fetchHeroSlidesFromPrismic } from "../utils/prismic-hero-slides";
import { fetchHealthTermsButtonFromPrismic } from "../utils/prismic-health-terms-button";
import { fetchProducts } from "../utils/prismic-products";
import {
  fetchTherapyOfferings,
  fetchTrainingOfferings,
  fetchActivitiesOfferings,
  fetchSchoolsOfferings,
} from "../utils/prismic-service-offerings";
import {
  fetchTherapyFAQs,
  fetchTrainingFAQs,
  fetchActivitiesFAQs,
  fetchSchoolsFAQs,
  fetchProductsFAQs,
} from "../utils/prismic-faq";
import { useArticles } from "./useArticles";
import { useVideos } from "./useVideos";
import { useProfileImage } from "./useProfileImage";
import {
  useTrainingOfferings,
  useTherapyOfferings,
  useActivitiesOfferings,
  useSchoolsOfferings,
} from "./useServiceOfferings";
import { useFAQItems } from "./useFAQ";
import { useActivities } from "./useActivities";
import { useHealthTermsButton } from "./useHealthTermsButton";
import { useProducts } from "./useProducts";

// Types for prefetching options
type PrefetchOptions = {
  articles?: boolean;
  trainingArticles?: boolean;
  therapyArticles?: boolean;
  videos?: boolean;
  trainingVideos?: boolean;
  therapyVideos?: boolean;
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
  productsFAQs?: boolean;
  products?: boolean;
  healthTermsButton?: boolean;
};

// Hook for prefetching data during loading screens
export function usePrefetchData(options: PrefetchOptions = {}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const prefetchPromises: Promise<void>[] = [];

    // Prefetch categories (used by both training and therapy articles)
    if (
      options.categories ||
      options.articles ||
      options.trainingArticles ||
      options.therapyArticles
    ) {
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

    // Prefetch training videos
    if (options.videos || options.trainingVideos) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["videos", "training"],
          queryFn: () => fetchVideosFromPrismic("training"),
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch therapy videos
    if (options.videos || options.therapyVideos) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["videos", "therapy"],
          queryFn: () => fetchVideosFromPrismic("therapy"),
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

    // Prefetch products FAQs
    if (options.productsFAQs) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["faqs-products"],
          queryFn: fetchProductsFAQs,
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch products
    if (options.products) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["products"],
          queryFn: fetchProducts,
          staleTime: 10 * 60 * 1000,
        })
      );
    }

    // Prefetch health terms button
    if (options.healthTermsButton) {
      prefetchPromises.push(
        queryClient.prefetchQuery({
          queryKey: ["health-terms-button"],
          queryFn: fetchHealthTermsButtonFromPrismic,
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

// Hook for conditional prefetching based on route
export function usePrefetchForRoute(pathname: string) {
  const isHome = pathname === "/" || pathname === "/home";
  const isTrainingArticles = pathname.startsWith("/training-articles-library");
  const isTherapyArticles = pathname.startsWith("/therapy-articles-library");
  const isTrainingVideos = pathname.startsWith("/training-videos-library");
  const isTherapyVideos = pathname.startsWith("/therapy-videos-library");
  const isTraining =
    pathname.startsWith("/training") &&
    !isTrainingArticles &&
    !isTrainingVideos;
  const isTherapy =
    pathname.startsWith("/therapy") && !isTherapyArticles && !isTherapyVideos;
  const isActivities = pathname.startsWith("/activities");
  const isSchools = pathname.startsWith("/schools");
  const isProducts = pathname.startsWith("/products");

  // Always call all hooks, but with conditional options
  usePrefetchData({
    // Home page data
    heroSlides: isHome,
    profileImage: isTraining || isTherapy,
    activities: isHome || isActivities,
    categories:
      isTrainingArticles ||
      isTherapyArticles ||
      isTrainingVideos ||
      isTherapyVideos ||
      isTraining ||
      isTherapy,
    therapyOfferings: isHome || isTherapy, // For home service cards and therapy page
    trainingOfferings: isHome || isTraining, // For home service cards and training page
    activitiesOfferings: isHome || isActivities, // For home service cards and activities page
    schoolsOfferings: isHome || isSchools, // For home service cards and schools page

    // Page-specific data
    trainingArticles: isTrainingArticles || isTraining,
    therapyArticles: isTherapyArticles || isTherapy,
    trainingVideos: isTrainingVideos || isTraining,
    therapyVideos: isTherapyVideos || isTherapy,
    therapyFAQs: isTherapy, // Prefetch therapy FAQs for therapy page
    trainingFAQs: isTraining, // Prefetch training FAQs for training page
    activitiesFAQs: isActivities, // Prefetch activities FAQs for activities page
    schoolsFAQs: isSchools, // Prefetch schools FAQs for schools page
    productsFAQs: isProducts, // Prefetch products FAQs for products page
    products: isProducts, // Prefetch products for products page
    healthTermsButton: isActivities, // Prefetch health terms button for activities page (summer camp modal)
  });
}

// Hook to track loading state of training page data
export function useTrainingPageLoadingState() {
  // Use the actual hooks to get real loading states
  const { isLoading: articlesLoading } = useArticles("training");
  const { isLoading: videosLoading } = useVideos("training");
  const { isLoading: profileLoading } = useProfileImage();
  const { isLoading: offeringsLoading } = useTrainingOfferings();
  const { isLoading: faqsLoading } = useFAQItems("training");

  // Calculate progress based on completed queries
  const loadingStates = [
    articlesLoading,
    videosLoading,
    profileLoading,
    offeringsLoading,
    faqsLoading,
  ];
  const completedCount = loadingStates.filter((loading) => !loading).length;
  const totalCount = loadingStates.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  const isLoading = loadingStates.some((loading) => loading);

  return { isLoading, progress };
}

// Hook to track loading state of therapy page data
export function useTherapyPageLoadingState() {
  const { isLoading: articlesLoading } = useArticles("therapy");
  const { isLoading: videosLoading } = useVideos("therapy");
  const { isLoading: profileLoading } = useProfileImage();
  const { isLoading: offeringsLoading } = useTherapyOfferings();
  const { isLoading: faqsLoading } = useFAQItems("therapy");

  const loadingStates = [
    articlesLoading,
    videosLoading,
    profileLoading,
    offeringsLoading,
    faqsLoading,
  ];
  const completedCount = loadingStates.filter((loading) => !loading).length;
  const totalCount = loadingStates.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  const isLoading = loadingStates.some((loading) => loading);

  return { isLoading, progress };
}

// Hook to track loading state of activities page data
export function useActivitiesPageLoadingState() {
  const { isLoading: activitiesLoading } = useActivities();
  const { isLoading: profileLoading } = useProfileImage();
  const { isLoading: offeringsLoading } = useActivitiesOfferings();
  const { isLoading: faqsLoading } = useFAQItems("activities");
  const { isLoading: healthTermsLoading } = useHealthTermsButton();

  const loadingStates = [
    activitiesLoading,
    profileLoading,
    offeringsLoading,
    faqsLoading,
    healthTermsLoading,
  ];
  const completedCount = loadingStates.filter((loading) => !loading).length;
  const totalCount = loadingStates.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  const isLoading = loadingStates.some((loading) => loading);

  return { isLoading, progress };
}

// Hook to track loading state of schools page data
export function useSchoolsPageLoadingState() {
  const { isLoading: profileLoading } = useProfileImage();
  const { isLoading: offeringsLoading } = useSchoolsOfferings();
  const { isLoading: faqsLoading } = useFAQItems("schools");

  const loadingStates = [profileLoading, offeringsLoading, faqsLoading];
  const completedCount = loadingStates.filter((loading) => !loading).length;
  const totalCount = loadingStates.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  const isLoading = loadingStates.some((loading) => loading);

  return { isLoading, progress };
}

// Hook to track loading state of products page data
export function useProductsPageLoadingState() {
  const { isLoading: productsLoading } = useProducts();
  const { isLoading: faqsLoading } = useFAQItems("products");

  const loadingStates = [productsLoading, faqsLoading];
  const completedCount = loadingStates.filter((loading) => !loading).length;
  const totalCount = loadingStates.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  const isLoading = loadingStates.some((loading) => loading);

  return { isLoading, progress };
}
