import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingPage from "../../pages/LoadingPage";
import type { PageLoaderProps } from "../../types/page_loader";
import { useLoading } from "../../contexts/LoadingContext";

const PageLoader = ({ children, minLoadTime = 3000 }: PageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { setIsLoading: setGlobalLoading } = useLoading();

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

    const timer = setTimeout(() => {
      setIsLoading(false);
      setGlobalLoading(false);
    }, minLoadTime);

    return () => {
      clearTimeout(timer);
      // Always reset loading state when component unmounts
      setGlobalLoading(false);
    };
  }, [location.pathname, location.state, minLoadTime, setGlobalLoading]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
};

export default PageLoader;
