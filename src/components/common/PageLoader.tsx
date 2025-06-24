import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingPage from "../../pages/LoadingPage";
import type { PageLoaderProps } from "../../types/page_loader";

const PageLoader = ({ children, minLoadTime = 3000 }: PageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Skip loading if returning from library
    const returnFromLibrary = location.state?.returnFromLibrary;

    if (returnFromLibrary) {
      setIsLoading(false);
      return;
    }

    // Reset loading state when route changes
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadTime);

    return () => clearTimeout(timer);
  }, [location.pathname, location.state, minLoadTime]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
};

export default PageLoader;
