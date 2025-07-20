import type { PrismicDocument } from "@prismicio/client";
import { getCategoryColor } from "./category-colors";
import {
  createPrismicClient,
  getPrismicText,
  handlePrismicError,
} from "./prismic-config";

// Default "all" category
const DEFAULT_ALL_CATEGORY = {
  id: "all",
  name: "כל הקטגוריות",
  color: "slate",
};

// Type for the complete Prismic category document
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismicCategory = PrismicDocument<Record<string, any>>;

// Transform Prismic category to our format with automatic color assignment
export function mapPrismicCategory(prismicCategory: PrismicCategory) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = prismicCategory.data as any;

  const name = getPrismicText(data.name[0].text) || "";

  return {
    id: String(prismicCategory.id),
    name,
    color: getCategoryColor(name),
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
