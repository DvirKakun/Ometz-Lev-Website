import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
    <LoadingBackground
      bgColor="from-primary-50 to-primary-100"
      color="from-primary-400 to-primary-500"
    >
      <LoadingCard>
        {/* Service Icon */}
        <motion.div
          className="text-center mb-3 sm:mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-lg" />
          </motion.div>
        </motion.div>

        <LoadingSpinner />
        <LoadingContent title={service.title} />
        <LoadingProgress color="from-primary-400 to-primary-500" />
        <LoadingMessage />
      </LoadingCard>
    </LoadingBackground>
  );
};

export default LoadingPage;
