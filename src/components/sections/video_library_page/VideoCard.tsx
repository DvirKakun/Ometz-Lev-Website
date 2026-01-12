import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useLevelInfo } from "../../../hooks/useLevels";
import { useCategories } from "../../../hooks/useCategories";
import { useVideoProgress } from "../../../hooks/useVideoProgress";
import { Card, CardContent } from "../../ui/card";
import type { VideoCardProps } from "../../../types/videos";

const VideoCard = ({ video, index, onClick }: VideoCardProps) => {
  // Get level info from hook
  const { name: levelName, color: levelColor } = useLevelInfo(video.levelId);

  // Get all categories from the hook
  const { data: allCategories = [] } = useCategories();

  // Get video progress
  const { data: progress } = useVideoProgress(video.videoKey);

  // Map video categories to their info
  const categoriesInfo = video.categories.map((categoryId) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    return {
      id: categoryId,
      name: category?.name || categoryId,
      color: category?.color || "#64748b",
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
        onClick={() => onClick?.(video)}
      >
        {/* Video Thumbnail */}
        <div className="relative flex-shrink-0">
          <div className="aspect-video relative overflow-hidden">
            {video.thumbnailUrl ? (
              <img
                src={video.thumbnailUrl}
                alt={video.thumbnailAlt || video.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
            )}

            {/* Completed Badge */}
            {progress?.completed && (
              <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>הושלם</span>
              </div>
            )}

            {/* Duration Badge */}
            {video.duration && (
              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded-md text-[10px] sm:text-sm font-medium">
                {video.duration}
              </div>
            )}

            {/* Progress Bar (Netflix-style) */}
            {progress && progress.progress_percent > 0 && !progress.completed && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/50">
                <div
                  className="h-full bg-primary-600 transition-all duration-300"
                  style={{ width: `${Math.min(progress.progress_percent, 100)}%` }}
                />
              </div>
            )}
          </div>
        </div>

        <CardContent className="p-3 sm:p-4 flex-1 flex flex-col min-h-0">
          {/* Category Badges */}
          <div className="flex flex-wrap gap-1 mb-2">
            {categoriesInfo.map((categoryInfo) => (
              <div
                key={categoryInfo.id}
                className="px-2 py-1 rounded-full text-[8px] sm:text-xs font-medium text-white bg-[var(--category-color)]"
                style={
                  {
                    "--category-color": categoryInfo.color,
                  } as React.CSSProperties
                }
              >
                {categoryInfo.name}
              </div>
            ))}
          </div>
          <h3 className="text-sm sm:text-lg font-bold text-slate-800 mb-2 text-right group-hover:text-primary-600 transition-colors duration-300 leading-tight">
            {video.title}
          </h3>
          {video.subtitle && (
            <div className="flex-1 mb-3 sm:mb-4">
              <p className="text-slate-600 text-xs sm:text-sm text-right leading-relaxed">
                {video.subtitle}
              </p>
            </div>
          )}

          {/* Level Info */}
          {video.levelId && (
            <div className="mb-2">
              <span className="text-xs sm:text-sm text-right">
                רמת קושי:{" "}
                <span className="font-medium" style={{ color: levelColor }}>
                  {levelName}
                </span>
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VideoCard;
