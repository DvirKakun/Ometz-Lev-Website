import { getDemoVideos } from "../../../data/videos";
import { motion } from "framer-motion";
import VideoCard from "../video_library_page/VideoCard";

export default function DemoVideosGrid() {
  const demoVideos = getDemoVideos("training");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoVideos.map((video, index) => (
          <VideoCard
            key={video.videoKey || index}
            video={video}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}
