import { motion } from "framer-motion";
import { Play, Clock } from "lucide-react";
import { useLevelInfo } from "../../../hooks/useLevels";
import { useCategories } from "../../../hooks/useCategories";
import { getCategoryColor } from "../../../utils/category-colors";
import { getColorClasses } from "../../../utils/color-classes";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import type { VideoCardProps } from "../../../types/videos";

const VideoCard = ({ video, index, onClick }: VideoCardProps) => {
  // Get level info from hook
  const { name: levelName, color: levelColor } = useLevelInfo(video.levelId);

  // Get all categories from the hook
  const { data: allCategories = [] } = useCategories();

  // Map video categories to their info
  const categoriesInfo = video.categories.map((categoryId) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    return {
      id: categoryId,
      name: category?.name || categoryId,
      color: category?.color || getCategoryColor(categoryId),
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
                alt={video.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
            )}

            <div className="absolute inset-0 flex items-center justify-center bg-slate-800/20 group-hover:bg-slate-800/30 transition-colors">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </motion.div>
            </div>

            {/* Level Badge */}
            <div
              className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getColorClasses(
                levelColor
              )}`}
            >
              {levelName}
            </div>

            {/* Duration Badge */}
            {video.duration && (
              <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
            )}

            {/* Category Badges */}
            <div className="absolute top-3 right-2 flex flex-wrap gap-1 max-w-32">
              {categoriesInfo.map((categoryInfo) => (
                <div
                  key={categoryInfo.id}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClasses(
                    categoryInfo.color
                  )}`}
                >
                  {categoryInfo.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-2 text-right group-hover:text-red-600 transition-colors duration-300 line-clamp-2 whitespace-pre-wrap">
            {video.title}
          </h3>
          {video.subtitle && (
            <p className="text-slate-600 leading-relaxed text-right text-sm mb-4 flex-1 line-clamp-3 whitespace-pre-wrap">
              {video.subtitle}
            </p>
          )}

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{video.duration || "וידאו"}</span>
            </div>

            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(video);
              }}
            >
              צפה
              <Play className="w-4 h-4 mr-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VideoCard;
