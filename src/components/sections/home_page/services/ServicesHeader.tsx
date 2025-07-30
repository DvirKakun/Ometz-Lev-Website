import React from "react";
import { motion } from "framer-motion";

const ServicesHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-8"
    >
      <h2
        className="font-bold leading-tight mb-6 text-slate-800"
        style={{
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        פתרונות{" "}
        <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          מקצועיים וחווייתיים
        </span>
      </h2>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-6">
        מגוון שירותים מקצועיים המותאמים לצרכים השונים שלכם ושל הכלב שלכם
        <br /> מהכלב הפרטי ועד המסגרת החינוכית והטיפולית.
      </p>
    </motion.div>
  );
};

export default ServicesHeader;
