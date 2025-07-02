import { motion } from "framer-motion";
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
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden p-0 bg-white border-0 shadow-2xl" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col h-full bg-white rounded-lg overflow-hidden"
        >
          <ArticleModalHeader article={article} />
          <ArticleModalContent article={article} />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleModal;
