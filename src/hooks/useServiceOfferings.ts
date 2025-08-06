import { useQuery } from "@tanstack/react-query";
import {
  fetchTherapyOfferings,
  fetchTrainingOfferings,
  fetchActivitiesOfferings,
  fetchSchoolsOfferings,
} from "../utils/prismic-service-offerings";
import type {
  ServiceType,
  ProcessedFullOffering,
  ProcessedSimpleOffering,
  ServiceOfferingsData,
} from "../types/service_offerings";

// Generic hook for service offerings
function useServiceOfferingsQuery<T extends ProcessedFullOffering | ProcessedSimpleOffering>(
  serviceType: ServiceType,
  fetchFunction: () => Promise<ServiceOfferingsData<T>>
) {
  return useQuery<ServiceOfferingsData<T>, Error>({
    queryKey: [`${serviceType}-offerings`],
    queryFn: fetchFunction,
    staleTime: 10 * 60 * 1000, // Don't refetch for 10 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when user switches tabs
    refetchOnReconnect: true, // Refetch when internet reconnects
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
}

// Specific hooks for each service type
export const useTherapyOfferings = () =>
  useServiceOfferingsQuery<ProcessedFullOffering>("therapy", fetchTherapyOfferings);

export const useTrainingOfferings = () =>
  useServiceOfferingsQuery<ProcessedFullOffering>("training", fetchTrainingOfferings);

export const useActivitiesOfferings = () =>
  useServiceOfferingsQuery<ProcessedSimpleOffering>("activities", fetchActivitiesOfferings);

export const useSchoolsOfferings = () =>
  useServiceOfferingsQuery<ProcessedSimpleOffering>("schools", fetchSchoolsOfferings);

// Primary offerings hooks (for home page service cards)
export const useTherapyPrimaryOfferings = () => {
  const { data, isLoading, error } = useTherapyOfferings();
  return {
    data: data?.primaryOfferings || [],
    isLoading,
    error,
  };
};

export const useTrainingPrimaryOfferings = () => {
  const { data, isLoading, error } = useTrainingOfferings();
  return {
    data: data?.primaryOfferings || [],
    isLoading,
    error,
  };
};

export const useActivitiesPrimaryOfferings = () => {
  const { data, isLoading, error } = useActivitiesOfferings();
  return {
    data: data?.primaryOfferings || [],
    isLoading,
    error,
  };
};

export const useSchoolsPrimaryOfferings = () => {
  const { data, isLoading, error } = useSchoolsOfferings();
  return {
    data: data?.primaryOfferings || [],
    isLoading,
    error,
  };
};

// Generic hook for primary offerings by service type
export const usePrimaryOfferingsByType = (serviceType: ServiceType) => {
  switch (serviceType) {
    case "therapy":
      return useTherapyPrimaryOfferings();
    case "training":
      return useTrainingPrimaryOfferings();
    case "activities":
      return useActivitiesPrimaryOfferings();
    case "schools":
      return useSchoolsPrimaryOfferings();
    default:
      throw new Error(`Unsupported service type: ${serviceType}`);
  }
};