import type { PrismicDocument } from "@prismicio/client";
import { PRISMIC_PAGE_VALUES } from "../types/page";
import {
  createPrismicClient,
  getPrismicText,
  handlePrismicError,
} from "./prismic-config";

// Default "all" category
const DEFAULT_ALL_CATEGORY = {
  id: "all",
  name: "כל הקטגוריות",
  color: "#64748b",
};

// Type for the complete Prismic category document
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismicCategory = PrismicDocument<Record<string, any>>;

// Transform Prismic category to our format using color from API
export function mapPrismicCategory(prismicCategory: PrismicCategory) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = prismicCategory.data as any;

  const name = getPrismicText(data.name[0].text) || "";
  const page = data.page || "";
  const color = data.color || "#64748b"; // Use color from Prismic or fallback to slate

  return {
    id: String(prismicCategory.id),
    name,
    color,
    page,
  };
}

// Fetch all categories from Prismic
export async function fetchCategoriesFromPrismic() {
  try {
    const client = createPrismicClient();
    const response = await client.getAllByType("category");

    if (!response || !Array.isArray(response) || response.length === 0) {
      return [DEFAULT_ALL_CATEGORY];
    }
    const categories = response.map(mapPrismicCategory);
    return [DEFAULT_ALL_CATEGORY, ...categories];
  } catch (error) {
    handlePrismicError(error, "categories");
    return [DEFAULT_ALL_CATEGORY];
  }
}

// Fetch categories filtered by page
export async function fetchCategoriesByPage(pageType: "training" | "therapy") {
  try {
    const client = createPrismicClient();
    const response = await client.getAllByType("category");

    if (!response || !Array.isArray(response) || response.length === 0) {
      return [DEFAULT_ALL_CATEGORY];
    }

    const targetPage = PRISMIC_PAGE_VALUES[pageType];

    // Filter categories by page field and map them
    const categories = response
      .filter((category) => {
        const data = category.data as any;
        return data.page === targetPage;
      })
      .map(mapPrismicCategory);

    return [DEFAULT_ALL_CATEGORY, ...categories];
  } catch (error) {
    handlePrismicError(error, `categories for ${pageType} page`);
    return [DEFAULT_ALL_CATEGORY];
  }
}
