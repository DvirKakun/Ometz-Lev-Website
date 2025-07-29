import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { useLevels } from "../../../hooks/useLevels";
import { useCategories } from "../../../hooks/useCategories";
import {
  useVideoCountPerCategory,
  useVideoCountPerLevel,
} from "../../../hooks/useVideos";
import { getInteractiveColorClasses } from "../../../utils/color-classes";
import { Button } from "../../ui/button";
import type { AdvancedFilterProps } from "../../../types/library";

const AdvancedFilter = ({
  selectedLevel,
  selectedCategory,
  onLevelChange,
  onCategoryChange,
  onClearFilters,
  pageType,
}: AdvancedFilterProps) => {
  // Get data from Prismic
  const { data: levels = [] } = useLevels();
  const { data: categories = [] } = useCategories();
  const { getCountForCategory } = useVideoCountPerCategory(pageType);
  const { getCountForLevel } = useVideoCountPerLevel(pageType);

  const hasActiveFilters =
    selectedLevel !== "all" || selectedCategory !== "all";

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
                סינון לפי קטגוריה ורמת קושי
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
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700 mb-3">קטגוריה</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  variant="outline"
                  size="sm"
                  className={`transition-all duration-200 ${getInteractiveColorClasses(
                    category.color,
                    selectedCategory === category.id
                  )}`}
                >
                  {category.name}
                  <span className="mr-2 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                    {getCountForCategory(category.id)}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              רמת קושי
            </h3>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <Button
                  key={level.id}
                  onClick={() => onLevelChange(level.id)}
                  variant="outline"
                  size="sm"
                  className={`transition-all duration-200 ${getInteractiveColorClasses(
                    level.color,
                    selectedLevel === level.id
                  )}`}
                >
                  {level.name}
                  <span className="mr-2 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                    {getCountForLevel(level.id)}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvancedFilter;
