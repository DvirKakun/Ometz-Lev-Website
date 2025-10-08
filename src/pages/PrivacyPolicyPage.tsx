import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SEOMeta from "../components/seo/SEOMeta";

const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = "מדיניות פרטיות | אומץ לב - אילוף כלבים";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "מדיניות פרטיות של אומץ לב - מרכז אילוף כלבים וכלבנות טיפולית. מידע על שמירה על נתונים אישיים ושימוש באתר בהתאם לחוק הגנת הפרטיות הישראלי."
      );
    }
  }, []);

  return (
    <>
      <SEOMeta
        title="מדיניות פרטיות | אומץ לב"
        description="מדיניות הפרטיות של אומץ לב - הגנה על הפרטיות שלכם, איסוף מידע, שימוש בעוגיות ושמירה על נתונים אישיים בהתאם לחוק הגנת הפרטיות הישראלי."
        noindex={true}
        nofollow={true}
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
              מדיניות פרטיות
            </motion.h1>

            <div className="prose prose-lg max-w-none text-right" dir="rtl">
              {/* סעיף 1: כללי - זיהוי בעל המאגר */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  1. כללי - זיהוי בעל המאגר
                </h2>
                <p className="text-slate-600 mb-4">
                  מדיניות פרטיות זו מסבירה כיצד אומץ לב ("החברה", "אנחנו",
                  "שלנו") אוספת, משתמשת ומגינה על המידע האישי שלכם בהתאם לחוק
                  הגנת הפרטיות, התשמ"א-1981 ותקנות הגנת הפרטיות (אבטחת מידע),
                  התשע"ז-2017.
                </p>
                <div className="bg-slate-100 p-4 rounded-lg">
                  <p className="font-semibold text-slate-800 mb-2">
                    פרטי בעל המאגר:
                  </p>
                  <p className="text-slate-700">שם העסק: אומץ לב</p>
                  <p className="text-slate-700">בעל העסק: אלעד שמעונוב</p>
                  <p className="text-slate-700">⚠️ מספר ע.מ./ח.פ.: [נדרש השלמה ידנית]</p>
                  <p className="text-slate-700">⚠️ כתובת פיזית: [נדרש השלמה ידנית]</p>
                  <p className="text-slate-700">טלפון: 052-472-4700</p>
                  <p className="text-slate-700">⚠️ אימייל ליצירת קשר: [נדרש השלמה ידנית]</p>
                </div>
              </motion.section>

              {/* סעיף 2: מידע שנאסף */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  2. מידע שנאסף
                </h2>
                
                <h3 className="text-lg font-medium text-slate-700 mb-3">מידע אישי:</h3>
                <ul className="list-disc list-inside text-slate-600 mb-4 space-y-1">
                  <li>שם מלא (דרך טפסי יצירת קשר והרשמה לקייטנות)</li>
                  <li>מספר טלפון (דרך טפסי יצירת קשר והרשמה לקייטנות)</li>
                  <li>כתובת דוא"ל (אופציונלי בטפסי יצירת קשר)</li>
                  <li>הודעות והערות (דרך טפסי יצירת קשר)</li>
                  <li>שמות ילדים, גיל וכיתה (דרך טפסי הרשמה לקייטנות)</li>
                  <li>פרטי הורים (שמות וטלפונים)</li>
                  <li>מידע בריאותי של ילדים (אלרגיות, פחדים, בעיות בריאותיות)</li>
                </ul>

                <h3 className="text-lg font-medium text-slate-700 mb-3">מידע טכני:</h3>
                <ul className="list-disc list-inside text-slate-600 mb-4 space-y-1">
                  <li>כתובת IP</li>
                  <li>סוג דפדפן ומערכת הפעלה</li>
                  <li>נתוני גלישה והתנהגות באתר</li>
                  <li>זמן ביקור ודפים שנצפו</li>
                </ul>

                <h3 className="text-lg font-medium text-slate-700 mb-3">עוגיות:</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>עוגיות נגישות (שירות Enable)</li>
                  <li>עוגיות פעילות (ניהול הפעלה באתר)</li>
                  <li>עוגיות העדפות משתמש</li>
                </ul>
              </motion.section>

              {/* סעיף 3: מטרת השימוש במידע */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  3. מטרת השימוש במידע
                </h2>
                <p className="text-slate-600 mb-4">
                  אנו משתמשים במידע שלכם למטרות הבאות:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>מתן שירותי אילוף כלבים וכלבנות טיפולית</li>
                  <li>ניהול הרשמות לקייטנות ופעילויות</li>
                  <li>יצירת קשר וטיפול בפניות לקוחות</li>
                  <li>התאמת השירותים לצרכים האישיים של הילדים (מידע בריאותי)</li>
                  <li>שיפור חוויית המשתמש באתר</li>
                  <li>ניתוח סטטיסטי לשיפור השירותים</li>
                  <li>הבטחת נגישות האתר לאנשים עם מוגבלויות</li>
                </ul>
              </motion.section>

              {/* סעיף 4: שיתוף מידע עם צדדים שלישיים */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  4. שיתוף מידע עם צדדים שלישיים
                </h2>
                <p className="text-slate-600 mb-4">
                  אנו משתמשים בשירותים הבאים:
                </p>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">Enable (https://enable.co.il)</h4>
                    <p className="text-slate-600 text-sm mb-1"><strong>מטרה:</strong> שירות נגישות לאתר</p>
                    <p className="text-slate-600 text-sm mb-1"><strong>מידע:</strong> נתוני שימוש אנונימיים, העדפות נגישות</p>
                    <p className="text-slate-600 text-sm"><strong>מדיניות פרטיות:</strong> <a href="https://enable.co.il/privacy" className="text-blue-600 underline">קישור למדיניות Enable</a></p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">EmailJS (@emailjs/browser)</h4>
                    <p className="text-slate-600 text-sm mb-1"><strong>מטרה:</strong> שליחת טפסי יצירת קשר והרשמה</p>
                    <p className="text-slate-600 text-sm mb-1"><strong>מידע:</strong> תוכן הטפסים (שמות, טלפונים, הודעות)</p>
                    <p className="text-slate-600 text-sm"><strong>מדיניות פרטיות:</strong> <a href="https://www.emailjs.com/legal/privacy-policy/" className="text-blue-600 underline">מדיניות EmailJS</a></p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">Prismic CMS (@prismicio/client)</h4>
                    <p className="text-slate-600 text-sm mb-1"><strong>מטרה:</strong> ניהול תוכן האתר (מאמרים, סרטונים, מידע)</p>
                    <p className="text-slate-600 text-sm mb-1"><strong>מידע:</strong> תוכן האתר בלבד (ללא מידע משתמשים)</p>
                    <p className="text-slate-600 text-sm"><strong>מדיניות פרטיות:</strong> <a href="https://prismic.io/privacy" className="text-blue-600 underline">מדיניות Prismic</a></p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">Netlify (אחסון אתר)</h4>
                    <p className="text-slate-600 text-sm mb-1"><strong>מטרה:</strong> אחסון ותפעול האתר</p>
                    <p className="text-slate-600 text-sm mb-1"><strong>מידע:</strong> לוגי שרת, כתובות IP</p>
                    <p className="text-slate-600 text-sm"><strong>מדיניות פרטיות:</strong> <a href="https://www.netlify.com/privacy/" className="text-blue-600 underline">מדיניות Netlify</a></p>
                  </div>
                </div>
              </motion.section>

              {/* סעיף 5: זכויות המשתמש */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  5. זכויות המשתמש
                </h2>
                <p className="text-slate-600 mb-4">
                  בהתאם לחוק הגנת הפרטיות, התשמ"א-1981, יש לך הזכויות הבאות:
                </p>
                <ol className="list-decimal list-inside text-slate-600 space-y-2">
                  <li><strong>זכות עיון:</strong> זכות לעיין במידע האישי שלך השמור אצלנו</li>
                  <li><strong>זכות תיקון:</strong> זכות לתקן מידע שגוי או לא מדויק</li>
                  <li><strong>זכות מחיקה:</strong> זכות למחיקת המידע (בכפוף להחרגות בחוק)</li>
                  <li><strong>זכות התנגדות:</strong> זכות להתנגד לעיבוד המידע</li>
                  <li><strong>זכות הגבלת עיבוד:</strong> זכות להגביל את עיבוד המידע</li>
                  <li><strong>זכות ניידות נתונים:</strong> זכות לקבל את המידע בפורמט נגיש</li>
                </ol>
                <p className="text-slate-600 mt-4">
                  <strong>לממש את זכויותיך, צור קשר עם ממונה הפרטיות ב:</strong> ⚠️ [נדרש השלמת אימייל ממונה פרטיות]
                </p>
              </motion.section>

              {/* סעיף 6: אבטחת מידע - תקנה 13 */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  6. אבטחת מידע (תקנה 13)
                </h2>
                <p className="text-slate-600 mb-4">
                  אנו נוקטים באמצעי אבטחה פיזיים, טכנולוגיים וארגוניים להגנה על המידע האישי:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                  <li>הצפנת תעבורה (HTTPS/SSL) לכל האתר</li>
                  <li>הגבלת גישה למידע לעובדים מורשים בלבד</li>
                  <li>אחסון מידע בשירותים מאובטחים (EmailJS, Prismic)</li>
                  <li>עדכוני אבטחה שוטפים של מערכות האתר</li>
                  <li>גיבויים תקופתיים למניעת אובדן מידע</li>
                </ul>
                
                <div className="bg-red-50 border-r-4 border-red-400 p-4 rounded">
                  <h4 className="font-semibold text-red-800 mb-2">⚠️ חובת הודעה על אירוע אבטחה (תקנה 13):</h4>
                  <p className="text-red-700 text-sm">
                    בהתאם לתקנה 13 לתקנות הגנת הפרטיות (אבטחת מידע), התשע"ז-2017,
                    במקרה של אירוע אבטחת מידע שיש בו כדי לגרום נזק ממשי לפרטיות,
                    נודיע לך ולרשות להגנת הפרטיות תוך 72 שעות.
                  </p>
                </div>
              </motion.section>

              {/* סעיף 7: שמירת מידע - תקופת אחסון */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  7. שמירת מידע - תקופת אחסון
                </h2>
                <p className="text-slate-600 mb-4">
                  אנו שומרים את המידע האישי שלך למשך:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li><strong>פניות יצירת קשר:</strong> 3 שנים ממועד הפנייה</li>
                  <li><strong>רישום לקייטנות:</strong> 7 שנים (בהתאם לדרישות חוק לצרכי ביטוח)</li>
                  <li><strong>מידע בריאותי של ילדים:</strong> עד לגיל 21 של הילד (בהתאם להנחיות משרד הבריאות)</li>
                  <li><strong>לוגים טכניים:</strong> 12 חודשים</li>
                  <li><strong>עוגיות נגישות:</strong> עד לבקשת הסרה או שינוי הגדרות דפדפן</li>
                </ul>
              </motion.section>

              {/* סעיף 8: קטינים */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  8. קטינים
                </h2>
                <p className="text-slate-600 mb-4">
                  שירותי אומץ לב מיועדים לילדים וקטינים במסגרת קייטנות ותכניות חינוכיות.
                  איסוף מידע על קטינים מתבצע אך ורק בהסכמת ההורים/האפוטרופוסים החוקיים.
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>הרשמה לקייטנות מתבצעת אך ורק על ידי הורים</li>
                  <li>מידע בריאותי נאסף למטרות בטיחות בלבד</li>
                  <li>אין איסוף מידע ישיר מקטינים דרך האתר</li>
                  <li>הורים יכולים לבקש עיון, תיקון או מחיקת מידע של ילדיהם בכל עת</li>
                </ul>
              </motion.section>

              {/* סעיף 9: עוגיות (Cookies) - פירוט מלא */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  9. עוגיות (Cookies) - פירוט מלא
                </h2>
                <p className="text-slate-600 mb-4">
                  האתר משתמש בעוגיות הבאות:
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">עוגיות הכרחיות:</h4>
                    <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                      <li>enable_preferences: העדפות נגישות אישיות</li>
                      <li>session_id: ניהול הפעלה באתר</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">עוגיות פונקציונליות:</h4>
                    <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                      <li>site_preferences: העדפות משתמש (שפה, תצוגה)</li>
                      <li>modal_state: מצב מודלים וחלונות קופצים</li>
                    </ul>
                  </div>
                </div>

                <h4 className="font-semibold text-slate-700 mt-6 mb-3">כיצד לנהל עוגיות:</h4>
                <p className="text-slate-600 mb-2">ניתן לחסום עוגיות בהגדרות הדפדפן:</p>
                <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                  <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
                </ul>
              </motion.section>

              {/* סעיף 10: שינויים במדיניות */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  10. שינויים במדיניות
                </h2>
                <p className="text-slate-600 mb-4">
                  אנו עשויים לעדכן מדיניות זו מעת לעת כדי לשקף שינויים בשירותים שלנו או בדרישות החוק.
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>שינויים מהותיים יפורסמו באתר עם הודעה בולטת</li>
                  <li>לקוחות רשומים יקבלו הודעה על שינויים בדוא"ל או SMS</li>
                  <li>המשך השימוש באתר לאחר פרסום השינויים מהווה הסכמה למדיניות המעודכנת</li>
                </ul>
              </motion.section>

              {/* סעיף 11: יצירת קשר - ממונה פרטיות */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  11. יצירת קשר - ממונה פרטיות
                </h2>
                <p className="text-slate-600 mb-4">
                  לשאלות בנוגע למדיניות פרטיות זו, ניתן לפנות:
                </p>
                <div className="bg-slate-100 p-4 rounded-lg">
                  <p className="text-slate-700 mb-1">⚠️ <strong>ממונה פרטיות:</strong> [נדרש השלמה ידנית]</p>
                  <p className="text-slate-700 mb-1"><strong>טלפון:</strong> 052-472-4700</p>
                  <p className="text-slate-700 mb-1">⚠️ <strong>דוא"ל:</strong> [נדרש השלמה ידנית]</p>
                  <p className="text-slate-700 mb-4">⚠️ <strong>כתובת:</strong> [נדרש השלמה ידנית]</p>
                  
                  <p className="text-slate-700 mb-1"><strong>רשות להגנת הפרטיות:</strong></p>
                  <p className="text-slate-600 text-sm">
                    <a href="https://www.gov.il/he/departments/the_privacy_protection_authority" className="text-blue-600 underline">
                      https://www.gov.il/he/departments/the_privacy_protection_authority
                    </a>
                  </p>
                  <p className="text-slate-600 text-sm">טלפון: *3852 או 02-6666666</p>
                </div>
              </motion.section>

              {/* סעיף 12: הבהרה משפטית */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  12. הבהרה משפטית
                </h2>
                <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 rounded">
                  <p className="text-yellow-800 text-sm mb-3">
                    <strong>ביצוע הנגישות באתר מתבצע לפנים משורת הדין</strong> והעסק זכאי לפטור באופן אוטומטי 
                    מביצוע הנגשה, מבלי שיצטרך לקבל אישור כלשהו.
                  </p>
                  <p className="text-yellow-800 text-sm mb-2">
                    <strong>הסיבה לכך היא:</strong> "פטור מחובת הנגשה בשל נטל כלכלי כבד".
                  </p>
                  <p className="text-yellow-800 text-sm">
                    לגופים החייבים בהנגשה, קיים פטור אוטומטי כל עוד המחזור השנתי שלהם 
                    לא עולה על 1,000,000 ₪, בהתאם להוראות הבאות:
                  </p>
                  <ul className="list-disc list-inside text-yellow-800 text-sm mt-2 space-y-1">
                    <li>לעוסק פטור או עוסק עם מחזור מתחת ל-100,000 ₪ קיים פטור מלא מביצוע נגישות של שירותי אינטרנט</li>
                    <li>לבעל מחזור בין 100,000 ל-300,000 ₪ קיים פטור שניתן לחדש כל 3 שנים, כל עוד המחזור השנתי לא עולה על 300,000 ₪</li>
                  </ul>
                </div>
                <p className="text-slate-600 mt-4 text-sm">
                  למרות האמור לעיל, אנו עושים מאמצים להנגיש את האתר. חרף מאמצינו לאפשר גלישה באתר נגיש 
                  עבור כל דפי האתר, יתכן ויתגלו דפים באתר שטרם הונגשו, או שטרם נמצא הפתרון הטכנולוגי המתאים.
                </p>
              </motion.section>

              {/* סעיף 13: תאריך עדכון */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  13. תאריך עדכון
                </h2>
                <div className="bg-slate-100 p-4 rounded-lg text-center">
                  <p className="text-slate-700 font-semibold">
                    עדכון אחרון: {new Date().toLocaleDateString('he-IL')}
                  </p>
                  <p className="text-slate-600 text-sm mt-2">
                    מדיניות זו נכנסה לתוקף בתאריך זה ומחליפה כל מדיניות קודמת
                  </p>
                </div>
              </motion.section>

            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;