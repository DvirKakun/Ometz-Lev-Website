import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import type { ModalSuccessProps } from "../../../types/modals";

const ModalSuccess: React.FC<ModalSuccessProps> = ({
  title,
  content,
  iconMarginBottom = "mb-3",
  contentAlignment = "text-center",
  icon: IconComponent = CheckCircle,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`text-center py-6 ${className}`}
    >
      {/* Success Icon */}
      <div
        className={`w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto ${iconMarginBottom}`}
      >
        <IconComponent className="w-6 h-6 text-white" />
      </div>

      {/* Title */}
      <h3
        className={`text-lg font-semibold text-white mb-2 ${contentAlignment}`}
      >
        {title}
      </h3>

      {/* Content */}
      {content && (
        <div className={`text-white/90 text-sm ${contentAlignment}`}>
          {typeof content === "string" ? <p>{content}</p> : content}
        </div>
      )}
    </motion.div>
  );
};

export default ModalSuccess;
