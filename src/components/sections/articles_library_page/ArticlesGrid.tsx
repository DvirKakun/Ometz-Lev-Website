import { motion } from "framer-motion";
import { useState } from "react";
import ArticleCard from "./ArticleCard";
import EmptyState from "./EmptyState";
import LoadingSpinner from "../../common/StateLoadingSpinner";
import StateDisplay from "../../common/StateDisplay";
import ArticleModal from "../../modals/article/ArticleModal";
import { AlertCircle } from "lucide-react";
import { useModalBackButton } from "../../../hooks/useModalBackButton";
import type { ArticlesGridProps, Article } from "../../../types/articles";

const ArticlesGrid = ({
  articles,
  isLoading,
  error,
  hasActiveFilters = false,
  totalArticlesCount = 0,
}: ArticlesGridProps) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle back button for modal
  useModalBackButton({
    isOpen: isModalOpen,
    onClose: () => setIsModalOpen(false),
  });

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 items-start auto-rows-min">
              {articles.map((article, index) => (
                <ArticleCard
                  key={article.articleKey || index}
                  article={article}
                  index={index}
                  onClick={() => handleArticleClick(article)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              hasActiveFilters={hasActiveFilters}
              totalArticlesCount={totalArticlesCount}
            />
          )}
        </motion.div>

        <ArticleModal
          article={selectedArticle}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
};

export default ArticlesGrid;
