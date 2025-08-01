import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ContentSection from "../../components/sections/shared/content/ContentSection";
import CollapsibleFeatures from "../../components/sections/shared/collapsible_features/CollapsibleFeatures";
import MethodSection from "../../components/sections/shared/method_section/MethodSection";
import { FAQSection } from "../../components/sections/shared/faq";
import { useTherapyMethodConfig } from "../../hooks/useTherapyMethodConfig";
import { therapyContentConfig } from "../../data/therapy_content_config";
import type { TherapygPageProps } from "../../types/therapy_page";

const TherapyPage = ({ service }: TherapygPageProps) => {
  const location = useLocation();
  const { data: methodConfig } = useTherapyMethodConfig();

  useEffect(() => {
    document.title = "כלבנות טיפולית | אומץ לב";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "כלבנות טיפולית מקצועית לטיפול בחרדות, שיקום רגשי ופיתוח כישורים חברתיים. טיפול מותאם אישית עם כלבים מאומנים."
      );
    }

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* Features Section */}
      <CollapsibleFeatures service={service} />

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
  );
};

export default TherapyPage;
