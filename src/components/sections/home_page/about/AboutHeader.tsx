import React from "react";
import { motion } from "framer-motion";

const AboutHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2
        className="font-bold leading-none mb-6 text-slate-800"
        style={{
          fontSize: "clamp(2.4rem, 5vw, 4rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        קצת{" "}
        <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent drop-shadow-lg">
          עליי...
        </span>
      </h2>
      <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
        באמצעות אהבה, סבלנות ושיטות אילוף חיוביות, אני עוזר לכם ולכלב שלכם לבנות
        קשר חזק ומלא אמון
      </p>
    </motion.div>
  );
};

export default AboutHeader;
