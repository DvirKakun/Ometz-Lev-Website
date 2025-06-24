import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { videos } from "../../../data/videos";

const VideoLibraryCTA = () => {
  const navigate = useNavigate();

  // Get training videos specifically
  const trainingVideos = videos.training;

  // Calculate video count (25+ if over 25)
  const videoCount =
    trainingVideos.length > 25 ? "25+" : trainingVideos.length.toString();

  // Calculate total hours from duration strings
  const totalMinutes = trainingVideos.reduce((total, video) => {
    const [minutes, seconds] = video.duration.split(":").map(Number);
    return total + minutes + seconds / 60;
  }, 0);
  const totalHours = Math.round(totalMinutes / 60);

  const handleViewAllVideos = () => {
    const scrollPosition = window.scrollY;
    navigate("/training-videos-library", {
      state: { scrollPosition },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/10" />

      <div className="relative p-4">
        <div className="flex items-center justify-between">
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-700">
                ספריית הווידאו שלנו
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-600">{videoCount}</span>
                <span className="text-slate-500">סרטונים</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-600">{totalHours}+</span>
                <span className="text-slate-500">שעות צפייה</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleViewAllVideos}
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white shadow-sm shrink-0"
          >
            עבור לספרייה
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoLibraryCTA;
