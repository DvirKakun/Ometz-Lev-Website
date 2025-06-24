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