// Shared Strapi API configuration and utilities

// Strapi API configuration
export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;
export const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Create headers for Strapi requests
export function createStrapiHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  return headers;
}

// Helper function to construct proper image URLs
export function getImageUrl(imageUrl: string): string {
  // If the URL already starts with http/https, it's a full URL from Strapi Cloud
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  // Otherwise, it's a relative path that needs the Strapi URL
  return `${STRAPI_URL}${imageUrl}`;
}

// Generic Strapi API error handler
export function handleStrapiError(error: unknown, context: string): void {
  console.error(`Error fetching ${context} from Strapi:`, error);
}

// Generic Strapi response validator
export function validateStrapiResponse(data: any, context: string): void {
  if (!data.data || !Array.isArray(data.data)) {
    throw new Error(`Invalid data format from Strapi for ${context}`);
  }
}

// Generic fetch function for Strapi endpoints
export async function fetchFromStrapi(endpoint: string, context: string) {
  try {
    console.log(
      `🚀 FETCHING ${context.toUpperCase()} FROM STRAPI - This should only appear once per 10 minutes!`
    );

    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      headers: createStrapiHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleStrapiError(error, context);
    throw error;
  }
}