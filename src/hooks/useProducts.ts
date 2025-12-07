import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../utils/prismic-products";
import type { ProductsData } from "../types/products";

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