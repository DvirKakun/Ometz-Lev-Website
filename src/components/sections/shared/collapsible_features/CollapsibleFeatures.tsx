import { motion } from "framer-motion";
import CtaButtons from "./CtaButtons";
import ServiceHeader from "../headers/MainHeader";
import ServiceSelectionSection from "./ServiceSelectionSection";
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
      <section className="bg-white">
        {/* Full-Width Header Container with Background */}
        <div className="w-full bg-slate-900/85 mb-8 sm:mb-10 lg:mb-12">
          <div className="container mx-auto px-3 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto py-8 sm:py-10 lg:py-12"
            >
              {/* Mobile-First Header Layout */}
              <div className="flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
                {/* Title - Mobile: Top, Desktop: Right */}
                <div className="order-1">
                  <ServiceHeader
                    title={service.title}
                    description={service.description}
                  />
                </div>

                {/* CTA Buttons - Mobile: Below title for better flow */}
                <div className="order-2">
                  <CtaButtons
                    service={service}
                    scrollToSection={scrollToSection}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Service Selection Section */}
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <ServiceSelectionSection service={service} />
          </motion.div>
        </div>
      </section>

      <ContactModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default CollapsibleFeatures;
