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
      className="space-y-4 order-2 lg:order-2"
    >
      <h3 className="text-xl font-semibold text-slate-800 mb-6 text-right">
        פעולות זמינות
      </h3>
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
            className={`w-full justify-between text-right p-4 h-auto ${
              service.color.includes("therapy")
                ? "bg-therapy-100"
                : service.color.includes("training")
                ? "bg-training-100"
                : "bg-primary-100"
            } hover:opacity-90 border-none shadow-md rounded-lg font-medium transition-all duration-150 group `}
          >
            <span
              className={`text-gray-800 font-medium group-hover:font-semibold transition-all duration-150`}
            >
              {ctaItem.text}
            </span>
            <ctaItem.icon
              className={`w-5 h-5 text-gray-800 transition-all duration-150`}
            />
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CtaButtons;
