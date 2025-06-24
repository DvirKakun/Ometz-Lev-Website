import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import ScrollToTop from "../common/ScrollToTop";
import ContactCTA from "./contact/ContactCTA";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      {/* Skip Links for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary-600 text-white px-4 py-2 z-50 rounded-br-lg transition-all"
      >
        דלג לתוכן הראשי
      </a>

      <Header />

      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet /> {/* ← page content goes right here */}
      </main>

      <ContactCTA />
      <Footer />
    </div>
  );
}
