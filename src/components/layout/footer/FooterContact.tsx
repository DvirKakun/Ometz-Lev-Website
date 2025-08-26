import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

// Mobile-optimized contact section with enhanced touch targets
const FooterContact: React.FC = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: "052-472-4700",
      href: "tel:0524724700",
      actionable: true,
    },
    {
      icon: Mail,
      label: "Eladshi1326@gmail.com",
      href: "mailto:Eladshi1326@gmail.com",
      actionable: true,
    },
    {
      icon: MapPin,
      label: "ראשון לציון, ישראל",
      href: undefined,
      actionable: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-primary-500 flex items-center gap-2">
        <div className="w-1 h-5 md:h-6 bg-primary-500 rounded-full"></div>
        יצירת קשר
      </h4>

      <ul className="space-y-4 sm:space-y-3">
        {contactInfo.map((contact, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            viewport={{ once: true }}
          >
            {contact.actionable ? (
              <a
                href={contact.href}
                className="flex items-center space-x-3 space-x-reverse text-slate-300 hover:text-primary-300 focus-visible:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 transition-all duration-200 group p-2 -m-2 rounded-xl active:scale-95"
              >
                {/* Enhanced touch target with better visual feedback */}
                <div className="w-10 h-10 md:w-8 md:h-8 bg-slate-700/50 rounded-xl flex items-center justify-center group-hover:bg-primary-500/20 group-focus-visible:bg-primary-500/20 group-active:bg-primary-500/30 transition-all duration-200 shadow-lg group-hover:shadow-xl group-hover:scale-105">
                  <contact.icon className="w-4 h-4 md:w-4 md:h-4 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <span className="text-sm md:text-base font-medium group-hover:font-semibold transition-all duration-200 leading-tight break-all">
                  {contact.label}
                </span>
              </a>
            ) : (
              <div className="flex items-center space-x-3 space-x-reverse text-slate-400 p-2 -m-2">
                <div className="w-10 h-10 md:w-8 md:h-8 bg-slate-700/30 rounded-xl flex items-center justify-center">
                  <contact.icon className="w-4 h-4 md:w-4 md:h-4" />
                </div>
                <span className="text-sm md:text-base leading-tight">
                  {contact.label}
                </span>
              </div>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FooterContact;
