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
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-white" />
        <h3 className="text-lg font-semibold text-white">שעות פעילות</h3>
      </div>
      
      <div className="space-y-2">
        {workingHours.map((schedule, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            viewport={{ once: true }}
            className="flex justify-between items-center text-white/90"
          >
            <span className="font-medium">{schedule.day}</span>
            <span className="text-sm font-semibold text-accent-200">{schedule.hours}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkingHours;
