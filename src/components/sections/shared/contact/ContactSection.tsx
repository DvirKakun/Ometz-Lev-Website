import { motion } from "framer-motion";
import ContactHeader from "./ContactHeader";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <section id="contact" className="py-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,white_1px,transparent_1px)] bg-[length:50px_50px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,white_1px,transparent_1px)] bg-[length:70px_70px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <ContactHeader />
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;