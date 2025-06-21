import React from "react";
import FooterMain from "./FooterMain";
import FooterBottom from "./FooterBottom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white">
      <FooterMain />
      <FooterBottom />
    </footer>
  );
};

export default Footer;