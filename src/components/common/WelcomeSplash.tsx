import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DogIcon from "../../assets/images/DogIcon.ico";

interface WelcomeSplashProps {
  onComplete: () => void;
}

const WelcomeSplash: React.FC<WelcomeSplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto hide after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade out animation to complete
      setTimeout(onComplete, 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, exit: { duration: 0.8 } }}
        >
          {/* Subtle background patterns */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                                 radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)`,
                backgroundSize: '200px 200px'
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-4">
            
            {/* Dog Icon with animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                type: "spring",
                stiffness: 100
              }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white relative overflow-hidden">
                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-500 blur-sm opacity-0"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <img 
                  src={DogIcon} 
                  alt="אומץ לב - כלבנות טיפולית" 
                  className="w-12 h-12 relative z-10 filter brightness-0 invert"
                />
              </div>
            </motion.div>

            {/* Welcome message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              {/* Business name */}
              <motion.h1 
                className="text-3xl font-bold text-slate-800 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                ברוכים הבאים ל
                <span className="block text-primary-600 mt-1">אומץ לב</span>
              </motion.h1>

              {/* Creator info */}
              <motion.p 
                className="text-lg text-slate-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                אלעד שמעונוב - כלבן טיפולי
              </motion.p>

              {/* Tagline */}
              <motion.p 
                className="text-sm text-slate-500 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                טיפול וריפוי באמצעות כלבים
              </motion.p>
            </motion.div>

            {/* Subtle loading indicator */}
            <motion.div
              className="mt-8 flex space-x-1 space-x-reverse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-primary-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeSplash;