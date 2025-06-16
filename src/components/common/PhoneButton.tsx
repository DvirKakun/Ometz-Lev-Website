import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

interface PhoneButtonProps {
  phoneNumber?: string;
  className?: string;
  variant?: "default" | "icon" | "outline";
  size?: "sm" | "md" | "lg";
}

const PhoneButton: React.FC<PhoneButtonProps> = ({
  phoneNumber = "050-123-4567",
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
      "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-md hover:shadow-lg",
    icon: "bg-primary-100 hover:bg-primary-200 text-primary-700 p-3 rounded-2xl shadow-sm hover:shadow-md",
    outline:
      "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 bg-transparent shadow-sm hover:shadow-md",
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
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Phone className={iconSizes[size]} />
          </motion.div>
          <span className="hidden md:inline">התקשר עכשיו</span>
          <span className="md:hidden">התקשר</span>
        </a>
      </Button>
    </motion.div>
  );
};

export default PhoneButton;
