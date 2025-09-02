import { useState, useEffect } from "react";
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

    // Reset loading state when route changes
    setIsLoading(true);
    setGlobalLoading(true);

    const hasDataLoading =
      isTrainingPage || isTherapyPage || isActivitiesPage || isSchoolsPage;

    if (hasDataLoading) {
      // For service pages, wait for data to be loaded
      if (!isPageDataLoading) {
        setIsLoading(false);
        setGlobalLoading(false);
      }
    }
  }, [
    location.pathname,
    location.state,
    minLoadTime,
    setGlobalLoading,
    isPageDataLoading,
  ]);

  if (isLoading) {
    return <LoadingPage progress={pageProgress} />;
  }

  return <>{children}</>;
};

export default PageLoader;
