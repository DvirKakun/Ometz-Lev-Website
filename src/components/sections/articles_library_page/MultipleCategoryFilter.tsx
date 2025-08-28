import { motion } from "framer-motion";
import { Filter, X, Check } from "lucide-react";
import { useCategoriesByPage } from "../../../hooks/useCategories";
import {
  useArticles,
  useDynamicArticleCountPerCategory,
} from "../../../hooks/useArticles";
import { Button } from "../../ui/button";
import { getInteractiveColorClasses } from "../../../utils/color-classes";
import type { MultipleCategoryFilterProps } from "../../../types/category";

const MultipleCategoryFilter = ({
  selectedCategories,
  onCategoryToggle,
  onClearFilters,
  pageType,
}: MultipleCategoryFilterProps) => {
  const { data: categories = [] } = useCategoriesByPage(pageType);
  const { data: totalArticles = [] } = useArticles(pageType);
  const { getCountForCategory } = useDynamicArticleCountPerCategory(
    totalArticles,
    selectedCategories
  );

  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <section className="py-4 sm:py-6 lg:py-8 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                סינון
              </h2>
              {hasActiveFilters && !selectedCategories.includes("all") && (
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                  {selectedCategories.length} קטגוריות נבחרו
                </span>
              )}
            </div>

            {hasActiveFilters && !selectedCategories.includes("all") && (
              <Button
                onClick={onClearFilters}
                variant="outline"
                size="sm"
                className="text-slate-600 hover:text-slate-800 shrink-0"
              >
                <X className="w-4 h-4 ml-1" />
                <span className="hidden sm:inline">נקה סינונים</span>
                <span className="sm:hidden">נקה</span>
              </Button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              return (
                <Button
                  key={category.id}
                  onClick={() => onCategoryToggle(category.id)}
                  variant="outline"
                  size="sm"
                  className={`transition-all duration-200 relative text-xs sm:text-sm ${getInteractiveColorClasses(
                    category.color,
                    isSelected
                  )}`}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    {isSelected && <Check className="w-3 h-3 sm:w-4 sm:h-4" />}
                    <span className="truncate max-w-[100px] sm:max-w-none">
                      {category.name}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 sm:px-2 rounded-full text-xs ${
                        isSelected ? "bg-white/20" : "bg-slate-100"
                      }`}
                    >
                      {getCountForCategory(category.id)}
                    </span>
                  </div>
                </Button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MultipleCategoryFilter;
