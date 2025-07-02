import { getCategoryColor } from "./category-colors";
import type { Article } from "../types/articles";

// Strapi API configuration
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Create headers for Strapi requests
function createStrapiHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }
  
  return headers;
}

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
    content: strapiArticle.content || '',
    category: strapiArticle.category.id.toString(),
    readTime: strapiArticle.readTime,
    author: strapiArticle.author,
    articleKey: strapiArticle.id.toString(),
  };
}

// Fetch all categories from Strapi (global, not page-specific)
export async function fetchCategoriesFromStrapi() {
  try {
    console.log(
      "🚀 FETCHING CATEGORIES FROM STRAPI - This should only appear once per 10 minutes!"
    );

    const response = await fetch(
      `${STRAPI_URL}/api/categories`,
      {
        headers: createStrapiHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid data format from Strapi");
    }

    const categories = data.data.map(mapStrapiCategory);

    // Always include "all" category at the beginning
    return [{ id: "all", name: "כל הקטגוריות", color: "slate" }, ...categories];
  } catch (error) {
    console.error("Error fetching categories from Strapi:", error);
    throw error;
  }
}

// Fetch articles from Strapi
export async function fetchArticlesFromStrapi(
  page: "training" | "therapy" = "training"
) {
  try {
    console.log(
      `🚀 FETCHING ARTICLES FROM STRAPI (${page}) - This should only appear once per 10 minutes!`
    );

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

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid data format from Strapi");
    }

    return data.data.map(mapStrapiArticle);
  } catch (error) {
    console.error("Error fetching articles from Strapi:", error);
    throw error;
  }
}
