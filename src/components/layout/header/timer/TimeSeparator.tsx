import React from "react";
import { motion } from "framer-motion";

const TimeSeparator: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-6 px-0.5 -mt-3">
    <motion.div
      className="w-0.5 h-0.5 bg-slate-400 rounded-full mb-0.5"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.div
      className="w-0.5 h-0.5 bg-slate-400 rounded-full"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
    />
  </div>
);

export default TimeSeparator;
