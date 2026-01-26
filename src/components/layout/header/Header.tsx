import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import HeaderLogo from "./HeaderLogo";
import HeaderNavigation from "./HeaderNavigation";
import HeaderMobileMenu from "./HeaderMobileMenu";
import HeaderCTAButtons from "./HeaderCTAButtons";
import OmetzLevLogo from "../../../assets/icons/Ometz-Lev-Logo.png";
import { useTimer } from "../../../contexts/TimerContext";
import { triggerDogPawConfetti } from "../../../utils/confetti";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { hideTimer, showTimer } = useTimer();
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = () => {
    // Easter egg: 3 clicks triggers confetti
    const newClickCount = logoClickCount + 1;
    setLogoClickCount(newClickCount);

    // Clear existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // If 3 clicks, trigger confetti and reset
    if (newClickCount === 3) {
      triggerDogPawConfetti();
      setLogoClickCount(0);
      return; // Don't navigate when confetti triggers
    }

    // Reset click count after 1 second
    clickTimeoutRef.current = setTimeout(() => {
      setLogoClickCount(0);
    }, 1000);

    // Normal navigation behavior
    if (location.pathname === "/home") {
      // Scroll to top if already on home page
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to home page
      navigate("/home");
    }
  };

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

  // Cleanup click timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

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
            <HeaderLogo onClick={handleLogoClick} />
          </div>
          {/* Center Logo */}
          <div className="flex-1 flex justify-start">
            <motion.button
              onClick={handleLogoClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer focus:outline-none "
              aria-label="Navigate to home page"
            >
              <img
                src={OmetzLevLogo}
                alt="Ometz Lev Logo"
                className="h-12 w-auto"
              />
            </motion.button>
          </div>
          {/* Desktop Navigation Component - Hidden on smaller screens to make room */}
          <div className="hidden xl:block">
            <HeaderNavigation />
          </div>

          {/* Contact Buttons Component (Desktop) - Hidden on smaller screens */}
          <div className="hidden xl:block flex-shrink-0">
            <HeaderCTAButtons
              authDialogOpen={authDialogOpen}
              setAuthDialogOpen={setAuthDialogOpen}
              userMenuOpen={userMenuOpen}
              setUserMenuOpen={setUserMenuOpen}
            />
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
              <HeaderCTAButtons
                isMobile
                onMobileMenuClose={() => setIsMenuOpen(false)}
                authDialogOpen={authDialogOpen}
                setAuthDialogOpen={setAuthDialogOpen}
                userMenuOpen={userMenuOpen}
                setUserMenuOpen={setUserMenuOpen}
              />
            </HeaderMobileMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
