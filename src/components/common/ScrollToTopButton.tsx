import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scroll direction with immediate response
      if (Math.abs(currentScrollY - lastScrollY) > 2) {
        const newDirection = currentScrollY > lastScrollY ? "down" : "up";
        setScrollDirection(newDirection);
        setLastScrollY(currentScrollY);

        // Show button conditions with immediate response:
        // 1. User has scrolled down at least 200px from top
        // 2. User is currently scrolling up
        // 3. User is not at the very top (scrollY > 80)
        const shouldShow =
          currentScrollY > 200 && newDirection === "up" && currentScrollY > 80;

        setIsVisible(shouldShow);
      }

      // Hide immediately if user reaches top
      if (currentScrollY <= 50) {
        setIsVisible(false);
      }
    };

    // Use requestAnimationFrame for smooth performance
    const smoothHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", smoothHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", smoothHandleScroll);
    };
  }, [lastScrollY, scrollDirection]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Hide button immediately after click
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 
                     bg-primary-500 hover:bg-primary-600 
                     text-white rounded-full p-3 shadow-lg hover:shadow-xl
                     transition-all duration-200 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
                     group active:scale-95"
          aria-label="חזור לתחילת העמוד"
          title="חזור לתחילת העמוד"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp size={24} strokeWidth={5} className="drop-shadow-sm" />

          {/* Subtle ring animation */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
