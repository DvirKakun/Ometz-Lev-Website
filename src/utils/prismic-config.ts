// Shared Prismic API configuration and utilities
import * as prismic from "@prismicio/client";
import type { RichTextField, ImageField } from "@prismicio/types";

// Prismic API configuration
export const PRISMIC_REPOSITORY_NAME = import.meta.env
  .VITE_PRISMIC_REPOSITORY_NAME;
export const PRISMIC_API_ENDPOINT =
  import.meta.env.VITE_PRISMIC_API_ENDPOINT ||
  "https://ometz-lev-website.cdn.prismic.io/api/v2";
export const PRISMIC_ACCESS_TOKEN = import.meta.env.VITE_PRISMIC_ACCESS_TOKEN;

// Create Prismic client
export function createPrismicClient() {
  return prismic.createClient(PRISMIC_API_ENDPOINT, {
    accessToken: PRISMIC_ACCESS_TOKEN,
  });
}

// Helper function to extract image URL from Prismic image field
export function getPrismicImageUrl(
  imageField: ImageField | null | undefined
): string {
  if (!imageField || !imageField.url) {
    return "";
  }
  return imageField.url;
}

// Helper function to extract text from Prismic rich text or text field
export function getPrismicText(
  textField: RichTextField | string | null | undefined
): string {
  if (!textField) return "";

  // If it's a simple text field
  if (typeof textField === "string") {
    return textField;
  }

  // If it's a rich text field (array of rich text nodes)
  if (Array.isArray(textField)) {
    // Filter out empty arrays
    if (textField.length === 0) return "";

    // Use prismic.asText to safely convert rich text to plain text
    const result = prismic.asText(textField);
    return result || "";
  }

  // If it's a single rich text node object with {type, text, spans, direction}
  if (typeof textField === "object" && textField !== null) {
    // If it has a text property, extract it
    if ("text" in textField) {
      return String((textField as any).text || "");
    }

    // If it's a rich text node, wrap in array and use asText
    if ("type" in textField) {
      return prismic.asText([textField as any]) || "";
    }
  }

  return "";
}

// Helper function to extract title from Prismic title field
export function getPrismicTitle(
  titleField: RichTextField | null | undefined
): string {
  if (!titleField) return "";

  // Title fields are rich text arrays
  if (Array.isArray(titleField)) {
    return prismic.asText(titleField) || "";
  }

  return "";
}

// Generic Prismic API error handler
export function handlePrismicError(error: unknown, context: string): void {
  console.error(`Error fetching ${context} from Prismic:`, error);
}

// Helper function to convert Prismic date to JavaScript Date
export function getPrismicDate(dateField: string): Date {
  return new Date(dateField);
}

// Simple helper to get rich text with line breaks preserved
export function getPrismicRichText(
  textField: RichTextField | string | null | undefined
): string {
  if (!textField) return "";
  if (typeof textField === "string") return textField;
  if (Array.isArray(textField)) {
    // Join all paragraphs with double line breaks to create proper spacing
    const result = textField
      .map((node: any) => {
        if (node.type === "paragraph" && node.text) {
          return node.text;
        }
        return "";
      })
      .filter((text) => text.trim() !== "")
      .join("\n\n");

    return result;
  }
  return "";
}
