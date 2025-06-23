import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface LoadingSpinnerProps {
  color: string;
  icon: LucideIcon;
}

const LoadingSpinner = ({ color, icon: Icon }: LoadingSpinnerProps) => {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        duration: 1,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
    >
      <div className={`relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${color} rounded-3xl shadow-xl mb-6`}>
        {/* Pulsing Ring */}
        <motion.div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${color} opacity-30`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Icon */}
        <Icon className="w-12 h-12 text-white relative z-10" />
        
        {/* Rotating Ring */}
        <motion.div
          className={`absolute inset-[-8px] border-2 border-gradient-to-r ${color} rounded-3xl opacity-60`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            borderImage: `linear-gradient(45deg, currentColor, transparent, currentColor) 1`
          }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;