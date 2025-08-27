import { motion } from "framer-motion";
import type { MethodHeaderProps } from "../../../../types/method";

const MethodHeader = ({ config }: MethodHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="text-center mb-8 md:mb-12 px-4 md:px-0"
    >
      <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
        {config.title}
      </h2>
      <div
        className="w-16 md:w-20 h-1 bg-primary-500 rounded-full mx-auto mb-4 md:mb-6"
      ></div>
      <p className="text-lg md:text-xl text-slate-600 leading-relaxed">{config.subtitle}</p>
    </motion.div>
  );
};

export default MethodHeader;
