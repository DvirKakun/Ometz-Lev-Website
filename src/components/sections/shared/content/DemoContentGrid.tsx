import { motion } from "framer-motion";
import { getDemoVideos } from "../../../../data/videos";
import { getDemoArticles } from "../../../../data/articles";
import VideoCard from "../../video_library_page/VideoCard";
import ArticleCard from "../../articles_library_page/ArticleCard";
import type { DemoContentGridProps } from "../../../../types/content";

export default function DemoContentGrid({
  contentType,
  pageType,
}: DemoContentGridProps) {
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
    const articles = getDemoArticles(pageType);

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
