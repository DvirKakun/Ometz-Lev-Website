import { motion } from "framer-motion";
import { useState } from "react";
import { useDemoArticles } from "../../../../hooks/useArticles";
import { useDemoVideos } from "../../../../hooks/useVideos";
import VideoCard from "../../video_library_page/VideoCard";
import ArticleCard from "../../articles_library_page/ArticleCard";
import ArticleModal from "../../../modals/article/ArticleModal";
import VideoModal from "../../../modals/video/VideoModal";
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
  // Modal states
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsArticleModalOpen(true);
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const handleCloseArticleModal = () => {
    setIsArticleModalOpen(false);
    setSelectedArticle(null);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  // Always call hooks at the top level
  const { data: articles = [], isLoading: articlesLoading, error: articlesError } = useDemoArticles(pageType);
  const { data: videos = [], isLoading: videosLoading, error: videosError } = useDemoVideos(pageType);

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <VideoCard
              key={video.videoKey || index}
              video={video}
              index={index}
              onClick={handleVideoClick}
            />
          ))}
        </div>
        
        {/* Video Modal */}
        <VideoModal
          video={selectedVideo}
          isOpen={isVideoModalOpen}
          onClose={handleCloseVideoModal}
        />
      </motion.div>
    );
  } else {
    if (articlesLoading) {
      return (
        <LoadingSpinner
          title="טוען מאמרים..."
          description="אנא המתן בזמן שאנחנו מביאים עבורך את המאמרים העדכניים"
        />
      );
    }

    if (articlesError) {
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
              onClick={() => handleArticleClick(article)}
            />
          ))}
        </div>
        
        <ArticleModal
          article={selectedArticle}
          isOpen={isArticleModalOpen}
          onClose={handleCloseArticleModal}
        />
      </motion.div>
    );
  }
}
