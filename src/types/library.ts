export interface LibraryPageConfig {
  contentType: "videos" | "articles";
  pageType: "training" | "therapy";
  title: string;
  description: string;
  returnPath: string;
  returnLabel: string;
  gradientColors: string;
  backgroundPattern?: boolean;
}

export interface VideoLibraryConfig extends LibraryPageConfig {
  contentType: "videos";
}

export interface ArticleLibraryConfig extends LibraryPageConfig {
  contentType: "articles";
}
