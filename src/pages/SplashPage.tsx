import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DogIcon from "../assets/images/DogIcon.ico";

const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to home after 3 seconds
    const timer = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle background patterns */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)`,
            backgroundSize: "200px 200px",
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
            stiffness: 100,
          }}
          className="mb-8"
        >
          <div className="w-28 h-28 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white relative overflow-hidden">
            {/* Subtle glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-500 blur-sm opacity-0"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div
              className="w-14 h-14 relative z-10"
              style={{
                backgroundImage: `url(${DogIcon})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
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
            className="text-4xl font-bold text-slate-800 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            ברוכים הבאים ל
            <span className="block text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mt-2">
              אומץ לב
            </span>
          </motion.h1>

          {/* Creator info */}
          <motion.p
            className="text-xl text-slate-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            אלעד שמעונוב - כלבן טיפולי
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="text-base text-slate-500 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            טיפול וריפוי באמצעות כלבים
          </motion.p>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          className="mt-12 w-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <div className="w-full bg-slate-200 rounded-full h-1">
            <motion.div
              className="h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-3">נכנס לאתר...</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashPage;
