import { motion } from "framer-motion";
import type { LoadingContentProps } from "../../../types/loading_page";

const LoadingContent = ({ title }: LoadingContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="text-center mb-4 sm:mb-6 md:mb-8"
    >
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-2 sm:mb-3">
        {title}
      </h1>
    </motion.div>
  );
};

export default LoadingContent;
