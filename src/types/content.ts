export interface ContentSectionConfig {
  title: string;
  description: string;
  libraryPath: string;
  libraryTitle: string;
  buttonText: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface PageContentConfig {
  videos: ContentSectionConfig;
  articles: ContentSectionConfig;
}

export interface ContentSectionProps {
  contentType: "videos" | "articles";
  pageType: "training" | "therapy";
  sectionConfig: {
    title: string;
    description: string;
    libraryPath: string;
    libraryTitle: string;
    buttonText: string;
    accentColor: string;
    gradientFrom: string;
    gradientTo: string;
  };
}

export interface DemoContentGridProps {
  contentType: "videos" | "articles";
  pageType: "training" | "therapy";
}
