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

  // Extract categories from the categories group
  const categoriesGroup = data.categories || [];
  const categoryIds = categoriesGroup
    .map((item: any) => (item.category?.id ? String(item.category.id) : null))
    .filter((id: string | null) => id !== null);

  return {
    title: getPrismicTitle(data.title) || "Untitled Article",
    description: getPrismicText(data.description) || "",
    content: getPrismicRichText(data.content) || "",
    categories: categoryIds, // All categories
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
      fetchLinks: ["category.name"], // Fetch linked category data from group
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
