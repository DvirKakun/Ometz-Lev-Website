import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface LoadingBackgroundProps {
  children: ReactNode;
  bgColor: string;
  color: string;
}

const LoadingBackground = ({
  children,
  bgColor,
  color,
}: LoadingBackgroundProps) => {
  return (
    <motion.div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${bgColor} relative overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r ${color} opacity-5`}
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {children}

      {/* Floating Elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className={`absolute w-4 h-4 bg-gradient-to-r ${color} rounded-full opacity-20`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export default LoadingBackground;
