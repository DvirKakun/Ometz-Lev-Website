import React from "react";
import { motion } from "framer-motion";
import FooterQuickLinks from "./FooterQuickLinks";
import FooterContact from "./FooterContact";
import FooterWorkingHours from "./FooterWorkingHours";

const FooterMain: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="container-max section-padding py-8 sm:py-12 lg:py-16"
    >
      {/* Mobile-first layout with improved spacing and hierarchy */}
      <div className="block md:hidden">
        <div className="space-y-10 px-2 sm:px-0">
          {/* Contact info first on mobile for immediate access */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FooterContact />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <FooterQuickLinks />
          </motion.div>

          {/* Working hours with CTA for quick action */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FooterWorkingHours showSocialLinks={true} />
          </motion.div>
        </div>
      </div>

      {/* Tablet and Desktop layout (3 columns) - enhanced spacing */}
      <div className="hidden md:block">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          <FooterQuickLinks />
          <FooterContact />
          <FooterWorkingHours showSocialLinks={true} />
        </div>
      </div>
    </motion.div>
  );
};

export default FooterMain;
