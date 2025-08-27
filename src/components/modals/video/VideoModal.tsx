import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "../../ui/dialog";
import { VideoModalHeader } from "./VideoModalHeader";
import { VideoModalContent } from "./VideoModalContent";
import type { Video } from "../../../types/videos";

interface VideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal = ({ video, isOpen, onClose }: VideoModalProps) => {
  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden p-0 border-0 shadow-2xl"
        dir="rtl"
      >
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
                  damping: 30
                }
              }}
              className="flex flex-col bg-white rounded-lg overflow-hidden"
            >
              <VideoModalHeader video={video} />
              <VideoModalContent video={video} />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
