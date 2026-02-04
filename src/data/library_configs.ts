import type {
  VideoLibraryConfig,
  ArticleLibraryConfig,
  ProductsPageConfig,
} from "../types/library";

export const trainingVideoLibraryConfig: VideoLibraryConfig = {
  contentType: "videos",
  pageType: "training",
  title: "ספריית הוידאו",
  description: "סרטוני הדרכה מקצועיים לאילוף כלבים בכל הרמות",
  returnPath: "/training",
  returnLabel: "חזרה לעמוד האילוף",
  backgroundPattern: true,
};

export const therapyVideoLibraryConfig: VideoLibraryConfig = {
  contentType: "videos",
  pageType: "therapy",
  title: "ספריית וידאו הטיפול",
  description: "סרטוני הדרכה מקצועיים לטיפול בכלבים",
  returnPath: "/therapy",
  returnLabel: "חזרה לעמוד הטיפול",
  backgroundPattern: true,
};

export const trainingArticleLibraryConfig: ArticleLibraryConfig = {
  contentType: "articles",
  pageType: "training",
  title: "ספריית המדריכים",
  description: "מדריכים מקצועיים ומדריכים לאילוף כלבים",
  returnPath: "/training",
  returnLabel: "חזרה לעמוד האילוף",
  backgroundPattern: false,
};

export const therapyArticleLibraryConfig: ArticleLibraryConfig = {
  contentType: "articles",
  pageType: "therapy",
  title: "ספריית מדריכי הטיפול",
  description: "מדריכים מקצועיים ומדריכים לטיפול בכלבים",
  returnPath: "/therapy",
  returnLabel: "חזרה לעמוד הטיפול",
  backgroundPattern: false,
};

export const productsPageConfig: ProductsPageConfig = {
  contentType: "products",
  pageType: "products",
  title: "מוצרים",
  description:
    "מגוון מוצרי איכות לכלבים ולבעלי כלבים, כולל ציוד אילוף, צעצועים חינוכיים, אביזרי טיפולים ופתרונות חדשניים לשיפור איכות החיים של הכלב והמשפחה.",
  backgroundPattern: false,
};
