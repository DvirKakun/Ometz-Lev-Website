import { Calendar } from "lucide-react";
import SummerCampImage from "../assets/images/Summer_Camp.jpg";
import EladAndBoni from "../assets/images/Elad_And_Boni.jpg";
import EladTraining from "../assets/images/Elad_Training.jpg";
import ReviewsImage from "../assets/images/Reviews_Image.jpg";
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
    images: [
      SummerCampImage,
      EladAndBoni,
      ReviewsImage,
      EladTraining,
      EladTraining,
      EladTraining,
    ],
    icon: Calendar,
    color: "from-accent-500 to-orange-500",
    bgColor: "from-accent-50 to-orange-50",
    buttonText: "הרשמה לקייטנה",
    hasRegistration: true,
    timerTitle: "קייטנת החופש הגדול",
    date: new Date("2025-07-15T09:00:00"),
  },
];

export const activitiesPageConfig = {
  title: "פעילויות",
  description: "חוויות חינוכיות ייחודיות לילדים יחד עם כלבים מאומנים",
};
