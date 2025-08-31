import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { useCategories } from "../../../hooks/useCategories";
import type { ArticleCardProps } from "../../../types/articles";

interface ArticleCardPropsWithOnClick extends ArticleCardProps {
  onClick?: () => void;
}

const ArticleCard = ({
  article,
  index,
  onClick,
}: ArticleCardPropsWithOnClick) => {
  // Get all categories from the hook
  const { data: allCategories = [] } = useCategories();

  // Map article categories to their info
  const categoriesInfo = article.categories.map((categoryId) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    return {
      id: categoryId,
      name: category?.name || categoryId,
      color: category?.color || "#64748b",
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card
        className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col"
        onClick={onClick}
      >
        {/* Article Thumbnail */}
        <div className="relative flex-shrink-0">
          <div className="aspect-video relative overflow-hidden">
            {article.thumbnailUrl ? (
              <img
                src={article.thumbnailUrl}
                alt={article.thumbnailAlt || article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-50 to-orange-100" />
            )}

            {/* Read Time Badge */}
            <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded-md text-[8px] sm:text-sm font-medium">
              {article.readTime} דק'
            </div>

            {/* Category Badges */}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {categoriesInfo.slice(0, 2).map((categoryInfo) => (
                <div
                  key={categoryInfo.id}
                  className="w-fit inline-flex px-2 py-1 rounded-full text-[8px] sm:text-xs font-medium text-white bg-[var(--category-color)]"
                  style={{ '--category-color': categoryInfo.color } as React.CSSProperties}
                >
                  {categoryInfo.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <CardContent className="p-3 sm:p-4 flex-1 flex flex-col min-h-0">
          <h3 className="text-sm sm:text-lg font-bold text-slate-800 mb-2 text-right group-hover:text-orange-600 transition-colors duration-300 leading-tight">
            {article.title}
          </h3>
          {article.description && (
            <div className="flex-1 mb-3 sm:mb-4">
              <p className="text-slate-600 text-xs sm:text-sm text-right leading-relaxed">
                {article.description}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="flex items-center gap-1 sm:gap-2 text-slate-500">
              <User className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">
                {article.author}
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 text-slate-500">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">
                {article.readTime} דק'
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArticleCard;
