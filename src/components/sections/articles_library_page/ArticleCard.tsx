import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { useCategories } from "../../../hooks/useCategories";
import { getCategoryColor } from "../../../utils/category-colors";
import { getColorClasses } from "../../../utils/color-classes";
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
    const category = allCategories.find(cat => cat.id === categoryId);
    return {
      id: categoryId,
      name: category?.name || categoryId,
      color: category?.color || getCategoryColor(categoryId)
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
        {/* Article Header with Category Badge */}
        <div className="relative flex-shrink-0">
          <div className="aspect-video bg-gradient-to-br from-accent-50 to-orange-100 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-accent-800/10 group-hover:bg-accent-800/20 transition-colors">
              <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center shadow-lg mb-2">
                  <span className="text-2xl text-white font-bold">א</span>
                </div>
                <span className="text-sm text-accent-700 font-medium">
                  מאמר
                </span>
              </motion.div>
            </div>

            {/* Read Time Badge */}
            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {article.readTime} דק'
            </div>

            {/* Category Badges */}
            <div className="absolute top-3 right-2 flex flex-wrap gap-1 max-w-32">
              {categoriesInfo.map((categoryInfo) => (
                <div
                  key={categoryInfo.id}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClasses(
                    categoryInfo.color
                  )}`}
                >
                  {categoryInfo.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-2 text-right group-hover:text-accent-600 transition-colors duration-300 line-clamp-2 whitespace-pre-wrap">
            {article.title}
          </h3>
          <p className="text-slate-600 leading-relaxed text-right text-sm mb-4 flex-1 line-clamp-3 whitespace-pre-wrap">
            {article.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-slate-500">
              <User className="w-4 h-4" />
              <span className="text-sm">{article.author}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{article.readTime} דק'</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArticleCard;
