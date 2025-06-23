export interface Video {
  title: string;
  description: string;
  duration: string;
  level: string;
  thumbnail: string;
  videoKey?: string; // For storing video identifier/URL
}

export const levels = [
  { id: "all", name: "כל הרמות", color: "slate" },
  { id: "beginner", name: "מתחילים", color: "green" },
  { id: "intermediate", name: "בינוני", color: "yellow" },
  { id: "advanced", name: "מתקדמים", color: "red" },
  { id: "expert", name: "מומחים", color: "purple" },
];

export const videos: Video[] = [
  {
    title: "פקודות בסיסיות - שב, בוא, המתן",
    description:
      "למידת שלוש הפקודות הבסיסיות ביותר באילוף כלבים עם הדגמות מעשיות",
    duration: "12:34",
    level: "beginner",
    thumbnail: "/api/placeholder/400/300",
    videoKey: "basic-commands-1",
  },
  {
    title: "גמילה מצרכים - שיטות יעילות",
    description: "טכניקות מוכחות לגמילה מצרכים בבית עם דגש על סבלנות והבנה",
    duration: "18:42",
    level: "beginner",
    thumbnail: "/api/placeholder/400/300",
    videoKey: "potty-training-1",
  },
  {
    title: "פתרון בעיית משיכת הרצועה",
    description: "אסטרטגיות מעשיות למניעת משיכת רצועה ויצירת הליכה נעימה",
    duration: "15:28",
    level: "intermediate",
    thumbnail: "/api/placeholder/400/300",
    videoKey: "leash-training-1",
  },
  {
    title: "אילוף גורים - השלבים הראשונים",
    description: "מדריך מקיף לאילוף גורים החל מגיל 8 שבועות",
    duration: "22:15",
    level: "beginner",
    thumbnail: "/api/placeholder/400/300",
    videoKey: "puppy-training-1",
  },
  {
    title: "תיקון התנהגות תוקפנית",
    description: "גישות מתקדמות לטיפול בכלבים עם נטיות תוקפניות",
    duration: "28:45",
    level: "advanced",
    thumbnail: "/api/placeholder/400/300",
    videoKey: "aggression-training-1",
  },
  {
    title: "אילוף לתחרויות - טכניקות מתקדמות",
    description: "הכנת כלבים לתחרויות אילוף ברמה מקצועית",
    duration: "31:20",
    level: "expert",
    thumbnail: "/api/placeholder/400/300",
    videoKey: "competition-training-1",
  },
  {
    title: "פקודות מתקדמות - בקרת מרחק",
    description: "אילוף פקודות מרחוק ושליטה בכלב ממרחקים גדולים",
    duration: "19:15",
    level: "advanced",
    thumbnail: "/api/placeholder/400/300",
    videoKey: "distance-commands-1",
  },
  {
    title: "עבודה עם כלבי עבודה מקצועיים",
    description: "טכניקות מיוחדות לאילוף כלבי משטרה, כלבי נחייה וכלבי שירות",
    duration: "35:12",
    level: "expert",
    thumbnail: "/api/placeholder/400/300",
    videoKey: "working-dogs-1",
  },
];

export const getVideosByLevel = (levelId: string): Video[] => {
  if (levelId === "all") return videos;
  return videos.filter((video) => video.level === levelId);
};

export const getLevelName = (levelId: string): string => {
  const level = levels.find((l) => l.id === levelId);
  return level ? level.name : levelId;
};

export const getLevelColor = (levelId: string): string => {
  const level = levels.find((l) => l.id === levelId);
  return level ? level.color : "slate";
};
