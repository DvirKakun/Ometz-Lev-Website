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
      : articles.filter((article: Article) => article.category === categoryId);

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

  // Get unique categories represented in articles (now by category name)
  const categoriesInArticles = [
    ...new Set(articles.map((article: Article) => article.category)),
  ];

  // Try to get one article from each of the first 3 categories
  const demoArticles = categoriesInArticles
    .slice(0, 3)
    .map((categoryName) =>
      articles.find((article: Article) => article.category === categoryName)
    )
    .filter(Boolean) as Article[];

  // If we don't have 3 articles, fill with first articles
  if (demoArticles.length < 3) {
    const remaining = 3 - demoArticles.length;
    const additionalArticles = articles
      .filter(
        (article: Article) =>
          !demoArticles.some((demo) => demo.articleKey === article.articleKey)
      )
      .slice(0, remaining);
    demoArticles.push(...additionalArticles);
  }

  return {
    data: demoArticles.slice(0, 3),
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

    return articles.filter(
      (article: Article) => article.category === categoryId
    ).length;
  };

  return { getCountForCategory };
}
