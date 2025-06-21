import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16 lg:py-24">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-soft p-8 lg:p-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8 text-center"
          >
            מדיניות פרטיות
          </motion.h1>

          <div className="prose prose-lg max-w-none text-right" dir="rtl">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                1. כללי
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                מדיניות פרטיות זו מסבירה כיצד אומץ לב ("החברה", "אנחנו", "שלנו")
                אוספת, משתמשת ומגינה על המידע האישי שלך. השימוש באתר זה מהווה
                הסכמה למדיניות פרטיות זו.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                2. איסוף מידע
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                אנו עשויים לאסוף את סוגי המידע הבאים:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                <li>מידע אישי: שם, מספר טלפון, כתובת דוא"ל</li>
                <li>מידע על הכלב: גיל, גזע, בעיות התנהגות</li>
                <li>מידע טכני: כתובת IP, סוג דפדפן, מידע על השימוש באתר</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                3. שימוש במידע
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                אנו משתמשים במידע שנאסף למטרות הבאות:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                <li>מתן שירותי אימון כלבים</li>
                <li>יצירת קשר ותיאום פגישות</li>
                <li>שיפור השירותים שלנו</li>
                <li>שליחת עדכונים על שירותים חדשים (בכפוף להסכמתך)</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                4. שיתוף מידע
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                אנו לא נמכור, נשכיר או נשתף את המידע האישי שלך עם צדדים שלישיים,
                למעט במקרים הבאים:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                <li>בהסכמתך המפורשת</li>
                <li>כאשר נדרש על פי חוק</li>
                <li>למטרות רפואיות חירום הקשורות לכלב</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                5. אבטחת מידע
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                אנו נוקטים אמצעי אבטחה מתאימים כדי להגן על המידע האישי שלך מפני
                גישה לא מורשית, שינוי, גילוי או השמדה.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                6. זכויותיך
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                בהתאם לחוק הגנת הפרטיות, יש לך הזכויות הבאות:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                <li>לדעת איזה מידע אישי נאסף עליך</li>
                <li>לבקש עיון במידע האישי שלך</li>
                <li>לבקש תיקון מידע שגוי</li>
                <li>לבקש מחיקת המידע (בכפוף לחובות חוקיות)</li>
                <li>להתנגד לעיבוד המידע למטרות מסוימות</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                7. עדכוני מדיניות
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. שינויים מהותיים
                יפורסמו באתר ויישלחו אליך בדוא"ל.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                8. יצירת קשר
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                לשאלות או בקשות בנוגע למדיניות פרטיות זו, ניתן ליצור קשר:
              </p>
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-slate-700 font-medium mb-2">
                  אלעד שמעונוב - אומץ לב
                </p>
                <p className="text-slate-600">טלפון: 052-472-4700</p>
                <p className="text-slate-600">דוא"ל: Eladshi1326@gmail.com</p>
              </div>
            </motion.section>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-center pt-8 border-t border-slate-200"
            >
              <p className="text-sm text-slate-500">
                מדיניות זו עודכנה לאחרונה ב-
                {new Date().toLocaleDateString("he-IL")}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
