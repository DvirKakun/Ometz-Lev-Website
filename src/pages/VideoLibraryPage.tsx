import { useState, useEffect } from "react";
import { useVideosByMultipleCategoriesAndLevel, useVideos } from "../hooks/useVideos";
import LibraryHeader from "../components/sections/shared/headers/LibraryHeader";
import VideoAdvancedFilter from "../components/sections/video_library_page/VideoAdvancedFilter";
import VideoGrid from "../components/sections/video_library_page/VideoGrid";
import type { VideoLibraryPageProps } from "../types/library";

const VideoLibraryPage = ({ config }: VideoLibraryPageProps) => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["all"]);

  // SEO metadata setup
  useEffect(() => {
    const seoData = {
      training: {
        title: "ספריית סרטוני אילוף כלבים | הדרכות וטיפים מקצועיים | אומץ לב",
        description: "צפו בסרטוני הדרכה מקצועיים לאילוף כלבים. טכניקות מתקדמות, פתרון בעיות התנהגות ועצות מעמליים מומחים. למתחילים ומתקדמים."
      },
      therapy: {
        title: "ספריית סרטוני טיפול בכלבים | הדרכות טיפוליות | אומץ לב",
        description: "צפו בסרטוני הדרכה לטיפול באמצעות כלבים. טכניקות טיפוליות, עבודה עם חרדות ושיטות מתקדמות לשיקום רגשי וחברתי."
      }
    };

    const currentSEO = seoData[config.pageType];
    document.title = currentSEO.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", currentSEO.description);
    }
  }, [config.pageType]);
  
  // Use Prismic data with filtering
  const { data: filteredVideos = [], isLoading, error } = useVideosByMultipleCategoriesAndLevel(
    selectedCategories,
    selectedLevel,
    config.pageType
  );
  
  // Get total videos count for empty state
  const { data: totalVideos = [] } = useVideos(config.pageType);
  
  // Determine if there are active filters
  const hasActiveFilters = (!selectedCategories.includes("all") && selectedCategories.length > 0) || selectedLevel !== "all";

  const handleLevelChange = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => {
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
          const newSelection = prev.filter(id => id !== categoryId);
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
      />
    </div>
  );
};

export default VideoLibraryPage;
