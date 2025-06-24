import { motion } from "framer-motion";
import type { ServiceHeaderProps } from "../../../../types/headers";

const ServiceHeader = ({
  title,
  description = "גלו את השירותים המקצועיים שלנו",
}: ServiceHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-right order-1 lg:order-2"
    >
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-xl text-slate-600"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default ServiceHeader;
