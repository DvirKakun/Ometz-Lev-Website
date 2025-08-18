import React from "react";
import AboutHeader from "./AboutHeader";
import AboutContent from "./AboutContent";
import AboutValues from "./AboutValues";

const AboutSection: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container-max section-padding">
        <AboutHeader />

        {/* Mobile-first responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start lg:items-center overflow-hidden">
          <AboutContent />
          <AboutValues />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
