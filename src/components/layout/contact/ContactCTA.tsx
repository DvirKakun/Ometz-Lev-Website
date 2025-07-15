import React from "react";
import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";

const ContactCTA: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-white rounded-full blur-3xl transform -translate-x-4 -translate-y-4 sm:-translate-x-8 sm:-translate-y-8 lg:-translate-x-32 lg:-translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-white rounded-full blur-3xl transform translate-x-4 translate-y-4 sm:translate-x-8 sm:translate-y-8 lg:translate-x-48 lg:translate-y-48"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ContactHero />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;