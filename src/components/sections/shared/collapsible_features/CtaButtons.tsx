import { motion } from "framer-motion";
import { Button } from "../../../ui/button";
import type { CtaButtonsProps } from "../../../../types/collapsible_features";

const CtaButtons = ({ service, scrollToSection }: CtaButtonsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-3 sm:space-y-4"
    >
      {/* Mobile-centered heading */}
      <h3 className="text-lg sm:text-xl font-semibold text-primary-500 mb-4 sm:mb-6 text-center sm:text-right">
        פעולות זמינות
      </h3>

      {/* Mobile-first grid for CTAs - 2 columns on small screens */}
      <div className="grid grid-cols-1 gap-3 sm:space-y-4 sm:block">
        {service.cta.map((ctaItem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20, scale: 1 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              opacity: { duration: 0.4, delay: 0.3 + index * 0.1 },
              x: { duration: 0.4, delay: 0.3 + index * 0.1 },
              scale: { duration: 0.15 },
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.15 },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
          >
            <Button
              onClick={() => scrollToSection(ctaItem.href)}
              variant="default"
              className={`w-full justify-between text-right min-h-[56px] px-4 py-3 sm:p-4 h-auto bg-white
               border-none shadow-lg hover:shadow-xl rounded-xl sm:rounded-lg font-medium transition-all duration-200 group active:scale-95 touch-manipulation`}
            >
              <span className="text-gray-800 font-medium group-hover:font-semibold transition-all duration-150 text-sm sm:text-base">
                {ctaItem.text}
              </span>
              <ctaItem.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 transition-all duration-150 shrink-0" />
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CtaButtons;
