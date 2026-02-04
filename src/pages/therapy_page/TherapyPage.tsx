import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ContentSection from "../../components/sections/shared/content/ContentSection";
import CollapsibleFeatures from "../../components/sections/shared/collapsible_features/CollapsibleFeatures";
import MethodSection from "../../components/sections/shared/method_section/MethodSection";
import { FAQSection } from "../../components/sections/shared/faq";
import SEOMeta from "../../components/seo/SEOMeta";
import SEOJsonLD from "../../components/seo/SEOJsonLD";
import { getKeywordsForPage } from "../../data/seo-keywords";
import { useTherapyMethodConfig } from "../../hooks/useTherapyMethodConfig";
import { useTherapyOfferings } from "../../hooks/useServiceOfferings";
import { useRouterModal } from "../../hooks/useRouterModal";
import VideoModal from "../../components/modals/video/VideoModal";
import { therapyContentConfig } from "../../data/therapy_content_config";
import type { ServicePageProps } from "../../types/service_page";
import { getOfferingsWithFallback } from "../../utils/fallback-content";

const TherapyPage = ({ service }: ServicePageProps) => {
  const location = useLocation();
  const { data: methodConfig } = useTherapyMethodConfig();
  const { data: therapyOfferingsData } = useTherapyOfferings();
  const videoModal = useRouterModal<string>({ modalKey: "video" });

  // SEO Configuration for Therapy Page
  const seoConfig = {
    title: "כלבנות טיפולית | אלעד שמעונוב | אומץ לב",
    description:
      "אלעד שמעונוב - כלבנות טיפולית מקצועית לטיפול בחרדות, דיכאון ופוסט טראומה. כלבי טיפול מאומנים לילדים ומבוגרים. טיפול בעזרת בעלי חיים להתגברות על פחדים. קבעו פגישה!",
    keywords: getKeywordsForPage("therapy"),
    imageUrl: "https://ometzlev.co.il/assets/icons/Ometz-Lev-Large-Logo.png",
    imageAlt: "כלב טיפולי במהלך פגישת טיפול עם אלעד שמעונוב",
  };

  // Merge Prismic offerings with service data
  const serviceWithOfferings = {
    ...service,
    offerings: getOfferingsWithFallback(
      therapyOfferingsData?.offerings,
      "therapy",
    ),
  };

  useEffect(() => {
    if (location.state?.scrollPosition) {
      window.scrollTo(0, location.state.scrollPosition);
    }
  }, [location]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">שירות לא נמצא</p>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOMeta
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        imageUrl={seoConfig.imageUrl}
        imageAlt={seoConfig.imageAlt}
        type="service"
      />

      {/* SEO Structured Data */}
      <SEOJsonLD
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        pageType="therapy"
        imageUrl={seoConfig.imageUrl}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen"
      >
        {/* SEO H1 - Hidden from users but visible to search engines */}
        <h1 className="sr-only">
          כלבנות טיפולית מקצועית - אלעד שמעונוב | עבודה על בחרדות ופחדים | אומץ
          לב
        </h1>
        {/* Features Section */}
        <CollapsibleFeatures service={serviceWithOfferings} />

        {/* Therapy Method Section */}
        <MethodSection config={methodConfig} />

        {/* Videos Section */}
        <ContentSection
          contentType="videos"
          pageType="therapy"
          sectionConfig={therapyContentConfig.videos}
        />

        {/* Articles Section */}
        <ContentSection
          contentType="articles"
          pageType="therapy"
          sectionConfig={therapyContentConfig.articles}
        />

        {/* FAQ Section */}
        <FAQSection pageType="therapy" />
      </motion.div>

      {/* Single Modal Instances for the Entire Page */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onOpenChange={videoModal.onOpenChange}
        videoId={videoModal.modalData}
        pageType="therapy"
      />
    </>
  );
};

export default TherapyPage;
