import { motion } from "framer-motion";

const SplashProgress = () => {
  return (
    <motion.div
      className="mt-12 w-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.1 }}
    >
      <div className="w-full bg-slate-200 rounded-full h-1">
        <motion.div
          className="h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
      <p className="text-xs text-slate-400 mt-3">נכנס לאתר...</p>
    </motion.div>
  );
};

export default SplashProgress;
