import { motion } from "framer-motion";
import type { ProcessStepsProps } from "../../../../types/method";

const ProcessSteps = ({ config, service }: ProcessStepsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className={`bg-gradient-to-br ${service.bgColor} rounded-2xl p-8 border-2 ${service.borderColor}`}
    >
      <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        {config.title}
      </h3>

      <div className="grid md:grid-cols-3 gap-6 text-center">
        {config.steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
            className="space-y-3"
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${service.color} text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto`}>
              {step.step}
            </div>
            <h4 className="text-lg font-semibold text-slate-800">
              {step.title}
            </h4>
            <p className="text-slate-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProcessSteps;
