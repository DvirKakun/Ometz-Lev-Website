import React from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/sections/hero/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ContactCTA from "../components/sections/ContactCTA";
import ServicesGrid from "../components/sections/services/ServicesGrid";
// import AboutSection from "../components/sections/AboutSection";
// import ServicesGrid from "../components/sections/ServicesGrid";
// import ContactCTA from "../components/sections/ContactCTA";

const HomePage: React.FC = () => {
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

      {/* Contact CTA */}
      <ContactCTA />
    </motion.div>
  );
};

export default HomePage;
