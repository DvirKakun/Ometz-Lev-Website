import { Clock, User } from "lucide-react";
import { useCategories } from "../../../hooks/useCategories";
import type { Article } from "../../../types/articles";

interface ArticleHeaderProps {
  article: Article;
}

export const ArticleHeader = ({ article }: ArticleHeaderProps) => {
  const { data: allCategories = [] } = useCategories();

  const categoriesInfo = article.categories.map((categoryId) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    return {
      id: categoryId,
      name: category?.name || categoryId,
      color: category?.color || "#64748b",
    };
  });

  return (
    <div
      className="flex-shrink-0 pt-16 px-4 pb-4 sm:pt-16 sm:px-6 sm:pb-6 bg-white border-b border-gray-200"
      dir="rtl"
    >
      {/* Title */}
      <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">
        {article.title}
      </h2>

      {/* Badges - Mobile First */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categoriesInfo.slice(0, 3).map((categoryInfo) => (
          <div
            key={categoryInfo.id}
            className="px-2 py-1 rounded-full text-xs sm:text-sm font-medium text-white bg-[var(--category-color)]"
            style={{ '--category-color': categoryInfo.color } as React.CSSProperties}
          >
            {categoryInfo.name}
          </div>
        ))}
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-3 sm:gap-4 text-gray-500 text-sm">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{article.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{article.readTime} דק'</span>
        </div>
      </div>
    </div>
  );
};
