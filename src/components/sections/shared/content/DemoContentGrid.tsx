import { motion } from "framer-motion";
import { getDemoVideos } from "../../../../data/videos";
import { useDemoArticles } from "../../../../hooks/useArticles";
import VideoCard from "../../video_library_page/VideoCard";
import ArticleCard from "../../articles_library_page/ArticleCard";
import LoadingSpinner from "../../../common/StateLoadingSpinner";
import StateDisplay from "../../../common/StateDisplay";
import { AlertCircle } from "lucide-react";
import type { DemoContentGridProps } from "../../../../types/content";

export default function DemoContentGrid({
  contentType,
  pageType,
}: DemoContentGridProps) {
  // Always call hooks at the top level
  const { data: articles = [], isLoading, error } = useDemoArticles(pageType);

  if (contentType === "videos") {
    const videos = getDemoVideos(pageType);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <VideoCard
              key={video.videoKey || index}
              video={video}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    );
  } else {
    if (isLoading) {
      return (
        <LoadingSpinner
          title="טוען מאמרים..."
          description="אנא המתן בזמן שאנחנו מביאים עבורך את המאמרים העדכניים"
        />
      );
    }

    if (error) {
      return (
        <StateDisplay
          icon={AlertCircle}
          title="שגיאה בטעינת המאמרים"
          description="אנא נסה שוב מאוחר יותר"
          iconClassName="w-12 h-12 text-red-500 mb-4"
        />
      );
    }

    if (articles.length === 0) {
      return (
        <StateDisplay
          icon={AlertCircle}
          title="אין מאמרים זמינים"
          description="כרגע אין מאמרים להצגה"
          iconClassName="w-12 h-12 text-gray-400 mb-4"
        />
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article, index) => (
            <ArticleCard
              key={article.articleKey || index}
              article={article}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    );
  }
}
