import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../../ui/dialog";
import { VideoPlayer } from "./VideoPlayer";
import { VideoInfo } from "./VideoInfo";
import { useVideos } from "../../../hooks/useVideos";
import type { VideoModalProps } from "../../../types/modals";

const VideoModal = ({ isOpen, onOpenChange, videoId, pageType = "training" }: VideoModalProps) => {
  const { data: videos = [] } = useVideos(pageType);

  if (!isOpen || !videoId) return null;

  const video = videos.find(
    (v) => v.videoKey === videoId || `video-${v.title}` === videoId
  );

  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full h-full sm:max-w-4xl sm:w-[95vw] sm:max-h-[90vh] overflow-hidden p-0 border-0 shadow-2xl sm:rounded-lg [&>button]:bg-white/90 [&>button]:text-gray-900 [&>button]:hover:bg-white [&>button]:backdrop-blur-sm [&>button]:rounded-full [&>button]:w-12 [&>button]:h-12 [&>button]:flex [&>button]:items-center [&>button]:justify-center"
        dir="rtl"
      >
        <DialogTitle className="sr-only">{video.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {video.subtitle || video.description || 'סרטון הדרכה'}
        </DialogDescription>
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                scale: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
              }}
              className="flex flex-col bg-white rounded-lg overflow-hidden"
            >
              {/* Video Player - Fixed Height */}
              <div className="relative bg-black flex-shrink-0 h-56 sm:h-80">
                <VideoPlayer video={video} />
              </div>

              {/* Video Info - Scrollable */}
              <div
                className="overflow-y-auto bg-white flex-1"
                dir="ltr"
                style={{
                  WebkitOverflowScrolling: "touch",
                  maxHeight: "calc(100vh - 224px)",
                }}
              >
                <div dir="rtl">
                  <VideoInfo video={video} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
