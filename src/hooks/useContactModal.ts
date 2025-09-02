import { useCallback, useEffect, useState } from "react";

export const useContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    window.location.hash = "#contact-modal";
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    if (window.location.hash === "#contact-modal") {
      window.history.back();
    } else {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setIsOpen(window.location.hash === "#contact-modal");
    };

    const handlePopState = () => {
      setIsOpen(window.location.hash === "#contact-modal");
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        closeModal();
      }
    },
    [closeModal]
  );

  return {
    isOpen,
    openModal,
    closeModal,
    onOpenChange,
  };
};
