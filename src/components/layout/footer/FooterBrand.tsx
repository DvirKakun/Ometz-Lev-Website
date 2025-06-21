import React from "react";
import { motion } from "framer-motion";
import DogIcon from "../../../assets/images/DogIcon.ico";
import SocialLinks from "./SocialLinks";

const FooterBrand: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="lg:col-span-1"
    >
      <div className="flex items-center space-x-3 space-x-reverse mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-white relative overflow-hidden">
          <div
            className="w-6 h-6 relative z-10"
            style={{
              backgroundImage: `url(${DogIcon})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">אומץ לב</h3>
          <p className="text-slate-400 text-sm">אילוף כלבים מקצועי</p>
        </div>
      </div>
      <p className="text-slate-300 leading-relaxed mb-6">
        אנחנו מתמחים באילוף כלבים מקצועי, כלבנות טיפולית ואימונים אישיים. המטרה
        שלנו היא ליצור קשר הרמוני בינכם לבין הכלב שלכם.
      </p>
      <SocialLinks />
    </motion.div>
  );
};

export default FooterBrand;
