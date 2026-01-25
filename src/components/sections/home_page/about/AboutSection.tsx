import React from "react";
import AboutHeader from "./AboutHeader";
import AboutContent from "./AboutContent";
import AboutDogsContent from "./AboutDogsContent";
import AboutValues from "./AboutValues";

const AboutSection: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container-max section-padding">
        <AboutHeader />

        {/* About Elad Section */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <AboutContent />
        </div>

        {/* About Dogs Section */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <AboutDogsContent />
        </div>

        {/* Values Section - Horizontal */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <AboutValues />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
