import React from "react";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "../../ui/card";

interface ContactMethodCardProps {
  method: {
    icon: LucideIcon;
    title: string;
    description: string;
    action: string;
    color: string;
  };
  index: number;
}

const ContactMethodCard: React.FC<ContactMethodCardProps> = ({
  method,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
      viewport={{ once: true }}
    >
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer">
        <CardContent className="p-4 text-center">
          <div
            className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
          >
            <method.icon className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold text-white mb-1">{method.title}</h4>
          <p className="text-sm text-primary-100 mb-2">{method.description}</p>
          <span className="text-xs text-accent-200 font-medium">
            {method.action}
          </span>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactMethodCard;
