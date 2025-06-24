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

export interface VideoLibraryPageProps {
  config: VideoLibraryConfig;
}

export interface ArticleLibraryConfig extends LibraryPageConfig {
  contentType: "articles";
}

export interface ArticlesLibraryPageProps {
  config: ArticleLibraryConfig;
}

export interface LibraryCTAProps {
  contentType: "videos" | "articles";
  pageType: "training" | "therapy";
  libraryPath: string;
  title: string;
  accentColor: string;
  buttonText: string;
}

export interface AdvancedFilterProps {
  selectedLevel: string;
  selectedCategory: string;
  onLevelChange: (levelId: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onClearFilters: () => void;
  pageType: "training" | "therapy";
}
