import { motion } from "framer-motion";
import { Video } from "lucide-react";

const VideosHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-center mb-8"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg mb-4">
        <Video className="w-6 h-6 text-white" />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
        מדריכי וידאו
      </h2>
      <p className="text-lg text-slate-600 mb-4">
        סרטוני הדרכה מקצועיים לאילוף כלבים בבית
      </p>
      <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto"></div>
    </motion.div>
  );
};

export default VideosHeader;