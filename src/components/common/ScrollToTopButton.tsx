import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always check if we've reached the top (even during programmatic scroll)
      if (currentScrollY <= 50) {
        setIsVisible(false);
        return;
      }

      // Don't process scroll direction when programmatically scrolling
      if (isScrolling) return;

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
    };

    // Use requestAnimationFrame for smooth performance
    const smoothHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", smoothHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", smoothHandleScroll);
    };
  }, [lastScrollY, scrollDirection, isScrolling]);

  const scrollToTop = () => {
    // Set scrolling flag to prevent scroll direction interference
    setIsScrolling(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Re-enable scroll detection after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000); // Smooth scroll usually takes ~500-800ms
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
                     bg-primary-500 
                     text-white rounded-full p-3 shadow-lg
                     focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
                     group"
          aria-label="חזור לתחילת העמוד"
          title="חזור לתחילת העמוד"
          whileHover={{ scale: 1.05, transition: { duration: 0 } }}
          whileTap={{ scale: 0.95, transition: { duration: 0 } }}
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
