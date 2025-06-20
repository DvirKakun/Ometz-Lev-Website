import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

const CertificationBadge: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      className="inline-flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-2xl p-4"
    >
      <Award className="w-8 h-8 text-primary-600" />
      <div className="text-right">
        <div className="font-semibold text-slate-800">מאמן מוסמך</div>
        <div className="text-sm text-slate-600">רשות הטבע והגנים</div>
      </div>
    </motion.div>
  );
};

export default CertificationBadge;