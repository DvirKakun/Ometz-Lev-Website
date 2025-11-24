import type { ProcessedFullOffering, ProcessedSimpleOffering } from "../../types/service_offerings";

/**
 * Static fallback offerings for SEO optimization
 * Used when Prismic data is unavailable or loading
 */

// Therapy offerings (Full type with descriptions)
export const therapyOfferingsFallback: ProcessedFullOffering[] = [
  {
    id: "therapy-personal-training",
    title: "אימון אישי",
    description: "אימון מותאם אישית עם כלבים טיפוליים לפיתוח ביטחון עצמי וכישורים אישיים",
    ctaTitle: "קבעו פגישה",
    whatsappMessage: "שלום! אני מעוניין/ת באימון אישי בכלבנות טיפולית",
    isPrimary: true,
  },
  {
    id: "therapy-dog-fear",
    title: "התמודדות עם פחד מכלבים",
    description: "טיפול מקצועי בפחד מכלבים באמצעות חשיפה מדורגת וכלבים מאומנים",
    ctaTitle: "יצירת קשר",
    whatsappMessage: "שלום! אני מעוניין/ת בטיפול בפחד מכלבים",
    isPrimary: true,
  },
  {
    id: "therapy-home-visit",
    title: "כלבנות עד הבית",
    description: "שירותי כלבנות טיפולית בנוחות הבית שלכם עם כלבים מאומנים",
    ctaTitle: "קביעת ביקור",
    whatsappMessage: "שלום! אני מעוניין/ת בכלבנות טיפולית בבית",
    isPrimary: true,
  },
];

// Training offerings (Full type with descriptions)
export const trainingOfferingsFallback: ProcessedFullOffering[] = [
  {
    id: "training-home-training",
    title: "אילוף והדרכה אישית בביתכם",
    description: "אילוף מקצועי של הכלב שלכם בסביבה המוכרת לו - הבית שלכם",
    ctaTitle: "קביעת מפגש",
    whatsappMessage: "שלום! אני מעוניין/ת באילוף אישי בבית",
    isPrimary: true,
  },
  {
    id: "training-toilet-training",
    title: "גמילה מצרכים",
    description: "הדרכה מקצועית לגמילה מצרכים בשיטות חיוביות ויעילות",
    ctaTitle: "התחלת הדרכה",
    whatsappMessage: "שלום! אני מעוניין/ת בהדרכה לגמילה מצרכים",
    isPrimary: true,
  },
  {
    id: "training-online-support",
    title: "ליווי און-ליין בזמן אמת",
    description: "תמיכה מקצועית מרחוק דרך פלטפורמות דיגיטליות לפתרון בעיות מיידיות",
    ctaTitle: "התחברות מקוונת",
    whatsappMessage: "שלום! אני מעוניין/ת בליווי און-ליין",
    isPrimary: true,
  },
];

// Activities offerings (Simple type - titles only)
export const activitiesOfferingsFallback: ProcessedSimpleOffering[] = [
  {
    id: "activities-summer-camp",
    title: "קייטנת כלבים",
    isPrimary: true,
  },
  {
    id: "activities-kids-training",
    title: "חוגי אילוף לילדים",
    isPrimary: true,
  },
  {
    id: "activities-special-events",
    title: "אירועים מיוחדים",
    isPrimary: true,
  },
];

// Schools offerings (Simple type - titles only)
export const schoolsOfferingsFallback: ProcessedSimpleOffering[] = [
  {
    id: "schools-educational-program",
    title: "תכנית חינוכית בבתי ספר",
    isPrimary: true,
  },
  {
    id: "schools-empathy-development",
    title: "פיתוח אמפתיה ואחריות",
    isPrimary: true,
  },
  {
    id: "schools-confidence-building",
    title: "חיזוק הביטחון העצמי",
    isPrimary: true,
  },
];

/**
 * Fallback data organized by service type
 * for easy integration with existing hooks
 */
export const serviceOfferingsFallbacks = {
  therapy: therapyOfferingsFallback,
  training: trainingOfferingsFallback,
  activities: activitiesOfferingsFallback,
  schools: schoolsOfferingsFallback,
} as const;