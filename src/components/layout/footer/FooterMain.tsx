import React from "react";
import FooterBrand from "./FooterBrand";
import FooterQuickLinks from "./FooterQuickLinks";
import FooterContact from "./FooterContact";
import FooterCTA from "./FooterCTA";

const FooterMain: React.FC = () => {
  return (
    <div className="container-max section-padding py-12 lg:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <FooterBrand />
        <FooterQuickLinks />
        <FooterContact />
        <FooterCTA />
      </div>
    </div>
  );
};

export default FooterMain;