import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { useClosestActivity } from "../../hooks/useActivities";
import { useTimer } from "../../contexts/TimerContext";

const FloatingTimer: React.FC = () => {
  const navigate = useNavigate();
  const { data: closestActivity } = useClosestActivity();
  const { isTimerClosed, isTimerHidden, closeTimer } = useTimer();
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

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeTimer();
  };

  return (
    <AnimatePresence>
      {isVisible && !isTimerClosed && !isTimerHidden && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1.25, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{
            scale: 1.3,
            transition: { duration: 0.2 },
          }}
          className="fixed bottom-4 left-6 md:bottom-6 md:left-10 z-40 cursor-pointer"
          style={{
            filter: "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))",
          }}
          onClick={handleTimerClick}
        >
          {/* Close button */}
          <X
            className="w-3 h-3 text-gray-700 absolute top-2 right-2 hover:text-gray-900 transition-colors z-10"
            onClick={handleClose}
          />

          <CountdownTimer
            targetDate={closestActivity?.date || new Date()}
            eventTitle={closestActivity?.timerTitle || ""}
            showEventInfo={true}
            clickable={true}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingTimer;
