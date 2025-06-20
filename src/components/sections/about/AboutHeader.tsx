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
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
        מי אנחנו ב
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
          {" "}
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