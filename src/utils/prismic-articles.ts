import type { PrismicDocument } from "@prismicio/client";
import type { Article } from "../types/articles";
import { PRISMIC_PAGE_VALUES } from "../types/page";
import {
  createPrismicClient,
  getPrismicText,
  getPrismicTitle,
  getPrismicRichText,
  handlePrismicError,
} from "./prismic-config";

// Type for the complete Prismic article document
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismicArticle = PrismicDocument<Record<string, any>>;

// Transform Prismic article to our format
export function mapPrismicArticle(prismicArticle: PrismicArticle): Article {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = prismicArticle.data as any;

  // Get category ID from the linked category document
  const categoryId = data.category?.id ? String(data.category.id) : "all";

  return {
    title: getPrismicTitle(data.title) || "Untitled Article",
    description: getPrismicText(data.description) || "",
    content: getPrismicRichText(data.content) || "",
    category: categoryId, // Now stores category ID for proper color matching
    readTime: Number(data.read_time) || 5,
    author: getPrismicText(data.author) || "Unknown Author",
    articleKey: String(prismicArticle.id),
  };
}

// Fetch articles from Prismic
export async function fetchArticlesFromPrismic(
  page: "training" | "therapy" = "training"
): Promise<Article[]> {
  try {
    const client = createPrismicClient();

    const response = await client.getAllByType("article", {
      fetchLinks: ["category.name"], // Fetch linked category data
    });

    // Filter by page after fetching, using Hebrew values from Prismic
    const hebrewPageValue = PRISMIC_PAGE_VALUES[page];
    const filteredResponse = response.filter((article: any) => {
      return article.data.page === hebrewPageValue;
    });

    if (!filteredResponse || !Array.isArray(filteredResponse)) {
      return [];
    }

    if (filteredResponse.length === 0) {
      return [];
    }

    return filteredResponse.map(mapPrismicArticle);
  } catch (error) {
    handlePrismicError(error, "articles");
    return [];
  }
}
