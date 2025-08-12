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
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
        >
          <Button
            onClick={() => scrollToSection(ctaItem.href)}
            variant="outline"
            className={`w-full justify-between text-right p-4 h-auto border-2 ${service.borderColor} ${service.hoverBorderColor} hover:bg-gradient-to-r ${service.bgColor} ${service.hoverColor} transition-all duration-300 group`}
          >
            <span className={`text-slate-700 font-medium group-hover:font-semibold group-hover:${service.hoverTextColor} transition-all duration-300`}>{ctaItem.text}</span>
            <ctaItem.icon className={`w-5 h-5 text-slate-600 group-hover:${service.hoverTextColor} transition-all duration-300`} />
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CtaButtons;
