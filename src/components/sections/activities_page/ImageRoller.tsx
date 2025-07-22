import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ImageRollerProps } from "../../../types/image_roller";

const ImageRoller: React.FC<ImageRollerProps> = ({
  images,
  onImageClick,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(1);
  const imageWidth = 208; // w-48 (192px) + gap-4 (16px)

  // Calculate how many images can fit in the viewport
  useEffect(() => {
    const calculateVisibleImages = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const maxImages = Math.floor(containerWidth / imageWidth);
        // Ensure we show at least 1 image and at most 4
        const newVisibleImages = Math.max(1, maxImages);
        setVisibleImages(newVisibleImages);
      }
    };

    calculateVisibleImages();
    window.addEventListener("resize", calculateVisibleImages);
    return () => window.removeEventListener("resize", calculateVisibleImages);
  }, [imageWidth]);

  // Circular scroll left/right
  const scrollLeft = () => {
    if (currentIndex === 0) {
      // Jump to the end
      const maxIndex = Math.max(0, images.length - visibleImages);
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const scrollRight = () => {
    const maxIndex = Math.max(0, images.length - visibleImages);
    if (currentIndex >= maxIndex) {
      // Jump to the beginning
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Always show arrows when there are more images than visible
  const canScrollLeft = images.length > visibleImages;
  const canScrollRight = images.length > visibleImages;

  if (!images || images.length === 0) {
    return null;
  }
  console.log(images);
  return (
    <div className={`relative ${className}`}>
      {/* Background container with shadow and separator */}
      <div
        ref={containerRef}
        className="bg-slate-50 rounded-2xl p-6 shadow-lg border border-slate-200"
      >
        <div
          className="relative overflow-hidden"
          style={{ width: `${visibleImages * imageWidth}px`, margin: "0 auto" }}
        >
          <div
            className="flex flex-row-reverse gap-4 transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * imageWidth}px)`,
            }}
          >
            {images.map((galleryItem, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-48 h-36 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
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
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10 border border-gray-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10 border border-gray-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>

        {/* Image counter */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600 font-medium">
            {images.length} תמונות גלריה
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageRoller;
