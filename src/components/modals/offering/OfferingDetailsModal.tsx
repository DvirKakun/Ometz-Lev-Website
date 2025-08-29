import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Info } from "lucide-react";
import type { ProcessedFullOffering } from "../../../types/service_offerings";

interface OfferingDetailsModalProps {
  offering: ProcessedFullOffering | null;
  isOpen: boolean;
  onClose: () => void;
}

const OfferingDetailsModal = ({
  offering,
  isOpen,
  onClose,
}: OfferingDetailsModalProps) => {
  if (!offering) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
          <DialogContent
            className="max-w-[85vw] sm:max-w-2xl h-[70vh] sm:h-[80vh] md:h-[85vh] overflow-hidden p-0 border-0 shadow-2xl rounded-2xl duration-300"
            dir="rtl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.3, y: 100 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                scale: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
              }}
              className="flex flex-col bg-white rounded-2xl overflow-hidden h-full"
            >
              {/* Hidden element to capture initial focus */}
              <div tabIndex={0} className="sr-only">
                פתיחת מאמר
              </div>

              {/* Header - Fixed */}
              <div className="flex-shrink-0 bg-gradient-to-br from-slate-50 to-slate-100/80 border-b border-slate-200/60 p-3 sm:p-4 md:p-6">
                <div className="flex items-center justify-center mb-2 sm:mb-3">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-slate-600 to-slate-700 text-white rounded-full shadow-lg">
                    <Info className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                </div>

                <DialogHeader>
                  <DialogTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-900 text-center leading-tight px-8">
                    {offering.title}
                  </DialogTitle>
                </DialogHeader>
              </div>

              {/* Content - Scrollable */}
              <div
                className="flex-1 overflow-y-auto overflow-x-hidden min-h-0"
                dir="ltr"
              >
                <div
                  className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6"
                  dir="rtl"
                >
                  {/* Description */}
                  <div>
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center gap-2">
                      <div className="w-1 sm:w-1.5 h-4 sm:h-5 md:h-6 bg-gradient-to-b from-slate-600 to-slate-700 rounded-full"></div>
                      פרטים על השירות
                    </h4>
                    <div
                      className="text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base"
                      style={{ fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}
                    >
                      {offering.description}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default OfferingDetailsModal;
