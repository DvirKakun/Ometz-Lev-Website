import { useQuery } from "@tanstack/react-query";
import { fetchArticlesFromPrismic } from "../utils/prismic-articles";
import type { Article } from "../types/articles";

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

// Helper hook for demo articles (4 articles from different categories)
export function useDemoArticles(page: "training" | "therapy" = "training") {
  const { data: articles = [], ...rest } = useArticles(page);

  return {
    data: articles.slice(0, 4),
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
  totalArticles: Article[],
  selectedCategories: string[]
) {
  const getCountForCategory = (categoryId: string): number => {
    return totalArticles.filter((article: Article) => {
      // Category filter: include this category + all currently selected categories
      let matchesCategories: boolean;
      if (categoryId === "all") {
        // "All" means no category restrictions
        matchesCategories = true;
      } else {
        // Must have this category AND all currently selected categories (except "all")
        const requiredCategories = [...selectedCategories.filter(cat => cat !== "all"), categoryId];
        matchesCategories = requiredCategories.every(catId => article.categories.includes(catId));
      }
      
      return matchesCategories;
    }).length;
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
