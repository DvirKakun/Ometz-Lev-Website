import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

// Types for the data structures we expect from Prismic
interface ImageData {
  url?: string;
  image?: {
    url?: string;
  };
}

// Hook to preload images from cached Prismic data
export function useImagePreloader() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Get all cached data and extract image URLs
    const extractAndPreloadImages = async () => {
      const imageUrls: string[] = [];

      try {
        // Extract hero slider images
        const heroSlides = queryClient.getQueryData(["hero-slider"]) as
          | ImageData[]
          | undefined;
        if (heroSlides) {
          heroSlides.forEach((slide) => {
            if (slide.image?.url) {
              imageUrls.push(slide.image.url);
            }
          });
        }

        // Extract profile image
        const profileImage = queryClient.getQueryData(["profile-image"]) as
          | ImageData
          | undefined;
        if (profileImage?.url) {
          imageUrls.push(profileImage.url);
        }

        // Extract article images
        const trainingArticles = queryClient.getQueryData([
          "articles",
          "training",
        ]) as ImageData[] | undefined;
        const therapyArticles = queryClient.getQueryData([
          "articles",
          "therapy",
        ]) as ImageData[] | undefined;

        [trainingArticles, therapyArticles].forEach((articles) => {
          if (articles) {
            articles.forEach((article) => {
              if (article.image?.url) {
                imageUrls.push(article.image.url);
              }
            });
          }
        });

        // Extract activity images
        const activities = queryClient.getQueryData(["activities"]) as
          | ImageData[]
          | undefined;
        if (activities) {
          activities.forEach((activity) => {
            if (activity.image?.url) {
              imageUrls.push(activity.image.url);
            }
          });
        }

        // Preload all images
        if (imageUrls.length > 0) {
          await preloadImages(imageUrls);
        }
      } catch (error) {
        console.warn("Image preloading failed:", error);
      }
    };

    // Small delay to ensure data is cached first
    const timer = setTimeout(extractAndPreloadImages, 500);
    return () => clearTimeout(timer);
  }, [queryClient]);
}

// Utility function to preload images
async function preloadImages(urls: string[]): Promise<void> {
  const preloadPromises = urls.map((url) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => {
        console.warn(`Failed to preload image: ${url}`);
        resolve(); // Resolve anyway to not block other images
      };
      img.src = url;
    });
  });

  await Promise.all(preloadPromises);
}
