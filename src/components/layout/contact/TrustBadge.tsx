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
      whileHover={{ scale: 1.05, transition: { duration: 0 } }}
      whileTap={{ scale: 0.98, transition: { duration: 0 } }}
      transition={{
        duration: 0.6,
        delay: 1.2,
        scale: { duration: 0 },
      }}
      viewport={{ once: true }}
      onClick={onClick}
      className="w-full p-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 rounded-xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 text-center flex flex-col items-center justify-center"
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        <h3 className="text-lg font-bold text-white">ייעוץ ראשון חינם</h3>
        <Heart className="w-5 h-5 text-accent-200" />
      </div>

      <p className="text-white/90 text-sm mb-2">פגישת הכרות ללא התחייבות</p>

      <p className="text-accent-200 text-xs font-medium">
        כי כל מסע מתחיל בצעד אחד
      </p>
    </motion.button>
  );
};

export default TrustBadge;
