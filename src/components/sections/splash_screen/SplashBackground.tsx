import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SplashBackgroundProps {
  children: ReactNode;
}

const SplashBackground = ({ children }: SplashBackgroundProps) => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle background patterns */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)`,
            backgroundSize: "200px 200px",
          }}
        />
      </div>
      {children}
    </motion.div>
  );
};

export default SplashBackground;