import type { SlideHeroImage } from "../types/slide_hero_images";
import {
  createPrismicClient,
  getPrismicText,
  handlePrismicError,
} from "./prismic-config";

// Transform single slide from group to our format
export function mapPrismicSlide(
  slide: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  slideIndex: number
): SlideHeroImage {
  // Get the image field (contains url and alt automatically)
  const imageField = slide.slide_image;

  return {
    id: `slide-${slideIndex}`,
    src: imageField?.url || "",
    alt: imageField?.alt || "Hero slide image",
    title: getPrismicText(slide.title) || "",
    subtitle: getPrismicText(slide.subtitle) || "",
    order: Number(slide.order) || slideIndex + 1,
  };
}

// Fetch hero slides from Prismic (Single Type with Group)
export async function fetchHeroSlidesFromPrismic(): Promise<SlideHeroImage[]> {
  try {
    const client = createPrismicClient();

    // Get the single hero_slider document
    const response = await client.getSingle("hero_slider");

    if (!response || !response.data || !response.data.slides) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const slides: any[] = response.data.slides;

    // Map each slide and sort by order (1 is first)
    const mappedSlides = slides
      .map((slide, index) => mapPrismicSlide(slide, index))
      .sort((a, b) => a.order - b.order);

    return mappedSlides;
  } catch (error) {
    handlePrismicError(error, "hero slider");
    return [];
  }
}
