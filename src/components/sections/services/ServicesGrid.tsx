import React from "react";
import { motion } from "framer-motion";
import ServicesHeader from "./ServicesHeader";
import ServiceCard from "./ServiceCard";
import { services } from "../../../data/services";

const ServicesGrid: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Clean Subtle Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)`,
            backgroundSize: '400px 400px'
          }}
        />
      </div>

      {/* Minimal Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary-100/40 to-primary-200/20 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-accent-100/30 to-accent-200/15 rounded-full blur-2xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
      
      <div className="container-max section-padding relative z-10">
        <ServicesHeader />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.path} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;