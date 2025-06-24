import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ContentSection from "../../components/sections/shared/content/ContentSection";
import ContactSection from "../../components/sections/shared/contact/ContactSection";
import CollapsibleFeatures from "../../components/sections/shared/collapsible_features/CollapsibleFeatures";
import MethodSection from "../../components/sections/shared/method_section/MethodSection";
import type { Service } from "../../data/services";
import { therapyMethodConfig } from "../../data/therapy_method_config";
import { therapyContentConfig } from "../../data/therapy_content_config";

interface TherapygPageProps {
  service: Service | undefined;
}

const TherapyPage = ({ service }: TherapygPageProps) => {
  const location = useLocation();

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
      <MethodSection config={therapyMethodConfig} />

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

      {/* Contact Section */}
      <ContactSection />
    </motion.div>
  );
};

export default TherapyPage;
