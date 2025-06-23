import { motion } from "framer-motion";
import DogIcon from "../../../assets/images/DogIcon.ico";

const SplashLogo = () => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      }}
      className="mb-8"
    >
      <div className="w-28 h-28 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white relative overflow-hidden">
        {/* Subtle glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-500 blur-sm opacity-0"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div
          className="w-14 h-14 relative z-10"
          style={{
            backgroundImage: `url(${DogIcon})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </motion.div>
  );
};

export default SplashLogo;