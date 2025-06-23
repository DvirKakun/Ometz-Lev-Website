import { motion } from "framer-motion";
import { type Article } from "../../../data/articles";
import ArticleCard from "./ArticleCard";
import EmptyState from "./EmptyState";

interface ArticlesGridProps {
  articles: Article[];
  selectedCategory: string;
}

const ArticlesGrid = ({ articles, selectedCategory }: ArticlesGridProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          {articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <ArticleCard
                  key={article.articleKey || index}
                  article={article}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <EmptyState selectedCategory={selectedCategory} />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesGrid;
