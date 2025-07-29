import type { PrismicDocument } from "@prismicio/client";
import type { Video } from "../types/videos";
import { PRISMIC_PAGE_VALUES } from "../types/page";
import {
  createPrismicClient,
  getPrismicText,
  getPrismicTitle,
  getPrismicImageUrl,
  handlePrismicError,
} from "./prismic-config";
import { getVideoDuration } from "./video-duration";

// Type for the complete Prismic video document
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismicVideo = PrismicDocument<Record<string, any>>;

// Transform Prismic video to our format
export async function mapPrismicVideo(prismicVideo: PrismicVideo): Promise<Video> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = prismicVideo.data as any;

  // Extract categories from the categories group
  const categoriesGroup = data.categories || [];
  const categoryIds = categoriesGroup
    .map((item: any) => (item.category?.id ? String(item.category.id) : null))
    .filter((id: string | null) => id !== null);

  // Get video URL from Link to Media field
  const videoUrl = data.video_file?.url || "";
  
  // Get thumbnail URL from Image field
  const thumbnailUrl = getPrismicImageUrl(data.thumbnail) || "";
  
  // Get level ID from content relationship
  const levelId = data.level?.id ? String(data.level.id) : "";

  // Calculate video duration
  let duration: string | undefined;
  try {
    if (videoUrl) {
      duration = await getVideoDuration(videoUrl);
    }
  } catch (error) {
    console.warn(`Failed to get duration for video ${prismicVideo.id}:`, error);
    duration = undefined;
  }

  return {
    title: getPrismicTitle(data.title) || "Untitled Video",
    subtitle: getPrismicText(data.subtitle) || "",
    description: getPrismicText(data.description) || "",
    videoUrl,
    thumbnailUrl,
    levelId,
    categories: categoryIds,
    duration,
    videoKey: String(prismicVideo.id),
  };
}

// Fetch videos from Prismic
export async function fetchVideosFromPrismic(
  page: "training" | "therapy" = "training"
): Promise<Video[]> {
  try {
    const client = createPrismicClient();

    const response = await client.getAllByType("video", {
      fetchLinks: [
        "category.name", // Fetch linked category data from group
        "level.name"     // Fetch linked level data
      ],
    });

    // Filter by page after fetching, using Hebrew values from Prismic
    const hebrewPageValue = PRISMIC_PAGE_VALUES[page];
    const filteredResponse = response.filter((video: any) => {
      return video.data.page === hebrewPageValue;
    });

    if (!filteredResponse || !Array.isArray(filteredResponse)) {
      return [];
    }

    if (filteredResponse.length === 0) {
      return [];
    }

    return Promise.all(filteredResponse.map(mapPrismicVideo));
  } catch (error) {
    handlePrismicError(error, "videos");
    return [];
  }
}