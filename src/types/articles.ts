export interface Article {
  title: string;
  description: string;
  readTime: number;
  category: string;
  author: string;
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
}
