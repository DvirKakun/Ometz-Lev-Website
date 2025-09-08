import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LoadingPage from "../../pages/LoadingPage";
import type { PageLoaderProps } from "../../types/page_loader";
import { useLoading } from "../../contexts/LoadingContext";
import {
  useTrainingPageLoadingState,
  useTherapyPageLoadingState,
  useActivitiesPageLoadingState,
  useSchoolsPageLoadingState,
} from "../../hooks/usePrefetchData";

const PageLoader = ({ children, minLoadTime = 3000 }: PageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const startTimeRef = useRef(Date.now());
  const location = useLocation();
  const { setIsLoading: setGlobalLoading } = useLoading();

  // Determine page type
  const isTrainingPage =
    location.pathname.startsWith("/training") &&
    !location.pathname.startsWith("/training-articles-library") &&
    !location.pathname.startsWith("/training-videos-library");
  const isTherapyPage =
    location.pathname.startsWith("/therapy") &&
    !location.pathname.startsWith("/therapy-articles-library");
  const isActivitiesPage = location.pathname.startsWith("/activities");
  const isSchoolsPage = location.pathname.startsWith("/schools");

  // Get loading states for each page type
  const { isLoading: isTrainingDataLoading, progress: trainingProgress } =
    useTrainingPageLoadingState();
  const { isLoading: isTherapyDataLoading, progress: therapyProgress } =
    useTherapyPageLoadingState();
  const { isLoading: isActivitiesDataLoading, progress: activitiesProgress } =
    useActivitiesPageLoadingState();
  const { isLoading: isSchoolsDataLoading, progress: schoolsProgress } =
    useSchoolsPageLoadingState();

  // Determine which loading state to use
  const isPageDataLoading = isTrainingPage
    ? isTrainingDataLoading
    : isTherapyPage
    ? isTherapyDataLoading
    : isActivitiesPage
    ? isActivitiesDataLoading
    : isSchoolsPage
    ? isSchoolsDataLoading
    : false;

  const pageProgress = isTrainingPage
    ? trainingProgress
    : isTherapyPage
    ? therapyProgress
    : isActivitiesPage
    ? activitiesProgress
    : isSchoolsPage
    ? schoolsProgress
    : undefined;

  useEffect(() => {
    // Skip loading if returning from library
    const returnFromLibrary = location.state?.returnFromLibrary;

    if (returnFromLibrary) {
      setIsLoading(false);
      setGlobalLoading(false);
      return;
    }

    // Don't reset loading if this is just a modal state change
    const isModalStateChange = location.state?.modal && !returnFromLibrary;
    if (isModalStateChange) {
      return;
    }

    // Reset loading state and start time when route changes
    setIsLoading(true);
    setGlobalLoading(true);
    startTimeRef.current = Date.now();

    const hasDataLoading =
      isTrainingPage || isTherapyPage || isActivitiesPage || isSchoolsPage;

    if (hasDataLoading) {
      // For service pages, always wait minimum 1 second AND for data to be loaded
      const elapsed = Date.now() - startTimeRef.current;
      const minTimeReached = elapsed >= 2000;

      if (!isPageDataLoading && minTimeReached) {
        setIsLoading(false);
        setGlobalLoading(false);
      } else if (!isPageDataLoading && !minTimeReached) {
        // Data is ready but minimum time not reached
        const remainingTime = 2000 - elapsed;
        setTimeout(() => {
          setIsLoading(false);
          setGlobalLoading(false);
        }, remainingTime);
      }
    }
  }, [
    location.pathname,
    location.state?.returnFromLibrary,
    minLoadTime,
    setGlobalLoading,
    isPageDataLoading,
    isTrainingPage,
    isTherapyPage,
    isActivitiesPage,
    isSchoolsPage,
  ]);

  if (isLoading) {
    return <LoadingPage progress={pageProgress} />;
  }

  return <>{children}</>;
};

export default PageLoader;
