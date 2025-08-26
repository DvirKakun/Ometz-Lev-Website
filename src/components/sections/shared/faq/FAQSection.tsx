import React from "react";
import { motion } from "framer-motion";
import type { FAQSectionProps } from "../../../../types/faq";
import { useFAQItems } from "../../../../hooks/useFAQ";
import { getFAQSectionConfig } from "../../../../utils/prismic-faq";
import FAQHeader from "./FAQHeader";
import FAQAccordion from "./FAQAccordion";

const FAQSection: React.FC<FAQSectionProps> = ({
  pageType,
  className = "",
}) => {
  const { data: faqItems, isLoading, error } = useFAQItems(pageType);
  const config = getFAQSectionConfig(pageType);

  if (isLoading) {
    return (
      <section className={`py-16 bg-slate-50 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded mb-8 w-1/2"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="mb-4">
                  <div className="h-6 bg-slate-200 rounded mb-2"></div>
                  <div className="h-20 bg-slate-100 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !faqItems.length || !config) {
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

          <FAQAccordion items={faqItems} className="space-y-3" />
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
