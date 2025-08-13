import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CountdownTimer from "./header/timer/CountdownTimer";
import { useClosestActivity } from "../../hooks/useActivities";

const FloatingTimer: React.FC = () => {
  const navigate = useNavigate();
  const { data: closestActivity } = useClosestActivity();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let ticking = false;

    const checkScrollPosition = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate distance from bottom
      const distanceFromBottom = documentHeight - scrollTop - windowHeight;

      // Hide timer when within 200px of bottom
      const shouldHide = distanceFromBottom <= 200;

      setIsVisible(!shouldHide);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkScrollPosition);
        ticking = true;
      }
    };

    // Check initial position
    checkScrollPosition();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTimerClick = () => {
    if (closestActivity) {
      navigate("/activities", {
        state: { scrollToActivity: closestActivity.id },
      });
    } else {
      // Navigate to activities page even when no active timer
      navigate("/activities");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-40"
          style={{
            filter: "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))",
          }}
        >
          <CountdownTimer
            targetDate={closestActivity?.date || new Date()}
            eventTitle={closestActivity?.timerTitle || ""}
            showEventInfo={true}
            clickable={true}
            onClick={handleTimerClick}
            className="scale-75 sm:scale-85 md:scale-90 hover:scale-95 transition-transform duration-200"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingTimer;
