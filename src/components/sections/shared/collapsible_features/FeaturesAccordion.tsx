import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";
import type { Service } from "../../../../data/services";

interface FeaturesAccordionProps {
  service: Service;
}

const FeaturesAccordion = ({ service }: FeaturesAccordionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Accordion type="multiple" className="w-full space-y-4" dir="rtl">
        {service.features.map((feature, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <AccordionTrigger className="px-6 py-4 text-right hover:no-underline bg-gradient-to-l from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-colors duration-300">
              <span className="text-lg font-semibold text-slate-800 text-right">
                {feature.title}
              </span>
            </AccordionTrigger>

            <AccordionContent className="px-6 pb-4 pt-2">
              <div className="text-slate-600 leading-relaxed text-right border-t border-slate-100 pt-4">
                {feature.description}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
};

export default FeaturesAccordion;