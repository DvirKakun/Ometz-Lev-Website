// Page type definition for internal use (English)
export type PageType = "training" | "therapy" | "products";

// Default page type
export const DEFAULT_PAGE_TYPE: PageType = "training";

// Mapping for Prismic article page values (Hebrew)
export const PRISMIC_PAGE_VALUES = {
  training: "אילוף כלבים",
  therapy: "כלבנות טיפולית",
  products: "מוצרים"
} as const;