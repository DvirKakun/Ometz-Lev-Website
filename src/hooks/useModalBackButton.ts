import { useEffect, useRef } from "react";

interface UseModalBackButtonOptions {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Reliable modal back button handler that prevents forward navigation.
 * Call this hook in the component that owns the modal state.
 */
export function useModalBackButton({
  isOpen,
  onClose,
}: UseModalBackButtonOptions) {
  const hasHistoryEntry = useRef(false);

  useEffect(() => {
    if (isOpen && !hasHistoryEntry.current) {
      // Modal opened - push history entry
      window.history.pushState({ modalOpen: true }, "");
      hasHistoryEntry.current = true;

      const handlePopState = () => {
        if (hasHistoryEntry.current) {
          // Back button pressed - close modal
          hasHistoryEntry.current = false;
          onClose();
        }
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    } else if (!isOpen && hasHistoryEntry.current) {
      // Modal closed programmatically - replace state to prevent forward button
      window.history.replaceState(null, "");
      hasHistoryEntry.current = false;
    }
  }, [isOpen, onClose]);
}
