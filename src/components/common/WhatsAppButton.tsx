import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import WhatsAppIcon from "./WhatsAppIcon";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  variant?: "default" | "icon" | "outline";
  size?: "sm" | "md" | "lg";
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "972501234567",
  message = "שלום! אני מעוניין/ת לקבל מידע על שירותי אילוף הכלבים שלכם.",
  className,
  variant = "default",
  size = "md",
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentText, setCurrentText] = useState("שלחו הודעה בוואטסאפ");

  const createWhatsAppLink = () => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  const sizeClasses = {
    sm: "px-4 py-2.5 text-sm h-10",
    md: "px-5 py-3 text-base h-12",
    lg: "px-6 py-3.5 text-lg h-14",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-5 h-5",
  };

  const variants = {
    default:
      "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-soft hover:shadow-soft-lg",
    icon: "bg-accent-100 hover:bg-accent-200 text-accent-700 p-3 rounded-2xl shadow-soft hover:shadow-soft-lg",
    outline:
      "border-2 border-accent-500 text-accent-600 hover:bg-accent-50 bg-transparent shadow-soft hover:shadow-soft-lg",
  };

  const handleHover = async () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Wait for the slide right animation to complete, then change text
    setTimeout(() => {
      setCurrentText("בואו נתחיל לדבר!");
    }, 600);

    // Reset after full animation
    setTimeout(() => {
      setCurrentText("שלחו הודעה בוואטסאפ");
      setIsAnimating(false);
    }, 2500);
  };

  if (variant === "icon") {
    return (
      <motion.a
        href={createWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-all duration-200",
          variants.icon,
          className
        )}
        aria-label="שלח הודעה בוואטסאפ"
      >
        <WhatsAppIcon className={iconSizes[size]} />
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={handleHover}
    >
      <Button
        asChild
        className={cn(
          "font-medium rounded-2xl transition-all duration-200 relative overflow-hidden",
          variants[variant],
          sizeClasses[size],
          className
        )}
      >
        <a
          href={createWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full"
        >
          {/* Icon Container - Always on the left */}
          <motion.div
            className="relative z-20 flex-shrink-0"
            animate={
              isAnimating
                ? {
                    x: ["0%", "300%", "300%", "0%"],
                  }
                : { x: "0%" }
            }
            transition={{
              duration: 2.2,
              times: [0, 0.3, 0.7, 1],
              ease: "easeInOut",
            }}
          >
            <WhatsAppIcon className={iconSizes[size]} />
          </motion.div>

          {/* Text Container - Always on the right */}
          <div className="flex-1 text-right relative overflow-hidden">
            {/* Sliding Overlay for Wipe Effect */}
            <motion.div
              className="absolute top-0 right-0 h-full bg-gradient-to-r from-accent-600 to-accent-700 z-10"
              animate={
                isAnimating
                  ? {
                      width: ["0%", "100%", "100%", "0%"],
                      x: ["0%", "0%", "0%", "100%"],
                    }
                  : { width: "0%" }
              }
              transition={{
                duration: 2.2,
                times: [0, 0.3, 0.7, 1],
                ease: "easeInOut",
              }}
            />

            {/* Text */}
            <motion.span
              className="relative z-5 inline-block"
              animate={
                isAnimating
                  ? {
                      opacity: [1, 0, 0, 1],
                    }
                  : { opacity: 1 }
              }
              transition={{
                duration: 2.2,
                times: [0, 0.3, 0.7, 1],
              }}
            >
              {currentText}
            </motion.span>
          </div>

          {/* Animated Background Particles */}
          <AnimatePresence>
            {isAnimating && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    initial={{
                      x: "10%",
                      y: "50%",
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      x: ["10%", "90%", "90%", "10%"],
                      y: `${30 + i * 10}%`,
                      scale: [0, 1, 1, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </a>
      </Button>
    </motion.div>
  );
};

export default WhatsAppButton;
