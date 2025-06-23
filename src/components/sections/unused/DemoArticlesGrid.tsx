import { getDemoArticles } from "../../../data/articles";
import { motion } from "framer-motion";
import ArticleCard from "../articles_library_page/ArticleCard";

export default function DemoArticlesGrid() {
  const demoArticles = getDemoArticles("training");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoArticles.map((article, index) => (
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
