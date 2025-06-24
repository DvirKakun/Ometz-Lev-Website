import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { Calendar } from "lucide-react";
import SummerCampImage from "../../../assets/images/Summer_Camp.jpg";
import type { ActivitySectionProps } from "../../../types/activities";

const ActivitySection = ({ onRegisterClick }: ActivitySectionProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content - Right side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-accent-500 to-orange-500 rounded-xl shadow-lg mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-right">
                  קייטנת החופש הגדול
                </h2>
              </div>

              <div className="space-y-4 text-right mb-8">
                <p className="text-lg text-slate-700 leading-relaxed">
                  קייטנת "אומץ לב" מציעה לילדים חוויה ייחודית ומעצימה של למידה
                  וגדילה יחד עם כלבים מאומנים במיוחד. הקייטנה מתמחה בבניית
                  ביטחון עצמי, פיתוח אמפתיה ולימוד אחריות דרך קשר מיוחד עם בעלי
                  החיים.
                </p>

                <p className="text-lg text-slate-700 leading-relaxed">
                  במהלך הקייטנה הילדים ילמדו על התנהגות כלבים, טיפוח ואכפתיות,
                  ויחוו פעילויות מגוונות שמעודדות עבודת צוות, יצירתיות ותקשורת.
                  כל פעילות מותאמת לגיל ולצרכים האישיים של כל ילד.
                </p>

                <div className="bg-accent-50 p-4 rounded-lg border-r-4 border-accent-500">
                  <p className="text-slate-700 font-medium text-right">
                    <strong>מתאים לגילאי:</strong> 6-12 שנים
                    <br />
                    <strong>משך כל מחזור:</strong> שבוע אינטנסיבי
                    <br />
                    <strong>מספר משתתפים מוגבל</strong> להבטחת חוויה אישית
                    ואיכותית
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button
                  onClick={onRegisterClick}
                  size="lg"
                  className="bg-gradient-to-r from-accent-500 to-orange-500 hover:from-accent-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Calendar className="w-5 h-5 ml-2" />
                  הרשמה לקייטנה
                </Button>
              </motion.div>
            </motion.div>

            {/* Image - Left side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-orange-500/20 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
                  <img
                    src={SummerCampImage}
                    alt="פלייר קייטנת החופש הגדול - אומץ לב"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ActivitySection;
