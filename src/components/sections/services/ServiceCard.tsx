import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../ui/card";
import { ArrowUpRight } from "lucide-react";
import { type Service } from "../../../data/services";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Map service colors to text colors for hover states
  const getHoverTextColor = () => {
    switch (service.path) {
      case "/therapy":
        return "text-red-500";
      case "/training":
        return "text-primary-600";
      case "/coaching":
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
      <Link to={service.path} className="block">
        <Card className="h-full bg-white border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
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
              {service.features.map((feature, idx) => (
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
                  <span className="leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Arrow */}
            <motion.div
              className="flex items-center justify-between pt-4 border-t border-slate-100"
              animate={{
                borderColor: isHovered
                  ? "rgba(59, 130, 246, 0.2)"
                  : "rgba(241, 245, 249, 1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  isHovered ? getHoverTextColor() : "text-slate-500"
                }`}
              >
                לפרטים נוספים
              </span>
              <motion.div
                animate={{
                  x: isHovered ? 4 : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`w-8 h-8 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center`}
              >
                <ArrowUpRight className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
