import type {
  VideoLibraryConfig,
  ArticleLibraryConfig,
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
  title: "ספריית המאמרים",
  description: "מאמרי הדרכה מקצועיים ומדריכים לאילוף כלבים",
  returnPath: "/training",
  returnLabel: "חזרה לעמוד האילוף",
  backgroundPattern: false,
};

export const therapyArticleLibraryConfig: ArticleLibraryConfig = {
  contentType: "articles",
  pageType: "therapy",
  title: "ספריית מאמרי הטיפול",
  description: "מאמרי הדרכה מקצועיים ומדריכים לטיפול בכלבים",
  returnPath: "/therapy",
  returnLabel: "חזרה לעמוד הטיפול",
  backgroundPattern: false,
};
