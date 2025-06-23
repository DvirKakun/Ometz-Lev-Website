import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { Service } from "../data/services";
import CollapsibleFeatures from "../components/sections/shared/collapsible_features/CollapsibleFeatures";
import TrainingMethod from "../components/sections/training_page/training_method/TrainingMethod";
import ContentSection from "../components/sections/shared/content/ContentSection";
import ContactSection from "../components/sections/shared/contact/ContactSection";

interface TrainingPageProps {
  service: Service | undefined;
}

export default function TrainingPage({ service }: TrainingPageProps) {
  const location = useLocation();

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

  // Configuration for training page content sections
  const videosConfig = {
    title: "מדריכי וידאו",
    description: "סרטוני הדרכה מקצועיים לאילוף כלבים בבית",
    libraryPath: "/videos-library",
    libraryTitle: "ספריית הווידאו שלנו",
    buttonText: "עבור לספרייה",
    accentColor: "red",
    gradientFrom: "from-red-500",
    gradientTo: "to-red-600",
  };

  const articlesConfig = {
    title: "מאמרי הדרכה",
    description: "מאמרים מקצועיים ומדריכים לאילוף כלבים",
    libraryPath: "/articles-library",
    libraryTitle: "ספריית המאמרים שלנו",
    buttonText: "עבור לספרייה",
    accentColor: "accent",
    gradientFrom: "from-accent-500",
    gradientTo: "to-orange-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* Collapsible Features Section */}
      <CollapsibleFeatures service={service} />

      {/* Training Method Section (includes brief about) */}
      <TrainingMethod />

      {/* Videos Section */}
      <ContentSection
        contentType="videos"
        pageType="training"
        sectionConfig={videosConfig}
      />

      {/* Articles Section */}
      <ContentSection
        contentType="articles"
        pageType="training"
        sectionConfig={articlesConfig}
      />

      {/* Contact Section */}
      <ContactSection />
    </motion.div>
  );
}
