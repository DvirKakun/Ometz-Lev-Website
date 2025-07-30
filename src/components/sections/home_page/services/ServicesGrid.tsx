import React from "react";
import { motion } from "framer-motion";
import ServicesHeader from "./ServicesHeader";
import ServiceCard from "./ServiceCard";
import { services } from "../../../../data/services";

const ServicesGrid: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-max section-padding">
        <ServicesHeader />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <div
              key={service.path}
              className="w-full max-w-72 md:max-w-xs lg:max-w-none"
            >
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
