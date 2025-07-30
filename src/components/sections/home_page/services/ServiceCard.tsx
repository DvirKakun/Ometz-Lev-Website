import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../ui/card";
import { ArrowUpRight } from "lucide-react";
import type { ServiceCardProps } from "../../../../types/services";

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Map service colors to text colors for hover states
  const getHoverTextColor = () => {
    switch (service.path) {
      case "/therapy":
        return "text-red-500";
      case "/training":
        return "text-primary-600";
      case "/activities":
        return "text-accent-600";
      case "/schools":
        return "text-purple-600";
      default:
        return "text-primary-600";
    }
  };

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
        <Card className="h-full bg-white border-2 border-slate-200 shadow-lg hover:shadow-xl hover:border-slate-300 transition-all duration-300 group-hover:-translate-y-2">
          <CardContent className="p-6 h-full flex flex-col">
            {/* Icon */}
            <motion.div
              className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
            >
              <service.icon className="w-8 h-8 text-white" />
            </motion.div>

            {/* Title */}
            <h3
              className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                isHovered ? getHoverTextColor() : "text-slate-800"
              }`}
            >
              {service.title}
            </h3>

            {/* Features */}
            <div className="space-y-3 flex-1 mb-6">
              {service.features.slice(0, 3).map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center text-sm text-slate-600"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: isHovered ? 1 : 0.7 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                >
                  <div
                    className={`w-2 h-2 bg-gradient-to-br ${service.color} rounded-full ml-3 flex-shrink-0`}
                  />
                  <span className="leading-relaxed">{feature.title}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div className={`mt-auto pt-2`}>
              <motion.div
                className={`px-4 py-3 rounded-xl bg-gradient-to-r from-white to-slate-50 border-2 shadow-lg cursor-pointer transition-all duration-300 ${
                  isHovered
                    ? `border-opacity-100 shadow-xl -translate-y-1 bg-gradient-to-r from-slate-50 to-slate-100`
                    : "border-slate-200 hover:shadow-xl hover:-translate-y-0.5"
                }`}
                animate={{
                  borderColor: isHovered
                    ? "rgba(148, 163, 184, 0.4)"
                    : "rgba(203, 213, 225, 1)",
                  boxShadow: isHovered
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-bold transition-colors duration-300 ${
                      isHovered ? getHoverTextColor() : "text-slate-800"
                    }`}
                  >
                    לפרטים נוספים
                  </span>
                  <motion.div
                    animate={{
                      x: isHovered ? 6 : 0,
                      scale: isHovered ? 1.15 : 1,
                      rotate: isHovered ? -10 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`w-9 h-9 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <ArrowUpRight className="w-4 h-4 text-white" />
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
