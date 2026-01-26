import {
  Heart,
  BookOpen,
  Award,
  Users,
  Phone,
  FileText,
  Video,
} from "lucide-react";
import type { Service } from "../types/services";

export const services: Service[] = [
  {
    path: "/therapy",
    title: "כלבנות טיפולית",
    description:
      "כלבנות טיפולית היא שימוש בקשר המיוחד בין אדם לכלב כדי לייצר חוויה טיפולית וחינוכית. אנחנו נעזרים בכלבים כדי לעזור לילדים, נוער ומבוגרים לפתח ביטחון עצמי, כלים חברתיים ויכולות רגשיות בדרך חווייתית וכיפית.",
    icon: Heart,
    offerings: [], // All offerings come from Prismic therapy_offerings
    cta: [
      {
        text: "שיחת התאמה ראשונה – ללא עלות",
        icon: Phone,
        href: "#contact",
      },
      {
        text: "מדריכי וידאו",
        icon: Video,
        href: "#videos",
      },
      {
        text: "מאמרים ומדריכים",
        icon: FileText,
        href: "#articles",
      },
    ],
  },
  {
    path: "/training",
    title: "אילוף כלבים",
    description:
      "הדרכה מקצועית לאילוף כלבים בשיטות חיוביות, הכוללת אימון אישי, פתרון בעיות התנהגות וליווי מתמשך לבעלי כלבים.",
    icon: BookOpen,
    offerings: [], // All offerings come from Prismic training_offerings
    cta: [
      {
        text: "שיחת התאמה ראשונה – ללא עלות",
        icon: Phone,
        href: "#contact",
      },
      {
        text: "מדריכי וידאו",
        icon: Video,
        href: "#videos",
      },
      {
        text: "מאמרים ומדריכים",
        icon: FileText,
        href: "#articles",
      },
    ],
  },
  {
    path: "/activities",
    title: "פעילויות",
    description:
      "מגוון פעילויות חווייתיות עם כלבים לכל המשפחה, כולל קייטנות, חוגי אילוף לילדים ואירועים מיוחדים.",
    icon: Award,
    offerings: [], // All offerings come from Prismic activities_offerings
    cta: [],
  },
  {
    path: "/schools",
    title: "יוזמות חינוכיות",
    description:
      "תוכנית חינוכית ייחודית בבתי ספר המשלבת עבודה עם כלבים לפיתוח ערכים, אמפתיה וכישורים חברתיים אצל ילדים.",
    icon: Users,
    offerings: [], // All offerings come from Prismic schools_offerings
    cta: [],
  },
];
