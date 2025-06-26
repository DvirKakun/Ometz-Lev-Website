import { motion } from "framer-motion";
import ArticleCard from "./ArticleCard";
import EmptyState from "./EmptyState";
import LoadingSpinner from "../../common/StateLoadingSpinner";
import StateDisplay from "../../common/StateDisplay";
import { AlertCircle } from "lucide-react";
import type { ArticlesGridProps } from "../../../types/articles";

const ArticlesGrid = ({ articles, selectedCategory, isLoading, error }: ArticlesGridProps) => {
  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <LoadingSpinner
            title="טוען מאמרים..."
            description="אנא המתן בזמן שאנחנו מביאים עבורך את המאמרים העדכניים"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <StateDisplay
            icon={AlertCircle}
            title="שגיאה בטעינת המאמרים"
            description="אנא נסה שוב מאוחר יותר"
            iconClassName="w-12 h-12 text-red-500 mb-4"
          />
        </div>
      </section>
    );
  }

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
