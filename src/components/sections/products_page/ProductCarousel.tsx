import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeGesture } from "../../../hooks/useSwipeGesture";
import type { ProcessedProductImage } from "../../../types/products";

interface ProductCarouselProps {
  images: ProcessedProductImage[];
  onImageClick: (imageUrl: string, index: number) => void;
  className?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  images,
  onImageClick,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // RTL Navigation Logic (following HeroSection pattern)
  function goToImage(index: number) {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? -1 : 1); // RTL: next = slide left (-1), prev = slide right (1)
    setCurrentIndex(index);
  }

  function goToNext() {
    if (!images) return;
    setDirection(-1); // Slide from right to left (image pushes left)
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }

  function goToPrevious() {
    if (!images) return;
    setDirection(1); // Slide from left to right (image pushes right)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  // Touch/swipe gesture handling (RTL corrected)
  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: goToPrevious, // Swipe left = previous image (RTL)
    onSwipeRight: goToNext, // Swipe right = next image (RTL)
    minSwipeDistance: 30,
    maxVerticalMovement: 120,
  });

  if (!images || images.length === 0) {
    return null;
  }

  // Single image - no carousel needed
  if (images.length === 1) {
    return (
      <div className={`relative ${className}`}>
        <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-md">
          <img
            src={images[0].url}
            alt={images[0].alt}
            className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => onImageClick(images[0].url, 0)}
          />
        </div>
      </div>
    );
  }

  // RTL slide animation variants (following HeroSection pattern)
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
    <div className={`relative ${className}`}>
      {/* Image container */}
      <div
        className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...swipeHandlers}
        style={{ touchAction: "pan-y pinch-zoom" }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className="w-full h-full object-contain cursor-pointer absolute inset-0"
            onClick={() => onImageClick(images[currentIndex].url, currentIndex)}
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
              duration: 0.4,
            }}
          />
        </AnimatePresence>

        {/* Navigation arrows - RTL corrected */}
        {images.length > 1 && (
          <AnimatePresence>
            {isHovered && (
              <>
                {/* LEFT ARROW - Goes to NEXT in RTL */}
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={goToNext}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                  aria-label="תמונה הבאה"
                >
                  <svg
                    className="w-4 h-4 text-gray-700"
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

                {/* RIGHT ARROW - Goes to PREVIOUS in RTL */}
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={goToPrevious}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                  aria-label="תמונה קודמת"
                >
                  <svg
                    className="w-4 h-4 text-gray-700"
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
      </div>

      {/* Dots indicator - Fixed spacing and RTL gap */}
      {images.length > 1 && (
        <div className="flex justify-center mt-3 gap-2 rtl:space-x-reverse">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`עבור לתמונה ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;