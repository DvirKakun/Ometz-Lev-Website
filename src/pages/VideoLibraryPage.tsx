import { useState } from "react";
import { getVideosByLevel } from "../data/videos";
import VideoLibraryHeader from "../components/sections/video_library_page/VideoLibraryHeader";
import LevelFilter from "../components/sections/video_library_page/LevelFilter";
import VideoGrid from "../components/sections/video_library_page/VideoGrid";

const VideoLibraryPage = () => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const filteredVideos = getVideosByLevel(selectedLevel);

  const handleLevelChange = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50/30">
      <VideoLibraryHeader />
      <LevelFilter 
        selectedLevel={selectedLevel} 
        onLevelChange={handleLevelChange} 
      />
      <VideoGrid 
        videos={filteredVideos} 
        selectedLevel={selectedLevel} 
      />
    </div>
  );
};

export default VideoLibraryPage;