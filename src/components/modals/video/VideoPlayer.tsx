import { useRef, useEffect, useState } from "react";
import { Play } from "lucide-react";
import type { Video } from "../../../types/videos";
import { useAuth } from "../../../contexts/AuthContext";
import { useVideoProgress, useSaveVideoProgress } from "../../../hooks/useVideoProgress";

interface VideoPlayerProps {
  video: Video;
}

export const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { user } = useAuth();
  const [hasLoadedProgress, setHasLoadedProgress] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get saved progress for this video
  const { data: savedProgress } = useVideoProgress(video.videoKey);
  const { mutate: saveProgress } = useSaveVideoProgress();

  // Load saved progress and auto-seek
  useEffect(() => {
    if (!videoRef.current || !user || hasLoadedProgress) return;

    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      if (savedProgress && savedProgress.playback_position > 0 && !savedProgress.completed) {
        // Auto-seek to last position (with small delay for better UX)
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.currentTime = savedProgress.playback_position;
            setHasLoadedProgress(true);
          }
        }, 100);
      } else {
        setHasLoadedProgress(true);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [savedProgress, user, hasLoadedProgress]);

  // Save progress periodically and on events
  useEffect(() => {
    if (!videoRef.current || !user || !video.videoKey) return;

    const videoElement = videoRef.current;

    const handleSaveProgress = () => {
      if (!videoElement || !video.videoKey) return;

      const currentTime = videoElement.currentTime;
      const duration = videoElement.duration;

      if (duration && !isNaN(duration) && duration > 0) {
        saveProgress({
          video_key: video.videoKey,
          playback_position: currentTime,
          duration: duration,
        });
      }
    };

    // Debounced save on timeupdate (every 10 seconds of playback)
    const handleTimeUpdate = () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        handleSaveProgress();
      }, 10000); // Save every 10 seconds
    };

    // Save immediately on pause
    const handlePause = () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      handleSaveProgress();
    };

    // Save and mark as completed on video end
    const handleEnded = () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      handleSaveProgress();
    };

    // Save on page unload
    const handleBeforeUnload = () => {
      handleSaveProgress();
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handleEnded);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      handleSaveProgress(); // Save one last time on unmount
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handleEnded);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user, video.videoKey, saveProgress]);

  return (
    <div className="absolute inset-0 bg-black">
      {video.videoUrl ? (
        <video
          ref={videoRef}
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