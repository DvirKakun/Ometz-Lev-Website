import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Award,
  BookOpen,
  Users,
} from "lucide-react";
import PhoneButton from "../common/PhoneButton";
import WhatsAppButton from "../common/WhatsAppButton";
import InstagramButton from "../common/InstagramButton";
import FacebookButton from "../common/FacebookButton";
import YouTubeButton from "../common/YouTubeButton";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/therapy", label: "כלבנות טיפולית", icon: Heart },
    { path: "/training", label: "אילוף כלבים", icon: BookOpen },
    { path: "/coaching", label: "אימון אישי", icon: Award },
    { path: "/schools", label: "תכנית גפן", icon: Users },
  ];

  const contactInfo = [
    { icon: Phone, label: "052-472-4700", href: "tel:0524724700" },
    {
      icon: Mail,
      label: "Eladshi1326@gmail.com",
      href: "mailto:Eladshi1326@gmail.com",
    },
    { icon: MapPin, label: "ראשון לציון, ישראל", href: "#" },
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

            {/* Social Links - Updated with WhatsApp Button */}
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Instagram Link */}
              <InstagramButton
                instagramUrl="https://www.instagram.com/eladshimoniv_omets_lev"
                variant="icon"
                size="md"
                className="w-10 h-10 p-0 bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-pink-600"
              />

              {/* WhatsApp Link */}
              <WhatsAppButton
                phoneNumber="972524724700"
                variant="icon"
                size="md"
                className="w-10 h-10 p-0 bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-green-600"
              />

              {/* Facebook Link */}
              <FacebookButton
                variant="icon"
                size="md"
                className="w-10 h-10 p-0 bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-blue-600"
              />

              <YouTubeButton
                variant="icon"
                size="md"
                className="w-10 h-10 p-0 bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-red-600"
              />
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
            <PhoneButton
              phoneNumber="052-472-4700"
              variant="default"
              size="sm"
              className="justify-center"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700/50">
        <div className="container-max section-padding py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-slate-400 text-sm text-center sm:text-right">
              © {currentYear} אומץ לב - כל הזכויות שמורות.
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
