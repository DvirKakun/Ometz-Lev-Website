import React from "react";
import { motion } from "framer-motion";
import type { FAQSectionProps } from "../../../../types/faq";
import { getFAQsByPageType, getFAQSectionConfig } from "../../../../data/faq";
import FAQHeader from "./FAQHeader";
import FAQAccordion from "./FAQAccordion";

const FAQSection: React.FC<FAQSectionProps> = ({ pageType, className = "" }) => {
  const faqItems = getFAQsByPageType(pageType);
  const config = getFAQSectionConfig(pageType);

  if (!faqItems.length || !config) {
    return null;
  }

  return (
    <section className={`py-16 bg-slate-50 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <FAQHeader 
            title={config.title}
            description={config.description}
            className="mb-10"
          />
          
          <FAQAccordion 
            items={faqItems}
            className="space-y-3"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;