import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import TikTokIcon from "./TikTokIcon";
import type { TikTokButtonProps } from "../../types/tiktok";

const TikTokButton: React.FC<TikTokButtonProps> = ({
  tiktokUrl = "https://www.tiktok.com/@ometz.lev1",
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
      "bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white shadow-soft hover:shadow-soft-lg",
    icon: "bg-gradient-to-r from-black to-gray-700 hover:from-gray-700 hover:to-black text-white shadow-soft hover:shadow-soft-lg",
    outline:
      "border-2 border-black text-black hover:bg-gray-50 bg-transparent shadow-soft hover:shadow-soft-lg",
  };

  if (variant === "icon") {
    return (
      <motion.a
        href={tiktokUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-all duration-200",
          variants.icon,
          className
        )}
        aria-label="עקבו בטיק טוק"
      >
        <TikTokIcon className={iconSizes[size]} />
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
        <a href={tiktokUrl} target="_blank" rel="noopener noreferrer">
          <span className="hidden md:inline">עקבו בטיק טוק</span>
          <div>
            <TikTokIcon className={iconSizes[size]} />
          </div>
        </a>
      </Button>
    </motion.div>
  );
};

export default TikTokButton;