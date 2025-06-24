import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { levels, categories, getVideosByFilters } from "../../../data/videos";
import { Button } from "../../ui/button";

interface AdvancedFilterProps {
  selectedLevel: string;
  selectedCategory: string;
  onLevelChange: (levelId: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onClearFilters: () => void;
  pageType: "training" | "therapy";
}

const AdvancedFilter = ({
  selectedLevel,
  selectedCategory,
  onLevelChange,
  onCategoryChange,
  onClearFilters,
  pageType,
}: AdvancedFilterProps) => {
  const getColorClasses = (color: string, isSelected: boolean) => {
    if (isSelected) {
      const selectedColorMap = {
        slate: "bg-slate-500 text-white",
        green: "bg-green-500 text-white",
        yellow: "bg-yellow-500 text-white",
        red: "bg-red-500 text-white",
        purple: "bg-purple-500 text-white",
        blue: "bg-blue-500 text-white",
        orange: "bg-orange-500 text-white",
        teal: "bg-teal-500 text-white",
        indigo: "bg-indigo-500 text-white",
        pink: "bg-pink-500 text-white",
      };
      return (
        selectedColorMap[color as keyof typeof selectedColorMap] ||
        "bg-slate-500 text-white"
      );
    }

    // Default neutral styling for unselected buttons
    return "border-slate-300 text-slate-700 hover:bg-slate-50";
  };

  const hasActiveFilters =
    selectedLevel !== "all" || selectedCategory !== "all";
  const filteredVideoCount = getVideosByFilters(
    selectedLevel,
    selectedCategory,
    pageType
  ).length;

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
                סינון וחיפוש
              </h2>
              {hasActiveFilters && (
                <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                  {filteredVideoCount} סרטונים
                </span>
              )}
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
                  className={`transition-all duration-200 ${getColorClasses(
                    category.color,
                    selectedCategory === category.id
                  )}`}
                >
                  {category.name}
                  <span className="mr-2 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                    {getVideosByFilters(selectedLevel, category.id, pageType).length}
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
                  className={`transition-all duration-200 ${getColorClasses(
                    level.color,
                    selectedLevel === level.id
                  )}`}
                >
                  {level.name}
                  <span className="mr-2 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                    {getVideosByFilters(level.id, selectedCategory, pageType).length}
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
