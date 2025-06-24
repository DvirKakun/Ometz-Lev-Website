import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";
import type { FAQAccordionProps } from "../../../../types/faq";

const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  className = "",
}) => {
  return (
    <div className={className} dir="rtl">
      <Accordion type="single" collapsible className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <AccordionItem
              value={item.id}
              className="border border-gray-200 rounded-lg bg-white hover:shadow-md transition-all duration-200"
            >
              <AccordionTrigger className="text-right hover:no-underline px-6 py-4 hover:text-primary-600 transition-colors">
                <span className="text-lg font-semibold text-gray-900 leading-relaxed">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-right px-6 pb-4 pt-2">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
