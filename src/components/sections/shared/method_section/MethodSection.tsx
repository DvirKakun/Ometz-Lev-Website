import { motion } from "framer-motion";
import type { MethodSectionProps } from "../../../../types/method";
import AboutIntro from "./AboutIntro";
import MethodHeader from "./MethodHeader";
import MethodPhilosophy from "./MethodPhilosophy";
import MethodPrinciples from "./MethodPrinciples";
import ProcessSteps from "./ProcessSteps";

const MethodSection = ({ config, service }: MethodSectionProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* About Section - Brief Intro */}
          <AboutIntro config={config.about} service={service} />

          {/* Section Header */}
          <MethodHeader config={config.header} service={service} />

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            {/* Philosophy Text */}
            <MethodPhilosophy config={config.philosophy} service={service} />

            {/* Method Principles Grid */}
            <MethodPrinciples
              principles={config.principles}
              service={service}
            />

            {/* Process Steps */}
            <ProcessSteps config={config.process} service={service} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MethodSection;
