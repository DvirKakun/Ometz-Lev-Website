import { useCategoryInfo } from "../../../hooks/useArticles";
import type { Article } from "../../../types/articles";

interface ArticleModalHeaderProps {
  article: Article;
}

export const ArticleModalHeader = ({ article }: ArticleModalHeaderProps) => {
  // Get info for all categories
  const categoriesInfo = article.categories.map((categoryId) => {
    const { name, color } = useCategoryInfo(categoryId);
    return { id: categoryId, name, color };
  });

  const getCategoryColorClasses = (color: string) => {
    const colorMap = {
      slate: "bg-slate-500 text-white",
      blue: "bg-blue-500 text-white",
      red: "bg-red-500 text-white",
      green: "bg-green-500 text-white",
      orange: "bg-orange-500 text-white",
      purple: "bg-purple-500 text-white",
      pink: "bg-pink-500 text-white",
      indigo: "bg-indigo-500 text-white",
      yellow: "bg-yellow-500 text-white",
      teal: "bg-teal-500 text-white",
      cyan: "bg-cyan-500 text-white",
      emerald: "bg-emerald-500 text-white",
      rose: "bg-rose-500 text-white",
      amber: "bg-amber-500 text-white",
      violet: "bg-violet-500 text-white",
    };
    return (
      colorMap[color as keyof typeof colorMap] || "bg-slate-500 text-white"
    );
  };

  return (
    <div className="relative flex-shrink-0">
      <div className="h-28 bg-gradient-to-r from-accent-50 to-orange-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-accent-800/10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-accent-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl text-white font-bold">א</span>
            </div>
            <span className="text-base text-accent-700 font-medium">מאמר</span>
          </div>
        </div>

        {/* Read Time Badge */}
        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-2 rounded text-xs sm:text-sm">
          {article.readTime} דק'
        </div>

        {/* Category Badges */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-wrap gap-1 sm:gap-2 max-w-32 sm:max-w-48 md:max-w-56">
          {categoriesInfo.map((categoryInfo) => (
            <div
              key={categoryInfo.id}
              className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getCategoryColorClasses(
                categoryInfo.color
              )}`}
            >
              {categoryInfo.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
