import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../../lib/utils";
import HeaderLogo from "./HeaderLogo";
import HeaderNavigation from "./HeaderNavigation";
import HeaderMobileMenu from "./HeaderMobileMenu";
import HeaderCTAButtons from "./HeaderCTAButtons";
import CountdownTimer from "./timer/CountdownTimer";
import { getClosestActivity } from "../../../utils/activities";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  // Get closest activity for timer
  const [closestActivity, setClosestActivity] = useState<any>(null);
  
  useEffect(() => {
    const fetchClosestActivity = async () => {
      try {
        const activity = await getClosestActivity();
        setClosestActivity(activity);
      } catch (error) {
        console.warn('Failed to fetch closest activity for timer');
        setClosestActivity(null);
      }
    };
    
    fetchClosestActivity();
  }, []);
  
  const handleTimerClick = () => {
    if (closestActivity) {
      navigate('/activities', { 
        state: { scrollToActivity: closestActivity.id } 
      });
    }
  };

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

          {/* Countdown Timer - Center position with mobile-first responsive behavior */}
          <div className="flex-1 flex justify-center items-center min-w-0">
            {closestActivity && (
              <div className="block">
                <CountdownTimer
                  targetDate={closestActivity.date}
                  eventTitle={closestActivity.timerTitle}
                  showEventInfo={true}
                  clickable={true}
                  onClick={handleTimerClick}
                  className="max-w-xs sm:max-w-sm scale-[0.65] sm:scale-75 md:scale-[0.8] lg:scale-[0.85] xl:scale-100"
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
              {closestActivity && (
                <div className="flex justify-center mb-4">
                  <CountdownTimer
                    targetDate={closestActivity.date}
                    eventTitle={closestActivity.timerTitle}
                    showEventInfo={true}
                    clickable={true}
                    onClick={handleTimerClick}
                  />
                </div>
              )}

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
