import React from "react";
import ContactButtons from "./ContactButtons";
import WorkingHours from "./WorkingHours";
import TrustBadge from "./TrustBadge";
import ContactModal from "../../modals/contact/ContactModal";
import { useContactModal } from "../../../hooks/useContactModal";

const ContactCTA: React.FC = () => {
  const { isOpen, openModal, onOpenChange } = useContactModal();
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-48 translate-y-48"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA Content */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              בואו נתחיל לדבר <br />
              <span className="text-accent-200">בשפת הכלבים!</span>
            </h2>
            <p className="text-xl text-primary-100 leading-relaxed mb-8 max-w-2xl mx-auto">
              צרו קשר עכשיו לקביעת פגישת ייעוץ ראשונה ונתחיל יחד את המסע ליצירת
              קשר בינכם לבין הכלב שלכם
            </p>

            {/* Primary CTA Buttons */}
            <div className="mb-12 flex justify-center">
              <ContactButtons />
            </div>
          </div>

          {/* Supporting Info Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <WorkingHours />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <TrustBadge onClick={openModal} />
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </section>
  );
};

export default ContactCTA;
