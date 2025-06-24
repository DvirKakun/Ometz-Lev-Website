export interface Article {
  title: string;
  description: string;
  readTime: string;
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
}
