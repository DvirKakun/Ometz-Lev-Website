import type { SlideHeroImage } from "../types/slide_hero_images";
import {
  STRAPI_URL,
  createStrapiHeaders,
  getImageUrl,
  handleStrapiError,
  validateStrapiResponse,
} from "./strapi-config";

// Strapi API interfaces
interface StrapiSlideHeroImage {
  id: number;
  title: string;
  subtitle: string;
  alt: string;
  order: number;
  image: {
    url: string;
  };
}

// Transform Strapi slide hero image to our format
export function mapStrapiSlideHeroImage(
  strapiImage: StrapiSlideHeroImage
): SlideHeroImage {
  return {
    id: strapiImage.id.toString(),
    src: getImageUrl(strapiImage.image.url),
    alt: strapiImage.alt,
    title: strapiImage.title,
    subtitle: strapiImage.subtitle,
    order: strapiImage.order,
  };
}

// Fetch slide hero images from Strapi
export async function fetchSlideHeroImagesFromStrapi(): Promise<
  SlideHeroImage[]
> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/slider-hero-images?populate=image&sort=order:asc`,
      {
        headers: createStrapiHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    validateStrapiResponse(data, "slide hero images");

    return data.data.map(mapStrapiSlideHeroImage);
  } catch (error) {
    handleStrapiError(error, "slide hero images");
    throw error;
  }
}
