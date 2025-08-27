import { motion } from "framer-motion";
import type { MethodPhilosophyProps } from "../../../../types/method";

const MethodPhilosophy = ({ config }: MethodPhilosophyProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-primary-100/20 to-white rounded-2xl p-4 md:p-8 border-2 border-primary-200 shadow-sm mx-4 md:mx-0"
    >
      <div className="text-right space-y-3 md:space-y-4">
        {config.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-base md:text-lg leading-relaxed text-slate-700">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

export default MethodPhilosophy;
