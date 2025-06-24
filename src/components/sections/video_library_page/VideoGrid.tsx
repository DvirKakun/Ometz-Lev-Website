import { motion } from "framer-motion";
import VideoCard from "./VideoCard";
import EmptyState from "./EmptyState";
import type { VideoGridProps } from "../../../types/videos";

const VideoGrid = ({ videos }: VideoGridProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
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
