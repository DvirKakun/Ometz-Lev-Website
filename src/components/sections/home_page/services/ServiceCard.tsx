import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../ui/card";
import { ArrowUpRight } from "lucide-react";
import type { ServiceCardProps } from "../../../../types/services";

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={service.path}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg"
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label={`למידע נוסף על ${service.title}`}
      >
        <Card className="h-full bg-white border-2 border-slate-200 shadow-lg hover:shadow-xl hover:border-slate-300 transition-all duration-300 group-hover:-translate-y-1 sm:group-hover:-translate-y-2">
          <CardContent className="p-3 sm:p-4 md:p-6 h-full flex flex-col">
            {/* Icon - responsive sizing */}
            <motion.div
              className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${service.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300`}
            >
              <service.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
            </motion.div>

            {/* Title - responsive typography */}
            <h3
              className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 sm:mb-3 md:mb-4 transition-colors duration-300 leading-tight ${
                isHovered ? service.hoverTextColor : "text-slate-800"
              }`}
            >
              {service.title}
            </h3>

            {/* Offerings - mobile optimized */}
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3 flex-1 mb-3 sm:mb-4 md:mb-6">
              {service.offerings.slice(0, 3).map((offering, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start text-[0.65rem] sm:text-sm text-slate-600"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: isHovered ? 1 : 0.7 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                >
                  <div
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-br ${service.color} rounded-full ml-2 sm:ml-3 flex-shrink-0 mt-1.5 sm:mt-1`}
                  />
                  <span className="leading-relaxed line-clamp-2">
                    {offering.title}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button - touch-optimized for mobile */}
            <motion.div className="mt-auto pt-1 sm:pt-2">
              <motion.div
                className={`px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-white to-slate-50 border-2 shadow-lg cursor-pointer transition-all duration-300 min-h-[44px] flex items-center ${
                  isHovered
                    ? `border-opacity-100 shadow-xl -translate-y-0.5 sm:-translate-y-1 bg-gradient-to-r from-slate-50 to-slate-100`
                    : "border-slate-200 hover:shadow-xl hover:-translate-y-0.5"
                }`}
                animate={{
                  borderColor: isHovered
                    ? "rgba(148, 163, 184, 0.4)"
                    : "rgba(203, 213, 225, 1)",
                  boxShadow: isHovered
                    ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs sm:text-sm font-bold transition-colors duration-300 ${
                      isHovered ? service.hoverTextColor : "text-slate-800"
                    }`}
                  >
                    לפרטים נוספים
                  </span>
                  <motion.div
                    animate={{
                      x: isHovered ? 3 : 0,
                      scale: isHovered ? 1.1 : 1,
                      rotate: isHovered ? -10 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-gradient-to-br ${service.color} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}
                  >
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
