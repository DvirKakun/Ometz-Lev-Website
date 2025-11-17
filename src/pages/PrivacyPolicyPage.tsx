import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SEOMeta from "../components/seo/SEOMeta";

const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = "תנאי שימוש ומדיניות פרטיות | אומץ לב - אילוף כלבים";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "תנאי שימוש ומדיניות פרטיות של אומץ לב - אתר אילוף כלבים וכלבנות טיפולית. מידע על זכויות יוצרים, שמירה על נתונים אישיים ושימוש באתר בהתאם לחוק הגנת הפרטיות הישראלי."
      );
    }
  }, []);

  return (
    <>
      <SEOMeta
        title="תנאי שימוש ומדיניות פרטיות | אומץ לב"
        description="תנאי שימוש ומדיניות פרטיות של אומץ לב - הגנה על הפרטיות שלכם, זכויות יוצרים, איסוף מידע, שימוש בעוגיות ושמירה על נתונים אישיים בהתאם לחוק הגנת הפרטיות הישראלי."
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
                תנאי שימוש ומדיניות פרטיות - אתר "אומץ לב"
              </h1>
              <p className="text-lg text-slate-600">
                תאריך עדכון אחרון: 17/11/2025
              </p>
            </motion.div>

            <div className="prose prose-lg max-w-none text-right" dir="rtl">
              {/* סעיף 1: כללי */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  1. כללי
                </h2>
                <p className="text-slate-600 mb-4">
                  ברוך הבא לאתר "אומץ לב", בבעלותו ובניהולו של אלעד שמעונוב.
                  האתר נועד לספק מידע, תכנים ושירותים בתחומי אילוף כלבים, טיפול
                  התנהגותי ויחסי אדם כלב.
                </p>
                <p className="text-slate-600 mb-4">
                  תנאי שימוש אלו (להלן: "התנאים") מסדירים את השימוש באתר
                  האינטרנט של אלעד שמעונוב: אומץ לב (להלן: "האתר" ו"העסק").
                  השימוש באתר, לרבות גלישה וצריכת תכנים, מהווה הסכמה בלתי מותנית
                  לתנאים אלו ולמדיניות הפרטיות המפורטת להלן. אם אינך מסכים
                  לתנאים, אנא הימנע משימוש באתר.
                </p>
              </motion.section>

              {/* סעיף 2: זכויות יוצרים וקניין רוחני */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  2. זכויות יוצרים וקניין רוחני
                </h2>

                <p className="text-slate-600 mb-3">
                  <strong>2.1. בעלות:</strong> כל התכנים המופיעים באתר, לרבות
                  טקסטים, תמונות, גרפיקה, עיצוב, קוד, וכל חומר אחר (להלן:
                  "התכנים"), הם רכושו הבלעדי של העסק או של צדדים שלישיים שהעניקו
                  לעסק רישיון שימוש.
                </p>
                <p className="text-slate-600 mb-3">
                  <strong>2.2. איסור שימוש:</strong> חל איסור מוחלט להעתיק,
                  לשכפל, להפיץ, לשווק, להשכיר, או לעשות שימוש מסחרי כלשהו
                  בתכנים, כולם או חלקם, ללא קבלת הסכמה מפורשת ובכתב מהעסק ומראש.
                </p>
                <p className="text-slate-600 mb-3">
                  <strong>2.3. שימוש אישי:</strong> השימוש בתכנים מותר למטרות
                  אישיות ובלתי מסחריות בלבד. אין לראות במידע המופיע באתר ייעוץ
                  מקצועי או תחליף לו.
                </p>
                <p className="text-slate-600 mb-3">
                  <strong>2.4.</strong> המשתמש אינו רוכש כל זכות בתכנים או באתר
                  עקב שימושו בהם.
                </p>
                <p className="text-slate-600">
                  <strong>2.5.</strong> אם אתה סבור כי פורסם באתר תוכן הפוגע
                  בזכויותיך, ניתן לפנות לעסק בכתב דרך פרטי הקשר המופיעים מטה.
                </p>
              </motion.section>

              {/* סעיף 3: אחריות על המידע המופיע באתר */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  3. אחריות על המידע המופיע באתר
                </h2>

                <p className="text-slate-600 mb-3">
                  <strong>3.1. אופי המידע:</strong> המידע המופיע באתר, לרבות
                  מאמרים, טיפים והמלצות בנושאי אילוף וטיפול, ניתן כשירות כללי
                  ואינפורמטיבי בלבד.
                </p>
                <p className="text-slate-600 mb-3">
                  <strong>3.2. גבולות אחריות:</strong> העסק עושה מאמץ לוודא
                  שהמידע נכון ועדכני, אך ייתכנו טעויות או אי-דיוקים. העסק אינו
                  אחראי לכל נזק, הפסד, או הוצאה שיגרמו למשתמש או לצד שלישי כלשהו
                  כתוצאה מהסתמכות על המידע המופיע באתר. המידע אינו מהווה תחליף
                  לייעוץ או טיפול מקצועי פרטני על ידי מאלף או מטפל התנהגותי
                  מוסמך.
                </p>
                <p className="text-slate-600 mb-3">
                  <strong>3.3.</strong> העסק אינו אחראי לשיבושים טכניים, הפסקות
                  זמניות, תקלות באינטרנט או באירוח האתר.
                </p>
                <p className="text-slate-600">
                  <strong>3.4. עדכון המידע:</strong> העסק שומר לעצמו את הזכות
                  לעדכן, לשנות, להוסיף או להסיר תכנים באתר בכל עת, לפי שיקול
                  דעתו הבלעדי וללא הודעה מוקדמת.
                </p>
              </motion.section>

              {/* סעיף 4: מדיניות פרטיות */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  4. מדיניות פרטיות
                </h2>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-slate-700 mb-3">
                    4.1. איסוף מידע:
                  </h3>
                  <p className="text-slate-600 mb-4">
                    האתר עשוי לאסוף מידע אודות המשתמשים בשתי דרכים עיקריות:
                  </p>

                  <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                    <li>
                      <strong>מידע הנמסר על ידי המשתמש:</strong> כגון שם, כתובת
                      דוא"ל ומספר טלפון, הנמסרים באמצעות טפסי יצירת קשר. מידע זה
                      ישמש אך ורק למטרת מתן מענה לפניות ולשליחת מידע שיווקי
                      (במידה והמשתמש הסכים לכך).
                    </li>
                    <li>
                      <strong>
                        מידע טכנולוגי / סטטיסטי (עוגיות / Cookies):
                      </strong>{" "}
                      האתר עשוי להשתמש ב"עוגיות" (Cookies) ובכלים אנליטיים לצורך
                      שיפור חוויית המשתמש, ניתוח תנועה, והתאמת תכנים, מידע
                      אנונימי על דפוסי הגלישה, כגון כתובת IP, סוג הדפדפן, זמן
                      השהייה באתר ודפים נצפים. מידע זה עשוי להיאסף ולשמש למטרת
                      שיפור חווית המשתמש ותפעול האתר. האתר עשוי להשתמש בעוגיות
                      צד שלישי כגון Google Analytics ו־Facebook Pixel לצורכי
                      ניתוח תנועה ומדידה. המשתמש רשאי לחסום עוגיות דרך הגדרות
                      הדפדפן.
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-slate-700 mb-3">
                    4.2. שימוש במידע:
                  </h3>
                  <p className="text-slate-600 mb-4">
                    העסק מתחייב לא להעביר את המידע האישי של המשתמשים לצדדים
                    שלישיים, למעט במקרים הבאים:
                  </p>

                  <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                    <li>בכפוף להוראות כל דין או צו שיפוטי.</li>
                    <li>
                      לצורך העברת המידע לספקי שירותים חיצוניים (כגון שירותי
                      דיוור או אחסון) הפועלים מטעם העסק. בכפוף לשמירה על סודיות
                      המידע.
                    </li>
                    <li>במקרה של מחלוקת משפטית בין המשתמש לעסק.</li>
                  </ul>

                  <p className="text-slate-600 mb-4">
                    שליחת מסרים שיווקיים תתבצע בכפוף לחוק התקשורת (בזק
                    ושידורים), תשמ"ב–1982 ("חוק הספאם"), ורק לאחר קבלת הסכמה
                    מפורשת מהמשתמש.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-slate-700 mb-3">
                    4.3. אבטחת מידע:
                  </h3>
                  <p className="text-slate-600 mb-4">
                    האתר מיישם נהלי אבטחה מתקדמים בהתאם לתקנות הגנת הפרטיות
                    (אבטחת מידע), תשע"ז–2017, ובסטנדרטים מקובלים כגון - ISO
                    27001. עם זאת, אין באפשרותו להבטיח הגנה מוחלטת מפני חדירה
                    בלתי מורשית, והעסק לא יישא באחריות למקרים הנובעים מפריצה או
                    תקלה שאינה בשליטתו.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-slate-700 mb-3">
                    4.4
                  </h3>
                  <p className="text-slate-600 mb-4">
                    האתר פועל בהתאם להוראות חוק הגנת הפרטיות, תשמ"א–1981,
                    ולתקנות הגנת הפרטיות (אבטחת מידע), תשע"ז–2017. במידה והאתר
                    נגיש גם לגולשים מחוץ לישראל, הוא יפעל בהתאם לעקרונות ה-GDPR
                    של האיחוד האירופי, ככל שאלה חלים עליו.
                  </p>
                  <p className="text-slate-600 mb-4">
                    <strong>שמירת מידע וזכויות המשתמש:</strong> המידע יישמר למשך
                    התקופה הנדרשת למטרותיו או בהתאם להוראות החוק. כל משתמש רשאי
                    לעיין במידע שנשמר אודותיו, לבקש את תיקונו או מחיקתו, וכן
                    להסיר את עצמו מרשימות תפוצה באמצעות פנייה בכתב לעסק.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-slate-700 mb-3">
                    4.5. קטינים:
                  </h3>
                  <p className="text-slate-600 mb-4">
                    השימוש באתר מיועד לבגירים מעל גיל 18 בלבד.
                  </p>
                  <p className="text-slate-600 mb-4">
                    קטינים מתחת לגיל זה נדרשים לאישור מפורש של הוריהם או
                    האפוטרופוס החוקי שלהם למסירת מידע אישי או לשימוש בטפסי יצירת
                    קשר. הורה או אפוטרופוס הנותן לקטין אישור לשימוש באתר, נושא
                    באחריות מלאה לשימוש שנעשה באתר על ידי הקטין, לרבות למסירת
                    מידע אישי, ביצוע פניות או כל פעולה אחרת שבוצעה במסגרת האתר.
                    העסק לא יישא באחריות לשימוש באתר שנעשה על ידי קטין ללא הסכמה
                    או פיקוח של מבוגר מלווה. במקרה של פנייה לשירותי כלבנות
                    טיפולית עבור קטין, יידרש אישור בכתב מהורה או אפוטרופוס לפני
                    כל התקשרות או העברת מידע אישי.
                  </p>
                </div>
              </motion.section>

              {/* סעיף 5: קישורים לאתרים חיצוניים */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  5. קישורים לאתרים חיצוניים
                </h2>
                <p className="text-slate-600">
                  האתר עשוי להכיל קישורים לאתרים חיצוניים. העסק אינו אחראי
                  לתוכן, למהימנות או למדיניות הפרטיות של אתרים אלו. השימוש
                  בקישורים אלו הוא באחריות המשתמש בלבד.
                </p>
              </motion.section>

              {/* סעיף 6: שינויים בתנאי השימוש */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  6. שינויים בתנאי השימוש
                </h2>
                <p className="text-slate-600">
                  העסק שומר לעצמו את הזכות לעדכן מעת לעת את תנאי השימוש ומדיניות
                  הפרטיות, לפי שיקול דעתו הבלעדי. הגרסה המעודכנת תפורסם באתר,
                  ותאריך העדכון האחרון יצוין בראש המסמך. המשך השימוש באתר לאחר
                  עדכון התנאים מהווה הסכמה לגרסה המעודכנת.
                </p>
              </motion.section>

              {/* סעיף 7: סמכות שיפוט */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  7. סמכות שיפוט
                </h2>
                <p className="text-slate-600">
                  על תנאים אלו יחולו דיני מדינת ישראל בלבד. סמכות השיפוט הבלעדית
                  בכל עניין הנוגע לתנאי שימוש אלו תהיה נתונה לבתי המשפט המוסמכים
                  במחוז מרכז וכי לא תחול סמכות מקומית אחרת.
                </p>
              </motion.section>

              {/* סעיף 8: יצירת קשר */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  8. יצירת קשר
                </h2>
                <p className="text-slate-600 mb-4">
                  לשאלות, פניות, בקשות לעיון או מחיקת מידע אישי, ניתן לפנות
                  לכתובת הדוא"ל:
                </p>
                <div className="bg-slate-100 p-4 rounded-lg">
                  <p className="text-slate-700 mb-2">
                    <strong>דוא"ל:</strong>{" "}
                    <a
                      href="mailto:Eladshi1326@gmail.com"
                      className="text-blue-600 underline"
                    >
                      Eladshi1326@gmail.com
                    </a>
                  </p>
                  <p className="text-slate-600">
                    או באמצעות טופס יצירת הקשר באתר.
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
