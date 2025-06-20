import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "../../../lib/utils";
import HeaderLogo from "./HeaderLogo";
import HeaderNavigation from "./HeaderNavigation";
import HeaderMobileMenu from "./HeaderMobileMenu";
import HeaderCTAButtons from "./HeaderCTAButtons";
import CountdownTimer from "./timer/CountdownTimer";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Example countdown target - set to null to hide timer
  const countdownTarget = new Date("2025-08-19T18:58:00");

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
        <div className="flex items-center justify-between h-20 lg:h-24 gap-3 lg:gap-6">
          {/* Logo Component */}
          <div className="flex-shrink-0">
            <HeaderLogo />
          </div>

          {/* Desktop Navigation Component - Hidden on smaller screens to make room */}
          <div className="hidden xl:block">
            <HeaderNavigation />
          </div>

          {/* Countdown Timer - Center position with responsive behavior */}
          <div className="flex-1 flex justify-center items-center min-w-0">
            {countdownTarget && (
              <div className="hidden sm:block">
                <CountdownTimer
                  targetDate={countdownTarget}
                  eventTitle="הקייטנה הבאה!"
                  showEventInfo={true}
                  className="max-w-sm"
                />
              </div>
            )}
          </div>

          {/* Contact Buttons Component (Desktop) - Hidden on smaller screens */}
          <div className="hidden xl:block flex-shrink-0">
            <HeaderCTAButtons />
          </div>

          {/* Mobile Menu Button Component */}
          <div className="flex-shrink-0">
            <HeaderMobileMenu isOpen={isMenuOpen} onToggle={toggleMenu}>
              {/* Mobile Countdown Timer */}
              {countdownTarget && (
                <div className="flex justify-center mb-4">
                  <CountdownTimer
                    targetDate={countdownTarget}
                    eventTitle="הקייטנה הבאה!"
                    showEventInfo={true}
                  />
                </div>
              )}

              {/* Mobile Navigation */}
              <HeaderNavigation isMobile />

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
