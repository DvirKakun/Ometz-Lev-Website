import VideosHeader from "./VideosHeader";
import VideoLibraryCTA from "./VideoLibraryCTA";
import { motion } from "framer-motion";
import DemoVideosGrid from "./DemoVideosGrid";

const VideosSection = () => {
  return (
    <section id="videos" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <VideosHeader />

          <VideoLibraryCTA />

          <DemoVideosGrid />
        </motion.div>
      </div>
    </section>
  );
};

export default VideosSection;
