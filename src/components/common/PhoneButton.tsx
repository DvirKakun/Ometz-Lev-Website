import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import type { PhoneButtonProps } from "../../types/phone_button";

const PhoneButton: React.FC<PhoneButtonProps> = ({
  phoneNumber = "052-472-4700",
  className,
  variant = "default",
  size = "md",
}) => {
  const formatPhoneForTel = (phone: string) => {
    return phone.replace(/[-\s]/g, "");
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
    icon: "bg-gradient-to-r from-accent-400 to-accent-500 hover:from-accent-500 hover:to-accent-600 text-white shadow-soft hover:shadow-soft-lg",
    outline:
      "border-2 border-accent-500 text-accent-600 hover:bg-accent-50 bg-transparent shadow-soft hover:shadow-soft-lg",
  };

  if (variant === "icon") {
    return (
      <motion.a
        href={`tel:${formatPhoneForTel(phoneNumber)}`}
        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-all duration-200",
          variants.icon,
          className
        )}
        aria-label={`התקשר ל-${phoneNumber}`}
      >
        <Phone className={iconSizes[size]} />
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
        <a href={`tel:${formatPhoneForTel(phoneNumber)}`}>
          <span className="hidden md:inline">התקשרו עכשיו</span>
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Phone className={iconSizes[size]} />
          </motion.div>
        </a>
      </Button>
    </motion.div>
  );
};

export default PhoneButton;
