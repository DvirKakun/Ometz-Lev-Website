import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingBadge } from "./FloatingBadge";
import { useSlideHeroImages } from "../../../../../hooks/useSlideHeroImages";
import { useSwipeGesture } from "../../../../../hooks/useSwipeGesture";
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
  const [isTouching, setIsTouching] = useState(false);

  // Touch/swipe gesture handlers - using existing navigation functions
  const baseSwipeHandlers = useSwipeGesture({
    onSwipeLeft: goToPrevious, // Swipe left = slide image left
    onSwipeRight: goToNext, // Swipe right = slide image right
    minSwipeDistance: 30, // Reduced for easier mobile interaction
    maxVerticalMovement: 120, // Slightly increased tolerance
  });

  // Reset current image index when images change
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [images]);

  // Auto-switch images
  useEffect(() => {
    if (!autoSwitch || isHovered || isTouching || !images || images.length <= 1)
      return;

    const interval = setInterval(() => {
      goToNext();
    }, switchInterval);

    return () => clearInterval(interval);
  }, [
    autoSwitch,
    isHovered,
    isTouching,
    images,
    switchInterval,
    currentImageIndex,
  ]);

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
  function goToImage(index: number) {
    if (index === currentImageIndex) return;
    setDirection(index > currentImageIndex ? 1 : -1);
    setCurrentImageIndex(index);
  }

  function goToNext() {
    if (!images) return;
    setDirection(-1); // Slide from left to right (image pushes right)
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    );
  }

  function goToPrevious() {
    if (!images) return;
    setDirection(1); // Slide from right to left (image pushes left)
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  }

  // Enhanced swipe handlers with touch state management
  const swipeHandlers = {
    ...baseSwipeHandlers,
    onTouchStart: (e: React.TouchEvent) => {
      setIsTouching(true);
      baseSwipeHandlers.onTouchStart(e);
    },
    onTouchEnd: () => {
      setIsTouching(false);
      baseSwipeHandlers.onTouchEnd();
    },
    onTouchCancel: () => {
      setIsTouching(false);
      baseSwipeHandlers.onTouchCancel();
    },
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
      {/* Main Image Container */}
      <div className="relative w-full">
        {/* Gradient Border - Responsive */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl sm:rounded-3xl"
          animate={{
            rotate: isHovered ? 0 : 3,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Image Container - Responsive */}
        <motion.div
          className={`relative bg-white p-1 sm:p-2 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl ${
            isTouching ? "scale-[0.98]" : ""
          }`}
          whileHover={{ scale: 1.02 }}
          style={{ aspectRatio: "1/1" }}
        >
          {/* Image with Responsive Height */}
          <div
            className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden select-none"
            {...swipeHandlers}
            style={{ touchAction: "pan-y pinch-zoom" }}
          >
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
                      onClick={goToNext}
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
                      onClick={goToPrevious}
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

            {/* Touch/Swipe Hint for Mobile - Only show if multiple images */}
            {images && images.length > 1 && (
              <div className="absolute top-2 left-2 sm:hidden bg-black/20 backdrop-blur-sm rounded-full px-2 py-1 z-10">
                <div className="flex items-center gap-1 text-white text-xs">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
                  </svg>
                  <span>החלק</span>
                </div>
              </div>
            )}
          </div>

          {/* Floating Badge - Responsive positioning */}
          {currentImage && (
            <FloatingBadge
              currentImage={currentImage}
              currentImageIndex={currentImageIndex}
            />
          )}
        </motion.div>
      </div>

      {/* Mobile-only Badge (below image)
      {currentImage && (
        <div className="block sm:hidden mt-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center">
            <h4 className="text-sm font-bold text-white mb-1">
              {currentImage.title}
            </h4>
            <p className="text-xs text-slate-300">{currentImage.subtitle}</p>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default SlideHeroImage;
