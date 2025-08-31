import { motion } from "framer-motion";
import { Filter, X, Check } from "lucide-react";
import { useLevels } from "../../../hooks/useLevels";
import { useCategoriesByPage } from "../../../hooks/useCategories";
import {
  useVideos,
  useDynamicVideoCountPerCategory,
  useDynamicVideoCountPerLevel,
} from "../../../hooks/useVideos";
import { Button } from "../../ui/button";
import { getInteractiveColorClasses } from "../../../utils/color-classes";

interface VideoAdvancedFilterProps {
  selectedCategories: string[];
  selectedLevel: string;
  onCategoryToggle: (categoryId: string) => void;
  onLevelChange: (levelId: string) => void;
  onClearFilters: () => void;
  pageType: "training" | "therapy";
}

const VideoAdvancedFilter = ({
  selectedCategories,
  selectedLevel,
  onCategoryToggle,
  onLevelChange,
  onClearFilters,
  pageType,
}: VideoAdvancedFilterProps) => {
  const { data: categories = [] } = useCategoriesByPage(pageType);
  const { data: levels = [] } = useLevels();
  const { data: totalVideos = [] } = useVideos(pageType);

  const { getCountForCategory } = useDynamicVideoCountPerCategory(
    totalVideos,
    selectedCategories,
    selectedLevel
  );

  const { getCountForLevel } = useDynamicVideoCountPerLevel(
    totalVideos,
    selectedCategories
  );

  const hasActiveFilters =
    (!selectedCategories.includes("all") && selectedCategories.length > 0) ||
    selectedLevel !== "all";

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
              {hasActiveFilters && (
                <div className="flex gap-2">
                  {!selectedCategories.includes("all") &&
                    selectedCategories.length > 0 && (
                      <span className="bg-primary-100 text-primary-900 px-2 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                        {selectedCategories.length} קטגוריות נבחרו
                      </span>
                    )}
                  {selectedLevel !== "all" && (
                    <span className="bg-primary-100 text-primary-900 px-2 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                      רמה נבחרה
                    </span>
                  )}
                </div>
              )}
            </div>

            {hasActiveFilters && (
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
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              קטגוריות
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.id);
                return (
                  <Button
                    key={category.id}
                    onClick={() => onCategoryToggle(category.id)}
                    variant="outline"
                    size="sm"
                    className={`transition-all duration-200 relative text-xs sm:text-sm w-full sm:w-auto justify-start ${getInteractiveColorClasses(
                      category.color,
                      isSelected
                    )}`}
                    style={
                      isSelected && category.color.startsWith('#')
                        ? ({ '--interactive-color': category.color } as React.CSSProperties)
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      {isSelected && (
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
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
          </div>

          {/* Level Filter */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              רמת קושי
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              {levels.map((level) => (
                <Button
                  key={level.id}
                  onClick={() => onLevelChange(level.id)}
                  variant="outline"
                  size="sm"
                  className={`transition-all duration-200 text-xs sm:text-sm w-full sm:w-auto justify-start ${getInteractiveColorClasses(
                    level.color,
                    selectedLevel === level.id
                  )}`}
                  style={
                    selectedLevel === level.id && level.color.startsWith('#')
                      ? ({ '--interactive-color': level.color } as React.CSSProperties)
                      : undefined
                  }
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    {selectedLevel === level.id && (
                      <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                    <span className="truncate">{level.name}</span>
                    <span
                      className={`px-1.5 py-0.5 sm:px-2 rounded-full text-xs ${
                        selectedLevel === level.id
                          ? "bg-white/20"
                          : "bg-slate-100"
                      }`}
                    >
                      {getCountForLevel(level.id)}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoAdvancedFilter;
