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

export const articles: Article[] = [
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
];

export const getArticlesByCategory = (categoryId: string): Article[] => {
  if (categoryId === "all") return articles;
  return articles.filter((article) => article.category === categoryId);
};

export const getCategoryName = (categoryId: string): string => {
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.name : categoryId;
};

export const getCategoryColor = (categoryId: string): string => {
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.color : "slate";
};

export const getArticleCount = (): number => articles.length;

export const getTotalReadTime = (): string => {
  const totalMinutes = articles.reduce((total, article) => {
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

export const getDemoArticles = (): Article[] => {
  // Select 3 articles from different categories for demo
  const demoArticles = [
    // Puppies category
    articles.find(a => a.category === "puppies"),
    // Behavior category
    articles.find(a => a.category === "behavior"), 
    // Training category
    articles.find(a => a.category === "training"),
  ].filter(Boolean) as Article[];

  // If we don't have enough variety, fill with first 3 articles
  if (demoArticles.length < 3) {
    return articles.slice(0, 3);
  }

  return demoArticles;
};
