import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { AlertCircle, Calendar } from "lucide-react";
import ServiceHeader from "../components/sections/shared/headers/MainHeader";
import ActivitySection from "../components/sections/activities_page/ActivitySection";
import SummerCampModal from "../components/modals/summer-camp/SummerCampModal";
import { FAQSection } from "../components/sections/shared/faq";
import LoadingSpinner from "../components/common/StateLoadingSpinner";
import StateDisplay from "../components/common/StateDisplay";
import { useActivities } from "../hooks/useActivities";
import { activitiesPageConfig } from "../data/activities";

export default function ActivitiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const scrollTargetRef = useRef<string | null>(null);

  // Use React Query for data fetching with caching
  const {
    data: activities = [],
    isLoading: loading,
    error,
    refetch,
  } = useActivities();

  useEffect(() => {
    document.title = "פעילויות | אומץ לב";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "פעילויות חינוכיות מיוחדות עם כלבים לילדים. קייטנת החופש הגדול ופעילויות העצמה ולמידה יחד עם בעלי חיים."
      );
    }
  }, []);

  // Scroll to activity function using React patterns
  const scrollToActivity = useCallback((activityId: string) => {
    const element = document.getElementById(activityId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Set scroll target from navigation state
  useEffect(() => {
    const state = location.state as { scrollToActivity?: string } | null;
    if (state?.scrollToActivity) {
      scrollTargetRef.current = state.scrollToActivity;
    }
  }, [location]);

  // Handle scrolling when data is loaded
  useEffect(() => {
    if (!loading && scrollTargetRef.current && activities.length > 0) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        scrollToActivity(scrollTargetRef.current!);
        scrollTargetRef.current = null; // Clear after scrolling
      });
    }
  }, [loading, activities, scrollToActivity]);

  const handleRegisterClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleModalOpenChange = useCallback((open: boolean) => {
    setIsModalOpen(open);
  }, []);

  // Render content based on state
  const renderContent = () => {
    if (loading) {
      return (
        <LoadingSpinner
          title="טוען פעילויות..."
          description="אנא המתן בזמן שאנחנו מביאים עבורך את הפעילויות העדכניות"
        />
      );
    }

    if (error) {
      return (
        <StateDisplay
          icon={AlertCircle}
          title="שגיאה בטעינת הפעילויות"
          description={
            error instanceof Error ? error.message : "שגיאה בטעינת הפעילויות"
          }
          iconClassName="w-12 h-12 text-red-500 mb-4"
          showAction={true}
          actionText="נסה שוב"
          actionVariant="default"
          onAction={() => refetch()}
        />
      );
    }

    if (activities.length === 0) {
      return (
        <StateDisplay
          icon={Calendar}
          title="אין פעילויות זמינות כרגע"
          description="כרגע אין פעילויות מתוכננות. אנא חזור שוב בקרוב לעדכונים נוספים."
          iconClassName="w-16 h-16 text-gray-400 mb-6"
        />
      );
    }

    // Success state - render activities
    return activities.map((activity) => (
      <ActivitySection
        key={activity.id}
        activity={activity}
        onRegisterClick={
          activity.hasRegistration ? handleRegisterClick : undefined
        }
      />
    ));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen"
      >
        {/* Header Section - Always rendered */}
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

        {/* Dynamic Content */}
        {renderContent()}

        {/* FAQ Section - Always rendered */}
        <FAQSection pageType="activities" />
      </motion.div>

      {/* Summer Camp Registration Modal */}
      <SummerCampModal isOpen={isModalOpen} onOpenChange={handleModalOpenChange} />
    </>
  );
}
