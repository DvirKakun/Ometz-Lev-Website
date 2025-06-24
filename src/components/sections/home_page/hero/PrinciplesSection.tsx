import React from "react";
import { motion } from "framer-motion";
import { principles } from "../../../../data/principles";

const PrinciplesSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
      className="mb-8"
    >
      {/* Simple Grid */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
        {principles.map((principle, index) => (
          <motion.div
            key={principle.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.1 + index * 0.1,
            }}
            className="flex-1 text-center lg:text-right group"
          >
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 mb-3 mx-auto lg:mx-0 lg:mr-auto"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-2xl">{principle.icon}</span>
            </motion.div>

            {/* Content */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {principle.title}
              </h4>
              <p className="text-xs text-slate-300 opacity-80">
                {principle.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PrinciplesSection;
