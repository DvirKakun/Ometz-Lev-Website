import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import ScrollToTop from "../common/ScrollToTop";
import ScrollToTopButton from "../common/ScrollToTopButton";
import ContactCTA from "./contact/ContactCTA";
import { FloatingTimer } from "../timer";
import { useLoading } from "../../contexts/LoadingContext";

export default function Layout() {
  const { isLoading } = useLoading();
  const location = useLocation();

  // Pages that should never show loading state
  const noLoadingPages = ["/home"];
  const shouldShowLoading =
    isLoading && !noLoadingPages.includes(location.pathname);

  return (
    <div
      className={
        shouldShowLoading
          ? "flex h-screen flex-col"
          : "flex min-h-screen flex-col"
      }
    >
      <ScrollToTop />
      {/* Skip Links for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary-600 text-white px-4 py-2 z-50 rounded-br-lg transition-all"
      >
        דלג לתוכן הראשי
      </a>

      <Header />

      <main id="main-content" className="flex-1 overflow-hidden" tabIndex={-1}>
        <Outlet /> {/* ← page content goes right here */}
      </main>

      {!shouldShowLoading && (
        <>
          <ContactCTA />
          <Footer />
          <FloatingTimer />
          <ScrollToTopButton />
        </>
      )}
    </div>
  );
}
