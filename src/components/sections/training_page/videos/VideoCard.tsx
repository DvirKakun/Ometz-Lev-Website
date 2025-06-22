import { motion } from "framer-motion";
import { Play, Clock, Star, Bookmark } from "lucide-react";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader } from "../../../ui/card";

interface Video {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: string;
  rating: number;
  views: string;
}

interface VideoCardProps {
  video: Video;
  index: number;
}

const VideoCard = ({ video, index }: VideoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative">
          <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800/20">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </motion.div>
            </div>
            
            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {video.duration}
            </div>
            
            <div className="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
              {video.level}
            </div>
          </div>
        </div>
        
        <CardHeader className="pb-4">
          <h3 className="text-xl font-bold text-slate-800 mb-2 text-right group-hover:text-red-600 transition-colors duration-300">
            {video.title}
          </h3>
          <p className="text-slate-600 leading-relaxed text-right">
            {video.description}
          </p>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-slate-700">{video.rating}</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-sm text-slate-500">{video.views}</span>
            </div>
            
            <Button variant="ghost" size="sm">
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
              <Play className="w-4 h-4 mr-2" />
              צפה עכשיו
            </Button>
            <Button variant="outline" size="sm">
              <Clock className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VideoCard;