import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const ServicesHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-8"
    >
      <div className="inline-flex items-center space-x-2 space-x-reverse bg-primary-100 text-primary-700 px-3 py-1.5 rounded-full text-sm font-medium mb-3">
        <BookOpen className="w-4 h-4" />
        <span>השירותים שלנו</span>
      </div>
      <h2 
        className="font-bold leading-tight mb-6 text-slate-800"
        style={{
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        איך אנחנו יכולים{" "}
        <span
          className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
        >
          לעזור לכם
        </span>
      </h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        מגוון שירותים מקצועיים המותאמים לצרכים השונים שלכם ושל הכלב שלכם
      </p>
    </motion.div>
  );
};

export default ServicesHeader;
