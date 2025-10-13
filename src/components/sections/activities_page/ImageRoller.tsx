import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSwipeGesture } from "../../../hooks/useSwipeGesture";
import type { ImageRollerProps } from "../../../types/image_roller";

const ImageRoller: React.FC<ImageRollerProps> = ({
  images,
  onImageClick,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(1);
  const imageWidth = 144; // w-32 (128px) + gap-4 (16px)

  // Calculate how many images can fit in the viewport
  useEffect(() => {
    const calculateVisibleImages = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const maxImages = Math.floor(containerWidth / imageWidth);
        // Ensure we show at least 1 image and at most 4
        const newVisibleImages = Math.max(1, maxImages);

        // Adjust currentIndex if it would cause images to be out of view
        if (newVisibleImages !== visibleImages) {
          const maxIndex = Math.max(0, images.length - newVisibleImages);
          setCurrentIndex((prev) => Math.min(prev, maxIndex));
        }

        setVisibleImages(newVisibleImages);
      }
    };

    calculateVisibleImages();
    window.addEventListener("resize", calculateVisibleImages);
    return () => window.removeEventListener("resize", calculateVisibleImages);
  }, [imageWidth, visibleImages, images.length]);

  // Touch/swipe gesture handling (matches Hero slider)
  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: goToPrevious, // Swipe left = slide image left
    onSwipeRight: goToNext, // Swipe right = slide image right
    minSwipeDistance: 30, // Reduced for easier mobile interaction
    maxVerticalMovement: 120, // Allow some vertical movement for scrolling
  });

  // RTL Navigation Logic (matches Hero slider)
  function goToNext() {
    // Slide right, indicator moves right to left (RTL)
    if (currentIndex === 0) {
      // Jump to the end
      const maxIndex = Math.max(0, images.length - visibleImages);
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function goToPrevious() {
    // Slide left, indicator moves left to right (RTL)
    const maxIndex = Math.max(0, images.length - visibleImages);
    if (currentIndex >= maxIndex) {
      // Jump to the beginning
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  // Always show arrows when there are more images than visible
  const canScrollLeft = images.length > visibleImages;
  const canScrollRight = images.length > visibleImages;

  if (!images || images.length === 0) {
    return null;
  }
  return (
    <div className={`relative ${className}`}>
      {/* Background container with shadow and separator */}
      <div
        ref={containerRef}
        className="bg-slate-50 rounded-xl p-4 shadow-md border border-slate-200"
      >
        <div
          className="relative overflow-hidden select-none"
          style={{
            width: `${visibleImages * imageWidth}px`,
            margin: "0 auto",
            touchAction: "pan-y pinch-zoom",
          }}
          {...swipeHandlers}
        >
          <div
            className="flex flex-row-reverse gap-3 transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * imageWidth}px)`,
            }}
          >
            {images.map((galleryItem, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-white"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onImageClick(galleryItem.image.url || "", index)}
              >
                <img
                  src={galleryItem.image.url || ""}
                  alt={galleryItem.image.alt || "Gallery image"}
                  loading="lazy"
                  className="w-full h-full object-contain bg-gray-50"
                />
              </motion.div>
            ))}
          </div>

          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={goToNext}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 z-10 border border-gray-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={goToPrevious}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 z-10 border border-gray-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>

        {/* Image counter */}
        <div className="mt-3 text-center">
          <span className="text-xs text-gray-600 font-medium">
            {images.length} תמונות גלריה
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageRoller;
