import { motion } from "framer-motion";
import { Video } from "lucide-react";

const VideosHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-lg mb-6">
        <Video className="w-8 h-8 text-white" />
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
        מדריכי וידאו
      </h2>
      <p className="text-xl text-slate-600 mb-6">
        סרטוני הדרכה מקצועיים לאילוף כלבים בבית
      </p>
      <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto"></div>
    </motion.div>
  );
};

export default VideosHeader;