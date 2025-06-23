import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "../data/services";
import ContentSection from "../components/sections/shared/content/ContentSection";
import ContactSection from "../components/sections/shared/contact/ContactSection";
import CollapsibleFeatures from "../components/sections/training_page/collapsible_features/CollapsibleFeatures";
import TrainingMethod from "../components/sections/training_page/training_method/TrainingMethod";

const TherapyPage = () => {
  const location = useLocation();

  // Get therapy service data
  const therapyService = services.find(
    (service) => service.path === "/therapy"
  );

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

  // Configuration for therapy page content sections
  const videosConfig = {
    title: "סרטוני טיפול",
    description: "סרטוני הדרכה מקצועיים לטיפול בכלבים",
    libraryPath: "/therapy-videos-library",
    libraryTitle: "ספריית סרטוני הטיפול שלנו",
    buttonText: "עבור לספרייה",
    accentColor: "blue",
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-600",
  };

  const articlesConfig = {
    title: "מאמרי טיפול",
    description: "מאמרים מקצועיים ומדריכים לטיפול בכלבים",
    libraryPath: "/therapy-articles-library",
    libraryTitle: "ספריית מאמרי הטיפול שלנו",
    buttonText: "עבור לספרייה",
    accentColor: "accent",
    gradientFrom: "from-accent-500",
    gradientTo: "to-orange-600",
  };

  if (!therapyService) {
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
      <CollapsibleFeatures service={therapyService} />

      {/* Therapy Method Section */}
      <TrainingMethod />

      {/* Videos Section */}
      <ContentSection
        contentType="videos"
        pageType="therapy"
        sectionConfig={videosConfig}
      />

      {/* Articles Section */}
      <ContentSection
        contentType="articles"
        pageType="therapy"
        sectionConfig={articlesConfig}
      />

      {/* Contact Section */}
      <ContactSection />
    </motion.div>
  );
};

export default TherapyPage;
