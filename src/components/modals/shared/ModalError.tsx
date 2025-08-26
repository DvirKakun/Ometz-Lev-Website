import React from "react";
import { motion } from "framer-motion";
import type { ModalErrorProps } from "../../../types/modals";

const ModalError: React.FC<ModalErrorProps> = ({ message, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-red-700 text-center text-sm mt-4 p-3 bg-red-100 rounded-lg ${className}`}
    >
      {message}
    </motion.div>
  );
};

export default ModalError;
