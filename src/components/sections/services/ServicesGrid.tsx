import React from "react";
import ServicesHeader from "./ServicesHeader";
import ServiceCard from "./ServiceCard";
import { services } from "../../../data/services";

const ServicesGrid: React.FC = () => {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-slate-50 via-primary-50/20 to-accent-50/20">
      <div className="container-max section-padding">
        {/* Section Header */}
        <ServicesHeader />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={service.path} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
