import React, { useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/sections/home_page/hero/HeroSection";
import AboutSection from "../components/sections/home_page/about/AboutSection";
import ServicesGrid from "../components/sections/home_page/services/ServicesGrid";

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title =
      "אומץ לב - אילוף כלבים ותרפיה בכלבים | מרכז הדרכה מוביל בישראל";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "מרכז אילוף כלבים וכלבנות טיפולית מוביל בישראל. אילוף מקצועי, טיפול בחרדות, פעילויות לילדים ותכניות חינוכיות. ייעוץ ראשון חינם - התקשרו עוד היום!"
      );
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* Hero Section with Owner Image */}
      <HeroSection />

      {/* Services Grid */}
      <ServicesGrid />

      {/* About Section */}
      <AboutSection />
    </motion.div>
  );
};

export default HomePage;
