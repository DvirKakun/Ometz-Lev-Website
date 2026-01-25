import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface TrustBadgeProps {
  onClick?: () => void;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      whileHover={{
        scale: 1.08,
        y: -2,
        transition: {
          duration: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 400,
          damping: 25,
        },
      }}
      whileTap={{
        scale: 0.95,
        y: 0,
        transition: { duration: 0.1, ease: "easeInOut" },
      }}
      viewport={{ once: true }}
      onClick={onClick}
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl cursor-pointer transition-colors duration-300"
    >
      <span className="text-sm whitespace-nowrap">השאירו פרטים</span>
      <Heart className="w-4 h-4 text-white" />
    </motion.button>
  );
};

export default TrustBadge;
