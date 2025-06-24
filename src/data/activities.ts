import { Calendar } from "lucide-react";
import SummerCampImage from "../assets/images/Summer_Camp.jpg";
import type { Activity } from "../types/activities";

export const activities: Activity[] = [
  {
    id: "summer-camp",
    title: "קייטנת החופש הגדול",
    description: [
      'קייטנת "אומץ לב" מציעה לילדים חוויה ייחודית ומעצימה של למידה וגדילה יחד עם כלבים מאומנים במיוחד. הקייטנה מתמחה בבניית ביטחון עצמי, פיתוח אמפתיה ולימוד אחריות דרך קשר מיוחד עם בעלי החיים.',
      "במהלך הקייטנה הילדים ילמדו על התנהגות כלבים, טיפוח ואכפתיות, ויחוו פעילויות מגוונות שמעודדות עבודת צוות, יצירתיות ותקשורת. כל פעילות מותאמת לגיל ולצרכים האישיים של כל ילד.",
    ],
    details: {
      ages: "6-12 שנים",
      duration: "שבוע אינטנסיבי",
      note: "מספר משתתפים מוגבל להבטחת חוויה אישית ואיכותית",
    },
    image: SummerCampImage,
    imageAlt: "פלייר קייטנת החופש הגדול - אומץ לב",
    icon: Calendar,
    color: "from-accent-500 to-orange-500",
    bgColor: "from-accent-50 to-orange-50",
    buttonText: "הרשמה לקייטנה",
    hasRegistration: true,
  },
];

export const activitiesPageConfig = {
  title: "פעילויות",
  description: "חוויות חינוכיות ייחודיות לילדים יחד עם כלבים מאומנים",
};
