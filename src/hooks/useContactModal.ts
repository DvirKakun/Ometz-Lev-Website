import { useState, useCallback } from 'react';

export const useContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);

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