import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CollapsibleFeatures from "../../components/sections/shared/collapsible_features/CollapsibleFeatures";
import MethodSection from "../../components/sections/shared/method_section/MethodSection";
import ContentSection from "../../components/sections/shared/content/ContentSection";
import { FAQSection } from "../../components/sections/shared/faq";
import { useTrainingMethodConfig } from "../../hooks/useTrainingMethodConfig";
import { useTrainingOfferings } from "../../hooks/useServiceOfferings";
import { trainingContentConfig } from "../../data/training_content_config";
import type { ServicePageProps } from "../../types/service_page";

export default function TrainingPage({ service }: ServicePageProps) {
  const location = useLocation();
  const { data: methodConfig } = useTrainingMethodConfig();
  const { data: trainingOfferingsData } = useTrainingOfferings();

  // Merge Prismic offerings with service data
  const serviceWithOfferings = {
    ...service,
    offerings: trainingOfferingsData?.offerings || []
  };

  useEffect(() => {
    document.title = "אילוף כלבים מקצועי | אומץ לב";

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "אילוף כלבים מקצועי ואישי עם הדרכה מותאמת לכל כלב. מדריך מוסמך, שיטות מתקדמות ותוצאות מובטחות. הזמינו ייעוץ חינם!"
      );
    }

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
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
  );
}
