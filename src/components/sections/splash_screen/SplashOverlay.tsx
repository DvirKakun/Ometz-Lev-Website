import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashBackground from "./SplashBackground";
import SplashLogo from "./SplashLogo";
import SplashContent from "./SplashContent";
import SplashProgress from "./SplashProgress";
import SplashAccessibilityController from "./SplashAccessibilityController";

const SPLASH_SESSION_KEY = "splashShown";
const SPLASH_DURATION_MS = 2000;

const SplashOverlay: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem(SPLASH_SESSION_KEY);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
      } catch {
        // sessionStorage unavailable — just hide
      }
      setVisible(false);
    }, SPLASH_DURATION_MS);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SplashBackground>
            <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-4">
              <SplashLogo />
              <SplashContent />
              <SplashProgress />
            </div>
          </SplashBackground>
          <SplashAccessibilityController />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashOverlay;
