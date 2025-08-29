import { Play, Clock } from "lucide-react";
import { useCategories } from "../../../hooks/useCategories";
import { useLevelInfo } from "../../../hooks/useLevels";
import { getCategoryColor } from "../../../utils/category-colors";
import { getColorClasses } from "../../../utils/color-classes";
import type { Video } from "../../../types/videos";

interface VideoInfoProps {
  video: Video;
}

export const VideoInfo = ({ video }: VideoInfoProps) => {
  const { data: allCategories = [] } = useCategories();
  const { name: levelName, color: levelColor } = useLevelInfo(video.levelId);

  const categoriesInfo = video.categories.map((categoryId) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    return {
      id: categoryId,
      name: category?.name || categoryId,
      color: category?.color || getCategoryColor(categoryId),
    };
  });

  return (
    <div className="bg-white p-4 sm:p-6" dir="rtl">
      {/* Title */}
      <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">
        {video.title}
      </h2>

      {/* Badges - Mobile First */}
      <div className="flex flex-wrap gap-2 mb-4">
        {video.levelId && (
          <div
            className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getColorClasses(levelColor)}`}
          >
            {levelName}
          </div>
        )}
        {categoriesInfo.slice(0, 3).map((categoryInfo) => (
          <div
            key={categoryInfo.id}
            className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${getColorClasses(categoryInfo.color)}`}
          >
            {categoryInfo.name}
          </div>
        ))}
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-3 sm:gap-4 text-gray-500 text-sm mb-4">
        {video.levelId && (
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            <span>{levelName}</span>
          </div>
        )}
        {video.duration && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{video.duration}</span>
          </div>
        )}
      </div>

      {/* Subtitle */}
      {video.subtitle && (
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
          {video.subtitle}
        </p>
      )}

      {/* Description */}
      {video.description && (
        <div className="border-t border-gray-200 pt-4">
          <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
            {video.description}
          </p>
        </div>
      )}
    </div>
  );
};