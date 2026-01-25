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
      title: "שיתוף פעולה",
      description: "מעניק לכם ידע וכלים להתמודדות עצמאית והצלחה ארוכת טווח",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-6 sm:space-y-8 px-4 sm:px-0"
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-6 sm:mb-8 text-center">
        הערכים שלנו
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {values.map((value, index) => (
          <ValueCard key={index} value={value} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default AboutValues;
