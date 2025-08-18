import React from "react";
import { motion } from "framer-motion";
import { Heart, Target, Users } from "lucide-react";
import ValueCard from "./ValueCard";

const AboutValues: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: "אהבה וסבלנות",
      description: "כל כלב הוא עולם ומלואו, ואנחנו מתייחסים אליו באהבה ובכבוד",
    },
    {
      icon: Target,
      title: "גישה מקצועית",
      description: "שיטות מתקדמות ומותאמות אישית לכל כלב ולכל משפחה",
    },
    {
      icon: Users,
      title: "שיתוף המשפחה",
      description: "מעורבות הבעלים היא המפתח להצלחה ארוכת טווח",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="order-1 lg:order-2 space-y-4 sm:space-y-6 pb-4 sm:pb-6 px-4 sm:px-0"
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-6 sm:mb-8 lg:text-right">
        הערכים שלנו
      </h3>
      {values.map((value, index) => (
        <ValueCard key={index} value={value} index={index} />
      ))}
    </motion.div>
  );
};

export default AboutValues;
