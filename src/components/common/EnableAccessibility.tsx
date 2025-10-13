import { useEffect } from "react";

const EnableAccessibility = () => {
  useEffect(() => {
    // Show the Enable toolbar when component mounts
    const showToolbar = () => {
      const toolbar = document.getElementById("enable-toolbar");
      if (toolbar) {
        toolbar.style.display = "block";
      } else {
        // If toolbar doesn't exist yet, try again after a short delay
        setTimeout(showToolbar, 100);
      }
    };

    showToolbar();

    // Hide the toolbar when component unmounts (loading starts)
    return () => {
      const toolbar = document.getElementById("enable-toolbar");
      if (toolbar) {
        toolbar.style.display = "none";
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default EnableAccessibility;
