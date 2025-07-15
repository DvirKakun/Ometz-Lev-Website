import React from "react";
import FooterBrand from "./FooterBrand";
import FooterQuickLinks from "./FooterQuickLinks";
import FooterContact from "./FooterContact";
import FooterCTA from "./FooterCTA";

const FooterMain: React.FC = () => {
  return (
    <div className="container-max section-padding py-12 lg:py-16">
      {/* Mobile layout (single column) */}
      <div className="block md:hidden">
        <div className="space-y-8">
          {/* Logo first on mobile, aligned right */}
          <FooterBrand showSocialLinks={false} />

          {/* QuickLinks second on mobile */}
          <FooterQuickLinks />

          {/* Contact third on mobile */}
          <FooterContact />

          {/* CTA fourth on mobile */}
          <FooterCTA showSocialLinks={true} />
        </div>
      </div>

      {/* Tablet layout (2 columns) */}
      <div className="hidden md:block lg:hidden">
        <div className="grid md:grid-cols-2 gap-8">
          <FooterBrand showSocialLinks={false} />
          <FooterQuickLinks />
          <FooterContact />
          <FooterCTA showSocialLinks={true} />
        </div>
      </div>

      {/* Desktop layout (4 columns) */}
      <div className="hidden lg:block">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          <FooterBrand showSocialLinks={true} />
          <FooterQuickLinks />
          <FooterContact />
          <FooterCTA showSocialLinks={false} />
        </div>
      </div>
    </div>
  );
};

export default FooterMain;
