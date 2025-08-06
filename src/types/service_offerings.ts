import type {
  PrismicDocument,
  GroupField,
  RichTextField,
  BooleanField,
} from "@prismicio/client";

// Raw Prismic field types for offerings
export interface FullOfferingFields {
  title: RichTextField;
  description: RichTextField;
  cta_title: RichTextField;
  whatsapp_message: RichTextField;
  is_primary: BooleanField;
  [key: string]: any;
}

export interface SimpleOfferingFields {
  title: RichTextField;
  is_primary: BooleanField;
  [key: string]: any;
}

// Prismic document types
export interface FullServiceOfferingsDocument extends PrismicDocument {
  data: {
    offerings: GroupField<FullOfferingFields>;
  };
}

export interface SimpleServiceOfferingsDocument extends PrismicDocument {
  data: {
    offerings: GroupField<SimpleOfferingFields>;
  };
}

// Processed offering types for use in components
export interface ProcessedFullOffering {
  id: string;
  title: string;
  description: string;
  ctaTitle: string;
  whatsappMessage: string;
  isPrimary: boolean;
}

export interface ProcessedSimpleOffering {
  id: string;
  title: string;
  isPrimary: boolean;
}

// Service-specific data types
export interface ServiceOfferingsData<
  T = ProcessedFullOffering | ProcessedSimpleOffering
> {
  offerings: T[];
  primaryOfferings: T[]; // First 3 offerings with isPrimary: true
}

// Service type mapping
export type ServiceType = "therapy" | "training" | "activities" | "schools";

export interface ServiceTypeConfig {
  documentType: string;
  hasFullOfferings: boolean;
}

export const SERVICE_TYPE_CONFIG: Record<ServiceType, ServiceTypeConfig> = {
  therapy: {
    documentType: "therapy_offerings",
    hasFullOfferings: true,
  },
  training: {
    documentType: "training_offerings",
    hasFullOfferings: true,
  },
  activities: {
    documentType: "activities_offerings",
    hasFullOfferings: false,
  },
  schools: {
    documentType: "schools_offerings",
    hasFullOfferings: false,
  },
} as const;
