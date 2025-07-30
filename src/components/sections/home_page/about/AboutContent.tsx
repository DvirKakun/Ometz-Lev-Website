import React from "react";
import { motion } from "framer-motion";

const AboutContent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="order-2 lg:order-1"
    >
      <div className="space-y-8 mb-8">
        <div className="pb-6 border-b border-slate-100">
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            אלעד שמעונוב
          </h3>
          <p className="text-primary-600 font-semibold text-lg">
            מאלף כלבים ומטפל התנהגותי
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p className="text-xl font-medium text-slate-800">
              שמי אלעד שמעונוב, אני מתמחה בכלבנות טיפולית, אימון אישי ותכניות
              ייחודיות במסגרת תכנית "גפן".
            </p>

            <p>
              אני מאמין שכל קשר עם כלב הוא הזדמנות לצמיחה אישית ולחיזוק ביטחון
              עצמי. באילוף הכלבים אני עובד
              <span className="font-semibold text-slate-800">
                {" "}
                בגישה חיובית, נעימה ומותאמת אישית
              </span>{" "}
              לכל לקוח.
            </p>

            <p>
              יחד אני בונה תהליך משמעותי שבו הכלבים הופכים לשותפים מלאים בדרך
              לשיפור איכות החיים שלכם ושלהם. בין אם מדובר בילדים, מבוגרים או
              במשפחות שלמות, המטרה שלי היא לספק לכם את הכלים הטובים ביותר כדי
              שתוכלו ליהנות מקשר עמוק, בריא ומאוזן עם הכלב שלכם.
            </p>

            <p className="text-primary-700 font-medium italic pt-2">
              מוזמנים להצטרף למסע המיוחד הזה איתי.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutContent;
