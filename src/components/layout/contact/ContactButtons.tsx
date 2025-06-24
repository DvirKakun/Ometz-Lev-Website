import React from "react";
import { motion } from "framer-motion";
import WhatsAppButton from "../../common/WhatsAppButton";
import PhoneButton from "../../common/PhoneButton";

const ContactButtons: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col sm:flex-row gap-4 mb-8"
    >
      <WhatsAppButton
        size="lg"
        className="flex-1 sm:flex-none bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
      />
      <PhoneButton
        variant="outline"
        size="lg"
        className="flex-1 sm:flex-none border-white/30 text-white hover:bg-white/10"
      />
    </motion.div>
  );
};

export default ContactButtons;
