import { motion } from "framer-motion";
import { Video } from "lucide-react";

const VideoLibraryHeader = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,white_1px,transparent_1px)] bg-[length:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg mb-6">
            <Video className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            ספריית הוידאו
          </h1>
          <p className="text-xl text-red-100 mb-6">
            סרטוני הדרכה מקצועיים לאילוף כלבים בכל הרמות
          </p>
          <div className="w-20 h-1 bg-white/30 rounded-full mx-auto"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoLibraryHeader;