import React from "react";
import { motion } from "framer-motion";

const ServicesHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-6 sm:mb-8"
    >
      <h2
        className="font-bold leading-tight mb-6 text-slate-800"
        style={{
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        השירותים <span className="text-primary-500">שלנו</span>
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-6 sm:leading-7 px-4 sm:px-0">
        אומץ לב מציע מגוון שירותים מקצועיים המותאמים לצרכים השונים שלכם ושל הכלב
        שלכם
      </p>
    </motion.div>
  );
};

export default ServicesHeader;
