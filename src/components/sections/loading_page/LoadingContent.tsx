import { motion } from "framer-motion";

interface LoadingContentProps {
  title: string;
  color: string;
}

const LoadingContent = ({ title, color }: LoadingContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="text-center mb-8"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        {title}
      </h1>
      <div className={`w-16 h-1 bg-gradient-to-r ${color} rounded-full mx-auto mb-4`} />
    </motion.div>
  );
};

export default LoadingContent;