import { motion } from "framer-motion";
import { Play, Clock } from "lucide-react";
import { useLevelInfo } from "../../../hooks/useLevels";
import { useCategoryInfo } from "../../../hooks/useArticles";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import type { VideoCardProps } from "../../../types/videos";

const VideoCard = ({ video, index, onClick }: VideoCardProps) => {
  // Get level and category info from hooks
  const { name: levelName, color: levelColor } = useLevelInfo(video.levelId);
  const { name: categoryName, color: categoryColor } = useCategoryInfo(
    video.categories[0] || ""
  );

  const getColorClasses = (color: string) => {
    const colorMap = {
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
      colorMap[color as keyof typeof colorMap] || "bg-slate-500 text-white"
    );
  };

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

            {/* Category Badge - Only show if category exists */}
            {video.categories.length > 0 && (
              <div
                className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getColorClasses(
                  categoryColor
                )}`}
              >
                {categoryName}
              </div>
            )}
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-2 text-right group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
            {video.title}
          </h3>
          {video.subtitle && (
            <p className="text-slate-500 text-sm text-right mb-2 line-clamp-1">
              {video.subtitle}
            </p>
          )}
          <p className="text-slate-600 leading-relaxed text-right text-sm mb-4 flex-1 line-clamp-3">
            {video.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">וידאו</span>
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
