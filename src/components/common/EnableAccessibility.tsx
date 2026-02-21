import { useEffect } from "react";

const EnableAccessibility = () => {
  useEffect(() => {
    // Show the Enable toolbar when component mounts and fix accessibility issues
    const showToolbar = () => {
      const toolbar = document.getElementById("enable-toolbar");
      if (toolbar) {
        toolbar.style.display = "block";

        // Fix empty button labels after a short delay to ensure DOM is ready
        setTimeout(() => {
          fixEnableAccessibilityIssues();
        }, 200);
      } else {
        // If toolbar doesn't exist yet, try again after a short delay
        setTimeout(showToolbar, 100);
      }
    };

    // Function to fix Enable widget accessibility issues
    const fixEnableAccessibilityIssues = () => {
      // Fix 1: Add aria-labels to empty language toggle buttons
      const hebrewBtn = document.querySelector('button.tr-trigger[data-enable-lang="he_IL"]');
      const englishBtn = document.querySelector('button.tr-trigger[data-enable-lang="en_US"]');

      if (hebrewBtn && !hebrewBtn.getAttribute('aria-label')) {
        hebrewBtn.setAttribute('aria-label', 'עברית - Hebrew language');
      }

      if (englishBtn && !englishBtn.getAttribute('aria-label')) {
        englishBtn.setAttribute('aria-label', 'English - אנגלית');
      }

      // Fix 2: Inject custom CSS to improve contrast and text size
      if (!document.getElementById('enable-accessibility-fixes')) {
        const style = document.createElement('style');
        style.id = 'enable-accessibility-fixes';
        style.textContent = `
          /* Improve keyboard shortcut contrast and size */
          .enable-bottomlinks-reset-accessibility .keyboard-shorcut,
          .enable-bottomlinks-statement .keyboard-shorcut,
          .enable-bottomlinks-feedback .keyboard-shorcut,
          .keyboard-shorcut {
            color: #000000 !important;
            background-color: rgba(255, 255, 255, 0.2) !important;
            font-size: 0.875rem !important;
            padding: 3px 5px !important;
            border-radius: 3px !important;
            font-weight: 600 !important;
            min-height: 16px !important;
          }

          /* Ensure language buttons are visible and accessible */
          button.tr-trigger[data-enable-lang] {
            min-width: 36px !important;
            min-height: 36px !important;
          }
        `;
        document.head.appendChild(style);
      }
    };

    showToolbar();

    // Re-run fixes when DOM changes (in case toolbar reinitializes)
    const observer = new MutationObserver(() => {
      const toolbar = document.getElementById("enable-toolbar");
      if (toolbar) {
        fixEnableAccessibilityIssues();
      }
    });

    // Observe changes to body
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Hide the toolbar when component unmounts (loading starts)
    return () => {
      const toolbar = document.getElementById("enable-toolbar");
      if (toolbar) {
        toolbar.style.display = "none";
      }
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default EnableAccessibility;
