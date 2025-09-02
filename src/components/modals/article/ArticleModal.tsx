import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleInfo } from "./ArticleInfo";
import { useArticles } from "../../../hooks/useArticles";
import type { ArticleModalProps } from "../../../types/modals";

const ArticleModal = ({
  isOpen,
  onOpenChange,
  articleId,
  pageType = "training",
}: ArticleModalProps) => {
  const { data: articles = [] } = useArticles(pageType);

  if (!isOpen || !articleId) return null;

  const article = articles.find(
    (a) => a.articleKey === articleId || `article-${a.title}` === articleId
  );

  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full h-full sm:max-w-4xl sm:w-[95vw] sm:max-h-[90vh] overflow-hidden p-0 border-0 shadow-2xl sm:rounded-lg [&>button]:bg-white/90 [&>button]:text-gray-900 [&>button]:hover:bg-white [&>button]:backdrop-blur-sm [&>button]:rounded-full"
        dir="rtl"
      >
        <DialogTitle className="sr-only">{article.title}</DialogTitle>
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                scale: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
              }}
              className="flex flex-col bg-white rounded-lg overflow-hidden h-full"
            >
              {/* Hidden element to capture initial focus */}
              <div tabIndex={0} className="sr-only">
                פתיחת מאמר
              </div>

              {/* Fixed Header Section */}
              <ArticleHeader article={article} />

              {/* Scrollable Content */}
              <div
                className="overflow-y-auto bg-white flex-1"
                dir="ltr"
                style={{
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <div dir="rtl">
                  <ArticleInfo article={article} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleModal;
