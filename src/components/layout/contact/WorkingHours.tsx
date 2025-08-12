import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const WorkingHours: React.FC = () => {
  const workingHours = [
    { day: "ראשון - חמישי", hours: "20:00 - 08:00" },
    { day: "שישי", hours: "15:00 - 08:00" },
    { day: "שבת", hours: "לפי תיאום מראש" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="inline-block bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20"
    >
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-accent-200" />
        <h3 className="text-sm font-semibold text-white">שעות פעילות</h3>
      </div>
      
      <div className="space-y-1">
        {workingHours.map((schedule, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            viewport={{ once: true }}
            className="flex justify-between items-center text-white/90 text-xs gap-4"
          >
            <span className="font-medium whitespace-nowrap">{schedule.day}</span>
            <span className="font-semibold text-accent-200 whitespace-nowrap">{schedule.hours}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WorkingHours;
