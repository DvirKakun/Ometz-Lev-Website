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
      className="text-center sm:text-right"
    >
      {/* Mobile-optimized typography with clamp() for fluid scaling */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto sm:mx-0"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default ServiceHeader;
