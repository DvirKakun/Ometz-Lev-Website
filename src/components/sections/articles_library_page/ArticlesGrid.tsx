import { motion } from "framer-motion";
import { useArticleModal } from "../../../hooks/useArticleModal";
import ArticleCard from "./ArticleCard";
import ArticleModal from "../../modals/article/ArticleModal";
import EmptyState from "./EmptyState";
import LoadingSpinner from "../../common/StateLoadingSpinner";
import StateDisplay from "../../common/StateDisplay";
import { AlertCircle } from "lucide-react";
import type { ArticlesGridProps, Article } from "../../../types/articles";

const ArticlesGrid = ({
  articles,
  isLoading,
  error,
  hasActiveFilters = false,
  totalArticlesCount = 0,
  pageType = "training",
}: ArticlesGridProps) => {
  const articleModal = useArticleModal();

  const handleArticleClick = (article: Article) => {
    articleModal.openModal(article);
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

        {/* Article Modal */}
        <ArticleModal
          isOpen={articleModal.isOpen}
          onOpenChange={articleModal.onOpenChange}
          articleId={articleModal.articleId}
          pageType={pageType}
        />
      </div>
    </section>
  );
};

export default ArticlesGrid;
