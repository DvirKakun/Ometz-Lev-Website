// Strapi API configuration
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Create headers for Strapi requests
function createStrapiHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  return headers;
}

// Helper function to construct proper image URLs
function getImageUrl(imageUrl: string): string {
  // If the URL already starts with http/https, it's a full URL from Strapi Cloud
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  // Otherwise, it's a relative path that needs the Strapi URL
  return `${STRAPI_URL}${imageUrl}`;
}

// Strapi API interfaces
interface StrapiProfileImage {
  id: number;
  alt: string;
  image: {
    url: string;
  };
}

// Profile image type
export interface ProfileImage {
  id: string;
  imageSrc: string;
  altText: string;
}

// Transform Strapi profile image to our format
export function mapStrapiProfileImage(
  strapiImage: StrapiProfileImage
): ProfileImage {
  return {
    id: strapiImage.id.toString(),
    imageSrc: getImageUrl(strapiImage.image.url),
    altText: strapiImage.alt,
  };
}

// Fetch profile image from Strapi
export async function fetchProfileImageFromStrapi(): Promise<ProfileImage | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/profile-images?populate=image`,
      {
        headers: createStrapiHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    if (!data.data) {
      return null;
    }

    return mapStrapiProfileImage(data.data[0]);
  } catch (error) {
    console.error("Error fetching profile image from Strapi:", error);
    return null;
  }
}
