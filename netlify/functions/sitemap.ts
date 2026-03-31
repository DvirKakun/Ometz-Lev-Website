import type { Handler, HandlerResponse } from "@netlify/functions";
import * as prismic from "@prismicio/client";

const BASE_URL = "https://ometzlev.co.il";

// Static pages configuration
// Note: "/" (splash) intentionally excluded — its canonical URL is "/home"
// lastmod reflects actual last content update, not request time
const staticPages = [
  { path: "/home", lastmod: "2026-03-31" },
  { path: "/training", lastmod: "2026-03-31" },
  { path: "/therapy", lastmod: "2026-03-31" },
  { path: "/activities", lastmod: "2026-03-31" },
  { path: "/schools", lastmod: "2026-03-31" },
  { path: "/products", lastmod: "2026-03-31" },
  { path: "/training-videos-library", lastmod: "2026-03-31" },
  { path: "/training-articles-library", lastmod: "2026-03-31" },
  { path: "/therapy-videos-library", lastmod: "2026-03-31" },
  { path: "/therapy-articles-library", lastmod: "2026-03-31" },
];

/**
 * Format date to YYYY-MM-DD for sitemap
 */
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return new Date().toISOString().split("T")[0];
  }
  return dateString.split("T")[0];
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generate sitemap XML dynamically from Prismic content
 */
export const handler: Handler = async (): Promise<HandlerResponse> => {
  try {
    const prismicEndpoint = process.env.VITE_PRISMIC_API_ENDPOINT;

    if (!prismicEndpoint) {
      console.error("VITE_PRISMIC_API_ENDPOINT not configured");
      return {
        statusCode: 500,
        body: "Prismic endpoint not configured",
      };
    }

    const client = prismic.createClient(prismicEndpoint);

    // Start building XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

    // Add static pages
    for (const page of staticPages) {
      xml += `
  <url>
    <loc>${escapeXml(BASE_URL + page.path)}</loc>
    <lastmod>${page.lastmod}</lastmod>
  </url>`;
    }

    // Fetch all articles from Prismic
    try {
      const articles = await client.getAllByType("article");

      for (const article of articles) {
        const page = article.data.page as string;
        const pageType =
          page === "אילוף כלבים" || page === "training" ? "training" : "therapy";
        const lastmod = formatDate(article.last_publication_date);

        xml += `
  <url>
    <loc>${escapeXml(`${BASE_URL}/${pageType}-articles-library/${article.id}`)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
      }
    } catch (articleError) {
      console.error("Error fetching articles:", articleError);
      // Continue without articles if fetch fails
    }

    // Close XML
    xml += `
</urlset>`;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
      body: xml,
    };
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/plain",
      },
      body: `Error generating sitemap: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};
