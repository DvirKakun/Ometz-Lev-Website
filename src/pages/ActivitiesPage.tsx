import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ServiceHeader from "../components/sections/shared/headers/MainHeader";
import ActivitySection from "../components/sections/activities_page/ActivitySection";
import SummerCampModal from "../components/modals/summer-camp/SummerCampModal";
import { FAQSection } from "../components/sections/shared/faq";
import { activities, activitiesPageConfig } from "../data/activities";

export default function ActivitiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "פעילויות מיוחדות | אומץ לב";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "פעילויות חינוכיות מיוחדות עם כלבים לילדים. קייטנת החופש הגדול ופעילויות העצמה ולמידה יחד עם בעלי חיים."
      );
    }
  }, []);

  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen"
      >
        {/* Header Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <ServiceHeader
                  title={activitiesPageConfig.title}
                  description={activitiesPageConfig.description}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Activity Sections */}
        {activities.map((activity) => (
          <ActivitySection
            key={activity.id}
            activity={activity}
            onRegisterClick={
              activity.hasRegistration ? handleRegisterClick : undefined
            }
          />
        ))}

        {/* FAQ Section */}
        <FAQSection pageType="activities" />
      </motion.div>

      {/* Summer Camp Registration Modal */}
      <SummerCampModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
