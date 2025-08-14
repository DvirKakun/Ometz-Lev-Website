export interface Article {
  title: string;
  description: string;
  content?: string;
  readTime: number;
  categories: string[]; // All category IDs
  author: string;
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
}
