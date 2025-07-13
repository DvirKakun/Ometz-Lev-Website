import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingBadge } from "./FloatingBadge";
import { useSlideHeroImages } from "../../../../../hooks/useSlideHeroImages";
import type { SlideHeroImageProps } from "../../../../../types/slide_hero_images";

const SlideHeroImage: React.FC<SlideHeroImageProps> = ({
  className = "",
  autoSwitch = true,
  switchInterval = 6000,
}) => {
  const { data: images, isLoading } = useSlideHeroImages();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  // Reset current image index when images change
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [images]);

  // Auto-switch images
  useEffect(() => {
    if (!autoSwitch || isHovered || !images || images.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, switchInterval);

    return () => clearInterval(interval);
  }, [autoSwitch, isHovered, images?.length, switchInterval]);

  // Show loading state if Strapi is loading and we don't have fallback data
  if (isLoading || !images || images.length === 0) {
    return (
      <div
        className={`relative w-full min-h-[300px] ${className} flex items-center justify-center`}
      >
        <div className="animate-pulse bg-slate-200 rounded-2xl w-full h-full min-h-[300px]"></div>
      </div>
    );
  }

  const currentImage = images[currentImageIndex];

  // RTL Navigation Logic
  const goToImage = (index: number) => {
    if (index === currentImageIndex) return;
    setDirection(index > currentImageIndex ? 1 : -1);
    setCurrentImageIndex(index);
  };

  const goToPrevious = () => {
    if (!images) return;
    setDirection(1);
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    );
  };

  const goToNext = () => {
    if (!images) return;
    setDirection(-1);
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  };

  // RTL slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: "0%",
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 1,
    }),
  };

  return (
    <div
      className={`relative w-full min-h-[300px] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Elements - Responsive */}
      <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 lg:-top-6 lg:-right-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-primary-200/50 rounded-full blur-xl sm:blur-2xl"></div>
      <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 lg:-bottom-4 lg:-left-4 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-accent-200/50 rounded-full blur-xl sm:blur-2xl"></div>

      {/* Main Image Container */}
      <div className="relative w-full">
        {/* Gradient Border - Responsive */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-2xl sm:rounded-3xl transform rotate-2 sm:rotate-3"
          animate={{
            rotate: isHovered ? 1 : [2, 3],
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Image Container - Responsive */}
        <motion.div
          className="relative bg-white p-1 sm:p-2 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl transform -rotate-1 sm:-rotate-2 hover:rotate-0 transition-transform duration-500"
          whileHover={{ scale: 1.02 }}
          style={{ aspectRatio: "1/1" }}
        >
          {/* Image with Responsive Height */}
          <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentImageIndex}
                src={currentImage?.src || ""}
                alt={currentImage?.alt || ""}
                className="w-full h-full object-cover object-center rounded-xl sm:rounded-2xl absolute inset-0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 400,
                    damping: 40,
                    mass: 1,
                  },
                  duration: 0.6,
                }}
              />
            </AnimatePresence>

            {/* Navigation Arrows - Responsive */}
            {images && images.length > 1 && (
              <AnimatePresence>
                {isHovered && (
                  <>
                    {/* LEFT ARROW */}
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={goToPrevious}
                      className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                      aria-label="תמונה הבאה (RTL)"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </motion.button>

                    {/* RIGHT ARROW */}
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onClick={goToNext}
                      className="absolute right-2 sm:right-3 lg:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                      aria-label="תמונה קודמת (RTL)"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.button>
                  </>
                )}
              </AnimatePresence>
            )}

            {/* Image Indicators - Responsive */}
            {images && images.length > 1 && (
              <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`עבור לתמונה ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Floating Badge - Responsive positioning */}
          {currentImage && (
            <div className="hidden sm:block">
              <FloatingBadge
                currentImage={currentImage}
                currentImageIndex={currentImageIndex}
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Mobile-only Badge (below image) */}
      {currentImage && (
        <div className="block sm:hidden mt-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center">
            <h4 className="text-sm font-bold text-white mb-1">
              {currentImage.title}
            </h4>
            <p className="text-xs text-slate-300">{currentImage.subtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideHeroImage;
