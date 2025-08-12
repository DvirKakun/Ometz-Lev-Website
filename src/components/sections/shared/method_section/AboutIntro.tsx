import { motion } from "framer-motion";
import type { AboutIntroProps } from "../../../../types/method";

const AboutIntro = ({ config, service }: AboutIntroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="flex items-center gap-6 mb-12 text-right"
    >
      {/* Small Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-shrink-0"
      >
        {config.imageSrc && (
          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 ${service.borderColor} shadow-lg`}>
            <img
              src={config.imageSrc}
              alt={config.altText || config.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </motion.div>

      {/* Brief Text */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex-1"
      >
        <p className="text-lg text-slate-700 leading-relaxed">
          <strong>{config.name}</strong> - {config.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AboutIntro;
