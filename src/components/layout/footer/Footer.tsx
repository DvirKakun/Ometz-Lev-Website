import React from "react";
import FooterMain from "./FooterMain";
import FooterBottom from "./FooterBottom";

const Footer: React.FC = () => {
  return (
    <footer role="contentinfo" className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white overflow-x-hidden">
      <FooterMain />
      <FooterBottom />
    </footer>
  );
};

export default Footer;
