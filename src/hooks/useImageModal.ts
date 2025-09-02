import { useCallback, useEffect, useState } from "react";

interface ImageData {
  imageUrl: string;
  alt: string;
  imageIndex: number;
  totalImages: number;
}

export const useImageModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const openModal = useCallback((data: ImageData) => {
    window.location.hash = `#image-${data.imageIndex}`;
    setImageData(data);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    if (window.location.hash.startsWith('#image-')) {
      window.history.back();
    } else {
      setIsOpen(false);
      setImageData(null);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#image-')) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
        setImageData(null);
      }
    };

    const handlePopState = () => {
      handleHashChange();
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const onOpenChange = useCallback((open: boolean) => {
    if (!open) {
      closeModal();
    }
  }, [closeModal]);

  const getImageData = useCallback((): ImageData | null => {
    return imageData;
  }, [imageData]);

  return {
    isOpen,
    imageData,
    openModal,
    closeModal,
    onOpenChange,
    getImageData,
  };
};