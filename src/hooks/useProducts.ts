import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../utils/prismic-products";
import type { ProductsData, ProcessedProduct } from "../types/products";

// Hook for fetching products data
export const useProducts = () => {
  return useQuery<ProductsData, Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 10 * 60 * 1000, // Don't refetch for 10 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when user switches tabs
    refetchOnReconnect: true, // Refetch when internet reconnects
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};

// Helper hook to get products by multiple categories (products must include ALL selected categories)
export function useProductsByMultipleCategories(selectedCategories: string[]) {
  const { data: productsData, ...rest } = useProducts();
  const products = productsData?.products || [];

  const filteredProducts =
    selectedCategories.length === 0 || selectedCategories.includes("all")
      ? products // Show all products if no categories selected or "all" is selected
      : products.filter((product: ProcessedProduct) =>
          selectedCategories.every((categoryId) =>
            product.categories.includes(categoryId)
          )
        );

  return {
    data: filteredProducts,
    ...rest,
  };
}

// Helper hook to get dynamic product count per category based on currently filtered products
export function useDynamicProductCountPerCategory(
  totalProducts: ProcessedProduct[],
  selectedCategories: string[]
) {
  const getCountForCategory = (categoryId: string): number => {
    return totalProducts.filter((product: ProcessedProduct) => {
      // Category filter: include this category + all currently selected categories
      let matchesCategories: boolean;
      if (categoryId === "all") {
        // "All" means no category restrictions
        matchesCategories = true;
      } else {
        // Must have this category AND all currently selected categories (except "all")
        const requiredCategories = [...selectedCategories.filter(cat => cat !== "all"), categoryId];
        matchesCategories = requiredCategories.every(catId => product.categories.includes(catId));
      }
      
      return matchesCategories;
    }).length;
  };

  return { getCountForCategory };
}