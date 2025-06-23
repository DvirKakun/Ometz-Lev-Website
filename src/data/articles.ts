export interface Article {
  title: string;
  description: string;
  readTime: string;
  category: string;
  author: string;
  articleKey?: string;
}

export const categories = [
  { id: "all", name: "כל הקטגוריות", color: "slate" },
  { id: "puppies", name: "גורים", color: "blue" },
  { id: "behavior", name: "בעיות התנהגות", color: "red" },
  { id: "training", name: "שיטות אילוף", color: "green" },
  { id: "nutrition", name: "תזונה ובריאות", color: "orange" },
  { id: "activities", name: "פעילויות", color: "purple" },
];

export const articles = {
  training: [
    {
      title: "מדריך מקיף לאילוף גורים",
      description:
        "כל מה שצריך לדעת על אילוף גורים בגילאי 2-6 חודשים, כולל טכניקות בסיסיות ועצות מעשיות",
      category: "puppies",
      readTime: "10 דק׳",
      author: "אלעד",
      articleKey: "puppy-training-guide",
    },
    {
      title: "פתרון בעיות נביחות מוגזמות",
      description:
        "שיטות מוכחות להפחתת נביחות מוגזמות וטיפול בגורמים השונים לבעיה זו",
      category: "behavior",
      readTime: "8 דק׳",
      author: "אלעד",
      articleKey: "excessive-barking-solutions",
    },
    {
      title: "אילוף עם חיזוק חיובי - המדריך המלא",
      description:
        "הסברים מפורטים על עקרונות החיזוק החיובי ויישומם המעשי באילוף כלבים",
      category: "training",
      readTime: "15 דק׳",
      author: "אלעד",
      articleKey: "positive-reinforcement-guide",
    },
    {
      title: "תזונה נכונה לגורים",
      description:
        "מדריך מפורט לתזונה בריאה ומאוזנת לגורים, כולל כמויות מומלצות ולוח זמנים",
      category: "nutrition",
      readTime: "12 דק׳",
      author: "אלעד",
      articleKey: "puppy-nutrition-guide",
    },
    {
      title: "משחקים להעשרה נפשית",
      description:
        "רעיונות יצירתיים למשחקים ופעילויות שיעזרו לכלב שלכם להתפתח נפשית ורגשית",
      category: "activities",
      readTime: "7 דק׳",
      author: "אלעד",
      articleKey: "mental-enrichment-games",
    },
    {
      title: "התמודדות עם חרדת נטישה",
      description:
        "טכניקות יעילות לטיפול בחרדת נטישה אצל כלבים ומניעת התנהגויות הרסניות",
      category: "behavior",
      readTime: "14 דק׳",
      author: "אלעד",
      articleKey: "separation-anxiety-treatment",
    },
  ],
  therapy: [
    {
      title: "יסודות הטיפול בכלבים",
      description:
        "מבוא לעולם הטיפול בכלבים והשפעתם החיובית על רווחת האדם",
      category: "training",
      readTime: "12 דק׳",
      author: "אלעד",
      articleKey: "therapy-dog-basics",
    },
    {
      title: "בחירת כלב לטיפול",
      description:
        "איך לבחור כלב מתאים לעבודת טיפול ומה התכונות הנדרשות",
      category: "training",
      readTime: "9 דק׳",
      author: "אלעד",
      articleKey: "selecting-therapy-dog",
    },
    {
      title: "טיפול בחרדה באמצעות כלבי טיפול",
      description:
        "שיטות להפחתת חרדה ומתח באמצעות אינטראקציה עם כלבי טיפול",
      category: "behavior",
      readTime: "15 דק׳",
      author: "אלעד",
      articleKey: "anxiety-therapy-dogs",
    },
    {
      title: "כלבי טיפול בבתי חולים",
      description:
        "התאמת כלבי טיפול לעבודה בסביבה רפואית ודרישות מיוחדות",
      category: "training",
      readTime: "11 דק׳",
      author: "אלעד",
      articleKey: "hospital-therapy-dogs",
    },
    {
      title: "פעילויות טיפוליות עם כלבים",
      description:
        "רעיונות לפעילויות טיפוליות מגוונות הכוללות אינטראקציה עם כלבים",
      category: "activities",
      readTime: "8 דק׳",
      author: "אלעד",
      articleKey: "therapeutic-activities",
    },
  ]
};

export const getArticlesByCategory = (categoryId: string, page: keyof typeof articles = "training"): Article[] => {
  const pageArticles = articles[page];
  if (categoryId === "all") return pageArticles;
  return pageArticles.filter((article) => article.category === categoryId);
};

export const getCategoryName = (categoryId: string): string => {
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.name : categoryId;
};

export const getCategoryColor = (categoryId: string): string => {
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.color : "slate";
};

export const getArticleCount = (page: keyof typeof articles = "training"): number => articles[page].length;

export const getTotalReadTime = (page: keyof typeof articles = "training"): string => {
  const pageArticles = articles[page];
  const totalMinutes = pageArticles.reduce((total, article) => {
    const minutes = parseInt(article.readTime.replace(/[^\d]/g, ""));
    return total + minutes;
  }, 0);

  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    return remainingMinutes > 0
      ? `${hours}:${remainingMinutes.toString().padStart(2, "0")} שעות`
      : `${hours} שעות`;
  }

  return `${totalMinutes} דקות`;
};

export const getDemoArticles = (page: keyof typeof articles = "training"): Article[] => {
  const pageArticles = articles[page];
  
  // Select 3 articles from different categories for demo
  const demoArticles = [
    // Puppies category
    pageArticles.find(a => a.category === "puppies"),
    // Behavior category
    pageArticles.find(a => a.category === "behavior"), 
    // Training category
    pageArticles.find(a => a.category === "training"),
  ].filter(Boolean) as Article[];

  // If we don't have enough variety, fill with first 3 articles
  if (demoArticles.length < 3) {
    return pageArticles.slice(0, 3);
  }

  return demoArticles;
};
