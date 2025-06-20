import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
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
  phoneNumber = "972524724700",
  message = "מה קורה? הגעתי אליך דרך האתר, אשמח שנדבר!.",
  className,
  variant = "default",
  size = "md",
}) => {
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
      "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-soft hover:shadow-soft-lg",
    icon: "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white shadow-soft hover:shadow-soft-lg",
    outline:
      "border-2 border-green-500 text-green-600 hover:bg-green-50 bg-transparent shadow-soft hover:shadow-soft-lg",
  };

  if (variant === "icon") {
    return (
      <motion.a
        href={createWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
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
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        asChild
        className={cn(
          "font-medium rounded-2xl transition-all duration-200 flex items-center space-x-2 space-x-reverse",
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
          <span className="hidden md:inline">שלחו הודעה</span>
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
          >
            <WhatsAppIcon className={iconSizes[size]} />
          </motion.div>
        </a>
      </Button>
    </motion.div>
  );
};

export default WhatsAppButton;
