import { motion } from "framer-motion";
import { Card, CardContent } from "../../../ui/card";
import { Avatar, AvatarFallback } from "../../../ui/avatar";
import WhatsAppButton from "../../../common/WhatsAppButton";
import { Heart, BookOpen, Award, Users } from "lucide-react";
import type { ServiceSelectionSectionProps } from "../../../../types/collapsible_features";
import type { ProcessedFullOffering } from "../../../../types/service_offerings";

const ServiceSelectionSection = ({ service }: ServiceSelectionSectionProps) => {
  // Map service paths to icons
  const getServiceIcon = () => {
    switch (service.path) {
      case "/therapy":
        return Heart;
      case "/training":
        return BookOpen;
      case "/activities":
        return Award;
      case "/schools":
        return Users;
      default:
        return Heart;
    }
  };

  const ServiceIcon = getServiceIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-12"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <div
            className={`p-3 rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg`}
          >
            <ServiceIcon className="w-8 h-8" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-slate-800 mb-4">
          השירותים שלנו ב{service.title}
        </h3>
        <p className="text-lg text-slate-600 leading-relaxed">
          בחרו את השירות המושלם עבורכם. כל שירות מותאם אישית לצרכים שלכם ומלווה
          בתמיכה מקצועית
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {(service.offerings as ProcessedFullOffering[]).map((offering, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <Card className="group relative overflow-hidden h-full border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              {/* Gradient Overlay */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.color}`}
              />

              <CardContent className="p-8 h-full flex flex-col">
                {/* Service Header */}
                <h4 className="text-2xl font-bold text-slate-800 text-center mb-6">
                  {offering.title}
                </h4>

                {/* Service Description - Fixed Height with Elegant Scroll */}
                <div className="flex-1 mb-6">
                  <div className="relative">
                    <div
                      className="text-slate-600 leading-relaxed text-right whitespace-pre-wrap text-base h-56 overflow-y-auto px-6 py-4 rounded-xl bg-gradient-to-b from-white to-slate-50/50 border border-slate-200/60 shadow-inner"
                      style={{ direction: "ltr" }}
                    >
                      <div style={{ direction: "rtl" }}>
                        {offering.description}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-auto pt-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200/60 relative overflow-hidden group-hover:border-green-300/80 transition-all duration-300">
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-emerald-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10 text-center space-y-4">
                      <div className="space-y-3">
                        <h5 className="text-slate-800 text-sm font-bold leading-tight">
                          {offering.ctaTitle}
                        </h5>
                      </div>

                      <WhatsAppButton
                        message={offering.whatsappMessage}
                        variant="default"
                        size="lg"
                        className="w-full py-4 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-2 border-green-600 hover:border-green-700"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center bg-gradient-to-r from-slate-50 to-white rounded-3xl p-8 border border-slate-200 max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="flex">
            <Avatar className="h-12 w-12 border-2 border-white shadow-md relative z-30 -ml-4">
              <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-500 text-white font-bold text-lg">
                ✓
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12 border-2 border-white shadow-md relative z-20 -ml-4">
              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-500 text-white font-bold text-lg">
                ★
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12 border-2 border-white shadow-md relative z-10 ">
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white font-bold text-lg">
                ♡
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <h4 className="text-xl font-bold text-slate-800 mb-2">
          לא בטוחים איזה שירות מתאים לכם?
        </h4>
        <p className="text-slate-600 mb-6">
          שלחו לנו הודעה ונעזור לכם לבחור את השירות המושלם בהתאם לצרכים שלכם
        </p>
        <WhatsAppButton
          message={`שלום! אשמח לקבל ייעוץ לגבי השירותים שלכם ב${service.title}. איזה שירות הכי מתאים בשבילי?`}
          variant="outline"
          size="lg"
          className="px-8 py-4 font-medium"
        />
      </motion.div>
    </motion.div>
  );
};

export default ServiceSelectionSection;
