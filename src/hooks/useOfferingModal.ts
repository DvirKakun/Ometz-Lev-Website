import { useCallback, useEffect, useState } from "react";
import type { ProcessedFullOffering } from "../types/service_offerings";

export const useOfferingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [offeringId, setOfferingId] = useState<string | null>(null);

  const openModal = useCallback((offering: ProcessedFullOffering) => {
    window.location.hash = `#offering-${offering.id}`;
    setOfferingId(offering.id);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    if (window.location.hash.startsWith('#offering-')) {
      window.history.back();
    } else {
      setIsOpen(false);
      setOfferingId(null);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#offering-')) {
        const id = hash.replace('#offering-', '');
        setOfferingId(id);
        setIsOpen(true);
      } else {
        setIsOpen(false);
        setOfferingId(null);
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

  return {
    isOpen,
    offeringId,
    openModal,
    closeModal,
    onOpenChange,
  };
};