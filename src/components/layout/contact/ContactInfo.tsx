import React from "react";
import { motion } from "framer-motion";
import WorkingHours from "./WorkingHours";
import TrustBadge from "./TrustBadge";

interface ContactInfoProps {
  onTrustBadgeClick?: () => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ onTrustBadgeClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <WorkingHours />
      <TrustBadge onClick={onTrustBadgeClick} />
    </motion.div>
  );
};

export default ContactInfo;