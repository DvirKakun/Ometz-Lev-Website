import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SEOMeta from "../components/seo/SEOMeta";

const TermsOfServicePage: React.FC = () => {
  useEffect(() => {
    document.title = "תנאי שירות | אומץ לב - אילוף כלבים";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "תנאי השירות של אומץ לב - מרכז אילוף כלבים מקצועי. מדיניות תשלומים, ביטולים ואחריות לשירותי אילוף וטיפול בכלבים."
      );
    }
  }, []);

  return (
    <>
      <SEOMeta
        title="תנאי שימוש | אומץ לב"
        description="תנאי השימוש באתר ובשירותי אומץ לב. כללי השימוש, זכויות וחובות, תנאי ביטול והחזרות."
        noindex={true} // ✅ Prevent indexing
        nofollow={true} // ✅ Don't follow links from this page
      />

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
              תנאי שירות
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
                  תנאי שירות אלה ("התנאים") חלים על השימוש באתר ובשירותי אומץ לב
                  ("החברה"). השימוש באתר או בשירותים מהווה הסכמה מלאה לתנאים
                  אלה.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  2. שירותים
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  אומץ לב מספקת שירותי אימון כלבים הכוללים:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                  <li>אימונים אישיים לכלבים ובעליהם</li>
                  <li>קייטנות כלבים קבוצתיות</li>
                  <li>ייעוץ התנהגותי לכלבים</li>
                  <li>שירותי טיפול בעזרת כלבים לבתי ספר ומוסדות</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  3. תשלומים ומדיניות ביטול
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-2">
                      תשלומים:
                    </h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      <li>התשלום נדרש מראש לפני תחילת השירות</li>
                      <li>ניתן לשלם במזומן, העברה בנקאית או בטיבי</li>
                      <li>מחירים כפופים לשינוי ללא הודעה מוקדמת</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-2">
                      מדיניות ביטול:
                    </h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      <li>ביטול עד 24 שעות לפני השירות - החזר כספי מלא</li>
                      <li>ביטול פחות מ-24 שעות - חיוב של 50% מהמחיר</li>
                      <li>אי הגעה ללא הודעה - חיוב מלא</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  4. אחריות הלקוח
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  הלקוח מתחייב:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                  <li>לספק מידע מדויק ומלא על הכלב ובעיותיו ההתנהגותיות</li>
                  <li>לוודא שהכלב מחוסן ובריא לפני תחילת האימונים</li>
                  <li>לבצע את ההמלצות וההוראות שנתנו במהלך האימון</li>
                  <li>להשגיח על הכלב בכל עת במהלך השירות</li>
                  <li>ליידע מיידית על כל בעיה רפואית או התנהגותית חדשה</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  5. הגבלת אחריות
                </h2>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <p className="text-amber-800 font-medium mb-2">
                    ⚠️ הודעה חשובה:
                  </p>
                  <p className="text-amber-700 text-sm">
                    אימון כלבים כרוך בסיכונים טבעיים. אנא קראו בעיון את הגבלות
                    האחריות.
                  </p>
                </div>
                <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                  <li>
                    אומץ לב לא תישא באחריות לנזקים שנגרמו על ידי הכלב לאחר או
                    במהלך האימון
                  </li>
                  <li>הלקוח נושא באחריות הבלעדית לכלב ולהתנהגותו</li>
                  <li>אין אחריות לתוצאות האימון - כל כלב הוא ייחודי</li>
                  <li>מומלץ בחום לרכוש ביטוח צד שלישי לכלב</li>
                  <li>החברה לא תישא באחריות לפציעות שנגרמו בזמן האימון</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  6. קניין רוחני
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  כל התכנים באתר, כולל טקסטים, תמונות, סרטונים ושיטות אימון, הם
                  קניינה הרוחני של אומץ לב. אסור להעתיק, להפיץ או להשתמש בתכנים
                  ללא רשות בכתב.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  7. פרטיות
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  השימוש במידע האישי שלך כפוף למדיניות הפרטיות שלנו. אנו
                  מתחייבים לשמור על פרטיותך ולא לשתף מידע אישי עם צדדים שלישיים
                  ללא הסכמתך.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  8. סמכות שיפוט
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  תנאים אלה כפופים לדיני מדינת ישראל. כל מחלוקת תידון בבתי המשפט
                  המוסמכים בישראל.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  9. שינוי תנאים
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  אומץ לב שומרת לעצמה את הזכות לשנות תנאים אלה בכל עת. שינויים
                  יכנסו לתוקף עם פרסומם באתר.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  10. יצירת קשר
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  לשאלות בנוגע לתנאי השירות:
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
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-center pt-8 border-t border-slate-200"
              >
                <p className="text-sm text-slate-500">
                  תנאי שירות אלה עודכנו לאחרונה ב-
                  {new Date().toLocaleDateString("he-IL")}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  על ידי שימוש בשירותינו, אתה מאשר שקראת והבנת תנאים אלה
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TermsOfServicePage;
