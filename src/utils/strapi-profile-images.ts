import {
  STRAPI_URL,
  createStrapiHeaders,
  getImageUrl,
  handleStrapiError,
} from "./strapi-config";

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

    if (!data.data) {
      return null;
    }

    return mapStrapiProfileImage(data.data[0]);
  } catch (error) {
    handleStrapiError(error, "profile image");
    return null;
  }
}
