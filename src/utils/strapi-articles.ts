import { getCategoryColor } from "./category-colors";
import type { Article } from "../types/articles";
import {
  STRAPI_URL,
  createStrapiHeaders,
  handleStrapiError,
  validateStrapiResponse,
} from "./strapi-config";

// Strapi API interfaces
interface StrapiCategory {
  id: number;
  name: string;
}

interface StrapiArticle {
  id: number;
  title: string;
  description: string;
  content: string;
  readTime: number;
  author: string;
  page: "training" | "therapy";
  category: StrapiCategory;
}

// Transform Strapi category to our format with automatic color assignment
export function mapStrapiCategory(strapiCategory: StrapiCategory) {
  return {
    id: strapiCategory.id.toString(),
    name: strapiCategory.name,
    color: getCategoryColor(strapiCategory.name),
  };
}

// Transform Strapi article to our format
export function mapStrapiArticle(strapiArticle: StrapiArticle): Article {
  return {
    title: strapiArticle.title,
    description: strapiArticle.description,
    content: strapiArticle.content || "",
    category: strapiArticle.category.id.toString(),
    readTime: strapiArticle.readTime,
    author: strapiArticle.author,
    articleKey: strapiArticle.id.toString(),
  };
}

// Fetch all categories from Strapi (global, not page-specific)
export async function fetchCategoriesFromStrapi() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories`, {
      headers: createStrapiHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    validateStrapiResponse(data, "categories");

    const categories = data.data.map(mapStrapiCategory);

    // Always include "all" category at the beginning
    return [{ id: "all", name: "כל הקטגוריות", color: "slate" }, ...categories];
  } catch (error) {
    handleStrapiError(error, "categories");
    throw error;
  }
}

// Fetch articles from Strapi
export async function fetchArticlesFromStrapi(
  page: "training" | "therapy" = "training"
) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?populate=category&filters[page][$eq]=${page}`,
      {
        headers: createStrapiHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    validateStrapiResponse(data, "articles");

    return data.data.map(mapStrapiArticle);
  } catch (error) {
    handleStrapiError(error, "articles");
    throw error;
  }
}
