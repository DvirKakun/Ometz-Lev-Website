import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Award,
  BookOpen,
  Users,
} from "lucide-react";

// Custom Instagram SVG Icon Component
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/coaching", label: "אימון אישי", icon: Award },
    { path: "/therapy", label: "כלבנות טיפולית", icon: Heart },
    { path: "/training", label: "קורסי אילוף", icon: BookOpen },
    { path: "/schools", label: "בתי ספר", icon: Users },
  ];

  const contactInfo = [
    { icon: Phone, label: "050-123-4567", href: "tel:0501234567" },
    {
      icon: Mail,
      label: "info@dogtraining.co.il",
      href: "mailto:info@dogtraining.co.il",
    },
    { icon: MapPin, label: "תל אביב, ישראל", href: "#" },
  ];

  const socialLinks = [
    {
      icon: InstagramIcon,
      label: "Instagram",
      href: "#",
      color: "hover:text-pink-600",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "#",
      color: "hover:text-green-600",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white">
      {/* Main Footer Content */}
      <div className="container-max section-padding py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-soft">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">אומץ לב</h3>
                <p className="text-slate-400 text-sm">אילוף כלבים מקצועי</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              אנחנו מתמחים באילוף כלבים מקצועי, כלבנות טיפולית ואימונים אישיים.
              המטרה שלנו היא ליצור קשר הרמוני בינכם לבין הכלב שלכם.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4 space-x-reverse">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-slate-700/50 hover:bg-slate-600 rounded-xl flex items-center justify-center transition-all duration-200 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
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

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-primary-300">
              יצירת קשר
            </h4>
            <ul className="space-y-4">
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

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-primary-300">
              בואו נתחיל
            </h4>
            <p className="text-slate-300 mb-6 leading-relaxed">
              מוכנים להתחיל את המסע עם הכלב שלכם? צרו קשר עכשיו לקביעת פגישת
              ייעוץ ראשונה.
            </p>
            <motion.a
              href="tel:0501234567"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-medium px-6 py-3 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              <span>התקשרו עכשיו</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700/50">
        <div className="container-max section-padding py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-slate-400 text-sm text-center sm:text-right">
              © {currentYear} דוג טריינינג. כל הזכויות שמורות.
            </p>
            <div className="flex items-center space-x-6 space-x-reverse text-sm">
              <Link
                to="/privacy"
                className="text-slate-400 hover:text-primary-300 transition-colors duration-200"
              >
                מדיניות פרטיות
              </Link>
              <Link
                to="/terms"
                className="text-slate-400 hover:text-primary-300 transition-colors duration-200"
              >
                תנאי שירות
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
