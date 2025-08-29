import { Play } from "lucide-react";
import type { Video } from "../../../types/videos";

interface VideoPlayerProps {
  video: Video;
}

export const VideoPlayer = ({ video }: VideoPlayerProps) => {
  return (
    <div className="absolute inset-0 bg-black">
      {video.videoUrl ? (
        <video
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          className="w-full h-full object-contain"
          preload="metadata"
          poster={video.thumbnailUrl}
        >
          <source src={video.videoUrl} type="video/mp4" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            הדפדפן שלך לא תומך בהצגת סרטונים.
            <a
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline mr-2"
            >
              לחץ כאן לצפייה
            </a>
          </div>
        </video>
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-900">
          <div className="text-center text-white">
            <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">הסרטון לא זמין כרגע</p>
          </div>
        </div>
      )}
    </div>
  );
};