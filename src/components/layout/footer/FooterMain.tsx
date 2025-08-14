import React from "react";
import FooterQuickLinks from "./FooterQuickLinks";
import FooterContact from "./FooterContact";
import FooterWorkingHours from "./FooterWorkingHours";

const FooterMain: React.FC = () => {
  return (
    <div className="container-max section-padding py-12 lg:py-16">
      {/* Mobile layout (single column) */}
      <div className="block md:hidden">
        <div className="space-y-8">
          <FooterQuickLinks />
          <FooterContact />
          <FooterWorkingHours showSocialLinks={true} />
        </div>
      </div>

      {/* Tablet and Desktop layout (3 columns) */}
      <div className="hidden md:block">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <FooterQuickLinks />
          <FooterContact />
          <FooterWorkingHours showSocialLinks={true} />
        </div>
      </div>
    </div>
  );
};

export default FooterMain;
