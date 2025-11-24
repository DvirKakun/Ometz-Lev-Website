import type { ProcessedFullOffering, ProcessedSimpleOffering } from "../types/service_offerings";
import { serviceOfferingsFallbacks } from "../data/fallbacks/service-offerings-fallback";

/**
 * Utility function to provide fallback content for SEO
 * 
 * Priority:
 * 1. Use Prismic data if available and loaded
 * 2. Use static fallback content for immediate SEO
 * 
 * This ensures search engines always see meaningful content
 */

type ServiceType = keyof typeof serviceOfferingsFallbacks;

export function getOfferingsWithFallback<T extends ProcessedFullOffering | ProcessedSimpleOffering>(
  prismicData: T[] | undefined,
  serviceType: ServiceType,
  takePrimary: boolean = false
): T[] {
  // Use Prismic data if available and not empty
  if (prismicData && prismicData.length > 0) {
    return takePrimary 
      ? prismicData.filter((offering) => offering.isPrimary).slice(0, 3)
      : prismicData;
  }

  // Use fallback data for SEO
  const fallbackData = serviceOfferingsFallbacks[serviceType] as T[];
  
  return takePrimary 
    ? fallbackData.filter((offering) => offering.isPrimary).slice(0, 3)
    : fallbackData;
}

/**
 * Get primary offerings specifically for HomePage display
 */
export function getPrimaryOfferingsWithFallback<T extends ProcessedFullOffering | ProcessedSimpleOffering>(
  prismicData: T[] | undefined,
  serviceType: ServiceType
): T[] {
  return getOfferingsWithFallback(prismicData, serviceType, true);
}