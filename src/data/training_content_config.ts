import type { PageContentConfig } from "../types/content";

export const trainingContentConfig: PageContentConfig = {
  videos: {
    title: "מדריכי וידאו",
    description: "סרטוני הדרכה מקצועיים לאילוף כלבים בבית",
    libraryPath: "/training-videos-library",
    libraryTitle: "ספריית הווידאו שלנו",
    buttonText: "עבור לספרייה",
    accentColor: "red",
    gradientFrom: "from-red-500",
    gradientTo: "to-red-600",
  },
  articles: {
    title: "מאמרי הדרכה",
    description: "מאמרים מקצועיים ומדריכים לאילוף כלבים",
    libraryPath: "/training-articles-library",
    libraryTitle: "ספריית המאמרים שלנו",
    buttonText: "עבור לספרייה",
    accentColor: "accent",
    gradientFrom: "from-accent-500",
    gradientTo: "to-orange-600",
  },
};
