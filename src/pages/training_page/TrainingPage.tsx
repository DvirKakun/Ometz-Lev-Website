import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CollapsibleFeatures from "../../components/sections/shared/collapsible_features/CollapsibleFeatures";
import MethodSection from "../../components/sections/shared/method_section/MethodSection";
import ContentSection from "../../components/sections/shared/content/ContentSection";
import { FAQSection } from "../../components/sections/shared/faq";
import SEOMeta from "../../components/seo/SEOMeta";
import SEOJsonLD from "../../components/seo/SEOJsonLD";
import { getKeywordsForPage } from "../../data/seo-keywords";
import { useTrainingMethodConfig } from "../../hooks/useTrainingMethodConfig";
import { useTrainingOfferings } from "../../hooks/useServiceOfferings";
import { useRouterModal } from "../../hooks/useRouterModal";
import { getOfferingsWithFallback } from "../../utils/fallback-content";
import VideoModal from "../../components/modals/video/VideoModal";
import ArticleModal from "../../components/modals/article/ArticleModal";
import { trainingContentConfig } from "../../data/training_content_config";
import type { ServicePageProps } from "../../types/service_page";

export default function TrainingPage({ service }: ServicePageProps) {
  const location = useLocation();
  const { data: methodConfig } = useTrainingMethodConfig();
  const { data: trainingOfferingsData } = useTrainingOfferings();
  const videoModal = useRouterModal<string>({ modalKey: "video" });
  const articleModal = useRouterModal<string>({ modalKey: "article" });

  // SEO Configuration for Training Page
  const seoConfig = {
    title: "אילוף כלבים מקצועי | אלעד שמעונוב - מאמן כלבים פרטי | אומץ לב",
    description:
      "אלעד שמעונוב - מאמן כלבים מקצועי ואישי. אילוף בבית הלקוח, פתרון בעיות התנהגות, אילוף גורים וטיפול באגרסיביות. שיטות מתקדמות ותוצאות מובטחות. ייעוץ חינם!",
    keywords: getKeywordsForPage("training"),
    imageUrl:
      "https://xn--4dbcl2aj6b.xn--4dbrk0ce/assets/icons/Ometz-Lev-Large-Logo.png",
    imageAlt: "אלעד שמעונוב מאמן כלבים מקצועי במהלך אילוף כלב",
  };

  // Merge Prismic offerings with fallback content for SEO
  const serviceWithOfferings = {
    ...service,
    offerings: getOfferingsWithFallback(
      trainingOfferingsData?.offerings,
      "training"
    ),
  };

  useEffect(() => {
    // Restore scroll position if returning from library
    const returnFromLibrary = location.state?.returnFromLibrary;
    const scrollPosition = location.state?.scrollPosition;

    if (returnFromLibrary && scrollPosition !== undefined) {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 100);
    }
  }, [location.state]);

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
        pageType="training"
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
          אילוף כלבים מקצועי ואישי - אלעד שמעונוב | מאמן כלבים פרטי בבית הלקוח |
          אומץ לב
        </h1>
        {/* Collapsible Features Section */}
        <CollapsibleFeatures service={serviceWithOfferings} />

        {/* Training Method Section (includes brief about) */}
        <MethodSection config={methodConfig} />

        {/* Videos Section */}
        <ContentSection
          contentType="videos"
          pageType="training"
          sectionConfig={trainingContentConfig.videos}
        />

        {/* Articles Section */}
        <ContentSection
          contentType="articles"
          pageType="training"
          sectionConfig={trainingContentConfig.articles}
        />

        {/* FAQ Section */}
        <FAQSection pageType="training" />
      </motion.div>

      {/* Single Modal Instances for the Entire Page */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onOpenChange={videoModal.onOpenChange}
        videoId={videoModal.modalData}
        pageType="training"
      />
      <ArticleModal
        isOpen={articleModal.isOpen}
        onOpenChange={articleModal.onOpenChange}
        articleId={articleModal.modalData}
        pageType="training"
      />
    </>
  );
}
