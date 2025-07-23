import { useQuery } from "@tanstack/react-query";
import { fetchArticlesFromPrismic } from "../utils/prismic-articles";
import { fetchCategoriesFromPrismic } from "../utils/prismic-categories";
import type { Article } from "../types/articles";

// Custom hook for fetching categories with caching (global categories)
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategoriesFromPrismic(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Custom hook for fetching articles with caching
export function useArticles(page: "training" | "therapy" = "training") {
  return useQuery({
    queryKey: ["articles", page], // Changed key to avoid conflicts
    queryFn: () => fetchArticlesFromPrismic(page),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Helper hook to get articles by category
export function useArticlesByCategory(
  categoryId: string,
  page: "training" | "therapy" = "training"
) {
  const { data: articles = [], ...rest } = useArticles(page);

  const filteredArticles =
    categoryId === "all"
      ? articles
      : articles.filter((article: Article) =>
          article.categories.includes(categoryId)
        );

  return {
    data: filteredArticles,
    ...rest,
  };
}

// Helper hook to get category name and color
export function useCategoryInfo(categoryId: string) {
  const { data: categories = [] } = useCategories();

  const category = categories.find((c) => c.id === categoryId);

  return {
    name: category?.name || categoryId,
    color: category?.color || "slate",
  };
}

// Helper hook for demo articles (3 articles from different categories)
export function useDemoArticles(page: "training" | "therapy" = "training") {
  const { data: articles = [], ...rest } = useArticles(page);

  return {
    data: articles.slice(0, 3),
    ...rest,
  };
}
// Helper hook for article statistics
export function useArticleStats(page: "training" | "therapy" = "training") {
  const { data: articles = [] } = useArticles(page);

  const articleCount = articles.length;

  const totalReadTimeMinutes = articles.reduce(
    (total: number, article: Article) => {
      return total + article.readTime;
    },
    0
  );

  return {
    articleCount,
    totalReadTimeMinutes,
  };
}

// Helper hook to get article count per category for a specific page
export function useArticleCountPerCategory(
  page: "training" | "therapy" = "training"
) {
  const { data: articles = [] } = useArticles(page);

  const getCountForCategory = (categoryId: string): number => {
    if (categoryId === "all") return articles.length;

    return articles.filter((article: Article) =>
      article.categories.includes(categoryId)
    ).length;
  };

  return { getCountForCategory };
}

// Helper hook to get dynamic article count per category based on currently filtered articles
export function useDynamicArticleCountPerCategory(
  filteredArticles: Article[],
  totalArticles: Article[]
) {
  const getCountForCategory = (categoryId: string): number => {
    if (categoryId === "all") return totalArticles.length; // Always show total for "all"

    return filteredArticles.filter((article: Article) =>
      article.categories.includes(categoryId)
    ).length;
  };

  return { getCountForCategory };
}

// Helper hook to get articles by multiple categories (articles must include ALL selected categories)
export function useArticlesByMultipleCategories(
  selectedCategories: string[],
  page: "training" | "therapy" = "training"
) {
  const { data: articles = [], ...rest } = useArticles(page);

  const filteredArticles =
    selectedCategories.length === 0 || selectedCategories.includes("all")
      ? articles // Show all articles if no categories selected or "all" is selected
      : articles.filter((article: Article) =>
          selectedCategories.every((categoryId) =>
            article.categories.includes(categoryId)
          )
        );

  return {
    data: filteredArticles,
    ...rest,
  };
}
