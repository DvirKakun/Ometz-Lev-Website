import { motion } from "framer-motion";
import AboutIntro from "./AboutIntro";
import MethodHeader from "./MethodHeader";
import MethodPhilosophy from "./MethodPhilosophy";
import MethodPrinciples from "./MethodPrinciples";
import ProcessSteps from "./ProcessSteps";

const TrainingMethod = () => {
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
          <AboutIntro />

          {/* Section Header */}
          <MethodHeader />

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            {/* Philosophy Text */}
            <MethodPhilosophy />

            {/* Method Principles Grid */}
            <MethodPrinciples />

            {/* Process Steps */}
            <ProcessSteps />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingMethod;
