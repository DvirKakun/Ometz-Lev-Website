import { motion } from "framer-motion";
import OmetzLevLogo from "../../../assets/icons/Ometz-Lev-Small-Logo.png";

const SplashLogo = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      }}
      className="mb-4"
    >
      {/* Circular container with elegant design */}
      <div className="relative flex items-center justify-center">
        {/* Outer glow effect */}
        <div className="absolute w-52 h-52 lg:w-60 lg:h-60 rounded-full bg-gradient-to-br from-primary-300/20 via-primary-400/10 to-accent-300/20 blur-xl"></div>

        {/* Main circular container */}
        <div className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-primary-50 via-surface-50 to-accent-50 border-4 border-primary-400/30 shadow-2xl flex items-center justify-center">
          {/* Logo image - no inner circle constraint */}
          <div
            className="w-36 h-36 lg:w-44 lg:h-44"
            style={{
              backgroundImage: `url(${OmetzLevLogo})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Inner decorative border */}
          <div className="absolute inset-4 rounded-full border-2 border-primary-300/30 pointer-events-none"></div>

          {/* Subtle highlight effect */}
          <div className="absolute top-2 left-2 w-8 h-8 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-sm"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default SplashLogo;
