import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const ContactHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-center mb-6"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg mb-4">
        <Mail className="w-6 h-6 text-white" />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
        צרו קשר
      </h2>
      <p className="text-lg text-primary-100">
        מלאו את הפרטים ונחזור אליכם בהקדם
      </p>
    </motion.div>
  );
};

export default ContactHeader;