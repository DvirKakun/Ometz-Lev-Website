import { motion } from "framer-motion";
import { useVideoModal } from "../../../hooks/useVideoModal";
import VideoCard from "./VideoCard";
import VideoModal from "../../modals/video/VideoModal";
import EmptyState from "./EmptyState";
import LoadingSpinner from "../../common/StateLoadingSpinner";
import StateDisplay from "../../common/StateDisplay";
import { AlertCircle } from "lucide-react";
import type { VideosGridProps, Video } from "../../../types/videos";

const VideoGrid = ({
  videos,
  isLoading,
  error,
  hasActiveFilters = false,
  totalVideosCount = 0,
  pageType = "training",
}: VideosGridProps) => {
  const videoModal = useVideoModal();

  const handleVideoClick = (video: Video) => {
    videoModal.openModal(video);
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 items-start auto-rows-min">
              {videos.map((video, index) => (
                <VideoCard
                  key={video.videoKey || `video-${index}`}
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
          isOpen={videoModal.isOpen}
          onOpenChange={videoModal.onOpenChange}
          videoId={videoModal.videoId}
          pageType={pageType}
        />
      </div>
    </section>
  );
};

export default VideoGrid;
