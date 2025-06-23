import { useState } from "react";
import { getVideosByFilters } from "../data/videos";
import VideoLibraryHeader from "../components/sections/video_library_page/VideoLibraryHeader";
import AdvancedFilter from "../components/sections/video_library_page/AdvancedFilter";
import VideoGrid from "../components/sections/video_library_page/VideoGrid";

const VideoLibraryPage = () => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredVideos = getVideosByFilters(selectedLevel, selectedCategory, "training");

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
      <VideoLibraryHeader />
      <AdvancedFilter 
        selectedLevel={selectedLevel}
        selectedCategory={selectedCategory}
        onLevelChange={handleLevelChange}
        onCategoryChange={handleCategoryChange}
        onClearFilters={handleClearFilters}
      />
      <VideoGrid 
        videos={filteredVideos} 
      />
    </div>
  );
};

export default VideoLibraryPage;