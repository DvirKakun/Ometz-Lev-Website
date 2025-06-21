import React from "react";
import { motion } from "framer-motion";

const AccessibilityPage: React.FC = () => {
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
            הצהרת נגישות
          </motion.h1>

          <div className="prose prose-lg max-w-none text-right" dir="rtl">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">1. מחויבות לנגישות</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                אומץ לב מחויבת להנגשת האתר שלה לאנשים עם מוגבלויות. אנו פועלים ליצירת חוויית גלישה
                נגישה ונוחה לכל המשתמשים, בהתאם לתקן הישראלי 5568 ולהנחיות WCAG 2.1 ברמה AA.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">2. רמת הנגישות</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                האתר תוכנן להיות תואם לרמת נגישות AA של תקן WCAG 2.1, ועונה על דרישות התקן הישראלי 5568.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                <h3 className="font-semibold text-green-800 mb-2">✅ תכונות נגישות שיושמו:</h3>
                <ul className="list-disc list-inside text-green-700 space-y-1 text-sm">
                  <li>תמיכה מלאה בשפה העברית וכיוון RTL</li>
                  <li>ניווט באמצעות מקלדת בלבד</li>
                  <li>תמיכה בקוראי מסך</li>
                  <li>ניגודיות צבעים מתאימה (יחס 4.5:1 לפחות)</li>
                  <li>טקסט חלופי לתמונות</li>
                  <li>אפשרות דילוג לתוכן הראשי</li>
                  <li>סימון פוקוס ברור</li>
                  <li>כותרות ומבנה סמנטי</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">3. דפדפנים נתמכים</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                האתר נבדק ונמצא נגיש בדפדפנים הבאים:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                <li>Chrome (גרסה 90 ומעלה)</li>
                <li>Firefox (גרסה 88 ומעלה)</li>
                <li>Safari (גרסה 14 ומעלה)</li>
                <li>Edge (גרסה 90 ומעלה)</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">4. טכנולוגיות מסייעות</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                האתר תוכנן לעבוד עם הטכנולוגיות המסייעות הבאות:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                <li>קוראי מסך (NVDA, JAWS, VoiceOver)</li>
                <li>תוכנות הגדלת מסך</li>
                <li>ניווט באמצעות מקלדת</li>
                <li>תוכנות זיהוי קול</li>
                <li>מקלדות חלופיות</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">5. הגבלות ידועות</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                למרות המאמצים שלנו, ייתכן שחלק מהתכנים באתר עדיין לא נגישים במלואם:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                <li>תמונות ישנות שעדיין לא הוסף להן טקסט חלופי</li>
                <li>סרטונים חיצוניים ללא כתוביות</li>
                <li>קבצי PDF שלא הותאמו לנגישות</li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                אנו עובדים באופן שוטף לשיפור הנגישות של תכנים אלה.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">6. שיפורים עתידיים</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                אנו ממשיכים לשפר את נגישות האתר:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                <li>בדיקות נגישות שוטפות</li>
                <li>הוספת תכונות נגישות חדשות</li>
                <li>שיפור התמיכה בטכנולוגיות מסייעות</li>
                <li>הכשרת הצוות בנושא נגישות</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">7. משוב ופניות</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                נשמח לשמוע ממך על בעיות נגישות או הצעות לשיפור:
              </p>
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-slate-700 font-medium mb-2">איש הקשר לנגישות:</p>
                <p className="text-slate-600">אלעד שמעונוב - אומץ לב</p>
                <p className="text-slate-600">טלפון: 052-472-4700</p>
                <p className="text-slate-600">דוא"ל: Eladshi1326@gmail.com</p>
                <p className="text-slate-600 text-sm mt-2">
                  אנו מתחייבים להשיב לפניות בנושא נגישות תוך 7 ימי עבודה.
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-slate-800 mb-4">8. הליך תלונות</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                במקרה של בעיית נגישות שלא נפתרה:
              </p>
              <ol className="list-decimal list-inside text-slate-600 space-y-2 mb-4">
                <li>פנה אלינו ישירות דרך פרטי הקשר למעלה</li>
                <li>במידה ולא קיבלת מענה מספק, ניתן לפנות למשרד המשפטים</li>
                <li>ניתן לפנות גם לנציב תלונות הציבור</li>
              </ol>
            </motion.section>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-center pt-8 border-t border-slate-200"
            >
              <p className="text-sm text-slate-500">
                הצהרת נגישות זו עודכנה לאחרונה ב-{new Date().toLocaleDateString('he-IL')}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                בהתאם לתקן הישראלי 5568 ו-WCAG 2.1 רמה AA
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccessibilityPage;