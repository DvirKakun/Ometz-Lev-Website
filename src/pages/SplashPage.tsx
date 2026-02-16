import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { trackPageView } from "../utils/facebookPixel";
import SplashBackground from "../components/sections/splash_screen/SplashBackground";
import SplashLogo from "../components/sections/splash_screen/SplashLogo";
import SplashContent from "../components/sections/splash_screen/SplashContent";
import SplashProgress from "../components/sections/splash_screen/SplashProgress";
import SEOMeta from "../components/seo/SEOMeta";
import SEOJsonLD from "../components/seo/SEOJsonLD";
import { usePrefetchForRoute } from "../hooks/usePrefetchData";
import { useImagePreloader } from "../hooks/useImagePreloader";
import { getKeywordsForPage } from "../data/seo-keywords";
import SplashAccessibilityController from "../components/sections/splash_screen/SplashAccessibilityController";

const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  // Prefetch homepage data during splash screen
  usePrefetchForRoute("/home");

  // Preload images from cached data
  useImagePreloader();

  // SEO Configuration for SplashPage
  const seoConfig = {
    title: "אומץ לב - אלעד שמעונוב | אילוף כלבים מקצועי וכלבנות טיפולית",
    description:
      "אומץ לב - אלעד שמעונוב מאמן כלבים מקצועי ומטפל בכלבנות טיפולית. אילוף בבית הלקוח, טיפול בפחדים בעזרת כלבים, קייטנות קיץ לילדים. אומץ לב - ייעוץ ראשון חינם!",
    keywords: getKeywordsForPage("homepage"),
    imageUrl:
      "https://ometzlev.co.il/assets/icons/Ometz-Lev-Large-Logo.png",
    imageAlt: "אלעד שמעונוב מאמן כלבים מקצועי עם כלבים טיפוליים",
  };

  useEffect(() => {
    trackPageView();
  }, []);

  useEffect(() => {
    // Navigate to home after 3 seconds
    const timer = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      {/* SEO Meta Tags for root path */}
      <SEOMeta
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        imageUrl={seoConfig.imageUrl}
        imageAlt={seoConfig.imageAlt}
        canonicalUrl="https://ometzlev.co.il/"
        type="website"
        noindex={false}
      />

      {/* SEO Structured Data */}
      <SEOJsonLD
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        isHomePage={true}
        imageUrl={seoConfig.imageUrl}
      />

      <SplashBackground>
        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-4">
          <SplashLogo />
          <SplashContent />
          <SplashProgress />
        </div>
      </SplashBackground>

      {/* Hide accessibility button on splash screen */}
      <SplashAccessibilityController />
    </>
  );
};

export default SplashPage;
