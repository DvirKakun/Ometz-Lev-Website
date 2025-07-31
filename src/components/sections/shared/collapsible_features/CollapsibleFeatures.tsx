import { motion } from "framer-motion";
import CtaButtons from "./CtaButtons";
import ServiceHeader from "../headers/MainHeader";
import FeaturesAccordion from "./FeaturesAccordion";
import ContactModal from "../../../modals/contact/ContactModal";
import { useContactModal } from "../../../../hooks/useContactModal";
import type { CollapsibleFeaturesProps } from "../../../../types/collapsible_features";

const CollapsibleFeatures = ({ service }: CollapsibleFeaturesProps) => {
  const { isOpen, openModal, onOpenChange } = useContactModal();

  const scrollToSection = (href: string) => {
    // Handle contact modal
    if (href === "#contact") {
      openModal();
      return;
    }

    // Handle other sections with scroll
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

  return (
    <>
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
              <ServiceHeader
                title={service.title}
                description={service.description}
              />

              {/* CTA Buttons - Left Side */}
              <CtaButtons service={service} scrollToSection={scrollToSection} />
            </div>

            {/* Features Accordion */}
            <FeaturesAccordion service={service} />
          </motion.div>
        </div>
      </section>

      <ContactModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default CollapsibleFeatures;
