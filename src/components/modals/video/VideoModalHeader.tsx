import { Play } from "lucide-react";
import { useCategories } from "../../../hooks/useArticles";
import { useLevelInfo } from "../../../hooks/useLevels";
import { getCategoryColor } from "../../../utils/category-colors";
import type { Video } from "../../../types/videos";

interface VideoModalHeaderProps {
  video: Video;
}

export const VideoModalHeader = ({ video }: VideoModalHeaderProps) => {
  // Get all categories from the hook
  const { data: allCategories = [] } = useCategories();
  
  // Map video categories to their info
  const categoriesInfo = video.categories.map((categoryId) => {
    const category = allCategories.find(cat => cat.id === categoryId);
    return {
      id: categoryId,
      name: category?.name || categoryId,
      color: category?.color || getCategoryColor(categoryId)
    };
  });

  // Get level info
  const { name: levelName, color: levelColor } = useLevelInfo(video.levelId);

  const getColorClasses = (color: string) => {
    const colorMap = {
      slate: "bg-slate-500 text-white",
      blue: "bg-blue-500 text-white",
      red: "bg-red-500 text-white",
      green: "bg-green-500 text-white",
      orange: "bg-orange-500 text-white",
      purple: "bg-purple-500 text-white",
      pink: "bg-pink-500 text-white",
      indigo: "bg-indigo-500 text-white",
      yellow: "bg-yellow-500 text-white",
      teal: "bg-teal-500 text-white",
      cyan: "bg-cyan-500 text-white",
      emerald: "bg-emerald-500 text-white",
      rose: "bg-rose-500 text-white",
      amber: "bg-amber-500 text-white",
      violet: "bg-violet-500 text-white",
    };
    return (
      colorMap[color as keyof typeof colorMap] || "bg-slate-500 text-white"
    );
  };

  return (
    <div className="relative flex-shrink-0">
      <div className="h-32 bg-gradient-to-r from-red-50 to-orange-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-red-800/10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
            <span className="text-base text-red-700 font-medium">סרטון</span>
          </div>
        </div>

        {/* Level Badge */}
        <div 
          className={`absolute bottom-2 right-2 sm:bottom-4 sm:right-4 px-2 py-1 sm:px-3 sm:py-2 rounded text-xs sm:text-sm font-medium ${getColorClasses(levelColor)}`}
        >
          {levelName}
        </div>

        {/* Category Badges */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-wrap gap-1 sm:gap-2 max-w-32 sm:max-w-48 md:max-w-56">
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