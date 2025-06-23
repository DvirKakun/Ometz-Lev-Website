import { motion } from "framer-motion";

const LoadingMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="text-center"
    >
      <p className="text-sm text-slate-500">
        ברגעים ספורים תוכלו ליהנות מהתוכן שלנו
      </p>
    </motion.div>
  );
};

export default LoadingMessage;