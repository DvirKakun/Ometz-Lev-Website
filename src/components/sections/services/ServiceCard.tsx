import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../ui/card";
import { type Service } from "../../../data/services";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={service.path} className="block">
        <Card
          className={`card hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br ${service.bgColor} ${service.hoverColor} hover:-translate-y-1 h-full cursor-pointer`}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            {/* Icon */}
            <div
              className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}
            >
              <service.icon className="w-8 h-8 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
              {service.title}
            </h3>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
