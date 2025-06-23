import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const ContactHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-center mb-4"
    >
      <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg shadow-lg mb-3">
        <Mail className="w-5 h-5 text-white" />
      </div>
      
      <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
        צרו קשר
      </h2>
      <p className="text-base text-primary-100">
        מלאו את הפרטים ונחזור אליכם בהקדם
      </p>
    </motion.div>
  );
};

export default ContactHeader;