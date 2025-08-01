import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesFromPrismic } from "../utils/prismic-categories";

// Custom hook for fetching categories with caching (global categories)
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategoriesFromPrismic(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
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