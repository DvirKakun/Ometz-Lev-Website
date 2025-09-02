import { useState, useCallback } from 'react';
import { useModalBackButton } from './useModalBackButton';

export const useContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle back button for contact modal
  useModalBackButton({
    isOpen,
    onClose: () => setIsOpen(false),
  });

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    onOpenChange,
  };
};