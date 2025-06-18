import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

// Import your images
import profileImage from "../../assets/images/Profile_Image.jpg";
import reviewsImage from "../../assets/images/Reviews_Image.jpg";
import eladImage from "../../assets/images/Elad_Image.jpg";

interface SlideHeroImageProps {
  className?: string;
  autoSwitch?: boolean;
  switchInterval?: number;
}

const SlideHeroImage: React.FC<SlideHeroImageProps> = ({
  className = "",
  autoSwitch = true,
  switchInterval = 6000,
}) => {
  // Array of images with their descriptions
  const images = [
    {
      src: profileImage,
      alt: "אלעד שמעונוב - מאמן כלבים מקצועי באומץ לב",
      title: "אלעד שמעונוב",
      subtitle: "מאמן כלבים מקצועי",
    },
    {
      src: reviewsImage,
      alt: "ביקורות מהורים על אלעד שמעונוב",
      title: "אלעד שמעונוב",
      subtitle: "ביקורות מהורים",
    },
    {
      src: eladImage,
      alt: "אלעד במהלך הדרכה",
      title: "אלעד שמעונוב",
      subtitle: "הדרכת אילוף",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for right-to-left, 1 for left-to-right

  // Auto-switch images
  useEffect(() => {
    if (!autoSwitch || isHovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1); // Auto-advance: left to right (RTL: higher index)
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, switchInterval);

    return () => clearInterval(interval);
  }, [autoSwitch, isHovered, images.length, switchInterval]);

  const currentImage = images[currentImageIndex];

  // RTL Navigation Logic
  const goToImage = (index: number) => {
    if (index === currentImageIndex) return;
    setDirection(index > currentImageIndex ? 1 : -1);
    setCurrentImageIndex(index);
  };

  // RTL: Left arrow goes to NEXT (higher index)
  const goToPrevious = () => {
    setDirection(1); // Left arrow in RTL = move left to right (higher index)
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    );
  };

  // RTL: Right arrow goes to PREVIOUS (lower index)
  const goToNext = () => {
    setDirection(-1); // Right arrow in RTL = move right to left (lower index)
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  };

  // RTL slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%", // RTL: 1=right to left, -1=left to right
      opacity: 1,
    }),
    center: {
      x: "0%",
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%", // RTL: 1=exits left, -1=exits right
      opacity: 1,
    }),
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Elements */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-200/50 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-200/50 rounded-full blur-2xl"></div>

      {/* Main Image Container */}
      <div className="relative">
        {/* Gradient Border */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-3xl transform rotate-3"
          animate={{
            rotate: isHovered ? 1 : 3,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Image Container */}
        <motion.div
          className="relative bg-white p-2 rounded-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
          whileHover={{ scale: 1.02 }}
        >
          {/* Image with AnimatePresence for smooth transitions */}
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentImageIndex}
                src={currentImage.src}
                alt={currentImage.alt}
                className="w-full h-full object-cover rounded-2xl absolute inset-0"
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

            {/* Navigation Arrows (only show if multiple images and on hover) */}
            {images.length > 1 && (
              <AnimatePresence>
                {isHovered && (
                  <>
                    {/* LEFT ARROW - Goes to NEXT image (higher index) in RTL */}
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                      aria-label="תמונה הבאה (RTL)"
                    >
                      <svg
                        className="w-5 h-5 text-slate-700"
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

                    {/* RIGHT ARROW - Goes to PREVIOUS image (lower index) in RTL */}
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                      aria-label="תמונה קודמת (RTL)"
                    >
                      <svg
                        className="w-5 h-5 text-slate-700"
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

            {/* Image Indicators (RTL: Index 0 on the right) */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 space-x-reverse z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
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

          {/* Floating Badge with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${currentImageIndex}`}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: -20 }}
              transition={{
                duration: 0.4,
                delay: 0.3,
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className="absolute -bottom-4 -right-4 bg-white shadow-2xl rounded-2xl p-4 border-2 border-primary-100"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-800">
                    {currentImage.title}
                  </div>
                  <div className="text-xs text-slate-600">
                    {currentImage.subtitle}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default SlideHeroImage;
