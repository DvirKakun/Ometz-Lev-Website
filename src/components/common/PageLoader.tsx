import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LoadingPage from "../../pages/LoadingPage";
import type { PageLoaderProps } from "../../types/page_loader";
import { useLoading } from "../../contexts/LoadingContext";
import {
  LoadingProgressProvider,
  useLoadingProgress,
} from "../../contexts/LoadingProgressContext";
import {
  useTrainingPageLoadingState,
  useTherapyPageLoadingState,
  useActivitiesPageLoadingState,
  useSchoolsPageLoadingState,
  useProductsPageLoadingState,
} from "../../hooks/usePrefetchData";

// Wrapper component to handle progress updates without re-rendering LoadingPage
const LoadingPageWrapper = ({
  pageProgress,
}: {
  pageProgress: number | undefined;
}) => {
  const { setProgress } = useLoadingProgress();

  useEffect(() => {
    setProgress(pageProgress);
  }, [pageProgress, setProgress]);

  return <LoadingPage />;
};

const PageLoader = ({ children, minLoadTime = 1000 }: PageLoaderProps) => {
  const location = useLocation();
  const { setIsLoading: setGlobalLoading } = useLoading();

  // Captured once at mount — returning from library/PDF skips the loading screen entirely
  const skipLoadingRef = useRef(
    !!(location.state?.returnFromLibrary || location.state?.returnFromPDF),
  );
  const skipLoading = skipLoadingRef.current;

  // Initialize local loading state at mount — never flip back to true
  const [isLoading, setIsLoading] = useState(() => !skipLoading);

  // Record mount time once so min load time counts from initial render, not effect re-runs
  const mountTimeRef = useRef(Date.now());

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
  const isProductsPage = location.pathname.startsWith("/products");

  // Get loading states for each page type
  const { isLoading: isTrainingDataLoading, progress: trainingProgress } =
    useTrainingPageLoadingState();
  const { isLoading: isTherapyDataLoading, progress: therapyProgress } =
    useTherapyPageLoadingState();
  const { isLoading: isActivitiesDataLoading, progress: activitiesProgress } =
    useActivitiesPageLoadingState();
  const { isLoading: isSchoolsDataLoading, progress: schoolsProgress } =
    useSchoolsPageLoadingState();
  const { isLoading: isProductsDataLoading, progress: productsProgress } =
    useProductsPageLoadingState();

  // Determine which loading state to use
  const isPageDataLoading = isTrainingPage
    ? isTrainingDataLoading
    : isTherapyPage
      ? isTherapyDataLoading
      : isActivitiesPage
        ? isActivitiesDataLoading
        : isSchoolsPage
          ? isSchoolsDataLoading
          : isProductsPage
            ? isProductsDataLoading
            : false;

  const pageProgress = isTrainingPage
    ? trainingProgress
    : isTherapyPage
      ? therapyProgress
      : isActivitiesPage
        ? activitiesProgress
        : isSchoolsPage
          ? schoolsProgress
          : isProductsPage
            ? productsProgress
            : undefined;

  // Sync global loading state BEFORE first paint to prevent footer flash.
  // useLayoutEffect fires synchronously after DOM mutations but before the browser
  // paints — Layout re-renders with isLoading=true in the same frame, so the user
  // never sees the footer flash that happened with useEffect.
  useLayoutEffect(() => {
    if (!skipLoading) {
      setGlobalLoading(true);
    }
    return () => {
      setGlobalLoading(false);
    };
  }, [skipLoading, setGlobalLoading]);

  // Finish loading once data is ready and minimum display time has passed
  useEffect(() => {
    if (skipLoading || !isLoading) return;
    if (isPageDataLoading) return; // Still waiting for data

    const elapsed = Date.now() - mountTimeRef.current;
    const delay = Math.max(0, minLoadTime - elapsed);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setGlobalLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [isPageDataLoading, skipLoading, isLoading, minLoadTime, setGlobalLoading]);

  if (isLoading) {
    return (
      <LoadingProgressProvider>
        <LoadingPageWrapper pageProgress={pageProgress} />
      </LoadingProgressProvider>
    );
  }

  return <>{children}</>;
};

export default PageLoader;
