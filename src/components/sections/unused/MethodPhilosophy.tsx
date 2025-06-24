import { motion } from "framer-motion";

const MethodPhilosophy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-gradient-to-l from-primary-50 to-white rounded-2xl p-8 border border-primary-100/50 shadow-sm"
    >
      <div className="text-right space-y-4">
        <p className="text-lg leading-relaxed text-slate-700">
          שיטת האילוף שלנו מבוססת על <strong>חיזוק חיובי</strong> והבנה עמוקה של התנהגות כלבים. 
          אנחנו מאמינים שכל כלב יכול ללמוד ולהשתפר, כאשר הוא מקבל את הכלים והסביבה הנכונים.
        </p>
        
        <p className="text-lg leading-relaxed text-slate-700">
          הגישה שלנו מתמקדת ביצירת <strong>קשר של אמון</strong> בין הכלב לבעליו, תוך שימוש 
          בטכניקות מתקדמות המותאמות לאישיות ולצרכים הייחודיים של כל כלב. אנחנו עובדים בסבלנות, 
          בהבנה ובכבוד כלפי הכלב והמשפחה.
        </p>

        <p className="text-lg leading-relaxed text-slate-700">
          המטרה שלנו היא לא רק לפתור בעיות התנהגות קיימות, אלא{" "}
          <strong>למנוע בעיות עתידיות</strong>
          {" "}ולבנות יסודות חזקים לחיים משותפים מאושרים ומאוזנים.
        </p>
      </div>
    </motion.div>
  );
};

export default MethodPhilosophy;