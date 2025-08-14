import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string;
  imageUrl?: string;
  imageAlt?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
  articleAuthor?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  type?: "website" | "article" | "service";
}

export default function SEOMeta({
  title,
  description,
  keywords,
  imageUrl,
  imageAlt,
  canonicalUrl,
  noindex = false,
  nofollow = false,
  articleAuthor,
  articlePublishedTime,
  articleModifiedTime,
  type = "website",
}: SEOMetaProps) {
  const location = useLocation();
  const baseUrl = "https://xn--4dbcl2aj6b.xn--4dbrk0ce"; // אומץ-לב.קום
  const currentUrl = canonicalUrl || `${baseUrl}${location.pathname}`;
  const defaultImageUrl = `${baseUrl}/assets/icons/Ometz-Lev-Large-Logo.png`;
  const finalImageUrl = imageUrl || defaultImageUrl;
  const finalImageAlt = imageAlt || title;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (
      name: string,
      content: string,
      attribute: string = "name"
    ) => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");

    if (keywords) {
      updateMetaTag("keywords", keywords);
    }

    // Language and locale
    updateMetaTag("language", "Hebrew");
    updateMetaTag("author", "אלעד שמעונוב - אומץ לב");

    // Robots meta tag
    const robotsContent = [
      noindex ? "noindex" : "index",
      nofollow ? "nofollow" : "follow",
      "max-snippet:-1",
      "max-image-preview:large",
      "max-video-preview:-1",
    ].join(", ");
    updateMetaTag("robots", robotsContent);

    // Canonical URL
    updateLinkTag("canonical", currentUrl);

    // Open Graph meta tags - Always explicitly set
    updateMetaTag("og:title", title, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:type", type, "property");
    updateMetaTag("og:url", currentUrl, "property");
    updateMetaTag("og:image", finalImageUrl, "property"); // Always explicitly provided
    updateMetaTag("og:image:secure_url", finalImageUrl, "property"); // HTTPS version
    updateMetaTag("og:image:alt", finalImageAlt, "property");
    updateMetaTag("og:image:width", "1200", "property");
    updateMetaTag("og:image:height", "630", "property");
    updateMetaTag("og:image:type", "image/png", "property");
    updateMetaTag(
      "og:site_name",
      "אומץ לב - אילוף כלבים מקצועי, כלבנות טיפולית ופעילויות חברתיות",
      "property"
    );
    updateMetaTag("og:locale", "he_IL", "property");
    updateMetaTag("og:locale:alternate", "en_US", "property");

    // Twitter Card meta tags
    updateMetaTag("twitter:card", "summary_large_image", "name");
    updateMetaTag("twitter:title", title, "name");
    updateMetaTag("twitter:description", description, "name");
    updateMetaTag("twitter:image", finalImageUrl, "name");
    updateMetaTag("twitter:image:alt", finalImageAlt, "name");

    // Article-specific meta tags
    if (type === "article") {
      if (articleAuthor) {
        updateMetaTag("article:author", articleAuthor, "property");
      }
      if (articlePublishedTime) {
        updateMetaTag(
          "article:published_time",
          articlePublishedTime,
          "property"
        );
      }
      if (articleModifiedTime) {
        updateMetaTag("article:modified_time", articleModifiedTime, "property");
      }
      updateMetaTag("article:section", "כלבנות וחינוך", "property");
      if (keywords) {
        keywords.split(",").forEach((keyword) => {
          updateMetaTag("article:tag", keyword.trim(), "property");
        });
      }
    }

    // Additional SEO meta tags
    updateMetaTag("theme-color", "#da9a52"); // Brand color
    updateMetaTag("msapplication-TileColor", "#da9a52");
    updateMetaTag("application-name", "אומץ לב");
    updateMetaTag("apple-mobile-web-app-title", "אומץ לב");
    updateMetaTag("apple-mobile-web-app-capable", "yes");
    updateMetaTag("apple-mobile-web-app-status-bar-style", "default");

    // Business-specific meta tags
    updateMetaTag("geo.region", "IL");
    updateMetaTag("geo.placename", "Israel");
    updateMetaTag("ICBM", "31.7767,35.2345"); // Replace with actual coordinates

    // Additional meta tags for better indexing
    updateMetaTag("referrer", "strict-origin-when-cross-origin");
    updateMetaTag("format-detection", "telephone=yes");
  }, [
    title,
    description,
    keywords,
    currentUrl,
    finalImageUrl,
    finalImageAlt,
    noindex,
    nofollow,
    type,
    articleAuthor,
    articlePublishedTime,
    articleModifiedTime,
  ]);

  return null; // This component doesn't render anything
}
