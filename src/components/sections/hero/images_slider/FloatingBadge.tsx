import { motion, AnimatePresence } from "framer-motion";
import dogIcon from "../../../../assets/images/DogIcon.ico";

interface FloatingBadgeProps {
  currentImage: {
    title: string;
    subtitle: string;
  };
  currentImageIndex: number;
}

export function FloatingBadge({
  currentImage,
  currentImageIndex,
}: FloatingBadgeProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`badge-${currentImageIndex}`}
        initial={{ opacity: 0, scale: 0, y: 25, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20, rotate: 6 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          type: "spring",
          stiffness: 350,
          damping: 25,
        }}
        whileHover={{
          scale: 1.03,
          y: -2,
          transition: { duration: 0.3 },
        }}
        className="absolute -bottom-5 -right-5 group cursor-default"
      >
        {/* Enhanced backdrop glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-300/40 via-primary-400/30 to-accent-400/40 rounded-2xl blur-lg scale-110 opacity-70 group-hover:opacity-90 group-hover:scale-115 transition-all duration-300"></div>

        {/* Main badge container - smaller and more refined */}
        <div className="relative bg-white/95 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-4 min-w-[140px]">
          {/* Refined gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-primary-100/40 to-accent-50/60 rounded-2xl"></div>

          {/* Content */}
          <div className="relative flex items-center space-x-3 space-x-reverse">
            {/* Text content */}
            <div className="text-right flex-1">
              <motion.div
                className="text-sm font-bold text-slate-800 leading-tight"
                initial={{ x: -8 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {currentImage.title}
              </motion.div>
              <motion.div
                className="text-xs text-slate-600 mt-0.5 font-medium"
                initial={{ x: -8, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {currentImage.subtitle}
              </motion.div>
            </div>

            {/* Icon container - smaller and no rotation */}
            <motion.div
              className="flex-shrink-0 w-10 h-10 rounded-xl shadow-md relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {/* Enhanced gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500"></div>

              {/* Subtle inner glow */}
              <div className="absolute inset-0.5 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-lg"></div>

              {/* Image layer */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${dogIcon})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </motion.div>
          </div>

          {/* Refined decorative elements */}
          <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full opacity-80"></div>
          <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full opacity-70"></div>

          {/* Subtle animated border effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(90deg, 
                rgba(20, 184, 166, 0.15) 0%, 
                transparent 50%, 
                rgba(249, 115, 22, 0.15) 100%)`,
              padding: "1px",
            }}
            animate={{
              background: [
                "linear-gradient(90deg, rgba(20, 184, 166, 0.15) 0%, transparent 50%, rgba(249, 115, 22, 0.15) 100%)",
                "linear-gradient(90deg, rgba(249, 115, 22, 0.15) 0%, transparent 50%, rgba(20, 184, 166, 0.15) 100%)",
                "linear-gradient(90deg, rgba(20, 184, 166, 0.15) 0%, transparent 50%, rgba(249, 115, 22, 0.15) 100%)",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Refined success indicator */}
          <motion.div
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md border-2 border-white"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.7,
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
            whileHover={{ scale: 1.1 }}
          >
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>

          {/* Additional subtle highlight */}
          <div className="absolute top-1 left-1 w-4 h-1 bg-gradient-to-r from-white/40 to-transparent rounded-full"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
