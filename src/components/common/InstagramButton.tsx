import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import InstagramIcon from "./InstagramIcon";
import type { InstagramButtonProps } from "../../types/instagram";

const InstagramButton: React.FC<InstagramButtonProps> = ({
  instagramUrl = "https://www.instagram.com/eladshimoniv_omets_lev",
  className,
  variant = "default",
  size = "md",
}) => {
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
      "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-soft hover:shadow-soft-lg",
    icon: "bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white shadow-soft hover:shadow-soft-lg",
    outline:
      "border-2 border-pink-500 text-pink-600 hover:bg-pink-50 bg-transparent shadow-soft hover:shadow-soft-lg",
  };

  if (variant === "icon") {
    return (
      <motion.a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-all duration-200",
          variants.icon,
          className
        )}
        aria-label="עקבו באינסטגרם"
      >
        <InstagramIcon className={iconSizes[size]} />
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
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
          <span className="hidden md:inline">עקבו באינסטגרם</span>
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
          >
            <InstagramIcon className={iconSizes[size]} />
          </motion.div>
        </a>
      </Button>
    </motion.div>
  );
};

export default InstagramButton;
