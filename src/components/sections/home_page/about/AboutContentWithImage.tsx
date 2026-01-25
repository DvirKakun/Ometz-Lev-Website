import React from "react";
import { motion } from "framer-motion";

interface AboutContentWithImageProps {
  title: string;
  subtitle?: string;
  description: string | React.ReactNode;
  bottomDescription?: string;
  imagePath: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
}

const AboutContentWithImage: React.FC<AboutContentWithImageProps> = ({
  title,
  subtitle,
  description,
  bottomDescription,
  imagePath,
  imageAlt,
  imagePosition = "right",
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start lg:items-center">
      {/* Image - Left on desktop, top on mobile */}
      {imagePosition === "left" && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="order-1 lg:order-1"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={imagePath}
              alt={imageAlt}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: imagePosition === "left" ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={
          imagePosition === "left"
            ? "order-2 lg:order-2 px-4 sm:px-0"
            : "order-1 lg:order-1 px-4 sm:px-0"
        }
      >
        <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
          <div className="pb-4 sm:pb-6 border-b border-slate-100">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 sm:mb-3 tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-primary-600 font-semibold text-base sm:text-lg">
                {subtitle}
              </p>
            )}
          </div>

          <div className="prose prose-base sm:prose-lg max-w-none">
            <div className="space-y-4 sm:space-y-6 text-slate-700 leading-relaxed">
              {typeof description === "string" ? (
                <p>{description}</p>
              ) : (
                description
              )}

              {bottomDescription && (
                <p className="text-primary-700 font-medium italic pt-2 text-sm sm:text-base">
                  {bottomDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Image - Right on desktop */}
      {imagePosition === "right" && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="order-2 lg:order-2"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={imagePath}
              alt={imageAlt}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AboutContentWithImage;
