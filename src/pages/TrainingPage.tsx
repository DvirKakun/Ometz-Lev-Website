import { motion } from "framer-motion";
import { useEffect } from "react";
import type { Service } from "../data/services";
import CollapsibleFeatures from "../components/sections/training_page/collapsible_features/CollapsibleFeatures";
import TrainingMethod from "../components/sections/training_page/training_method/TrainingMethod";
import ArticlesSection from "../components/sections/training_page/articles/ArticlesSection";
import VideosSection from "../components/sections/training_page/videos/VideosSection";
import ContactSection from "../components/sections/training_page/contact/ContactSection";

interface TrainingPageProps {
  service: Service | undefined;
}

export default function TrainingPage({ service }: TrainingPageProps) {
  useEffect(() => {
    document.title = "אילוף כלבים מקצועי | אומץ לב";

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "אילוף כלבים מקצועי ואישי עם הדרכה מותאמת לכל כלב. מדריך מוסמך, שיטות מתקדמות ותוצאות מובטחות. הזמינו ייעוץ חינם!"
      );
    }
  }, []);

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
      <CollapsibleFeatures service={service} />

      {/* Training Method Section (includes brief about) */}
      <TrainingMethod />

      {/* Articles Section */}
      <ArticlesSection />

      {/* Videos Section */}
      <VideosSection />

      {/* Contact Section */}
      <ContactSection />
    </motion.div>
  );
}
