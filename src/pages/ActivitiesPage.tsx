import { useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { AlertCircle, Calendar } from "lucide-react";
import ServiceHeader from "../components/sections/shared/headers/MainHeader";
import ActivitySection from "../components/sections/activities_page/ActivitySection";
import { FAQSection } from "../components/sections/shared/faq";
import SEOMeta from "../components/seo/SEOMeta";
import SEOJsonLD from "../components/seo/SEOJsonLD";
import { getKeywordsForPage } from "../data/seo-keywords";
import LoadingSpinner from "../components/common/StateLoadingSpinner";
import StateDisplay from "../components/common/StateDisplay";
import { useActivities } from "../hooks/useActivities";
import { useRouterModal } from "../hooks/useRouterModal";
import SummerCampModal from "../components/modals/summer-camp/SummerCampModal";
import ImageDialog from "../components/sections/activities_page/ImageDialog";
import type { ServicePageProps } from "../types/service_page";

export default function ActivitiesPage({ service }: ServicePageProps) {
  const location = useLocation();
  const scrollTargetRef = useRef<string | null>(null);

  // Modal hooks
  const summerCampModal = useRouterModal({ modalKey: "summerCamp" });
  const imageModal = useRouterModal<{
    imageUrl: string;
    alt: string;
    imageIndex: number;
    totalImages: number;
  }>({ modalKey: "image" });

  // SEO Configuration for Activities Page
  const seoConfig = {
    title: "פעילויות וקייטנות כלבים לילדים | אלעד שמעונוב - אומץ לב",
    description:
      "פעילויות חינוכיות עם כלבים לילדים בני 4-16. קייטנת החופש הגדול, חוגי אילוף ופעילויות העצמה וחברתיות. מפתחות אחריות ואמפתיה. הרשמה פתוחה!",
    keywords: getKeywordsForPage("activities"),
    imageUrl:
      "https://xn--4dbcl2aj6b.xn--4dbrk0ce/assets/icons/Ometz-Lev-Large-Logo.png",
    imageAlt: "ילדים משחקים ולומדים עם כלבים טיפוליים בפעילות חינוכית",
  };

  // Use React Query for data fetching with caching
  const {
    data: activities = [],
    isLoading: loading,
    error,
    refetch,
  } = useActivities();

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
    summerCampModal.openModal();
  }, [summerCampModal]);

  const handleImageClick = useCallback(
    (imageUrl: string, index: number, alt: string, totalImages: number) => {
      imageModal.openModal({
        imageUrl,
        alt,
        imageIndex: index,
        totalImages,
      });
    },
    [imageModal]
  );

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
        onImageClick={handleImageClick}
      />
    ));
  };

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
        pageType="activities"
        imageUrl={seoConfig.imageUrl}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen"
      >
        {/* Header Section - Always rendered */}
        <section className="py-16 bg-slate-900/85">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <ServiceHeader
                  title={service?.title || "פעילויות"}
                  description={
                    service?.description || "מגוון פעילויות חווייתיות עם כלבים"
                  }
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

      {/* Modals */}
      <SummerCampModal
        isOpen={summerCampModal.isOpen}
        onOpenChange={summerCampModal.onOpenChange}
      />

      {imageModal.modalData && (
        <ImageDialog
          isOpen={imageModal.isOpen}
          onClose={imageModal.closeModal}
          imageUrl={imageModal.modalData.imageUrl}
          alt={imageModal.modalData.alt}
          imageIndex={imageModal.modalData.imageIndex}
          totalImages={imageModal.modalData.totalImages}
        />
      )}
    </>
  );
}
