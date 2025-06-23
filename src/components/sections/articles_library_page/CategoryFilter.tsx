import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { categories, getArticlesByCategory } from "../../../data/articles";
import { Button } from "../../ui/button";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onClearFilters: () => void;
}

const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
  onClearFilters,
}: CategoryFilterProps) => {
  const getCategoryColorClasses = (color: string, isSelected: boolean) => {
    if (isSelected) {
      const selectedColorMap = {
        slate: "bg-slate-500 text-white",
        blue: "bg-blue-500 text-white",
        red: "bg-red-500 text-white",
        green: "bg-green-500 text-white",
        orange: "bg-orange-500 text-white",
        purple: "bg-purple-500 text-white",
      };
      return selectedColorMap[color as keyof typeof selectedColorMap] || "bg-slate-500 text-white";
    }
    
    // Default neutral styling for unselected buttons
    return "border-slate-300 text-slate-700 hover:bg-slate-50";
  };

  const hasActiveFilters = selectedCategory !== "all";
  const filteredArticleCount = getArticlesByCategory(selectedCategory, "training").length;

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
              {hasActiveFilters && (
                <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                  {filteredArticleCount} מאמרים
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
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                variant="outline"
                className={`transition-all duration-200 ${getCategoryColorClasses(
                  category.color,
                  selectedCategory === category.id
                )}`}
              >
                {category.name}
                <span className="mr-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {getArticlesByCategory(category.id, "training").length}
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
