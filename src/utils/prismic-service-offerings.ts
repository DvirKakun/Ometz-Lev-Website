import type {
  ServiceType,
  FullServiceOfferingsDocument,
  SimpleServiceOfferingsDocument,
  ProcessedFullOffering,
  ProcessedSimpleOffering,
  ServiceOfferingsData,
  FullOfferingFields,
  SimpleOfferingFields,
} from "../types/service_offerings";
import { SERVICE_TYPE_CONFIG } from "../types/service_offerings";
import {
  createPrismicClient,
  getPrismicText,
  getPrismicRichText,
  handlePrismicError,
} from "./prismic-config";

// Process individual full offering from Prismic data
function processFullOffering(
  offering: FullOfferingFields,
  index: number,
  serviceType: ServiceType
): ProcessedFullOffering {
  return {
    id: `${serviceType}-offering-${index}`,
    title: getPrismicText(offering.title),
    description: getPrismicRichText(offering.description),
    ctaTitle: getPrismicText(offering.cta_title),
    whatsappMessage: getPrismicText(offering.whatsapp_message),
    isPrimary: Boolean(offering.is_primary),
  };
}

// Process individual simple offering from Prismic data
function processSimpleOffering(
  offering: SimpleOfferingFields,
  index: number,
  serviceType: ServiceType
): ProcessedSimpleOffering {
  return {
    id: `${serviceType}-offering-${index}`,
    title: getPrismicText(offering.title),
    isPrimary: Boolean(offering.is_primary),
  };
}

// Process full service offerings data from Prismic
function processFullServiceOfferingsData(
  document: FullServiceOfferingsDocument,
  serviceType: ServiceType
): ServiceOfferingsData<ProcessedFullOffering> {
  if (!document.data.offerings || !Array.isArray(document.data.offerings)) {
    return {
      offerings: [],
      primaryOfferings: [],
    };
  }

  // Process all offerings
  const offerings = document.data.offerings.map((offering, index) =>
    processFullOffering(offering, index, serviceType)
  );

  // Filter primary offerings (for home page) - first 3 with isPrimary: true
  const primaryOfferings = offerings
    .filter((offering) => offering.isPrimary)
    .slice(0, 3);

  return {
    offerings,
    primaryOfferings,
  };
}

// Process simple service offerings data from Prismic
function processSimpleServiceOfferingsData(
  document: SimpleServiceOfferingsDocument,
  serviceType: ServiceType
): ServiceOfferingsData<ProcessedSimpleOffering> {
  if (!document.data.offerings || !Array.isArray(document.data.offerings)) {
    return {
      offerings: [],
      primaryOfferings: [],
    };
  }

  // Process all offerings
  const offerings = document.data.offerings.map((offering, index) =>
    processSimpleOffering(offering, index, serviceType)
  );

  // Filter primary offerings (for home page) - first 3 with isPrimary: true
  const primaryOfferings = offerings
    .filter((offering) => offering.isPrimary)
    .slice(0, 3);

  return {
    offerings,
    primaryOfferings,
  };
}

// Generic function to fetch service offerings from Prismic
export async function fetchServiceOfferings<T extends ProcessedFullOffering | ProcessedSimpleOffering>(
  serviceType: ServiceType
): Promise<ServiceOfferingsData<T>> {
  try {
    const client = createPrismicClient();
    const config = SERVICE_TYPE_CONFIG[serviceType];
    
    // Fetch the service offerings document
    const document = await client.getSingle(config.documentType);
    
    if (config.hasFullOfferings) {
      return processFullServiceOfferingsData(
        document as FullServiceOfferingsDocument,
        serviceType
      ) as ServiceOfferingsData<T>;
    } else {
      return processSimpleServiceOfferingsData(
        document as SimpleServiceOfferingsDocument,
        serviceType
      ) as ServiceOfferingsData<T>;
    }
  } catch (error) {
    handlePrismicError(error, `${serviceType} offerings`);
    
    // Return empty data on error
    return {
      offerings: [],
      primaryOfferings: [],
    };
  }
}

// Specific fetch functions for each service type
export const fetchTherapyOfferings = () => 
  fetchServiceOfferings<ProcessedFullOffering>("therapy");

export const fetchTrainingOfferings = () => 
  fetchServiceOfferings<ProcessedFullOffering>("training");

export const fetchActivitiesOfferings = () => 
  fetchServiceOfferings<ProcessedSimpleOffering>("activities");

export const fetchSchoolsOfferings = () => 
  fetchServiceOfferings<ProcessedSimpleOffering>("schools");