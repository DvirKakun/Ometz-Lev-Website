import { motion } from "framer-motion";
import { Download, X } from "lucide-react";

interface PDFViewerHeaderProps {
  title: string;
  description?: string;
  onClose: () => void;
  onDownload: () => void;
}

export default function PDFViewerHeader({
  title,
  description,
  onClose,
  onDownload,
}: PDFViewerHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3 md:py-4">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 md:mb-3">
          <button
            onClick={onClose}
            className="flex items-center gap-0.5 sm:gap-1 md:gap-2 text-slate-600 hover:text-slate-900 transition-colors p-1 sm:p-1.5 md:p-0"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <span className="font-medium text-[10px] sm:text-xs md:text-sm lg:text-base">
              סגור
            </span>
          </button>

          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 md:gap-2 bg-primary-600 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-md sm:rounded-lg hover:bg-primary-700 transition-colors"
          >
            <span className="font-medium text-[10px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap">
              הורד PDF
            </span>
            <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
          </button>
        </div>

        <h1 className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-slate-900 text-right leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-slate-600 text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-1.5 md:mt-2 text-right line-clamp-2 md:line-clamp-none leading-snug">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
