import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const AchievementsList: React.FC = () => {
  const achievements = [
    "מעל 7 שנות ניסיון באילוף כלבים",
    "התמחות בכלבנות טיפולית",
  ];

  return (
    <div className="grid grid-cols-1 gap-3 mb-8">
      {achievements.map((achievement, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex items-center space-x-3 space-x-reverse"
        >
          <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
          <span className="text-slate-700">{achievement}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default AchievementsList;
