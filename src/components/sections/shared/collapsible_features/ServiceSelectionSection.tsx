import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../../ui/card";
import { Avatar, AvatarFallback } from "../../../ui/avatar";
import { Button } from "../../../ui/button";
import WhatsAppButton from "../../../common/WhatsAppButton";
import { Info } from "lucide-react";
import OfferingDetailsModal from "../../../modals/offering/OfferingDetailsModal";
import type { ServiceSelectionSectionProps } from "../../../../types/collapsible_features";
import type { ProcessedFullOffering } from "../../../../types/service_offerings";

/**
 * Mobile-first + RTL-friendly service grid
 *
 * ✱  Layout: 2-col auto-fill grid on phones → 4-col on large
 * ✱  Scroll containers: `dir="ltr"` so scrollbar stays right even in RTL
 * ✱  Touch targets ≥ 44 px
 * ✱  Fluid typography via clamp()
 * ✱  `dir="rtl"` on root for Hebrew
 */
const ServiceSelectionSection = ({ service }: ServiceSelectionSectionProps) => {
  const [selectedOffering, setSelectedOffering] =
    useState<ProcessedFullOffering | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOfferingDetails = (offering: ProcessedFullOffering) => {
    setSelectedOffering(offering);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOffering(null);
  };

  return (
    <motion.div
      dir="rtl" // RTL root
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-8 sm:space-y-10 lg:space-y-12"
    >
      {/* ───── Section header ───── */}
      <header className="text-center max-w-4xl mx-auto px-4 sm:px-6">
        <h3
          className="font-bold text-primary-500 mb-4 sm:mb-5 leading-tight tracking-tight"
          style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }} // fluid type
        >
          השירותים שלנו ב{service.title}
        </h3>

        <p
          className="text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium"
          style={{ fontSize: "clamp(0.95rem, 2.1vw, 1.25rem)" }}
        >
          בחרו את השירות המושלם עבורכם.<br></br> כל שירות מותאם אישית לצרכים
          שלכם ומלווה בתמיכה מקצועית.
        </p>
      </header>

      {/* ───── Responsive grid ───── */}
      <div
        className="
          grid auto-rows-fr gap-3 sm:gap-4 md:gap-5 lg:gap-6
          px-4 sm:px-6 md:px-8 lg:px-4 max-w-7xl mx-auto
          grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
        "
      >
        {(service.offerings as ProcessedFullOffering[]).map(
          (offering, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
            >
              <Card className="group relative h-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
                {/* Top accent bar */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-primary-500`}
                />

                <CardContent className="flex h-full flex-col p-2.5 sm:p-3 md:p-4 lg:p-5">
                  {/* Service title */}
                  <h4
                    className="
          mb-2 sm:mb-3 text-center font-bold leading-tight tracking-tight line-clamp-2
          text-slate-900
          text-[clamp(0.85rem,1.8vw,1.1rem)]
          sm:text-[clamp(1rem,2vw,1.25rem)]
          md:text-[clamp(1.1rem,1.8vw,1.35rem)]
        "
                  >
                    {offering.title}
                  </h4>

                  {/* CTA title beneath the title */}
                  <h5
                    className="
          mb-4 sm:mb-5 text-slate-600 leading-tight text-center
          text-[0.75rem] sm:text-sm md:text-base
          line-clamp-2
        "
                  >
                    {offering.ctaTitle}
                  </h5>

                  {/* Spacer to push buttons to bottom */}
                  <div className="flex-1"></div>

                  {/* Buttons section */}
                  <div className="space-y-1.5 sm:space-y-2">
                    {/* Info button above WhatsApp button */}
                    <Button
                      onClick={() => handleOfferingDetails(offering)}
                      variant="outline"
                      size="sm"
                      className="
                        w-full rounded-md sm:rounded-lg border-slate-300 hover:bg-slate-100
                        py-1.5 sm:py-2.5 md:py-3
                        text-xs sm:text-sm md:text-base font-medium text-slate-700
                        h-8 sm:h-10 md:h-11
                        transition-colors duration-200
                        flex items-center justify-center gap-1.5 sm:gap-2
                        hover:border-slate-400
                      "
                    >
                      למידע נוסף
                      <Info className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </Button>

                    {/* WhatsApp Button (≥44 px touch-target) */}
                    <WhatsAppButton
                      message={offering.whatsappMessage}
                      variant="outline"
                      size="sm"
                      className="
            w-full rounded-md sm:rounded-lg 
            py-1.5 sm:py-2 md:py-2.5
            text-xs sm:text-sm md:text-base font-bold text-green-500
            shadow hover:shadow-md hover:from-green-600 hover:to-green-700
            active:scale-95 transition-transform
            !h-8 sm:!h-10 md:!h-11
          "
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        )}
      </div>

      {/* ───── Bottom CTA ───── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center bg-gradient-to-br from-white to-slate-50/90 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-10 border-2 border-slate-200/60 shadow-xl max-w-4xl mx-auto backdrop-blur-sm"
      >
        <div className="flex items-center justify-center mb-5 sm:mb-7">
          <div className="flex">
            <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-3 border-white shadow-xl ring-2 ring-slate-100 relative z-30 -ml-4 rtl:-mr-4 rtl:ml-0">
              <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 text-white font-bold text-lg sm:text-xl">
                ✓
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-3 border-white shadow-xl ring-2 ring-slate-100 relative z-20 -ml-4 rtl:-mr-4 rtl:ml-0">
              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold text-lg sm:text-xl">
                ★
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-3 border-white shadow-xl ring-2 ring-slate-100 relative z-10 rtl:-mr-4">
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-600 text-white font-bold text-lg sm:text-xl">
                ♡
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <h4
          className="font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight"
          style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.75rem)" }}
        >
          לא בטוחים איזה שירות מתאים לכם?
        </h4>

        <p
          className="text-slate-600 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto font-medium"
          style={{ fontSize: "clamp(0.95rem, 2.1vw, 1.25rem)" }}
        >
          שלחו לנו הודעה ונעזור לכם לבחור את השירות המושלם בהתאם לצרכים שלכם
        </p>

        <WhatsAppButton
          message={`שלום! אשמח לקבל ייעוץ לגבי השירותים שלכם ב${service.title}. איזה שירות הכי מתאים בשבילי?`}
          variant="outline"
          size="lg"
          className="min-h-[56px] sm:min-h-[60px] px-8 sm:px-10 lg:px-12 py-4 sm:py-5 font-bold hover:from-green-600 hover:to-green-700
            active:scale-95 text-green-500 shadow-xl hover:shadow-md transition-all duration-300 rounded-2xl sm:rounded-3xl focus:ring-4 focus:ring-green-200 w-full sm:w-auto"
        />
      </motion.div>

      {/* Modal */}
      <OfferingDetailsModal
        offering={selectedOffering}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </motion.div>
  );
};

export default ServiceSelectionSection;
