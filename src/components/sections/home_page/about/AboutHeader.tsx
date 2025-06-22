import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const AboutHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center space-x-2 space-x-reverse bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
        <Heart className="w-4 h-4" />
        <span>קצת עלינו</span>
      </div>
      <h2 
        className="font-bold leading-none mb-6 text-slate-800"
        style={{
          fontSize: "clamp(2.4rem, 5vw, 4rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        מי אנחנו ב{" "}
        <span
          className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent drop-shadow-lg"
          style={{
            filter: "drop-shadow(0 0 20px rgba(20, 184, 166, 0.4))",
          }}
        >
          אומץ לב
        </span>
      </h2>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
        אנחנו מתמחים ביצירת קשר הרמוני בין כלבים לבעליהם, תוך שימוש בשיטות
        חיוביות ומתקדמות
      </p>
    </motion.div>
  );
};

export default AboutHeader;