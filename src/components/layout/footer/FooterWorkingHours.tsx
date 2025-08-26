import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const FooterWorkingHours: React.FC = () => {
  const workingHours = [
    { day: "ראשון - חמישי", hours: "20:00 - 08:00" },
    { day: "שישי", hours: "15:00 - 08:00" },
    { day: "שבת", hours: "לפי תיאום מראש" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <h4 className="text-lg font-semibold mb-6 text-primary-500 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        שעות פעילות
      </h4>

      <div className="space-y-3 mb-6">
        {workingHours.map((schedule, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            viewport={{ once: true }}
            className="flex justify-between items-center text-slate-300"
          >
            <span className="font-medium">{schedule.day}</span>
            <span className="text-sm font-semibold text-white">
              {schedule.hours}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FooterWorkingHours;
