import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import ContactMethodCard from "./ContactMethodCard";

const ContactMethods: React.FC = () => {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "הודעה בוואטסאפ",
      description: "התכתבות מהירה ונוחה",
      action: "שלחו הודעה",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Phone,
      title: "שיחת טלפון",
      description: "שיחה ישירה ואישית",
      action: "התקשרו עכשיו",
      color: "from-accent-500 to-accent-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {contactMethods.map((method, index) => (
        <ContactMethodCard key={index} method={method} index={index} />
      ))}
    </div>
  );
};

export default ContactMethods;