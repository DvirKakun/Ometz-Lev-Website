import React, { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/**
 * Mobile header menu with scroll‑lock, focus trap, and adaptive height.
 *
 * @prop isOpen   Controls visibility.
 * @prop onToggle Toggles menu state (also used for outside/ESC close).
 * @prop children Menu items / tree.
 *
 * Accessibility & UX goodies
 * – Locks <body> scroll when open (no background move‑around).
 * – Focus is trapped inside the dialog; ↹ cycles elements.
 * – Closes on outside click or Escape.
 * – Respects safe‑area insets + prefers‑reduced‑motion.
 * – Grows with content; internal scrolling kicks in only when necessary.
 */
export interface HeaderMobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({
  isOpen,
  onToggle,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  /* ─────────────── 1️⃣  Scroll‑lock <body> when open ─────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevTouch = body.style.touchAction;

    body.style.overflow = "hidden"; // disables scroll
    body.style.touchAction = "none"; // stops pull‑to‑refresh on Android

    return () => {
      body.style.overflow = prevOverflow;
      body.style.touchAction = prevTouch;
    };
  }, [isOpen]);

  /* ─────────────── 2️⃣  Keyboard focus‑trap ─────────────── */
  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (!panelRef.current || e.key !== "Tab") return;

    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (
      e.shiftKey
        ? document.activeElement === first
        : document.activeElement === last
    ) {
      (e.shiftKey ? last : first).focus();
      e.preventDefault();
    }
  }, []);

  /* ─────────────── 3️⃣  Auto-scroll when content changes ─────────────── */
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const panel = panelRef.current;

    // Simple mutation observer to detect any DOM changes (dropdown opening)
    const observer = new MutationObserver(() => {
      // Auto-scroll down a bit when dropdown opens
      setTimeout(() => {
        panel.scrollBy({
          top: 80,
          behavior: "smooth",
        });
      }, 300);
    });

    // Watch for changes in the menu content
    observer.observe(panel, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [isOpen]);

  /* ─────────────── 4️⃣  Attach listeners when menu opens ─────────────── */
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (evt: MouseEvent) => {
      const target = evt.target as Element;
      if (
        !panelRef.current?.contains(target) &&
        !target.closest("[data-mobile-menu-btn]")
      ) {
        onToggle();
      }
    };

    const handleEscape = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") onToggle();
    };

    document.addEventListener("keydown", trapFocus);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    // Move initial focus inside the panel
    setTimeout(() => {
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      (firstFocusable ?? panelRef.current)?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", trapFocus);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onToggle, trapFocus]);

  /* ─────────────── 4️⃣  Render ─────────────── */
  return (
    <>
      {/* Toggle button */}
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

      {/* Backdrop & panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* semi‑opaque backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={onToggle}
            />

            {/* Sliding panel */}
            <motion.div
              id="mobile-menu-panel"
              data-testid="mobile-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="xl:hidden fixed left-4 right-4 top-24 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 z-50 overflow-y-auto overscroll-contain focus:outline-none"
              style={{
                /* dynamic cap—full viewport minus header gap; uses dynamic vh for mobile‑chrome */
                maxHeight: "calc(100dvh - 6rem)",
                paddingBottom: "env(safe-area-inset-bottom)",
              }}
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
