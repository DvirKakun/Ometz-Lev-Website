import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const TrustBadge: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      viewport={{ once: true }}
      className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
    >
      <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
        <Heart className="w-6 h-6 text-red-400" />
        <span className="text-lg font-semibold text-white">
          הייעוץ הראשון
        </span>
      </div>
      <p className="text-primary-100 text-sm">
        פגישת הכרות ללא התחייבות
      </p>
      <p className="text-accent-200 font-medium text-sm mt-1">
        כי כל מסע מתחיל בצעד אחד
      </p>
    </motion.div>
  );
};

export default TrustBadge;