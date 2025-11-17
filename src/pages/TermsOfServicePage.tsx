import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SEOMeta from "../components/seo/SEOMeta";

const TermsOfServicePage: React.FC = () => {
  useEffect(() => {
    document.title =
      "תנאי שירות והתקשרות | אומץ לב - אילוף כלבים וכלבנות טיפולית";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "תנאי שירות והתקשרות מקצועיים של אומץ לב - מרכז אילוף כלבים וכלבנות טיפולית. מדיניות תשלומים, ביטולים, אחריות וכללי התקשרות עם הלקוחות."
      );
    }
  }, []);

  return (
    <>
      <SEOMeta
        title="תנאי שירות והתקשרות | אומץ לב"
        description="תנאי שירות והתקשרות מקצועיים של אומץ לב - מרכז אילוף כלבים וכלבנות טיפולית. מדיניות תשלומים, ביטולים, אחריות וכללי התקשרות עם הלקוחות."
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
                תנאי שירות והתקשרות - "אומץ לב" - אילוף כלבים וכלבנות טיפולית
              </h1>
              <p className="text-lg text-slate-600">
                תאריך עדכון אחרון: 17/11/2025
              </p>
            </motion.div>

            <div className="prose prose-lg max-w-none text-right" dir="rtl">
              {/* מבוא */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 bg-blue-50 p-6 rounded-lg"
              >
                <p className="text-slate-600 leading-relaxed">
                  תודה שבחרת ב'אומץ לב'! המסמך שלפניך נועד להבהיר את אופן
                  ההתקשרות, השירותים והמדיניות שלנו, כדי להבטיח חוויה בטוחה,
                  מקצועית ושקופה לכל הצדדים.
                </p>
              </motion.div>

              {/* סעיף 1: כללי */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  1. כללי
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  תנאי שירות אלו (להלן: "התנאים") מסדירים את ההתקשרות בין אלעד
                  שמעונוב - 'אומץ לב' (להלן: "העסק" ו/או "המאמן" ו/או "המטפל")
                  לבין הלקוח (להלן: "הלקוח") המקבל מהעסק שירותי אילוף כלבים,
                  ייעוץ התנהגותי, כלבנות טיפולית, חוגים או קייטנות (להלן:
                  "השירותים").
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  קבלת השירותים מהעסק, בין אם באמצעות פנייה ישירה, הרשמה, תשלום
                  או השתתפות בפעילות, מהווה הסכמה מלאה ובלתי מותנית לתנאים אלו.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  תנאים אלו מהווים חלק בלתי נפרד מכל התקשרות בין העסק ללקוח, בין
                  אם נעשתה בעל פה, בכתב, באמצעים דיגיטליים או דרך האתר, והם
                  גוברים על כל הסכמה או ייצוג אחר שניתנו קודם לכן, אלא אם נקבע
                  אחרת במפורש ובכתב על ידי העסק.
                </p>
              </motion.section>

              {/* סעיף 2: מהות השירותים */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  2. מהות השירותים
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  העסק מספק מגוון שירותים בתחומי האילוף, הייעוץ ההתנהגותי
                  והכלבנות הטיפולית, בהתאם לחבילה, תכנית או מסגרת שנרכשה על ידי
                  הלקוח. השירותים ניתנים בראשון לציון והסביבה (כולל נס ציונה,
                  רחובות, באר יעקב, בת ים וחולון), ומבוצעים בגישה מקצועית,
                  חיובית ומבוססת מדע.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  העסק רשאי לעדכן, להרחיב או לשנות את היצע השירותים מעת לעת,
                  בהתאם לשיקול דעתו. השירותים עשויים להינתן בבית הלקוח, במרחב
                  ציבורי או במתקני העסק, בהתאם לאופי השירות ולשיקול דעת המאמן.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  השירותים אינם מהווים טיפול רפואי, פסיכולוגי או וטרינרי ואינם
                  באים להחליפם. בכל מקרה של חשש רפואי או נפשי, יש לפנות לגורם
                  מוסמך.
                </p>

                <div className="space-y-6">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-700 mb-3">
                      2.1. אילוף כלבים:
                    </h3>
                    <p className="text-slate-600 mb-3">
                      שיעורים פרטניים או קבוצתיים המיועדים לבעלי כלבים מגיל 18
                      ומעלה. בעלי גורים או כלבים בוגרים. מטרת השירות היא הקניית
                      משמעת בסיסית או מתקדמת, שיפור התקשורת בין הבעלים לכלב,
                      ופתרון בעיות התנהגות קלות, בגישה חיובית ומכבדת.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 mb-3">
                      <li>
                        קהל יעד: בעלי כלבים חדשים, בעלי גורים או כלבים עם בעיות
                        התנהגות.
                      </li>
                      <li>
                        צורך עיקרי: אילוף חיובי, חיזוק הקשר והבנת שפת הכלב.
                      </li>
                    </ul>
                    <p className="text-slate-600 text-sm">
                      העסק שומר לעצמו את הזכות לשנות את מבנה השירות, התוכן או
                      הצוות, לפי הצורך המקצועי וללא פגיעה באיכות השירות.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-700 mb-3">
                      2.2 טיפול התנהגותי (ייעוץ כלבני):
                    </h3>
                    <p className="text-slate-600 mb-3">
                      אבחון מעמיק, ייעוץ וליווי אישי לפתרון בעיות התנהגות
                      מורכבות, כגון תוקפנות, חרדת נטישה, פחדים או ריאקטיביות.
                      השירות כולל בניית תכנית התערבות אישית המבוססת על ניתוח
                      התנהגותי, הדרכת הבעלים והטמעת הרגלים נכונים בבית ובסביבה.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                      <li>קהל יעד: בעלי כלבים עם בעיות התנהגות מורכבות.</li>
                      <li>
                        צורך עיקרי: שינוי דפוסי התנהגות, חיזוק הביטחון של הכלב
                        ובניית יחסי אמון עם הבעלים.
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-700 mb-3">
                      2.3 כלבנות טיפולית:
                    </h3>
                    <p className="text-slate-600 mb-3">
                      שירותים טיפוליים-חינוכיים המשלבים כלבים מוסמכים, המיועדים
                      לילדים, נוער ומבוגרים (מגיל 6 ומעלה), במסגרת פרטנית או
                      קבוצתית. המפגשים מבוססים על עקרונות הטיפול באמצעות בעלי
                      חיים ומותאמים לצרכים רגשיים, חברתיים וחינוכיים של
                      המשתתפים.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                      <li>
                        קהל יעד: ילדים ונוער עם קשיים רגשיים, פחד מכלבים, קשיי
                        תקשורת, או מסגרות חינוך מיוחד (לרבות תוכנית גפן).
                      </li>
                      <li>
                        צורך עיקרי: חיזוק ביטחון עצמי, פיתוח אמפתיה, אחריות
                        ותקשורת באמצעות כלבים.
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-700 mb-3">
                      2.4 קייטנה במהלך חופשות השנה וחופשת הקיץ:
                    </h3>
                    <p className="text-slate-600 mb-3">
                      קייטנה חווייתית לילדים בגילאי 6-12, העוסקת בעולמם של
                      הכלבים ובאילוף חיובי בדרך מהנה, לימודית ובטוחה. הפעילות
                      משלבת למידה, משחק, אחריות, ועבודה עם כלבים מאומנים בהנחיית
                      צוות מוסמך.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                      <li>
                        קהל יעד: ילדים שאוהבים בעלי חיים ורוצים להכיר את עולם
                        הכלבים מקרוב.
                      </li>
                      <li>
                        צורך עיקרי: למידה חווייתית, פיתוח אחריות ורגישות לבעלי
                        חיים.
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-700 mb-3">
                      2.5 חוג אילוף כלבים לילדים ונוער:
                    </h3>
                    <p className="text-slate-600 mb-3">
                      חוג שנתי או תקופתי לגילאי 6-17, המלמד עקרונות אילוף חיובי,
                      תקשורת עם כלבים, אחריות והתמדה. החוג משלב עבודה מעשית עם
                      כלבים, למידה חווייתית ופעילויות ערכיות.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                      <li>
                        קהל יעד: ילדים ובני נוער בעלי אהבה לבעלי חיים או בעלי
                        כלבים.
                      </li>
                      <li>
                        צורך עיקרי: פיתוח מיומנויות תקשורת, אחריות ואמפתיה כלפי
                        כלבים ובני אדם.
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-700 mb-3">
                      2.6 תוכנית לבתי ספר:
                    </h3>
                    <p className="text-slate-600 mb-3">
                      תכנית חינוכית-ערכית לכיתות א'-ו', המיועדת למוסדות חינוך
                      באזור מחוז המרכז. התכנית נבנית בשיתוף הנהלת בית הספר
                      ומותאמת לערכים חינוכיים ולמטרות פדגוגיות.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 mb-3">
                      <li>
                        קהל יעד: מנהלות ובתי ספר המעוניינים בתוכנית העשרה
                        חינוכית.
                      </li>
                      <li>
                        צורך עיקרי: פיתוח אומץ לב, חמלה, שיתוף פעולה, תקשורת
                        והעצמה אישית, באמצעות מפגש חווייתי עם כלבים.
                      </li>
                    </ul>
                    <p className="text-slate-600 text-sm">
                      העסק שומר לעצמו את הזכות לשנות את מבנה השירות, התוכן או
                      הצוות, לפי הצורך המקצועי וללא פגיעה באיכות השירות.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* סעיף 3: אחריות הלקוח והתחייבויותיו */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  3. אחריות הלקוח והתחייבויותיו
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  <strong>ראשית כל:</strong> הלקוח מצהיר כי הוא האפוטרופוס החוקי
                  של הכלב או מוסמך לפעול בשמו של בעל הכלב.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">
                      3.1. גילוי נאות:
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      הלקוח מתחייב למסור למאמן/מטפל מידע מלא, מדויק ועדכני אודות
                      מצבו הבריאותי, ההתנהגותי וההיסטורי של הכלב, לרבות מידע על
                      נשיכות, תוקפנות, חרדות, מחלות, תרופות, או כל מידע רלוונטי
                      אחר. אי-מסירת מידע כאמור עשויה להביא להפסקת השירות לאלתר,
                      ללא החזר כספי, וללא אחריות מצד העסק לנזקים שייגרמו עקב
                      הסתרת מידע.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">
                      3.2. שיתוף פעולה:
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      הלקוח מתחייב לשתף פעולה באופן מלא עם המאמן/המטפל, ליישם
                      בעקביות את ההנחיות, המשימות והתרגולים הנדרשים בבית
                      ובסביבה, ולהתמיד בתהליך הלמידה. הלקוח מבין כי הצלחת התהליך
                      תלויה במידה רבה בהתמדה ובמחויבותו האישית.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">
                      3.3. בריאות הכלב:
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      הלקוח מאשר כי הכלב נמצא במצב בריאותי תקין, מחוסן כנדרש על
                      פי חוק ומטופל באופן שוטף נגד טפילים (פנימיים וחיצוניים).
                      העסק רשאי לדרוש הצגת פנקס חיסונים או אישור וטרינרי טרם מתן
                      השירות.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">
                      3.4. אחריות:
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      הלקוח אחראי לוודא כי הכלב מצויד באמצעי ריסון נאותים
                      (רצועה, זמם במידת הצורך וכו') במהלך כל פעילות, אלא אם
                      הונחה אחרת על ידי המאמן.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      בעת מתן השירות, על הלקוח או נציג מטעמו להיות נוכח לפי
                      דרישת המאמן, ולוודא פיקוח ובטיחות הכלב.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* סעיף 4: מדיניות תשלום וביטול שירותים */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  4. מדיניות תשלום וביטול שירותים
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">
                      4.1. תשלום:
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      התשלום עבור חבילת שירותים, קורס או פגישה בודדת יתבצע מראש,
                      או בהתאם לתנאי התשלום שסוכמו בכתב בין הצדדים. אי-עמידה
                      בתשלומים עשויה להביא להפסקת השירות עד להסדרת החוב.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">
                      4.2. ביטול פגישה פרטנית:
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      ביטול או דחייה של פגישה פרטנית על ידי הלקוח יתאפשר עד 24
                      שעות לפני מועד הפגישה. ביטול שיימסר לאחר מכן או אי-הגעה
                      לפגישה יחויבו במלוא עלות הפגישה, למעט במקרים חריגים שאושרו
                      מראש על ידי העסק.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">
                      4.3. ביטול חבילת שירותים / קורס:
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      <strong>
                        ביטול עד 7 ימים ממועד הרכישה וטרם תחילת השירות:
                      </strong>{" "}
                      הלקוח יהיה זכאי להחזר מלא בניכוי דמי ביטול בשיעור 5% או
                      100 ₪ (הנמוך מביניהם).
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      <strong>
                        ביטול לאחר תחילת השירות (לאחר הפגישה הראשונה):
                      </strong>{" "}
                      ההחזר יחושב באופן יחסי למספר הפגישות שלא נוצלו, בניכוי
                      עלות הפגישות שנוצלו לפי מחיר פגישה בודדת ולא לפי מחיר
                      החבילה, ובניכוי דמי ביטול כאמור לעיל.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">
                      4.4. הפסקת שירות על ידי העסק:
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      העסק שומר לעצמו את הזכות להפסיק את השירות בכל עת במקרה של:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 mb-3">
                      <li>אי שיתוף פעולה מצד הלקוח.</li>
                      <li>אי יישום ההנחיות המקצועיות.</li>
                      <li>התנהגות פוגענית, מסוכנת או שאינה הולמת.</li>
                      <li>חשש לבטיחות המאמן/המטפל, הכלב או משתתפים אחרים.</li>
                    </ul>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      במקרה זה, יוחזר ללקוח החלק היחסי של התשלום ששולם מראש בגין
                      השירותים שטרם ניתנו.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      העסק שומר לעצמו את הזכות לעדכן את מחירי השירותים מעת לעת,
                      מבלי לפגוע בהתחייבויות שכבר שולמו ונסגרו מראש.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      במקרה של ביטול מצד העסק מסיבות בלתי צפויות (כגון מחלה או
                      כוח עליון), תוצע ללקוח אפשרות לדחייה למועד חלופי או החזר
                      מלא בגין המפגש שבוטל.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">
                      4.5. הקפאת שירותים
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      הלקוח רשאי לבקש הקפאת שירותים (כגון חבילת אילוף, קורס או
                      תכנית ליווי) במקרה של נסיבות מוצדקות, לרבות מחלה, הריון,
                      פציעה, נסיעה ממושכת או כל סיבה אחרת שאושרה מראש על ידי
                      העסק. ההקפאה תינתן לתקופה של עד 60 ימים (או תקופה אחרת
                      שתאושר בכתב על ידי העסק), בהתאם לשיקול דעתו הבלעדי של
                      העסק.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      בתום תקופת ההקפאה, האחריות לחידוש השירות חלה על הלקוח.
                      אי-חידוש השירות בתום התקופה ייחשב כהפסקת שירות ביוזמת
                      הלקוח, והחישוב הכספי יבוצע בהתאם למדיניות הביטולים הקבועה
                      בסעיף ‎4.3 לעיל.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      במקרה של הקפאה עקב נסיבות רפואיות או כוח עליון, רשאי העסק,
                      לפי שיקול דעתו, להאריך את תקופת ההקפאה או להציע מתווה
                      חלופי לשמירת יתרת המפגשים.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      <strong>•</strong> החזרים כספיים יתבצעו בתוך 14 ימי עסקים
                      ממועד אישור הביטול, באמצעות אותו אמצעי תשלום בו בוצעה
                      העסקה.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* סעיף 5: גבולות אחריות וסיכונים */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  5. גבולות אחריות וסיכונים
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">
                      5.1. אחריות המאמן / המטפל:
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      המאמן / המטפל מתחייב לפעול במקצועיות, בניסיון ובזהירות
                      הראויים, בהתאם לסטנדרטים המקובלים בתחום האילוף והכלבנות
                      הטיפולית, תוך שימוש בגישות חיוביות וללא ענישה פיזית.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">
                      5.2. הגבלת אחריות:
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      הלקוח מבין כי אילוף, עבודה או טיפול עם כלבים כרוכים
                      בסיכונים טבעיים, כגון נשיכות, שריטות, קפיצות, תגובות
                      פתאומיות או נזקים לרכוש. העסק, המאמן או המטפל אינם אחראים
                      לכל נזק גופני, נפשי או רכושי שייגרם ללקוח, לכלבו או לצד
                      שלישי, אלא אם הוכחה רשלנות חמורה מצד העסק.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      בנוסף:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      <li>
                        הלקוח נושא באחריות מלאה לכל נזק שייגרם על ידי כלבו במהלך
                        השירות או בעקבותיו.
                      </li>
                      <li>
                        הלקוח אחראי לשמור על כללי בטיחות ולפעול בהתאם להנחיות
                        המאמן, לרבות שמירה על מרחק ובקרה בעת עבודה עם כלבים
                        אחרים.
                      </li>
                      <li>
                        העסק לא יהיה אחראי לכל נזק עקיף, תוצאתי או אובדן רווחים
                        שייגרמו ללקוח בקשר למתן השירותים.
                      </li>
                      <li>
                        האחריות של העסק, המאמן או המטפל מוגבלת גם במקרה של נזק
                        הנגרם עקב צדדים שלישיים, לרבות כלב אחר, משתתף אחר, נציג
                        מוסד חינוכי, או כל גורם שאינו בשליטה ישירה של העסק.
                      </li>
                      <li>
                        הלקוח מצהיר כי ידוע לו שאין לעסק כיסוי ביטוחי לנזקים
                        שייגרמו לכלבים או לבני אדם כתוצאה מהתנהגות בלתי צפויה של
                        כלב במהלך השירות.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">
                      5.3. תוצאות:
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      העסק אינו מתחייב לתוצאה מסוימת בתום תהליך האילוף או
                      הטיפול. הצלחת התהליך תלויה בגורמים רבים, לרבות מידת שיתוף
                      הפעולה של הלקוח, היסטוריית הכלב, סביבת המחיה והרגלים
                      מושרשים. עם זאת, העסק מתחייב לפעול במלוא הידע, הניסיון
                      והמאמצים המקצועיים שברשותו לשם קידום, שיפור והשגת תוצאות
                      מיטביות ככל הניתן.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* סעיף 6: סודיות ופרטיות */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  6. סודיות ופרטיות
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  העסק מתחייב לשמור בסוד כל מידע אישי או מקצועי של הלקוח, לרבות
                  מידע הנוגע לכלב או לתהליך האילוף/הטיפול. המידע יישמר לשימוש
                  פנימי בלבד ולא יועבר לצדדים שלישיים, אלא אם נדרש לפי חוק או
                  במקרה של חשש ממשי לבטיחותו של אדם או בעל חיים.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  כל צילום, סרטון או תיעוד של פעילות עם הלקוח או כלבו ייעשה רק
                  באישור הלקוח, ויתכן שישמש למטרות תיעוד, הדרכה או שיווק, בכפוף
                  להסכמתו מראש ובכתב.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  המידע נשמר במערכות מאובטחות בלבד, בהתאם לחוק הגנת הפרטיות,
                  וניתן לעיון במדיניות הפרטיות המלאה המפורסמת באתר.
                </p>
              </motion.section>

              {/* סעיף 7: שינויים בתנאים */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  7. שינויים בתנאים
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  העסק שומר לעצמו את הזכות לעדכן, לשנות, להוסיף או לגרוע מתנאי
                  השירות וההתקשרות, לפי שיקול דעתו הבלעדי ובכל עת. שינויים
                  בתנאים ייכנסו לתוקף מרגע פרסומם באתר העסק או ממועד העברתם
                  ללקוח בכתב, לפי המוקדם מביניהם.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  המשך קבלת השירותים או ההתקשרות עם העסק לאחר ביצוע שינוי כאמור
                  מהווה הסכמה של הלקוח לגרסה המעודכנת של התנאים. במקרה של שינוי
                  מהותי בתנאים, רשאי הלקוח לבקש להפסיק את השירות ולקבל החזר יחסי
                  בהתאם למדיניות הביטולים התקפה במועד זה.
                </p>
              </motion.section>

              {/* סעיף 8: סמכות שיפוט */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  8. סמכות שיפוט
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  על תנאי שירות אלה יחולו דיני מדינת ישראל בלבד. סמכות השיפוט
                  הבלעדית בכל מחלוקת הנוגעת לתנאים אלה, לשירותים או להתקשרות
                  שבין הצדדים, תהיה נתונה לבתי המשפט המוסמכים במחוז מרכז בלבד.
                  הצדדים מסכימים כי לא תחול סמכות שיפוט מקומית אחרת מלבד זו של
                  מחוז מרכז.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  תנאי שירות אלה מהווים את ההסכם המלא בין הצדדים, ומחליפים כל
                  הבנה, ייצוג או הסכמה קודמים.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  המסמך נכתב בלשון זכר לצורכי נוחות בלבד, והוא מתייחס לכל
                  המגדרים במידה שווה.
                </p>
              </motion.section>

              {/* סיום */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-center pt-8 border-t border-slate-200 bg-blue-50 p-6 rounded-lg"
              >
                <p className="text-slate-700 font-medium text-lg">
                  אנו מודים לכם על האמון ומתחייבים להעניק שירות מקצועי, אמפתי
                  ובטוח - לטובתכם ולטובת חברכם על ארבע
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
