import { useEffect } from "react";

const SplashAccessibilityController = () => {
  useEffect(() => {
    // Hide the Enable toolbar on splash screen
    const hideToolbar = () => {
      const toolbar = document.getElementById("enable-toolbar");
      if (toolbar) {
        toolbar.style.display = "none";
      } else {
        // If toolbar doesn't exist yet, try again after a short delay
        setTimeout(hideToolbar, 100);
      }
    };

    hideToolbar();

    // Don't show the toolbar when component unmounts (leaving splash screen)
    // The Layout component will handle showing it on other pages
    return () => {
      // No need to show it here since Layout component will handle it
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SplashAccessibilityController;