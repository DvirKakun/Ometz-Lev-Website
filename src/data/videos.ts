export interface Video {
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
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

export const categories = [
  { id: "all", name: "כל הקטגוריות", color: "slate" },
  { id: "basic-training", name: "אילוף בסיסי", color: "blue" },
  { id: "behavior-issues", name: "בעיות התנהגות", color: "orange" },
  { id: "puppy-training", name: "אילוף גורים", color: "teal" },
  { id: "advanced-training", name: "אילוף מתקדם", color: "indigo" },
  { id: "specialized", name: "מומחיות", color: "pink" },
];

export const videos = {
  training: [
    {
      title: "פקודות בסיסיות - שב, בוא, המתן",
      description:
        "למידת שלוש הפקודות הבסיסיות ביותר באילוף כלבים עם הדגמות מעשיות",
      duration: "12:34",
      level: "beginner",
      category: "basic-training",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "basic-commands-1",
    },
    {
      title: "גמילה מצרכים - שיטות יעילות",
      description: "טכניקות מוכחות לגמילה מצרכים בבית עם דגש על סבלנות והבנה",
      duration: "18:42",
      level: "beginner",
      category: "puppy-training",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "potty-training-1",
    },
    {
      title: "פתרון בעיית משיכת הרצועה",
      description: "אסטרטגיות מעשיות למניעת משיכת רצועה ויצירת הליכה נעימה",
      duration: "15:28",
      level: "intermediate",
      category: "behavior-issues",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "leash-training-1",
    },
    {
      title: "אילוף גורים - השלבים הראשונים",
      description: "מדריך מקיף לאילוף גורים החל מגיל 8 שבועות",
      duration: "22:15",
      level: "beginner",
      category: "puppy-training",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "puppy-training-1",
    },
    {
      title: "תיקון התנהגות תוקפנית",
      description: "גישות מתקדמות לטיפול בכלבים עם נטיות תוקפניות",
      duration: "28:45",
      level: "advanced",
      category: "behavior-issues",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "aggression-training-1",
    },
    {
      title: "אילוף לתחרויות - טכניקות מתקדמות",
      description: "הכנת כלבים לתחרויות אילוף ברמה מקצועית",
      duration: "31:20",
      level: "expert",
      category: "advanced-training",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "competition-training-1",
    },
    {
      title: "פקודות מתקדמות - בקרת מרחק",
      description: "אילוף פקודות מרחוק ושליטה בכלב ממרחקים גדולים",
      duration: "19:15",
      level: "advanced",
      category: "advanced-training",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "distance-commands-1",
    },
    {
      title: "עבודה עם כלבי עבודה מקצועיים",
      description: "טכניקות מיוחדות לאילוף כלבי משטרה, כלבי נחייה וכלבי שירות",
      duration: "35:12",
      level: "expert",
      category: "specialized",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "working-dogs-1",
    },
    {
      title: "תיקון נביחות מוגזמות",
      description: "שיטות יעילות להפחתת נביחות ויצירת סביבה שקטה יותר",
      duration: "16:32",
      level: "intermediate",
      category: "behavior-issues",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "barking-control-1",
    },
    {
      title: "הליכה ברצועה - טכניקות מתקדמות",
      description: "שיפור הליכה ברצועה עם טכניקות מתקדמות ומקצועיות",
      duration: "20:45",
      level: "intermediate",
      category: "basic-training",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "leash-advanced-1",
    },
  ],
  therapy: [
    {
      title: "הכשרת כלבי טיפול - יסודות",
      description: "היכרות עם עולם כלבי הטיפול והשפעתם החיובית על בני אדם",
      duration: "14:20",
      level: "beginner",
      category: "specialized",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "therapy-basics-1",
    },
    {
      title: "טכניקות הרגעה עם כלבי טיפול",
      description: "שיטות לשימוש בכלבי טיפול להרגעת חרדה ומתח",
      duration: "18:30",
      level: "intermediate",
      category: "specialized",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "calming-techniques-1",
    },
    {
      title: "עבודה עם ילדים מיוחדים",
      description: "הדרכת כלבי טיפול לעבודה עם ילדים עם צרכים מיוחדים",
      duration: "25:45",
      level: "advanced",
      category: "specialized",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "special-needs-1",
    },
    {
      title: "כלבי טיפול במוסדות רפואיים",
      description: "הכנת כלבי טיפול לעבודה בבתי חולים ומרפאות",
      duration: "22:10",
      level: "advanced",
      category: "specialized",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "medical-therapy-1",
    },
    {
      title: "בחירת כלב מתאים לטיפול",
      description: "איך לזהות ולבחור כלבים המתאימים לעבודות טיפול",
      duration: "16:55",
      level: "beginner",
      category: "specialized",
      thumbnail: "/api/placeholder/400/300",
      videoKey: "therapy-selection-1",
    },
  ],
};

export const getVideosByFilters = (
  levelId: string,
  categoryId: string,
  page: keyof typeof videos = "training"
): Video[] => {
  let filteredVideos = videos[page];

  if (levelId !== "all") {
    filteredVideos = filteredVideos.filter((video) => video.level === levelId);
  }

  if (categoryId !== "all") {
    filteredVideos = filteredVideos.filter(
      (video) => video.category === categoryId
    );
  }

  return filteredVideos;
};

export const getLevelName = (levelId: string): string => {
  const level = levels.find((l) => l.id === levelId);
  return level ? level.name : levelId;
};

export const getLevelColor = (levelId: string): string => {
  const level = levels.find((l) => l.id === levelId);
  return level ? level.color : "slate";
};

export const getCategoryName = (categoryId: string): string => {
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.name : categoryId;
};

export const getCategoryColor = (categoryId: string): string => {
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.color : "slate";
};

export const getDemoVideos = (
  page: keyof typeof videos = "training"
): Video[] => {
  const pageVideos = videos[page];

  // Select 3 videos from different categories and levels for demo
  const demoVideos = [
    // Beginner - Basic Training
    pageVideos.find(
      (v) => v.level === "beginner" && v.category === "basic-training"
    ),
    // Intermediate - Behavior Issues
    pageVideos.find(
      (v) => v.level === "intermediate" && v.category === "behavior-issues"
    ),
    // Advanced - Advanced Training
    pageVideos.find(
      (v) => v.level === "advanced" && v.category === "advanced-training"
    ),
  ].filter(Boolean) as Video[];

  // If we don't have enough variety, fill with first 3 videos
  if (demoVideos.length < 3) {
    return pageVideos.slice(0, 3);
  }

  return demoVideos;
};
