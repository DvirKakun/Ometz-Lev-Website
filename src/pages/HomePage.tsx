import React from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/sections/home_page/hero/HeroSection";
import AboutSection from "../components/sections/home_page/about/AboutSection";
import ServicesGrid from "../components/sections/home_page/services/ServicesGrid";
import SEOMeta from "../components/seo/SEOMeta";
import SEOJsonLD from "../components/seo/SEOJsonLD";
import { getKeywordsForPage } from "../data/seo-keywords";

const HomePage: React.FC = () => {
  // SEO Configuration for Homepage
  const seoConfig = {
    title: "אומץ לב - אלעד שמעונוב | אילוף כלבים מקצועי וכלבנות טיפולית",
    description:
      "אומץ לב - אלעד שמעונוב מאמן כלבים מקצועי ומטפל בכלבנות טיפולית. אילוף בבית הלקוח, טיפול בפחדים בעזרת כלבים, קייטנות קיץ לילדים. אומץ לב - ייעוץ ראשון חינם!",
    keywords: getKeywordsForPage("homepage"),
    imageUrl:
      "https://xn--4dbcl2aj6b.xn--4dbrk0ce/assets/icons/Ometz-Lev-Large-Logo.png", // Replace with actual image
    imageAlt: "אלעד שמעונוב מאמן כלבים מקצועי עם כלבים טיפוליים",
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOMeta
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        imageUrl={seoConfig.imageUrl}
        imageAlt={seoConfig.imageAlt}
        canonicalUrl="https://xn--4dbcl2aj6b.xn--4dbrk0ce/"
        type="website"
        noindex={true}
      />

      {/* SEO Structured Data */}
      <SEOJsonLD
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        isHomePage={true}
        imageUrl={seoConfig.imageUrl}
      />

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
    </>
  );
};

export default HomePage;
