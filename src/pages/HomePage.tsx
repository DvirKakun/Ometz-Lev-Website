import React from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/sections/home_page/hero/HeroSection";
import AboutSection from "../components/sections/home_page/about/AboutSection";
import ServicesGrid from "../components/sections/home_page/services/ServicesGrid";

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
    </motion.div>
  );
};

export default HomePage;
