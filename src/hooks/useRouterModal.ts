import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface UseRouterModalOptions {
  modalKey: string;
}

export const useRouterModal = <T = unknown>({
  modalKey,
}: UseRouterModalOptions) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<T | null>(null);

  // Check if modal should be open based on location state
  useEffect(() => {
    const shouldBeOpen = location.state?.modal === modalKey;
    setIsOpen(shouldBeOpen);
    if (shouldBeOpen && location.state?.modalData) {
      setModalData(location.state.modalData);
    } else if (!shouldBeOpen) {
      setModalData(null);
    }
  }, [location.state, modalKey]);

  const openModal = useCallback(
    (data?: T) => {
      const state: Record<string, unknown> = { modal: modalKey };
      if (data !== undefined) {
        state.modalData = data;
      }

      // Push new history entry with modal state
      navigate(location.pathname + location.search, {
        state,
        replace: false, // Create new history entry for back button support
      });
    },
    [navigate, location.pathname, location.search, modalKey]
  );

  const closeModal = useCallback(() => {
    // Check if we have modal state in current location
    if (location.state?.modal === modalKey) {
      // Go back to previous state (this will close modal via back button)
      navigate(-1);
    } else {
      // Fallback: navigate to current location without modal state
      navigate(location.pathname + location.search, {
        state: {}, // Clear any modal state
        replace: true,
      });
    }
  }, [navigate, location.pathname, location.search, location.state, modalKey]);

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
    modalData,
    openModal,
    closeModal,
    onOpenChange,
  };
};
