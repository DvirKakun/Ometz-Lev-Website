export interface Video {
  title: string;
  subtitle?: string;
  description: string;
  videoUrl: string; // URL from Prismic media library
  thumbnailUrl: string; // URL from Prismic image field
  thumbnailAlt?: string; // Alt text from Prismic image field
  levelId: string; // Level ID for filtering
  categories: string[]; // Category IDs
  duration?: string; // Duration in MM:SS or HH:MM:SS format
  videoKey?: string; // Prismic document ID
}

export interface VideoCardProps {
  video: Video;
  index: number;
  onClick?: (video: Video) => void;
}

export interface VideosGridProps {
  videos: Video[];
  isLoading?: boolean;
  error?: Error | null;
  hasActiveFilters?: boolean;
  totalVideosCount?: number;
}
