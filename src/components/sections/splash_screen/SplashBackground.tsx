import { motion } from "framer-motion";
import type { SplashBackgroundProps } from "../../../types/splash";

const SplashBackground = ({ children }: SplashBackgroundProps) => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default SplashBackground;
