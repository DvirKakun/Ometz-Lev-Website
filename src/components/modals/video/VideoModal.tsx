import { motion } from "framer-motion";
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
        className="max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden p-0 bg-white border-0 shadow-2xl"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col bg-white rounded-lg overflow-hidden"
        >
          <VideoModalHeader video={video} />
          <VideoModalContent video={video} />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;