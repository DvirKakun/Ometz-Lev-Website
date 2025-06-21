import React from "react";
import { motion } from "framer-motion";
import PhoneButton from "../../common/PhoneButton";

const FooterCTA: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <h4 className="text-lg font-semibold mb-6 text-primary-300">
        בואו נתחיל
      </h4>
      <p className="text-slate-300 mb-6 leading-relaxed">
        מוכנים להתחיל את המסע עם הכלב שלכם? צרו קשר עכשיו לקביעת פגישת
        ייעוץ ראשונה.
      </p>
      <PhoneButton
        phoneNumber="052-472-4700"
        variant="default"
        size="sm"
        className="justify-center"
      />
    </motion.div>
  );
};

export default FooterCTA;