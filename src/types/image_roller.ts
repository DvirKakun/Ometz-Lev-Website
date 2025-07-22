export interface ImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
  imageIndex: number;
  totalImages: number;
}

import type { PrismicGalleryImage } from "./activities";

export interface ImageRollerProps {
  images: PrismicGalleryImage[];
  onImageClick: (imageUrl: string, index: number) => void;
  className?: string;
}
