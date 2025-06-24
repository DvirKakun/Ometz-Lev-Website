import { useEffect } from "react";
import { motion } from "framer-motion";
import { FAQSection } from "../components/sections/shared/faq";

export default function SchoolsPage() {
  useEffect(() => {
    document.title = "סדנאות בבתי ספר | אומץ לב";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "סדנאות חינוכיות עם כלבים בבתי ספר לפיתוח אמפתיה, אחריות ובגרות רגשית. התאמה לכל הגילאים."
      );
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* FAQ Section */}
      <FAQSection pageType="schools" />
    </motion.div>
  );
}
