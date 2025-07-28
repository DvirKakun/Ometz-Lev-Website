import type { ImageField } from "@prismicio/client";
import { createPrismicClient, handlePrismicError } from "./prismic-config";

// Profile image type
export interface ProfileImage {
  id: string;
  imageSrc: string;
  altText: string;
}

// Transform Prismic profile image to our format
export function mapPrismicProfileImage(
  prismicProfileImage: ImageField
): ProfileImage {
  return {
    id: String(prismicProfileImage.id),
    imageSrc: prismicProfileImage?.url || "",
    altText: prismicProfileImage?.alt || "Profile image",
  };
}

// Fetch profile image from Prismic
export async function fetchProfileImageFromPrismic(): Promise<ProfileImage | null> {
  try {
    const client = createPrismicClient();

    // Get the single profile image document
    const response = await client.getSingle("profile_image");

    if (!response || !response.data) {
      return null;
    }

    return mapPrismicProfileImage(response.data.image);
  } catch (error) {
    handlePrismicError(error, "profile image");
    return null;
  }
}
