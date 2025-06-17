import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Award, BookOpen, Users, Home } from "lucide-react";
import { cn } from "../../lib/utils";
import PhoneButton from "../common/PhoneButton";
import WhatsAppButton from "../common/WhatsAppButton";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: "/", label: "דף הבית", icon: Home },
    { path: "/therapy", label: "כלבנות טיפולית", icon: Heart },
    { path: "/training", label: "אילוף כלבים", icon: BookOpen },
    { path: "/coaching", label: "אימון אישי", icon: Award },
    { path: "/schools", label: "תכנית גפן", icon: Users },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={cn(
        "w-full sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 shadow-lg border-b border-primary-100/50 backdrop-blur-xl"
          : "bg-white/90 backdrop-blur-md"
      )}
    >
      <nav className="container-max section-padding">
        <div className="flex items-center justify-between h-18 lg:h-24">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0"
          >
            <Link
              to="/"
              className="flex items-center space-x-4 space-x-reverse"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-3xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 tracking-tight">
                  אומץ לב
                </h1>
                <p className="text-sm lg:text-base text-slate-600 -mt-1 font-medium">
                  אילוף כלבים מקצועי
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-4 space-x-reverse flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-xl font-medium text-sm transition-all duration-300",
                      isActive
                        ? "bg-primary-100 text-primary-700 shadow-md"
                        : "text-slate-700 hover:bg-primary-50 hover:text-primary-600 hover:shadow-sm"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Buttons (Desktop) */}
          <div className="hidden xl:flex items-center space-x-2 space-x-reverse flex-shrink-0">
            <PhoneButton
              phoneNumber="052-472-4700"
              variant="outline"
              size="sm"
            />
            <WhatsAppButton
              phoneNumber="972524724700"
              message="שלום! אני מעוניין/ת לקבל מידע על שירותי אילוף הכלבים של אומץ לב."
              variant="default"
              size="sm"
            />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="xl:hidden p-3 rounded-2xl bg-primary-100 hover:bg-primary-200 text-primary-700 transition-all duration-200 shadow-sm hover:shadow-md"
            aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="xl:hidden overflow-hidden border-t border-primary-100/50 mt-2"
            >
              <div className="py-6 space-y-3 bg-white/50 backdrop-blur-sm rounded-2xl mt-4 shadow-soft">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center space-x-4 space-x-reverse px-6 py-4 mx-3 rounded-2xl font-semibold text-lg transition-all duration-300",
                          isActive
                            ? "bg-primary-100 text-primary-700 shadow-md"
                            : "text-slate-700 hover:bg-primary-50 hover:text-primary-600"
                        )}
                      >
                        <item.icon className="w-6 h-6" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Contact Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: navItems.length * 0.1 + 0.2,
                    duration: 0.3,
                  }}
                  className="pt-6 px-3"
                >
                  <div className="grid grid-cols-1 gap-3">
                    <WhatsAppButton
                      phoneNumber="972524724700"
                      message="שלום! אני מעוניין/ת לקבל מידע על שירותי אילוף הכלבים של אומץ לב."
                      variant="default"
                      size="md"
                      className="w-full justify-center"
                    />
                    <PhoneButton
                      phoneNumber="052-472-4700"
                      variant="outline"
                      size="md"
                      className="w-full justify-center"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
