import { motion, AnimatePresence } from "framer-motion";
import ometzLevLogo from "../../../../../assets/icons/Ometz-Lev-Dogs-Logo.png";
import type { FloatingBadgeProps } from "../../../../../types/floating_badge";

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
        className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 md:-bottom-5 md:-right-5 group cursor-default"
      >
        {/* Main badge container - responsive sizing */}
        <div className="relative bg-white/95 backdrop-blur-xl border border-white/60 shadow-xl rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 min-w-[100px] sm:min-w-[120px] md:min-w-[140px]">
          {/* Refined overlay */}
          <div className="absolute inset-0 bg-yellow-50/60 rounded-xl sm:rounded-2xl"></div>

          {/* Content */}
          <div className="relative flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Text content */}
            <div className="text-right flex-1">
              <motion.div
                className="text-xs sm:text-sm font-bold text-slate-800 leading-tight"
                initial={{ x: -8 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {currentImage.title}
              </motion.div>
              <motion.div
                className="text-[10px] sm:text-xs text-slate-600 mt-0.5 font-medium"
                initial={{ x: -8, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {currentImage.subtitle}
              </motion.div>
            </div>

            {/* Icon container - responsive sizing */}
            <motion.div
              className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {/* Inset well background */}
              <div className="absolute inset-0 bg-gray-100 border border-gray-300 sm:border-2 rounded-lg sm:rounded-xl shadow-inner"></div>

              {/* Inner shadow enhancement for deeper inset look */}
              <div
                className="absolute inset-0 rounded-lg sm:rounded-xl"
                style={{
                  boxShadow:
                    "inset 1px 1px 2px rgba(0,0,0,0.15), inset -1px -1px 2px rgba(255,255,255,0.8)",
                }}
              ></div>

              {/* Image layer */}
              <div
                className="absolute inset-1"
                style={{
                  backgroundImage: `url(${ometzLevLogo})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
