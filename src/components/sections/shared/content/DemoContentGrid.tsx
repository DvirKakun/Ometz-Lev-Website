import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDemoArticles } from "../../../../hooks/useArticles";
import { useDemoVideos } from "../../../../hooks/useVideos";
import { useRouterModal } from "../../../../hooks/useRouterModal";
import VideoCard from "../../video_library_page/VideoCard";
import ArticleCard from "../../articles_library_page/ArticleCard";
import LoadingSpinner from "../../../common/StateLoadingSpinner";
import StateDisplay from "../../../common/StateDisplay";
import { AlertCircle } from "lucide-react";
import type { DemoContentGridProps } from "../../../../types/content";
import type { Article } from "../../../../types/articles";
import type { Video } from "../../../../types/videos";

export default function DemoContentGrid({
  contentType,
  pageType,
}: DemoContentGridProps) {
  const navigate = useNavigate();
  const videoModal = useRouterModal<string>({ modalKey: "video" });

  const handleArticleClick = (article: Article) => {
    const basePath =
      pageType === "training"
        ? "/training-articles-library"
        : "/therapy-articles-library";
    const returnPath = pageType === "training" ? "/training" : "/therapy";
    navigate(`${basePath}/${article.articleKey}`, {
      state: { scrollPosition: window.scrollY, returnPath },
    });
  };

  const handleVideoClick = (video: Video) => {
    const id = video.videoKey || `video-${video.title}`;
    videoModal.openModal(id);
  };

  // Always call hooks at the top level
  const {
    data: articles = [],
    isLoading: articlesLoading,
    error: articlesError,
  } = useDemoArticles(pageType);
  const {
    data: videos = [],
    isLoading: videosLoading,
    error: videosError,
  } = useDemoVideos(pageType);

  const renderContent = () => {
    if (contentType === "videos") {
      if (videosLoading) {
        return (
          <LoadingSpinner
            title="טוען סרטונים..."
            description="אנא המתן בזמן שאנחנו מביאים עבורך את הסרטונים העדכניים"
          />
        );
      }

      if (videosError) {
        return (
          <StateDisplay
            icon={AlertCircle}
            title="שגיאה בטעינת הסרטונים"
            description="אנא נסה שוב מאוחר יותר"
            iconClassName="w-12 h-12 text-red-500 mb-4"
          />
        );
      }

      if (videos.length === 0) {
        return (
          <StateDisplay
            icon={AlertCircle}
            title="אין סרטונים זמינים"
            description="כרגע אין סרטונים להצגה"
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 items-start auto-rows-min">
            {videos.map((video, index) => (
              <VideoCard
                key={video.videoKey || index}
                video={video}
                index={index}
                onClick={handleVideoClick}
              />
            ))}
          </div>
        </motion.div>
      );
    } else {
      if (articlesLoading) {
        return (
          <LoadingSpinner
            title="טוען מדריכים..."
            description="אנא המתן בזמן שאנחנו מביאים עבורך את המדריכים העדכניים"
          />
        );
      }

      if (articlesError) {
        return (
          <StateDisplay
            icon={AlertCircle}
            title="שגיאה בטעינת המדריכים"
            description="אנא נסה שוב מאוחר יותר"
            iconClassName="w-12 h-12 text-red-500 mb-4"
          />
        );
      }

      if (articles.length === 0) {
        return (
          <StateDisplay
            icon={AlertCircle}
            title="אין מדריכים זמינים"
            description="כרגע אין מדריכים להצגה"
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 items-start auto-rows-min">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.articleKey || index}
                article={article}
                index={index}
                onClick={() => handleArticleClick(article)}
              />
            ))}
          </div>
        </motion.div>
      );
    }
  };

  return renderContent();
}
