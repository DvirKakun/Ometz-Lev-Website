import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../ui/card";
import type { LucideIcon } from "lucide-react";

interface ValueCardProps {
  value: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  index: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ value, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <Card className="card hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-primary-50/30">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4 space-x-reverse">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
              <value.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-right">
              <h4 className="text-xl font-semibold text-slate-800 mb-2">
                {value.title}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ValueCard;
