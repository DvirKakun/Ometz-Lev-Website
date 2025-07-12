import type { SlideHeroImage } from "../types/slide_hero_images";

// Strapi API configuration
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Create headers for Strapi requests
function createStrapiHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }
  
  return headers;
}

// Helper function to construct proper image URLs
function getImageUrl(imageUrl: string): string {
  // If the URL already starts with http/https, it's a full URL from Strapi Cloud
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  // Otherwise, it's a relative path that needs the Strapi URL
  return `${STRAPI_URL}${imageUrl}`;
}

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
export function mapStrapiSlideHeroImage(strapiImage: StrapiSlideHeroImage): SlideHeroImage {
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
export async function fetchSlideHeroImagesFromStrapi(): Promise<SlideHeroImage[]> {
  try {
    console.log(
      "🚀 FETCHING SLIDE HERO IMAGES FROM STRAPI - This should only appear once per 10 minutes!"
    );

    const response = await fetch(
      `${STRAPI_URL}/api/slide-hero-images?populate=image&sort=order:asc`,
      {
        headers: createStrapiHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid data format from Strapi");
    }

    return data.data.map(mapStrapiSlideHeroImage);
  } catch (error) {
    console.error("Error fetching slide hero images from Strapi:", error);
    throw error;
  }
}