import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const FooterContact: React.FC = () => {
  const contactInfo = [
    { icon: Phone, label: "052-472-4700", href: "tel:0524724700" },
    {
      icon: Mail,
      label: "Eladshi1326@gmail.com",
      href: "mailto:Eladshi1326@gmail.com",
    },
    { icon: MapPin, label: "ראשון לציון, ישראל", href: undefined },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <h4 className="text-lg font-semibold mb-6 text-primary-300">יצירת קשר</h4>
      <ul className="space-y-3">
        {contactInfo.map((contact, index) => (
          <li key={index}>
            <a
              href={contact.href}
              className="flex items-center space-x-3 space-x-reverse text-slate-300 hover:text-primary-300 transition-colors duration-200 group"
            >
              <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center group-hover:bg-primary-500/20 transition-colors duration-200">
                <contact.icon className="w-4 h-4" />
              </div>
              <span>{contact.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FooterContact;
