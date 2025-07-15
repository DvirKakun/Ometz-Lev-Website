import React from "react";
import AboutHeader from "./AboutHeader";
import AboutContent from "./AboutContent";
import AboutValues from "./AboutValues";

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container-max section-padding">
        <AboutHeader />
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center overflow-hidden">
          <AboutContent />
          <AboutValues />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;