import { motion } from "framer-motion";
import type { MethodPrinciplesProps } from "../../../../types/method";

const MethodPrinciples = ({ principles }: MethodPrinciplesProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {principles.map((principle, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
          className={`bg-white rounded-xl p-6 border-2 border-primary-200 hover:border-primary-300 shadow-sm hover:shadow-md transition-all duration-300`}
        >
          <div className="flex items-start gap-4 text-right">
            <div className="w-12 h-12 bg-white border-2 border-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
              <principle.icon className="w-6 h-6 text-primary-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {principle.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {principle.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MethodPrinciples;
