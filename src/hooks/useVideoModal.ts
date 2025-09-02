import { useCallback, useEffect, useState } from "react";
import type { Video } from "../types/videos";

export const useVideoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);

  const openModal = useCallback((video: Video) => {
    const id = video.videoKey || `video-${video.title}`;
    window.location.hash = `#video-${id}`;
    setVideoId(id);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    if (window.location.hash.startsWith('#video-')) {
      window.history.back();
    } else {
      setIsOpen(false);
      setVideoId(null);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#video-')) {
        const id = hash.replace('#video-', '');
        setVideoId(id);
        setIsOpen(true);
      } else {
        setIsOpen(false);
        setVideoId(null);
      }
    };

    const handlePopState = () => {
      handleHashChange();
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const onOpenChange = useCallback((open: boolean) => {
    if (!open) {
      closeModal();
    }
  }, [closeModal]);

  return {
    isOpen,
    videoId,
    openModal,
    closeModal,
    onOpenChange,
  };
};