import { motion } from "framer-motion";
import type { LoadingCardProps } from "../../../types/loading_page";

const LoadingCard = ({ children }: LoadingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 bg-white/90 backdrop-blur-lg rounded-3xl p-4 sm:p-6 md:p-12 shadow-2xl border border-white/50 max-w-xs sm:max-w-sm md:max-w-md mx-4 self-center"
    >
      {children}

      {/* Accessibility text for screen readers */}
      <div className="sr-only" role="status" aria-live="polite">
        טוען דף, אנא המתינו
      </div>
    </motion.div>
  );
};

export default LoadingCard;
