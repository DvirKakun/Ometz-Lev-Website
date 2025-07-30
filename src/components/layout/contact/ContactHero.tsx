import React from "react";
import { motion } from "framer-motion";
import ContactButtons from "./ContactButtons";

const ContactHero: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center lg:text-right"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
      >
        בואו נתחיל לדבר <br />
        <span className="text-accent-200">בשפת הכלבים!</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-xl text-primary-100 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
      >
        צרו קשר עכשיו לקביעת פגישת ייעוץ ראשונה ונתחיל יחד את המסע ליצירת קשר
        בינכם לבין הכלב שלכם
      </motion.p>

      <ContactButtons />
    </motion.div>
  );
};

export default ContactHero;
