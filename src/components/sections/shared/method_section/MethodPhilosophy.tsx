import { motion } from "framer-motion";
import type { MethodPhilosophyProps } from "../../../../types/method";

const MethodPhilosophy = ({ config, service }: MethodPhilosophyProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className={`bg-gradient-to-l ${service.bgColor} to-white rounded-2xl p-8 border-2 ${service.borderColor} shadow-sm`}
    >
      <div className="text-right space-y-4">
        {config.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed text-slate-700">
            {paragraph
              .split(/\*\*(.*?)\*\*/)
              .map((part, partIndex) =>
                partIndex % 2 === 1 ? (
                  <strong key={partIndex}>{part}</strong>
                ) : (
                  part
                )
              )}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

export default MethodPhilosophy;
