import React, { type ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export interface HeaderMobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

/**
 * Locks body scrolling completely - prevents all scroll methods including touch
 */
const useLockBodyScroll = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const { body } = document;

    // Store original values
    const originalOverflow = body.style.overflow;
    const originalPosition = body.style.position;
    const originalTop = body.style.top;
    const originalWidth = body.style.width;

    // Lock scroll with multiple methods for better mobile support
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      // Restore original values
      body.style.overflow = originalOverflow;
      body.style.position = originalPosition;
      body.style.top = originalTop;
      body.style.width = originalWidth;

      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
};

const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({
  isOpen,
  onToggle,
  children,
}) => {
  useLockBodyScroll(isOpen);

  // Simple event handlers for outside click and escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onToggle();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        !target.closest("[data-mobile-menu]") &&
        !target.closest("[data-mobile-menu-btn]")
      ) {
        onToggle();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <>
      {/* ───────────────── Trigger button ───────────────── */}
      <motion.button
        data-mobile-menu-btn
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className="xl:hidden p-3 rounded-2xl bg-primary-100 hover:bg-primary-200 text-primary-700 transition-all duration-200 shadow-sm hover:shadow-md relative z-50"
        aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ───────────────── Backdrop + Panel ───────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              onClick={onToggle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              data-mobile-menu
              id="mobile-menu-panel"
              role="dialog"
              aria-modal="true"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="xl:hidden fixed left-4 right-4 top-24 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 z-50 max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain focus:outline-none"
            >
              <div className="py-6 px-4">{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderMobileMenu;
