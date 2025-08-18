import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "../../../lib/utils";
import HeaderLogo from "./HeaderLogo";
import HeaderNavigation from "./HeaderNavigation";
import HeaderMobileMenu from "./HeaderMobileMenu";
import HeaderCTAButtons from "./HeaderCTAButtons";
import OmetzLevLogo from "../../../assets/icons/Ometz-Lev-Logo.png";
import { useTimer } from "../../../contexts/TimerContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { hideTimer, showTimer } = useTimer();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Hide/show timer when mobile menu opens/closes
  useEffect(() => {
    if (isMenuOpen) {
      hideTimer();
    } else {
      showTimer();
    }
  }, [isMenuOpen, hideTimer, showTimer]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={cn(
        "w-full sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 shadow-lg border-b border-primary-100/50 backdrop-blur-xl"
          : "bg-white/90 backdrop-blur-md"
      )}
    >
      <nav className="w-full px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-20 lg:h-24 gap-3 lg:gap-8">
          {/* Logo Component */}
          <div className="flex-shrink-0">
            <HeaderLogo />
          </div>

          {/* Desktop Navigation Component - Hidden on smaller screens to make room */}
          <div className="hidden xl:block">
            <HeaderNavigation />
          </div>

          {/* Center Logo */}
          <div className="flex-1 flex justify-center">
            <img
              src={OmetzLevLogo}
              alt="Ometz Lev Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Contact Buttons Component (Desktop) - Hidden on smaller screens */}
          <div className="hidden xl:block flex-shrink-0">
            <HeaderCTAButtons />
          </div>

          {/* Mobile Menu Button Component */}
          <div className="flex-shrink-0">
            <HeaderMobileMenu isOpen={isMenuOpen} onToggle={toggleMenu}>
              {/* Mobile Navigation */}
              <HeaderNavigation
                isMobile
                onItemClick={() => setIsMenuOpen(false)}
              />

              {/* Mobile Contact Buttons */}
              <HeaderCTAButtons isMobile />
            </HeaderMobileMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
