export interface Article {
  title: string;
  description: string;
  url: string; // URL to the PDF file from Prismic
  readTime: number;
  categories: string[]; // All category IDs
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  articleKey?: string;
}

export interface ArticleCardProps {
  article: Article;
  index: number;
}

export interface ArticlesGridProps {
  articles: Article[];
  selectedCategory: string;
  isLoading?: boolean;
  error?: Error | null;
  hasActiveFilters?: boolean;
  totalArticlesCount?: number;
  pageType?: "training" | "therapy";
}
