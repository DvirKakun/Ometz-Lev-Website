import React from "react";
import { motion } from "framer-motion";
import ServicesHeader from "./ServicesHeader";
import ServiceCard from "./ServiceCard";
import { services } from "../../../../data/services";
import {
  useTherapyPrimaryOfferings,
  useTrainingPrimaryOfferings,
  useActivitiesPrimaryOfferings,
  useSchoolsPrimaryOfferings,
} from "../../../../hooks/useServiceOfferings";
import { getPrimaryOfferingsWithFallback } from "../../../../utils/fallback-content";

const ServicesGrid: React.FC = () => {
  const { data: therapyPrimaryOfferings } = useTherapyPrimaryOfferings();
  const { data: trainingPrimaryOfferings } = useTrainingPrimaryOfferings();
  const { data: activitiesPrimaryOfferings } = useActivitiesPrimaryOfferings();
  const { data: schoolsPrimaryOfferings } = useSchoolsPrimaryOfferings();

  // Create services array with Prismic data + fallback content for SEO
  const servicesWithContent = services.map((service) => {
    switch (service.path) {
      case "/therapy":
        return { 
          ...service, 
          offerings: getPrimaryOfferingsWithFallback(therapyPrimaryOfferings, "therapy")
        };
      case "/training":
        return { 
          ...service, 
          offerings: getPrimaryOfferingsWithFallback(trainingPrimaryOfferings, "training")
        };
      case "/activities":
        return { 
          ...service, 
          offerings: getPrimaryOfferingsWithFallback(activitiesPrimaryOfferings, "activities")
        };
      case "/schools":
        return { 
          ...service, 
          offerings: getPrimaryOfferingsWithFallback(schoolsPrimaryOfferings, "schools")
        };
      default:
        return service;
    }
  });

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-white">
      <div className="container-max section-padding">
        <ServicesHeader />

        {/* Mobile-first responsive grid: 2 cols mobile → 2 cols tablet → 4 cols desktop */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto items-stretch"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {servicesWithContent.map((service, index) => (
            <div key={service.path} className="w-full h-full flex">
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
