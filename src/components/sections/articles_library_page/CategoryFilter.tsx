import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { useCategories } from "../../../hooks/useCategories";
import { useArticleCountPerCategory } from "../../../hooks/useArticles";
import { getInteractiveColorClasses } from "../../../utils/color-classes";
import { Button } from "../../ui/button";
import type { CategoryFilterProps } from "../../../types/category";

const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
  onClearFilters,
  pageType,
}: CategoryFilterProps) => {
  const { data: categories = [] } = useCategories();

  const { getCountForCategory } = useArticleCountPerCategory(pageType);

  const hasActiveFilters = selectedCategory !== "all";

  return (
    <section className="py-8 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-800">
                סינון לפי קטגוריה
              </h2>
            </div>

            {hasActiveFilters && (
              <Button
                onClick={onClearFilters}
                variant="outline"
                size="sm"
                className="text-slate-600 hover:text-slate-800"
              >
                <X className="w-4 h-4 ml-1" />
                נקה סינונים
              </Button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                variant="outline"
                className={`transition-all duration-200 ${getInteractiveColorClasses(
                  category.color,
                  selectedCategory === category.id
                )}`}
              >
                {category.name}
                <span className="mr-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {getCountForCategory(category.id)}
                </span>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryFilter;
