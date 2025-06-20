import React from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Clock } from "lucide-react";
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6"
      >
        <Heart className="w-4 h-4" />
        <span>בואו נתחיל את המסע</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
      >
        מוכנים ליצור קשר
        <br />
        <span className="text-accent-200">עם הכלב שלכם?</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-xl text-primary-100 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
      >
        צרו קשר עכשיו לקביעת פגישת ייעוץ ראשונה ונתחיל יחד את המסע ליצירת
        קשר הרמוני בינכם לבין הכלב שלכם
      </motion.p>

      <ContactButtons />

      {/* Quick Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-primary-100"
      >
        <div className="flex items-center space-x-2 space-x-reverse">
          <MapPin className="w-5 h-5" />
          <span>ראשון לציון ופזור</span>
        </div>
        <div className="hidden sm:block text-primary-200">•</div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Clock className="w-5 h-5" />
          <span>זמינות גמישה</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactHero;