import React from "react";
import { motion } from "framer-motion";

const TherapyPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          כלבנות טיפולית
        </h1>
        <p className="text-xl text-slate-600">עמוד זה בבנייה...</p>
      </div>
    </motion.div>
  );
};

export default TherapyPage;
