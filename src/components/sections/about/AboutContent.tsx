import React from "react";
import { motion } from "framer-motion";
import AchievementsList from "./AchievementsList";
import CertificationBadge from "./CertificationBadge";

const AboutContent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="order-2 lg:order-1"
    >
      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
        אלעד שמעונוב - המאמן שלכם
      </h3>
      <div className="prose prose-lg text-slate-600 space-y-4 mb-8">
        <p className="leading-relaxed">
          שלום! אני אלעד, מאמן כלבים מוסמך עם מעל עשר שנות ניסיון בתחום.
          התחלתי את הדרך שלי מתוך אהבה עמוקה לכלבים ורצון עז לעזור למשפחות
          ליצור קשר הרמוני עם חברי הכלבים שלהן.
        </p>
        <p className="leading-relaxed">
          הגישה שלי מבוססת על הבנה, סבלנות ושיטות חיוביות. אני מאמין שכל
          כלב יכול ללמוד ולהשתפר, בתנאי שמקבלים אותו בהבנה ונותנים לו את
          הכלים הנכונים.
        </p>
      </div>

      <AchievementsList />
      <CertificationBadge />
    </motion.div>
  );
};

export default AboutContent;