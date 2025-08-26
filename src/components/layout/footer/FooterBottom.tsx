import React from "react";
import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";

const FooterBottom: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-slate-700/50">
      <div className="container-max section-padding py-6">
        {/* Mobile Layout */}
        <div className="flex flex-col sm:hidden items-center space-y-6">
          <SocialLinks />
          <p className="text-slate-400 text-sm text-center">
            כל הזכויות שמורות - אומץ לב {currentYear} ©
          </p>
          <div className="flex items-center space-x-4 space-x-reverse text-sm">
            <Link
              to="/accessibility"
              className="text-slate-400 hover:text-primary-300 focus-visible:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 transition-colors duration-200 rounded p-1"
            >
              נגישות
            </Link>
            <Link
              to="/privacy"
              className="text-slate-400 hover:text-primary-300 focus-visible:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 transition-colors duration-200 rounded p-1"
            >
              מדיניות פרטיות
            </Link>
            <Link
              to="/terms"
              className="text-slate-400 hover:text-primary-300 focus-visible:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 transition-colors duration-200 rounded p-1"
            >
              תנאי שירות
            </Link>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between">
          <p className="text-slate-400 text-sm">
            כל הזכויות שמורות - אומץ לב {currentYear} ©
          </p>
          <div className="flex items-center space-x-4 space-x-reverse text-sm">
            <Link
              to="/accessibility"
              className="text-slate-400 hover:text-primary-300 focus-visible:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 transition-colors duration-200 rounded p-1"
            >
              נגישות
            </Link>
            <Link
              to="/privacy"
              className="text-slate-400 hover:text-primary-300 focus-visible:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 transition-colors duration-200 rounded p-1"
            >
              מדיניות פרטיות
            </Link>
            <Link
              to="/terms"
              className="text-slate-400 hover:text-primary-300 focus-visible:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 transition-colors duration-200 rounded p-1"
            >
              תנאי שירות
            </Link>
          </div>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
