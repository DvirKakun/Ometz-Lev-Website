import { motion } from "framer-motion";
import { Play, Clock } from "lucide-react";
import { type Video, getLevelName, getLevelColor } from "../../../data/videos";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

interface VideoCardProps {
  video: Video;
  index: number;
}

const VideoCard = ({ video, index }: VideoCardProps) => {
  const getLevelColorClasses = (color: string) => {
    const colorMap = {
      slate: "bg-slate-500 text-white",
      green: "bg-green-500 text-white",
      yellow: "bg-yellow-500 text-white",
      red: "bg-red-500 text-white",
      purple: "bg-purple-500 text-white",
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
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
        {/* Video Thumbnail */}
        <div className="relative">
          <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800/20 group-hover:bg-slate-800/30 transition-colors">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </motion.div>
            </div>

            {/* Duration Badge */}
            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {video.duration}
            </div>

            {/* Level Badge */}
            <div
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-medium ${getLevelColorClasses(
                getLevelColor(video.level)
              )}`}
            >
              {getLevelName(video.level)}
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="text-lg font-bold text-slate-800 mb-2 text-right group-hover:text-red-600 transition-colors duration-300">
            {video.title}
          </h3>
          <p className="text-slate-600 leading-relaxed text-right text-sm mb-4">
            {video.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{video.duration}</span>
            </div>

            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
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
