import { useLocation } from "react-router-dom";
import { services } from "../data/services";
import { Heart } from "lucide-react";
import LoadingBackground from "../components/sections/loading_page/LoadingBackground";
import LoadingCard from "../components/sections/loading_page/LoadingCard";
import LoadingSpinner from "../components/sections/loading_page/LoadingSpinner";
import LoadingContent from "../components/sections/loading_page/LoadingContent";
import LoadingProgress from "../components/sections/loading_page/LoadingProgress";
import LoadingMessage from "../components/sections/loading_page/LoadingMessage";
import { usePrefetchForRoute } from "../hooks/usePrefetchData";
import { useImagePreloader } from "../hooks/useImagePreloader";

const LoadingPage = () => {
  const location = useLocation();

  // Prefetch data based on current route
  usePrefetchForRoute(location.pathname);

  // Preload images from cached data
  useImagePreloader();

  // Find the service that matches current path
  const currentService = services.find((service) =>
    location.pathname.startsWith(service.path)
  );

  // Fallback to default if no service found
  const service = currentService || {
    title: "אומץ לב",
    icon: Heart,
    color: "from-primary-500 to-primary-600",
    bgColor: "from-primary-50 to-primary-100/50",
  };

  return (
    <LoadingBackground bgColor={service.bgColor} color={service.color}>
      <LoadingCard>
        <LoadingSpinner color={service.color} icon={service.icon} />
        <LoadingContent title={service.title} color={service.color} />
        <LoadingProgress color={service.color} />
        <LoadingMessage />
      </LoadingCard>
    </LoadingBackground>
  );
};

export default LoadingPage;
