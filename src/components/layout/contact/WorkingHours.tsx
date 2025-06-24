import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Card, CardContent } from "../../ui/card";

const WorkingHours: React.FC = () => {
  const workingHours = [
    { day: "ראשון - חמישי", hours: "20:00 - 08:00" },
    { day: "שישי", hours: "15:00 - 08:00" },
    { day: "שבת", hours: "לפי תיאום מראש" },
  ];

  return (
    <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2 space-x-reverse">
          <Clock className="w-5 h-5" />
          <span>שעות פעילות</span>
        </h3>
        <div className="space-y-3">
          {workingHours.map((schedule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
              className="flex justify-between items-center text-primary-100"
            >
              <span>{schedule.day}</span>
              <span className="font-medium">{schedule.hours}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkingHours;
