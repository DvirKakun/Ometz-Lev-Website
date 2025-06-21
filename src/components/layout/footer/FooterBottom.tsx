import React from "react";
import { Link } from "react-router-dom";

const FooterBottom: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-slate-700/50">
      <div className="container-max section-padding py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <p className="text-slate-400 text-sm text-center sm:text-right">
            © {currentYear} אומץ לב - כל הזכויות שמורות.
          </p>
          <div className="flex items-center space-x-6 space-x-reverse text-sm">
            <Link
              to="/privacy"
              className="text-slate-400 hover:text-primary-300 transition-colors duration-200"
            >
              מדיניות פרטיות
            </Link>
            <Link
              to="/terms"
              className="text-slate-400 hover:text-primary-300 transition-colors duration-200"
            >
              תנאי שירות
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;