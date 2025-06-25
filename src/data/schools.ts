import type { SchoolProgram } from "../types/schools_page";

export const schoolProgram: SchoolProgram = {
  id: "ometz-lev",
  programNumber: "9695",
  title: "אומץ לב – אילוף וטיפול באמצעות כלבים",
  status: "פעילה",
  
  basicInfo: {
    source: "חיצוני – מגזר עסקי",
    centralField: "חברתי-ערכי",
    mainSubject: "כישורי חיים, קידום אקלים מיטבי, טיפוח מנהיגות ונורמות",
    skills: ["חשיבה ביקורתית", "מודעות עצמית", "מודעות חברתית", "התנהלות חברתית"],
    approvalPeriod: "תשפ״ג, תשפ״ד, תשפ״ה (רצף שנתי)",
    operatingYears: "משנת תשפ״ב",
    operator: "אלעד שמעונוב (גוף מפעיל חיצוני)",
    partners: "אין",
    openingConditions: "אין",
    assessmentMethods: "טרם נבנתה הערכה רשמית"
  },

  summary: {
    description: "אומץ להתמודד עם קושי ופחד ולב לנתינה, לחמלה ולאהבה. הכלבים מסקרנים את הילדים ולרובם גורמים אושר ושמחה. ההשפעה על בעלי חיים תורמת לילדים תחושת ביטחון, שמחת חיים, קשיבות, אחריות ורכות. הילדים לומדים ליצור דיאלוג מכבד עם עצמם ועם הסביבה, מפנימים התנהגויות של אמפתיה, פרידה, דיבור רך ויצירת קשר, ויחסי שיתוף פעולה.",
    mainMessages: ["התמודדות עם פחד", "פיתוח אומץ לב", "נתינה", "חמלה", "אהבה", "אחריות כלפי הזולת ובעלי-חיים"]
  },

  developmentAndOperation: {
    initiatingBody: "גוף עסקי חיצוני (אלעד שמעונוב)",
    startYear: "תשפ״ב (2022)",
    partners: "אין",
    joinConditions: "אין"
  },

  requiredResources: {
    staffTraining: "שלוש שעות למורה",
    recommendedImplementationDuration: "שנה אחת",
    programInstructors: "מדריכים מטעם גוף המפעיל",
    schoolStaffInstructors: "לא נדרשים",
    studentMaterials: "נמסרים ע״י המפעיל (חומרי רישום, משימות כתובות וכו׳)",
    dogUsage: "כן; השתתפות בעלות כספית נוספת"
  },

  targetAudience: {
    learningLevels: "ילדי גן, כיתות א-ו",
    groupSize: "פרטני או קבוצתי",
    targetPopulation: "חינוך רגיל; יש אפשרות התאמת מהלך לחינוך מיוחד",
    educationalStaffInvolvement: "התאמה לתוכנית בית-הספר והטמעה במסגרת הלימודים",
    geographicalDistribution: "מחוז מרכז, מחוז תל-אביב (פתוח גם למחוזות נוספים בהתאם)",
    educationType: "ממלכתי, ממלכתי-דתי (התוכנית אינה משוייכת למסגרת לימודים מסוימת)"
  },

  tags: [
    "אומץ", "פחד", "התמודדות", "קושי", "קשר", "שיתוף פעולה", 
    "חמלה", "אהבה", "אחריות", "פרידה", "מחשבה", "סקירות", 
    "מודעות חברתית", "מודעות עצמית"
  ],

  programLink: "https://apps.education.gov.il/tyhnet/public/#/tochniyot?id=9695"
};

export const schoolsPageConfig = {
  title: "תכנית גפן",
  description: "תכנית חינוכית לפיתוח אומץ לב, אמפתיה ואחריות דרך אילוף וטיפול באמצעות כלבים"
};