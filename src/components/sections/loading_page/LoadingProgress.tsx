import { motion } from "framer-motion";
import { useLoadingProgress } from "../../../contexts/LoadingProgressContext";

const LoadingProgress = ({ color }: { color: string }) => {
  const { progress } = useLoadingProgress();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="text-center mb-8"
    >
      <motion.p
        className="text-lg text-slate-600 mb-4"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        מכינים עבורכם חוויה מיוחדת...
      </motion.p>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
        <motion.div
          className={`h-2 bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: "0%" }}
          animate={{ width: progress ? `${progress}%` : "100%" }}
          transition={{ duration: progress ? 0.3 : 2, ease: "easeInOut" }}
        />
      </div>

      {/* Loading Dots */}
      <div className="flex justify-center gap-2">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full bg-gradient-to-r ${color}`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingProgress;
