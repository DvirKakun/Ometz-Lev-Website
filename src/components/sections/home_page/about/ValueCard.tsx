import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../../ui/card";
import type { ValueCardProps } from "../../../../types/value_card";

const ValueCard: React.FC<ValueCardProps> = ({ value, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <Card className="card hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-primary-50/30 touch-manipulation">
        <CardContent className="p-4 sm:p-5 md:p-6">
          <div className="flex items-start space-x-4 space-x-reverse">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 text-right">
              <h4 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1.5 sm:mb-2">
                {value.title}
              </h4>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
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
