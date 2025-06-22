import { motion } from "framer-motion";
import type { Service } from "../../../../data/services";
import CtaButtons from "./CtaButtons";
import ServiceHeader from "./ServiceHeader";
import FeaturesAccordion from "./FeaturesAccordion";

interface CollapsibleFeaturesProps {
  service: Service;
}

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    // Calculate offset to position at the icon/header instead of section top
    const offset = 100; // Adjust this value to position exactly at the icon
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

const CollapsibleFeatures = ({ service }: CollapsibleFeaturesProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header with CTA Buttons */}
          <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
            {/* Title - Right Side */}
            <ServiceHeader service={service} />

            {/* CTA Buttons - Left Side */}
            <CtaButtons service={service} scrollToSection={scrollToSection} />
          </div>

          {/* Features Accordion */}
          <FeaturesAccordion service={service} />
        </motion.div>
      </div>
    </section>
  );
};

export default CollapsibleFeatures;
