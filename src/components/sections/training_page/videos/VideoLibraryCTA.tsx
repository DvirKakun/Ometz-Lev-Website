import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import { videos } from "../../../../data/videos";

const VideoLibraryCTA = () => {
  const navigate = useNavigate();

  // Calculate video count (25+ if over 25)
  const videoCount = videos.length > 25 ? "25+" : videos.length.toString();

  // Calculate total hours from duration strings
  const totalMinutes = videos.reduce((total, video) => {
    const [minutes, seconds] = video.duration.split(":").map(Number);
    return total + minutes + seconds / 60;
  }, 0);
  const totalHours = Math.round(totalMinutes / 60);

  const handleViewAllVideos = () => {
    navigate("/videos-library");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="bg-gradient-to-l from-red-50 to-pink-50 rounded-xl p-6 mb-8 border border-red-100 text-center"
    >
      <h3 className="text-xl font-bold text-slate-800 mb-3">
        ספריית וידאו מקיפה
      </h3>
      <p className="text-base text-slate-600 leading-relaxed max-w-xl mx-auto mb-4">
        גשו לספריית הוידאו המלאה שלנו עם סרטוני הדרכה מקצועיים
      </p>

      <div className="flex justify-center mb-4">
        <Button
          onClick={handleViewAllVideos}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          צפו בכל הסרטונים
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6 text-center">
        <div>
          <div className="text-2xl font-bold text-red-600">{videoCount}</div>
          <div className="text-sm text-slate-600">סרטוני הדרכה</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-red-600">{totalHours}+</div>
          <div className="text-sm text-slate-600">שעות צפייה</div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoLibraryCTA;
