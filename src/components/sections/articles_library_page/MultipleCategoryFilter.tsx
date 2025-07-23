import { motion } from "framer-motion";
import { Filter, X, Check } from "lucide-react";
import {
  useCategories,
  useArticles,
  useDynamicArticleCountPerCategory,
  useArticlesByMultipleCategories,
} from "../../../hooks/useArticles";
import { Button } from "../../ui/button";
import type { MultipleCategoryFilterProps } from "../../../types/category";

const MultipleCategoryFilter = ({
  selectedCategories,
  onCategoryToggle,
  onClearFilters,
  pageType,
}: MultipleCategoryFilterProps) => {
  const { data: categories = [] } = useCategories();
  const { data: totalArticles = [] } = useArticles(pageType);
  const { data: filteredArticles = [] } = useArticlesByMultipleCategories(
    selectedCategories,
    pageType
  );
  const { getCountForCategory } = useDynamicArticleCountPerCategory(
    filteredArticles,
    totalArticles
  );

  const getCategoryColorClasses = (color: string, isSelected: boolean) => {
    if (isSelected) {
      const selectedColorMap = {
        slate: "bg-slate-500 text-white border-slate-500",
        blue: "bg-blue-500 text-white border-blue-500",
        red: "bg-red-500 text-white border-red-500",
        green: "bg-green-500 text-white border-green-500",
        orange: "bg-orange-500 text-white border-orange-500",
        purple: "bg-purple-500 text-white border-purple-500",
        pink: "bg-pink-500 text-white border-pink-500",
        indigo: "bg-indigo-500 text-white border-indigo-500",
        yellow: "bg-yellow-500 text-white border-yellow-500",
        teal: "bg-teal-500 text-white border-teal-500",
        cyan: "bg-cyan-500 text-white border-cyan-500",
        emerald: "bg-emerald-500 text-white border-emerald-500",
        rose: "bg-rose-500 text-white border-rose-500",
        amber: "bg-amber-500 text-white border-amber-500",
        violet: "bg-violet-500 text-white border-violet-500",
      };
      return (
        selectedColorMap[color as keyof typeof selectedColorMap] ||
        "bg-slate-500 text-white border-slate-500"
      );
    }

    // Default neutral styling for unselected buttons
    return "border-slate-300 text-slate-700 hover:bg-slate-50";
  };

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                  סינון לפי קטגוריות
                </h2>
              </div>
              {hasActiveFilters && !selectedCategories.includes("all") && (
                <span className="bg-accent-100 text-accent-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto">
                  {selectedCategories.length} קטגוריות נבחרו
                </span>
              )}
            </div>

            {hasActiveFilters && !selectedCategories.includes("all") && (
              <Button
                onClick={onClearFilters}
                variant="outline"
                size="sm"
                className="text-slate-600 hover:text-slate-800 w-full sm:w-auto"
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
                  className={`transition-all duration-200 relative text-xs sm:text-sm ${getCategoryColorClasses(
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
