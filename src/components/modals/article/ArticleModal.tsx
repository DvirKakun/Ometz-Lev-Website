import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "../../ui/dialog";
import { ArticleModalHeader } from "./ArticleModalHeader";
import { ArticleModalContent } from "./ArticleModalContent";
import type { Article } from "../../../types/articles";

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleModal = ({ article, isOpen, onClose }: ArticleModalProps) => {

  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden p-0 border-0 shadow-2xl"
        dir="rtl"
      >
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
                  damping: 30
                }
              }}
              className="flex flex-col bg-white rounded-lg overflow-hidden"
            >
              <ArticleModalHeader article={article} />
              <ArticleModalContent article={article} />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleModal;
