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
    icon: Heart,
    color: "from-red-400 to-pink-500",
    bgColor: "from-red-50 to-pink-50",
    hoverColor: "hover:shadow-red-200/50",
    features: [
      {
        title: "אימון אישי",
        description:
          "מפגש עם הכלב מסייע בהתמודדות עם חרדות ודיכאון באמצעות קשר חיובי וביטחון רגשי.",
      },
      {
        title: "חיזוק הביטחון העצמי",
        description:
          "מפתח כישורי תקשורת ומעודד בניית קשרים חברתיים דרך עבודת צוות עם הכלב.",
      },
      {
        title: "פיתוח כישורים חברתיים",
        description:
          "מגביר אמפתיה, הקשבה, ויכולת לעבוד בקבוצה דרך פעילות חווייתית עם הכלב.",
      },
    ],
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
    icon: BookOpen,
    color: "from-primary-500 to-primary-600",
    bgColor: "from-primary-50 to-primary-100/50",
    hoverColor: "hover:shadow-primary-200/50",
    features: [
      {
        title: "אילוף והדרכה אישית בביתכם",
        description:
          "שיטה המותאמת לסביבת המחיה של הכלב, להקניית התנהגויות נכונות ונוחות.",
      },
      {
        title: "גמילה מצרכים",
        description: "כלים ועקרונות ללימוד נקיונות בבית והפחתת תאונות.",
      },
      {
        title: "ליווי און־ליין בזמן אמת",
        description: "תמיכה שוטפת באפליקציה או וידאו במהלך אימונים יומיומיים.",
      },
      {
        title: "גורים",
        description:
          "תהליך חינוכי ייחודי לגיל הרך לפיתוח הרגלים בריאים ומובנים.",
      },
      {
        title: "כלב חדש מגיע הבייתה",
        description:
          "ליווי בתהליך קליטה נכון של כלב חדש, תוך שילובו בבית ובמשפחה.",
      },
      {
        title: "פגישת לייזר",
        description: "פגישה ממוקדת לפתרון בעיה אחת מרכזית בהתנהגות הכלב.",
      },
    ],
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
    icon: Award,
    color: "from-accent-500 to-orange-500",
    bgColor: "from-accent-50 to-orange-50",
    hoverColor: "hover:shadow-accent-200/50",
    features: [
      {
        title: "קייטנת כלבים",
        description: "",
      },
      {
        title: "חוגי אילוף לילדים ",
        description: "",
      },
      {
        title: "אירועים מיוחדים",
        description: "",
      },
    ],
    cta: [],
  },
  {
    path: "/schools",
    title: "תכנית גפן",
    icon: Users,
    color: "from-purple-500 to-indigo-500",
    bgColor: "from-purple-50 to-indigo-50",
    hoverColor: "hover:shadow-purple-200/50",
    features: [
      {
        title: "תכנית חינוכית בבתי ספר",
        description: "תוכנית חווייתית עם כלבים להקניית ערכים ותקשורת בינאישית.",
      },
      {
        title: "פיתוח אמפתיה ואחריות",
        description: "העצמת ילדים לפתח רגישות ודאגה לאחר דרך קשר עם בעלי חיים.",
      },
      {
        title: "חיזוק הביטחון העצמי",
        description:
          "עידוד ביטוי אישי והתמודדות עם פחדים דרך אינטראקציה עם כלבים.",
      },
    ],
    cta: [],
  },
];
