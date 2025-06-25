export interface ImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
  imageIndex: number;
  totalImages: number;
}

export interface ImageRollerProps {
  images: string[];
  alt: string;
  onImageClick: (imageUrl: string, index: number) => void;
  className?: string;
}
