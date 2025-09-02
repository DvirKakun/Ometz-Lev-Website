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
import { useVideoModal } from "../../hooks/useVideoModal";
import { useArticleModal } from "../../hooks/useArticleModal";
import VideoModal from "../../components/modals/video/VideoModal";
import ArticleModal from "../../components/modals/article/ArticleModal";
import { therapyContentConfig } from "../../data/therapy_content_config";
import type { ServicePageProps } from "../../types/service_page";

const TherapyPage = ({ service }: ServicePageProps) => {
  const location = useLocation();
  const { data: methodConfig } = useTherapyMethodConfig();
  const { data: therapyOfferingsData } = useTherapyOfferings();
  const videoModal = useVideoModal();
  const articleModal = useArticleModal();

  // SEO Configuration for Therapy Page
  const seoConfig = {
    title: "כלבנות טיפולית | כלבי טיפול | אלעד שמעונוב - פט תרפיה | אומץ לב",
    description:
      "אלעד שמעונוב - כלבנות טיפולית מקצועית לטיפול בחרדות, דיכאון ופוסט טראומה. כלבי טיפול מאומנים לילדים ומבוגרים. טיפול בעזרת בעלי חיים להתגברות על פחדים. קבעו פגישה!",
    keywords: getKeywordsForPage("therapy"),
    imageUrl:
      "https://xn--4dbcl2aj6b.xn--4dbrk0ce/assets/icons/Ometz-Lev-Large-Logo.png",
    imageAlt: "כלב טיפולי במהלך פגישת טיפול עם אלעד שמעונוב",
  };

  // Merge Prismic offerings with service data
  const serviceWithOfferings = {
    ...service,
    offerings: therapyOfferingsData?.offerings || [],
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
        videoId={videoModal.videoId}
        pageType="therapy"
      />
      <ArticleModal
        isOpen={articleModal.isOpen}
        onOpenChange={articleModal.onOpenChange}
        articleId={articleModal.articleId}
        pageType="therapy"
      />
    </>
  );
};

export default TherapyPage;
