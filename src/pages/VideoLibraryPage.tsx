import { useState } from "react";
import {
  useVideosByMultipleCategoriesAndLevel,
  useVideos,
} from "../hooks/useVideos";
import LibraryHeader from "../components/sections/shared/headers/LibraryHeader";
import VideoAdvancedFilter from "../components/sections/video_library_page/VideoAdvancedFilter";
import VideoGrid from "../components/sections/video_library_page/VideoGrid";
import SEOMeta from "../components/seo/SEOMeta";
import SEOJsonLD from "../components/seo/SEOJsonLD";
import { getKeywordsForPage } from "../data/seo-keywords";
import type { VideoLibraryPageProps } from "../types/library";

const VideoLibraryPage = ({ config }: VideoLibraryPageProps) => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "all",
  ]);

  // SEO Configuration
  const getSEOConfig = (pageType: string) => {
    const seoData = {
      training: {
        title:
          "ספריית סרטוני אילוף כלבים | הדרכות וטיפים מקצועיים | אלעד שמעונוב - אומץ לב",
        description:
          "סרטוני הדרכה מקצועיים לאילוף כלבים מאת אלעד שמעונוב. טכניקות מתקדמות, פתרון בעיות התנהגות ועצות מומחים. למתחילים ומתקדמים. צפו עכשיו!",
        keywords: getKeywordsForPage("training"),
        imageAlt: "סרטוני אילוף כלבים מקצועיים מאת אלעד שמעונוב",
      },
      therapy: {
        title:
          "ספריית סרטוני כלבנות טיפולית | הדרכות טיפוליות | אלעד שמעונוב - אומץ לב",
        description:
          "סרטוני הדרכה לכלבנות טיפולית מאת אלעד שמעונוב. טכניקות טיפוליות, עבודה עם חרדות ושיטות מתקדמות לשיקום רגשי וחברתי. צפו עכשיו!",
        keywords: getKeywordsForPage("therapy"),
        imageAlt: "סרטוני כלבנות טיפולית מקצועיים מאת אלעד שמעונוב",
      },
    } as const;
    return seoData[pageType as keyof typeof seoData] || seoData.training;
  };

  const seoConfig = {
    ...getSEOConfig(config.pageType),
    imageUrl:
      "https://ometzlev.co.il/assets/icons/Ometz-Lev-Large-Logo.png",
  };

  // Use Prismic data with filtering
  const {
    data: filteredVideos = [],
    isLoading,
    error,
  } = useVideosByMultipleCategoriesAndLevel(
    selectedCategories,
    selectedLevel,
    config.pageType
  );

  // Get total videos count for empty state
  const { data: totalVideos = [] } = useVideos(config.pageType);

  // Determine if there are active filters
  const hasActiveFilters =
    (!selectedCategories.includes("all") && selectedCategories.length > 0) ||
    selectedLevel !== "all";

  const handleLevelChange = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (categoryId === "all") {
        // If "All" is clicked, select only "All" and clear others
        return ["all"];
      } else {
        // If any other category is clicked
        const hasAll = prev.includes("all");
        const hasCategory = prev.includes(categoryId);

        if (hasAll) {
          // If "All" was selected, remove it and add the clicked category
          return [categoryId];
        } else if (hasCategory) {
          // Remove the category if it's already selected
          const newSelection = prev.filter((id) => id !== categoryId);
          // If no categories remain, default to "All"
          return newSelection.length === 0 ? ["all"] : newSelection;
        } else {
          // Add the category to selection
          return [...prev, categoryId];
        }
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedLevel("all");
    setSelectedCategories(["all"]);
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOMeta
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        imageUrl={seoConfig.imageUrl}
        imageAlt={seoConfig.imageAlt}
        type="article"
      />

      {/* SEO Structured Data */}
      <SEOJsonLD
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        pageType={config.pageType as "training" | "therapy"}
        imageUrl={seoConfig.imageUrl}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50/30">
        <LibraryHeader config={config} />
        <VideoAdvancedFilter
          selectedCategories={selectedCategories}
          selectedLevel={selectedLevel}
          onCategoryToggle={handleCategoryToggle}
          onLevelChange={handleLevelChange}
          onClearFilters={handleClearFilters}
          pageType={config.pageType}
        />
        <VideoGrid
          videos={filteredVideos}
          isLoading={isLoading}
          error={error}
          hasActiveFilters={hasActiveFilters}
          totalVideosCount={totalVideos.length}
          pageType={config.pageType as "training" | "therapy"}
        />
      </div>
    </>
  );
};

export default VideoLibraryPage;
