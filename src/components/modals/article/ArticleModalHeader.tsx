import { useCategories } from "../../../hooks/useCategories";
import { getCategoryColor } from "../../../utils/category-colors";
import { getColorClasses } from "../../../utils/color-classes";
import type { Article } from "../../../types/articles";

interface ArticleModalHeaderProps {
  article: Article;
}

export const ArticleModalHeader = ({ article }: ArticleModalHeaderProps) => {
  // Get all categories from the hook
  const { data: allCategories = [] } = useCategories();

  // Map article categories to their info
  const categoriesInfo = article.categories.map((categoryId) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    return {
      id: categoryId,
      name: category?.name || categoryId,
      color: category?.color || getCategoryColor(categoryId),
    };
  });

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
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-wrap justify-end gap-1 sm:gap-2 max-w-32 sm:max-w-48 md:max-w-56">
          {categoriesInfo.map((categoryInfo) => (
            <div
              key={categoryInfo.id}
              className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getColorClasses(
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
