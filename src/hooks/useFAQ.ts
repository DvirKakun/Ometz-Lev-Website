import { useQuery } from "@tanstack/react-query";
import {
  fetchTherapyFAQs,
  fetchTrainingFAQs,
  fetchActivitiesFAQs,
  fetchSchoolsFAQs,
  fetchProductsFAQs,
} from "../utils/prismic-faq";
import type { FAQPageType, ProcessedFAQ } from "../types/faq";

// Generic hook for FAQ data
function useFAQQuery(
  pageType: FAQPageType,
  fetchFunction: () => Promise<ProcessedFAQ[]>
) {
  return useQuery<ProcessedFAQ[], Error>({
    queryKey: [`faqs-${pageType}`],
    queryFn: fetchFunction,
    staleTime: 10 * 60 * 1000, // Don't refetch for 10 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when user switches tabs
    refetchOnReconnect: true, // Refetch when internet reconnects
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
}

// Specific hooks for each page type
export const useTherapyFAQs = () =>
  useFAQQuery("therapy", fetchTherapyFAQs);

export const useTrainingFAQs = () =>
  useFAQQuery("training", fetchTrainingFAQs);

export const useActivitiesFAQs = () =>
  useFAQQuery("activities", fetchActivitiesFAQs);

export const useSchoolsFAQs = () =>
  useFAQQuery("schools", fetchSchoolsFAQs);

export const useProductsFAQs = () =>
  useFAQQuery("products", fetchProductsFAQs);

// Generic hook for FAQs by page type
export const useFAQsByPageType = (pageType: FAQPageType) => {
  // Always call all hooks to maintain hook order
  const therapyResult = useTherapyFAQs();
  const trainingResult = useTrainingFAQs();
  const activitiesResult = useActivitiesFAQs();
  const schoolsResult = useSchoolsFAQs();
  const productsResult = useProductsFAQs();

  // Return the appropriate result based on page type
  switch (pageType) {
    case "therapy":
      return therapyResult;
    case "training":
      return trainingResult;
    case "activities":
      return activitiesResult;
    case "schools":
      return schoolsResult;
    case "products":
      return productsResult;
    default:
      throw new Error(`Unsupported FAQ page type: ${pageType}`);
  }
};

// Hook that returns FAQ data in the format expected by existing components
export const useFAQItems = (pageType: FAQPageType) => {
  const { data, isLoading, error } = useFAQsByPageType(pageType);
  
  // Convert ProcessedFAQ to FAQItem format for compatibility
  const faqItems = data?.map(faq => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    order: faq.order
  })) || [];
  
  return {
    data: faqItems,
    isLoading,
    error,
  };
};