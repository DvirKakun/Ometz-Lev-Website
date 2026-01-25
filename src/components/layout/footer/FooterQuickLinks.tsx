import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Award, BookOpen, Users } from "lucide-react";

const FooterQuickLinks: React.FC = () => {
  const quickLinks = [
    {
      path: "/therapy",
      label: "כלבנות טיפולית",
      icon: Heart,
    },
    {
      path: "/training",
      label: "אילוף כלבים",
      icon: BookOpen,
    },
    {
      path: "/activities",
      label: "פעילויות",
      icon: Award,
    },
    {
      path: "/schools",
      label: "יוזמות חינוכיות",
      icon: Users,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <h4 className="text-lg sm:text-xl font-bold mb-6 text-primary-500 flex items-center gap-2">
        <div className="w-1 h-6 bg-primary-500 rounded-full"></div>
        שירותים
      </h4>

      {/* Mobile: 2x2 grid for better thumb reach */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {quickLinks.map((link, index) => (
          <motion.div
            key={link.path}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
            viewport={{ once: true }}
          >
            <Link
              to={link.path}
              className="flex flex-col items-center space-y-2 text-slate-300 hover:text-primary-300 focus-visible:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 transition-all duration-200 group p-4 rounded-xl bg-slate-700/20 hover:bg-slate-600/30 active:scale-95 min-h-[80px]"
            >
              <div
                className={`w-8 h-8 group-hover:scale-110 transition-transform duration-200`}
              >
                <link.icon className="w-full h-full" />
              </div>
              <span className="text-sm font-medium text-center leading-tight">
                {link.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Desktop: Classic list layout */}
      <ul className="space-y-4 hidden sm:block">
        {quickLinks.map((link, index) => (
          <motion.li
            key={link.path}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              to={link.path}
              className="flex items-center space-x-3 space-x-reverse text-slate-300 hover:text-primary-300 focus-visible:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 transition-all duration-200 group p-2 -m-2 rounded-xl active:scale-95"
            >
              <div className="w-8 h-8 bg-slate-700/50 rounded-xl flex items-center justify-center group-hover:bg-primary-500/20 group-focus-visible:bg-primary-500/20 group-active:bg-primary-500/30 transition-all duration-200 shadow-lg group-hover:shadow-xl group-hover:scale-105">
                <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              </div>
              <span className="font-medium group-hover:font-semibold transition-all duration-200">
                {link.label}
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FooterQuickLinks;
