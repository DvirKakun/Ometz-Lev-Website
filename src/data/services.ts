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
      "כלבנות טיפולית היא מפגש מודרך שבו אני משלב כלבים כדי לעזור לילדים, בני נוער ומבוגרים לפתח ביטחון, כישורי תקשורת ורגש חיובי. במהלך המפגש אנו לומדים לקרוא את שפת הגוף של הכלב, מבצעים תרגילי שיתוף פעולה ומשחקים שמחזקים סבלנות ואחריות. החוויה מאפשרת מרחב בטוח, נעים ומעצים שבו המשתתפים יוצאים עם תחושת הצלחה וחיבור אמיתי.",
    icon: Heart,
    color: "from-therapy-400 to-therapy-500",
    bgColor: "from-therapy-50 to-therapy-100",
    borderColor: "border-therapy-200",
    hoverBorderColor: "hover:border-therapy-300",
    hoverColor: "hover:shadow-therapy-200/50",
    hoverTextColor: "text-therapy-600",
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
    color: "from-training-500 to-training-600",
    bgColor: "from-training-50 to-training-100",
    borderColor: "border-training-200",
    hoverBorderColor: "hover:border-training-300",
    hoverColor: "hover:shadow-training-200/50",
    hoverTextColor: "text-training-600",
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
    color: "from-activities-400 to-activities-500",
    bgColor: "from-activities-50 to-activities-100",
    borderColor: "border-activities-200",
    hoverBorderColor: "hover:border-activities-300",
    hoverColor: "hover:shadow-activities-200/50",
    hoverTextColor: "text-activities-600",
    offerings: [], // All offerings come from Prismic activities_offerings
    cta: [],
  },
  {
    path: "/schools",
    title: "תכנית גפן",
    description:
      "תוכנית חינוכית ייחודית בבתי ספר המשלבת עבודה עם כלבים לפיתוח ערכים, אמפתיה וכישורים חברתיים אצל ילדים.",
    icon: Users,
    color: "from-schools-400 to-schools-500",
    bgColor: "from-schools-50 to-schools-100",
    borderColor: "border-schools-200",
    hoverBorderColor: "hover:border-schools-300",
    hoverColor: "hover:shadow-schools-200/50",
    hoverTextColor: "text-schools-600",
    offerings: [], // All offerings come from Prismic schools_offerings
    cta: [],
  },
];
