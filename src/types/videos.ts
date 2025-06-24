export interface Video {
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  thumbnail: string;
  videoKey?: string; // For storing video identifier/URL
}

export interface VideoCardProps {
  video: Video;
  index: number;
}

export interface VideoGridProps {
  videos: Video[];
}
