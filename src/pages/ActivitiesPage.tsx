import { useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { AlertCircle, Calendar, Clock } from "lucide-react";
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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";
import type { ServicePageProps } from "../types/service_page";
import type { Activity } from "../types/activities";

export default function ActivitiesPage({ service }: ServicePageProps) {
  const location = useLocation();
  const scrollTargetRef = useRef<string | null>(null);

  // Modal hooks
  const summerCampModal = useRouterModal<{
    activityData: {
      sessions: number;
      title: string;
      registerFormTitle: string;
      registerFormMessage: React.ReactNode;
    };
  }>({ modalKey: "summerCamp" });
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

  const handleRegisterClick = useCallback(
    (activity: Activity) => {
      // Only pass serializable data, not the entire activity object
      summerCampModal.openModal({
        activityData: {
          sessions: activity.sessions,
          title: activity.title,
          registerFormTitle: activity.registerFormTitle,
          registerFormMessage: activity.registerFormMessage,
        },
      });
    },
    [summerCampModal]
  );

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

  // Check if activity is currently in progress
  const isActivityInProgress = useCallback(
    (startDate: Date, endDate: Date): boolean => {
      const now = new Date();
      return now >= startDate && now <= endDate;
    },
    []
  );

  // Check if activity is past (end date has passed)
  const isActivityPast = useCallback((endDate: Date): boolean => {
    const now = new Date();
    return now > endDate;
  }, []);

  // Check if activity has special "בקרוב" date (02/06/1999)
  const isSpecialComingSoonDate = useCallback((startDate: Date): boolean => {
    // Compare only the date parts to avoid timezone issues
    const activityYear = startDate.getFullYear();
    const activityMonth = startDate.getMonth(); // 0-indexed
    const activityDay = startDate.getDate();

    return activityYear === 1999 && activityMonth === 5 && activityDay === 2; // June 2, 1999
  }, []);

  // Calculate time remaining until activity starts or show status
  const getTimeRemaining = useCallback(
    (activity: { startDate: Date; endDate: Date }): string => {
      const now = new Date();
      const { startDate, endDate } = activity;

      // Check if activity has special "בקרוב" date
      if (isSpecialComingSoonDate(startDate)) {
        return "בקרוב";
      }

      // Check if activity is past (ended)
      if (isActivityPast(endDate)) {
        return "הפעילות הסתיימה";
      }

      // Check if activity is in progress
      if (isActivityInProgress(startDate, endDate)) {
        return "הפעילות בעיצומה";
      }

      const timeDiff = startDate.getTime() - now.getTime();

      if (timeDiff <= 0) {
        return "הפעילות החלה";
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        return `ההרשמה פתוחה - נותרו ${days} ימים`;
      } else if (hours > 0) {
        return `ההרשמה פתוחה - נותרו ${hours} שעות`;
      } else if (minutes > 0) {
        return `ההרשמה פתוחה - נותרו ${minutes} דקות`;
      } else {
        return "ההרשמה פתוחה - נותרה פחות מדקה";
      }
    },
    [isActivityInProgress, isActivityPast, isSpecialComingSoonDate]
  );

  // Auto-scroll to show accordion header when accordion opens
  // Modern UX research (2024) suggests intelligent auto-scrolling for accordions
  const handleAccordionChange = useCallback((value: string) => {
    if (value) {
      // Capture the current scroll position and target element position BEFORE animations
      const targetElement = document.getElementById(`accordion-${value}`);
      if (!targetElement) return;
      
      const initialScrollTop = window.pageYOffset;
      const initialTargetTop = targetElement.getBoundingClientRect().top + initialScrollTop;
      
      // Wait for accordion animations to complete, then apply intelligent scrolling
      setTimeout(() => {
        requestAnimationFrame(() => {
          const accordionElement = document.getElementById(`accordion-${value}`);
          if (accordionElement) {
            const currentRect = accordionElement.getBoundingClientRect();
            const currentScrollTop = window.pageYOffset;
            const targetTop = currentRect.top + currentScrollTop;
            
            // Calculate how much the page layout changed
            const layoutShift = targetTop - initialTargetTop;
            
            // Modern UX best practice: only scroll if the header is displaced or out of optimal viewing area
            const isHeaderOutOfView = currentRect.top < 0;
            const isHeaderTooHigh = currentRect.top < 60; // Less than 60px from top (cramped)
            const isHeaderTooLow = currentRect.top > window.innerHeight * 0.7; // Below 70% of viewport
            const hasSignificantLayoutShift = Math.abs(layoutShift) > 100; // More than 100px shift
            
            // Apply scroll correction if needed
            if (isHeaderOutOfView || isHeaderTooHigh || isHeaderTooLow || hasSignificantLayoutShift) {
              // Use optimal scroll position: header positioned at 15% from top (sweet spot for readability)
              const optimalPosition = targetTop - (window.innerHeight * 0.15);
              
              window.scrollTo({
                top: Math.max(0, optimalPosition),
                behavior: "smooth",
              });
            }
          }
        });
      }, 420); // Optimized timing: slightly before animation completes for smoother UX
    }
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

    // Success state - render activities in accordion
    return (
      <section className="py-6 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-6xl mx-auto">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-2 sm:space-y-4"
              onValueChange={handleAccordionChange}
              defaultValue={activities[0]?.id}
            >
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <AccordionItem
                    value={activity.id}
                    id={`accordion-${activity.id}`}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-lg border-0 overflow-hidden"
                  >
                    <AccordionTrigger className="px-3 py-3 sm:px-6 sm:py-5 lg:px-8 lg:py-6 text-right hover:no-underline hover:bg-gray-50/80 transition-all duration-300 hover:shadow-md">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-0.5 sm:mb-1">
                              {activity.title}
                            </h3>
                            <div
                              className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium ${
                                isSpecialComingSoonDate(activity.startDate)
                                  ? "text-primary-600"
                                  : isActivityPast(activity.endDate)
                                  ? "text-red-600"
                                  : isActivityInProgress(
                                      activity.startDate,
                                      activity.endDate
                                    )
                                  ? "text-green-600"
                                  : "text-primary-600"
                              }`}
                            >
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{getTimeRemaining(activity)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-0">
                      <div className="border-t border-gray-100">
                        <ActivitySection
                          activity={activity}
                          onRegisterClick={
                            activity.hasRegistration &&
                            !isActivityInProgress(
                              activity.startDate,
                              activity.endDate
                            ) &&
                            !isSpecialComingSoonDate(activity.startDate)
                              ? () => handleRegisterClick(activity)
                              : undefined
                          }
                          onImageClick={handleImageClick}
                          isComingSoon={isSpecialComingSoonDate(
                            activity.startDate
                          )}
                          isInProgress={isActivityInProgress(
                            activity.startDate,
                            activity.endDate
                          )}
                          isPast={isActivityPast(activity.endDate)}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    );
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
        activityData={summerCampModal.modalData?.activityData}
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
