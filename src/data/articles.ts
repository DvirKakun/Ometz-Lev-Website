import type { Article } from "../types/articles";
// Note: This file is now deprecated in favor of useArticles hooks
// All categories and articles are now fetched from Strapi with automatic color assignment

// Legacy exports for backward compatibility during migration
export const categories = [{ id: "all", name: "כל הקטגוריות", color: "slate" }];
// Legacy data - now replaced by Strapi
export const articles = {
  training: [],
  therapy: [],
};

// Legacy functions - now replaced by useArticles hooks
// These are kept for backward compatibility during migration

export const getArticlesByCategory = (): Article[] => [];
export const getCategoryName = (categoryId: string): string => categoryId;
export const getCategoryColor = (): string => "slate";
export const getArticleCount = (): number => 0;
export const getTotalReadTime = (): string => "0 דקות";
export const getDemoArticles = (): Article[] => [];
