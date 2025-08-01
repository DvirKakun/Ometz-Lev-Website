import { useState } from "react";
import { motion } from "framer-motion";
import VideoCard from "./VideoCard";
import EmptyState from "./EmptyState";
import LoadingSpinner from "../../common/StateLoadingSpinner";
import StateDisplay from "../../common/StateDisplay";
import VideoModal from "../../modals/video/VideoModal";
import { AlertCircle } from "lucide-react";
import type { VideosGridProps, Video } from "../../../types/videos";

const VideoGrid = ({ videos, isLoading, error, hasActiveFilters = false, totalVideosCount = 0 }: VideosGridProps) => {
  // Modal state
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };
  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <LoadingSpinner
              title="טוען סרטונים..."
              description="אנא המתן בזמן שאנחנו מביאים עבורך את הסרטונים העדכניים"
            />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <StateDisplay
              icon={AlertCircle}
              title="שגיאה בטעינת הסרטונים"
              description="אנא נסה שוב מאוחר יותר"
              iconClassName="w-12 h-12 text-red-500 mb-4"
            />
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          {videos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <VideoCard
                  key={video.videoKey || index}
                  video={video}
                  index={index}
                  onClick={handleVideoClick}
                />
              ))}
            </div>
          ) : (
            <EmptyState 
              hasActiveFilters={hasActiveFilters}
              totalVideosCount={totalVideosCount}
            />
          )}
        </motion.div>

        {/* Video Modal */}
        <VideoModal
          video={selectedVideo}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
};

export default VideoGrid;
