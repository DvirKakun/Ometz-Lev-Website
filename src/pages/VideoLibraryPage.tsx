import { useState } from "react";
import { useVideosByCategoryAndLevel } from "../hooks/useVideos";
import LibraryHeader from "../components/sections/shared/headers/LibraryHeader";
import AdvancedFilter from "../components/sections/video_library_page/AdvancedFilter";
import VideoGrid from "../components/sections/video_library_page/VideoGrid";
import type { VideoLibraryPageProps } from "../types/library";

const VideoLibraryPage = ({ config }: VideoLibraryPageProps) => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Use Prismic data with filtering
  const { data: filteredVideos = [], isLoading, error } = useVideosByCategoryAndLevel(
    selectedCategory,
    selectedLevel,
    config.pageType
  );

  const handleLevelChange = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleClearFilters = () => {
    setSelectedLevel("all");
    setSelectedCategory("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50/30">
      <LibraryHeader config={config} />
      <AdvancedFilter
        selectedLevel={selectedLevel}
        selectedCategory={selectedCategory}
        onLevelChange={handleLevelChange}
        onCategoryChange={handleCategoryChange}
        onClearFilters={handleClearFilters}
        pageType={config.pageType}
      />
      <VideoGrid 
        videos={filteredVideos} 
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default VideoLibraryPage;
