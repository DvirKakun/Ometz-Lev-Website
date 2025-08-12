import type { PageContentConfig } from "../types/content";

export const therapyContentConfig: PageContentConfig = {
  videos: {
    title: "סרטוני טיפול",
    description: "סרטוני הדרכה מקצועיים לטיפול בכלבים",
    libraryPath: "/therapy-videos-library",
    libraryTitle: "ספריית סרטוני הטיפול שלנו",
    buttonText: "עבור לספרייה",
    accentColor: "red",
    gradientFrom: "from-red-500",
    gradientTo: "to-red-600",
  },
  articles: {
    title: "מאמרי טיפול",
    description: "מאמרים מקצועיים ומדריכים לטיפול בכלבים",
    libraryPath: "/therapy-articles-library",
    libraryTitle: "ספריית מאמרי הטיפול שלנו",
    buttonText: "עבור לספרייה",
    accentColor: "orange",
    gradientFrom: "from-orange-500",
    gradientTo: "to-orange-600",
  },
};
