import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { getArticleCount, getTotalReadTime } from "../../../data/articles";

const ArticlesLibraryCTA = () => {
  const navigate = useNavigate();

  // Get training articles data
  const articleCountNum = getArticleCount("training");
  const articleCount =
    articleCountNum > 25 ? "25+" : articleCountNum.toString();

  // Get total read time for training articles
  const totalReadTime = getTotalReadTime("training");
  const totalMinutes = parseInt(totalReadTime.replace(/[^\d]/g, ""));
  const totalHours = Math.round(totalMinutes / 60);

  const handleViewAllArticles = () => {
    const scrollPosition = window.scrollY;
    navigate("/articles-library", {
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
      <div className="absolute inset-0 bg-gradient-to-r from-accent-500/5 to-orange-600/10" />

      <div className="relative p-4">
        <div className="flex items-center justify-between">
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-700">
                ספריית המאמרים שלנו
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold text-accent-600">
                  {articleCount}
                </span>
                <span className="text-slate-500">מאמרים</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-accent-600">
                  {totalHours > 0 ? `${totalHours}+` : `${totalMinutes}`}
                </span>
                <span className="text-slate-500">
                  {totalHours > 0 ? "שעות קריאה" : "דקות קריאה"}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleViewAllArticles}
            size="sm"
            className="bg-accent-600 hover:bg-accent-700 text-white shadow-sm shrink-0"
          >
            עבור לספרייה
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticlesLibraryCTA;
