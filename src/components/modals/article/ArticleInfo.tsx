import type { Article } from "../../../types/articles";

interface ArticleInfoProps {
  article: Article;
}

export const ArticleInfo = ({ article }: ArticleInfoProps) => {
  return (
    <div className="p-4 sm:p-6">
      {/* Description */}
      {article.description && (
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
          {article.description}
        </p>
      )}

      {/* Content */}
      {article.content && (
        <div className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
          {article.content}
        </div>
      )}
    </div>
  );
};
