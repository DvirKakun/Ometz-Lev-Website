import { motion } from "framer-motion";
import { Video, Search } from "lucide-react";

interface EmptyStateProps {
  hasActiveFilters?: boolean;
  totalVideosCount?: number;
}

const EmptyState = ({ hasActiveFilters = false, totalVideosCount = 0 }: EmptyStateProps) => {
  // Determine if it's a filtering issue or no content at all
  const isFilteringIssue = hasActiveFilters && totalVideosCount > 0;
  
  if (isFilteringIssue) {
    // No videos with current filters
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl font-bold text-slate-800 mb-3"
          >
            לא נמצאו סרטונים עם הסינון הזה
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-slate-500"
          >
            נסו לשנות את הסינון או נקו את הסינונים כדי לראות יותר סרטונים
          </motion.p>
        </div>
      </motion.div>
    );
  }

  // No videos at all
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-16"
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl mb-4">
            <Video className="w-10 h-10 text-red-400" />
          </div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl font-bold text-slate-800 mb-3"
        >
          אין סרטונים
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-sm text-slate-500"
        >
          <Video className="w-4 h-4" />
          <span>סרטונים יתווספו בקרוב</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmptyState;