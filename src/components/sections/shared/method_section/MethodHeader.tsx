import { motion } from "framer-motion";
import type { HeaderConfig } from "../../../../types/method";

interface MethodHeaderProps {
  config: HeaderConfig;
}

const MethodHeader = ({ config }: MethodHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
        {config.title}
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto mb-6"></div>
      <p className="text-xl text-slate-600">{config.subtitle}</p>
    </motion.div>
  );
};

export default MethodHeader;
