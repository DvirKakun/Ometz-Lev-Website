import { motion } from "framer-motion";
import VideosHeader from "./VideosHeader";
import VideoLibraryCTA from "./VideoLibraryCTA";

const VideosSection = () => {
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
          <VideoLibraryCTA />
        </motion.div>
      </div>
    </section>
  );
};

export default VideosSection;
