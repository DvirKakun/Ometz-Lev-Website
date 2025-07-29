import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface TrustBadgeProps {
  onClick?: () => void;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.6,
        delay: 1.2,
        scale: { duration: 0, delay: 0 },
      }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group relative w-full text-center p-6 bg-gradient-to-br from-primary-500 to-primary-600  rounded-2xl border border-primary-300/60 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 overflow-hidden"
    >
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
          <Heart className="w-6 h-6 text-white group-hover:text-primary-100 transition-colors duration-300" />
          <span className="text-lg font-semibold text-white group-hover:text-primary-100 transition-colors duration-300">
            הייעוץ הראשון
          </span>
        </div>
        <p className="text-white/90 text-sm mb-1">פגישת הכרות ללא התחייבות</p>
        <p className="text-primary-100 font-medium text-sm">
          כי כל מסע מתחיל בצעד אחד
        </p>

        {/* Simple CTA indicator */}
        <div className="mt-3 text-xs text-white/70 group-hover:text-white/90 transition-colors duration-300">
          👆 לחץ כאן לפגישה
        </div>
      </div>
    </motion.button>
  );
};

export default TrustBadge;
