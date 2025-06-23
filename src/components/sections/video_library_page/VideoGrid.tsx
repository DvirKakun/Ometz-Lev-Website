import { motion } from "framer-motion";
import { type Video, getLevelName } from "../../../data/videos";
import VideoCard from "./VideoCard";
import EmptyState from "./EmptyState";

interface VideoGridProps {
  videos: Video[];
  selectedLevel: string;
}

const VideoGrid = ({ videos, selectedLevel }: VideoGridProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {getLevelName(selectedLevel)} ({videos.length} סרטונים)
            </h2>
            <p className="text-slate-600">בחרו סרטון כדי להתחיל לצפות</p>
          </div>

          {videos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <VideoCard
                  key={video.videoKey || index}
                  video={video}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoGrid;
