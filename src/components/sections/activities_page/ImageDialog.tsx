import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "../../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import type { ImageDialogProps } from "../../../types/image_roller";

const ImageDialog: React.FC<ImageDialogProps> = ({
  isOpen,
  onClose,
  imageUrl,
  alt,
  imageIndex,
  totalImages,
}) => {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen && imageUrl) {
      const img = new Image();
      img.onload = () => {
        const maxWidth = window.innerWidth * 0.95;
        const maxHeight = window.innerHeight * 0.95;

        let { width, height } = img;

        // Scale down if image is larger than viewport
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        setImageDimensions({ width, height });
      };
      img.src = imageUrl;
    }
  }, [isOpen, imageUrl]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="sr-only">תצוגת תמונה</DialogTitle>
      <DialogContent
        className="p-0 bg-transparent border-0 shadow-none [&>button]:hidden max-w-[95vw] max-h-[95vh] flex items-center justify-center"
        style={{
          maxWidth: imageDimensions
            ? `min(${imageDimensions.width + 40}px, 95vw)`
            : "95vw",
          width: imageDimensions
            ? `min(${imageDimensions.width + 40}px, 95vw)`
            : "auto",
        }}
      >
        {/* Custom Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white rounded-lg overflow-hidden shadow-2xl max-w-full max-h-full"
          style={{
            width: imageDimensions ? `${imageDimensions.width}px` : "auto",
            height: imageDimensions ? `${imageDimensions.height}px` : "auto",
          }}
        >
          {/* Image container */}
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt={alt}
              className="w-full h-full object-contain"
              style={{
                width: imageDimensions ? `${imageDimensions.width}px` : "auto",
                height: imageDimensions
                  ? `${imageDimensions.height}px`
                  : "auto",
              }}
            />

            {/* Image info - only show for image roller images, not main image */}
            {imageIndex !== -1 && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white text-sm text-center font-medium">
                  תמונה {imageIndex + 1} מתוך {totalImages}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
