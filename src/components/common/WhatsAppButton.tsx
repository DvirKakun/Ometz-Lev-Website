import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  variant?: "default" | "icon" | "outline";
  size?: "sm" | "md" | "lg";
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "972501234567", // Israeli format without +
  message = "שלום! אני מעוניין/ת לקבל מידע על שירותי אילוף הכלבים שלכם.",
  className,
  variant = "default",
  size = "md",
}) => {
  const [isHovered, setIsHovered] = useState(false);

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
      "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg",
    icon: "bg-green-100 hover:bg-green-200 text-green-700 p-3 rounded-2xl shadow-sm hover:shadow-md",
    outline:
      "border-2 border-green-500 text-green-600 hover:bg-green-50 bg-transparent shadow-sm hover:shadow-md",
  };

  if (variant === "icon") {
    return (
      <motion.a
        href={createWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-all duration-200 relative overflow-hidden",
          variants.icon,
          className
        )}
        aria-label="שלח הודעה בוואטסאפ"
      >
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.div
              key="whatsapp"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className={iconSizes[size]} />
            </motion.div>
          ) : (
            <motion.div
              key="send"
              initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <Send className={iconSizes[size]} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button
        asChild
        className={cn(
          "font-medium rounded-2xl transition-all duration-200 flex items-center space-x-2 space-x-reverse relative overflow-hidden",
          variants[variant],
          sizeClasses[size],
          className
        )}
      >
        <a
          href={createWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {!isHovered ? (
                <motion.div
                  key="whatsapp"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle className={iconSizes[size]} />
                </motion.div>
              ) : (
                <motion.div
                  key="send"
                  initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.8, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  <Send className={iconSizes[size]} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <span>שלח הודעה</span>
        </a>
      </Button>
    </motion.div>
  );
};

export default WhatsAppButton;
