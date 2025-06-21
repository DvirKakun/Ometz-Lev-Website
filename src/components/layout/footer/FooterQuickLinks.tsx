import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Award, BookOpen, Users } from "lucide-react";

const FooterQuickLinks: React.FC = () => {
  const quickLinks = [
    { path: "/therapy", label: "כלבנות טיפולית", icon: Heart },
    { path: "/training", label: "אילוף כלבים", icon: BookOpen },
    { path: "/coaching", label: "אימון אישי", icon: Award },
    { path: "/schools", label: "תכנית גפן", icon: Users },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <h4 className="text-lg font-semibold mb-6 text-primary-300">
        שירותים
      </h4>
      <ul className="space-y-3">
        {quickLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="flex items-center space-x-2 space-x-reverse text-slate-300 hover:text-primary-300 transition-colors duration-200 group"
            >
              <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FooterQuickLinks;