export interface Video {
  title: string;
  subtitle?: string;
  description: string;
  videoUrl: string; // URL from Prismic media library
  thumbnailUrl: string; // URL from Prismic image field
  levelId: string; // Level ID for filtering
  categories: string[]; // Category IDs
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
}
