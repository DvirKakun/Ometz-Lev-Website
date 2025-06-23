import { motion } from "framer-motion";
import { getDemoVideos } from "../../../../data/videos";
import VideosHeader from "./VideosHeader";
import VideoLibraryCTA from "./VideoLibraryCTA";
import VideoCard from "../../video_library_page/VideoCard";

const VideosSection = () => {
  const demoVideos = getDemoVideos();

  return (
    <section id="videos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <VideosHeader />
          
          {/* Demo Videos Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoVideos.map((video, index) => (
                <VideoCard
                  key={video.videoKey || index}
                  video={video}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          <VideoLibraryCTA />
        </motion.div>
      </div>
    </section>
  );
};

export default VideosSection;
