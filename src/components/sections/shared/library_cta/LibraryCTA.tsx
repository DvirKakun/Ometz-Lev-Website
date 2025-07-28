import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import { useArticleStats } from "../../../../hooks/useArticles";
import { useVideoStats } from "../../../../hooks/useVideos";
import type { LibraryCTAProps } from "../../../../types/library";

const LibraryCTA = ({
  contentType,
  pageType,
  libraryPath,
  title,
  accentColor,
  buttonText,
}: LibraryCTAProps) => {
  const navigate = useNavigate();

  // Get stats from Prismic
  const { articleCount, totalReadTimeMinutes } = useArticleStats(pageType);
  const { videoCount } = useVideoStats(pageType);

  // Calculate stats based on content type
  const getStats = () => {
    if (contentType === "videos") {
      const videoCountDisplay = videoCount > 25 ? "25+" : videoCount.toString();

      return {
        count: videoCountDisplay,
        countLabel: "סרטונים",
        time: "זמין",
        timeLabel: "לצפייה",
      };
    } else {
      const articleCountDisplay =
        articleCount > 25 ? "25+" : articleCount.toString();
      const totalHours = Math.floor(totalReadTimeMinutes / 60);
      const remainingMinutes = totalReadTimeMinutes % 60;

      return {
        count: articleCountDisplay,
        countLabel: "מאמרים",
        time:
          totalHours > 0
            ? `${totalHours}:${remainingMinutes.toString().padStart(2, "0")}`
            : totalReadTimeMinutes.toString(),
        timeLabel: totalHours > 0 ? "שעות" : "דקות",
      };
    }
  };

  const stats = getStats();

  const handleViewAll = () => {
    const scrollPosition = window.scrollY;
    navigate(libraryPath, {
      state: { scrollPosition },
    });
  };

  const getColorClasses = () => {
    const colorMap = {
      red: {
        bg: "from-red-500/5 to-red-600/10",
        pulse: "bg-red-500",
        text: "text-red-600",
        button: "bg-red-600 hover:bg-red-700",
      },
      accent: {
        bg: "from-accent-500/5 to-orange-600/10",
        pulse: "bg-accent-500",
        text: "text-accent-600",
        button: "bg-accent-600 hover:bg-accent-700",
      },
    };

    return colorMap[accentColor as keyof typeof colorMap] || colorMap.red;
  };

  const colors = getColorClasses();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6"
    >
      {/* Background accent */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colors.bg}`} />

      <div className="relative p-4">
        <div className="flex items-center justify-between">
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-2 h-2 ${colors.pulse} rounded-full animate-pulse`}
              />
              <span className="text-sm font-medium text-slate-700">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className={`font-bold ${colors.text}`}>
                  {stats.count}
                </span>
                <span className="text-slate-500">{stats.countLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${colors.text}`}>{stats.time}</span>
                <span className="text-slate-500">{stats.timeLabel}</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleViewAll}
            size="sm"
            className={`${colors.button} text-white shadow-sm shrink-0`}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default LibraryCTA;
