import React from "react";
import { motion } from "framer-motion";
import TrustBadge from "./TrustBadge";
import ContactModal from "../../modals/contact/ContactModal";
import { useRouterModal } from "../../../hooks/useRouterModal";

const ContactCTA: React.FC = () => {
  const { isOpen, openModal, onOpenChange } = useRouterModal({
    modalKey: "contact",
  });
  return (
    <section className="py-12 lg:py-16 bg-white  text-gray-900 relative overflow-hidden">
      <div className="container-max section-padding relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Main CTA Content */}
          <div className="text-center mb-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight"
            >
              בואו נתחיל לדבר
              <span className="text-primary-500"> בשפת הכלבים!</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-base md:text-lg text-gray-600 leading-relaxed mb-4 max-w-xl mx-auto"
            >
              צרו קשר עכשיו לקביעת פגישת ייעוץ ראשונה ונתחיל יחד את המסע ליצירת
              קשר בינכם לבין הכלב שלכם
            </motion.p>
          </div>

          {/* Trust Badge Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <TrustBadge onClick={() => openModal()} />
          </motion.div>
        </div>
      </div>

      <ContactModal isOpen={isOpen} onClose={() => onOpenChange(false)} />
    </section>
  );
};

export default ContactCTA;
