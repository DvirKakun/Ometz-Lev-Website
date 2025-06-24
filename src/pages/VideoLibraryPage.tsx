import { useState } from "react";
import { getVideosByFilters } from "../data/videos";
import LibraryHeader from "../components/sections/shared/headers/LibraryHeader";
import AdvancedFilter from "../components/sections/video_library_page/AdvancedFilter";
import VideoGrid from "../components/sections/video_library_page/VideoGrid";
import type { VideoLibraryConfig } from "../types/library";

interface VideoLibraryPageProps {
  config: VideoLibraryConfig;
}

const VideoLibraryPage = ({ config }: VideoLibraryPageProps) => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredVideos = getVideosByFilters(selectedLevel, selectedCategory, config.pageType);

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
      />
    </div>
  );
};

export default VideoLibraryPage;