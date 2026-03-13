import type { Handler, HandlerEvent } from "@netlify/functions";
import * as prismic from "@prismicio/client";
import { getSupabaseAdmin } from "./utils/supabaseAdmin";
import {
  getNotificationEmailTemplate,
  getNotificationSubject,
  getCategoryLabel,
} from "./utils/emailTemplates/notificationTemplate";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

// Map Prismic document types to notification categories
type PrismicDocType = "video" | "article" | "product" | "activity";
type NotificationCategory =
  | "training_videos"
  | "therapy_videos"
  | "activities"
  | "training_article"
  | "therapy_article"
  | "new_product";

interface PrismicWebhookPayload {
  type: string;
  secret?: string;
  masterRef?: string;
  domain?: string;
  apiUrl?: string;
  releases?: {
    addition?: Array<{ id: string; documents: string[] }>;
    update?: Array<{ id: string; documents: string[] }>;
    deletion?: Array<{ id: string; documents: string[] }>;
  };
  documents?: string[];
}

interface ContentInfo {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  ctaUrl: string;
  ctaText: string;
  category: NotificationCategory;
  internalType: string;
}

/**
 * Extract text from Prismic rich text field
 */
function getPrismicText(
  field: prismic.RichTextField | string | null | undefined
): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (Array.isArray(field)) {
    return prismic.asText(field) || "";
  }
  return "";
}

/**
 * Determine notification category from Prismic document
 */
function getNotificationCategory(
  docType: PrismicDocType,
  docData: Record<string, unknown>
): { category: NotificationCategory; internalType: string } | null {
  switch (docType) {
    case "video": {
      const page = docData.page as string;
      if (page === "אילוף" || page === "training") {
        return { category: "training_videos", internalType: "training_videos" };
      }
      if (page === "כלבנות טיפולית" || page === "therapy") {
        return { category: "therapy_videos", internalType: "therapy_videos" };
      }
      return null;
    }
    case "article": {
      const page = docData.page as string;
      if (page === "אילוף" || page === "training") {
        return { category: "training_article", internalType: "training_article" };
      }
      if (page === "כלבנות טיפולית" || page === "therapy") {
        return { category: "therapy_article", internalType: "therapy_article" };
      }
      return null;
    }
    case "product":
      return { category: "new_product", internalType: "new_product" };
    case "activity":
      return { category: "activities", internalType: "new_activity" };
    default:
      return null;
  }
}

/**
 * Extract content info from Prismic document
 */
function extractContentInfo(
  doc: prismic.PrismicDocument,
  categoryInfo: { category: NotificationCategory; internalType: string }
): ContentInfo {
  const data = doc.data as Record<string, unknown>;
  const docType = doc.type as PrismicDocType;

  let title = "";
  let description = "";
  let imageUrl: string | undefined;
  let ctaUrl = "https://ometzlev.co.il";
  let ctaText = "לצפייה באתר";

  switch (docType) {
    case "video": {
      title = getPrismicText(data.title as prismic.RichTextField);
      description = getPrismicText(data.subtitle as prismic.RichTextField);
      const thumbnail = data.thumbnail as { url?: string } | undefined;
      imageUrl = thumbnail?.url;

      // Determine library URL
      const page = data.page as string;
      if (page === "אילוף" || page === "training") {
        ctaUrl = "https://ometzlev.co.il/training-videos-library";
      } else {
        ctaUrl = "https://ometzlev.co.il/therapy-videos-library";
      }
      ctaText = "צפייה בסרטון";
      break;
    }
    case "article": {
      title = getPrismicText(data.title as prismic.RichTextField);
      description = getPrismicText(data.description as prismic.RichTextField);
      const thumbnail = data.thumbnail as { url?: string } | undefined;
      imageUrl = thumbnail?.url;

      const page = data.page as string;
      if (page === "אילוף" || page === "training") {
        ctaUrl = `https://ometzlev.co.il/training-articles-library/${doc.id}`;
      } else {
        ctaUrl = `https://ometzlev.co.il/therapy-articles-library/${doc.id}`;
      }
      ctaText = "קריאת המדריך";
      break;
    }
    case "product": {
      title = getPrismicText(data.product_name as prismic.RichTextField);
      description = getPrismicText(data.product_description as prismic.RichTextField);
      const images = data.product_images as Array<{ product_image?: { url?: string } }> | undefined;
      imageUrl = images?.[0]?.product_image?.url;
      ctaUrl = "https://ometzlev.co.il/products";
      ctaText = "לצפייה במוצר";
      break;
    }
    case "activity": {
      title = getPrismicText(data.title as prismic.RichTextField);
      const descArray = data.description as Array<{ paragraph?: prismic.RichTextField }> | undefined;
      description = descArray?.[0]?.paragraph
        ? getPrismicText(descArray[0].paragraph)
        : "";
      const mainImage = data.main_image as { url?: string } | undefined;
      imageUrl = mainImage?.url;
      ctaUrl = "https://ometzlev.co.il/activities";
      ctaText = "לפרטים נוספים";
      break;
    }
  }

  return {
    id: doc.id,
    title: title || "תוכן חדש",
    description: description || "",
    imageUrl,
    ctaUrl,
    ctaText,
    category: categoryInfo.category,
    internalType: categoryInfo.internalType,
  };
}

/**
 * Send notification emails to subscribed users
 */
async function sendNotifications(contentInfo: ContentInfo): Promise<number> {
  const supabase = getSupabaseAdmin();
  const brevoApiKey = process.env.BREVO_API_KEY;

  if (!brevoApiKey) {
    throw new Error("BREVO_API_KEY not configured");
  }

  // Check if notification was already sent for this content
  const { data: existingNotification } = await supabase
    .from("sent_notifications")
    .select("id")
    .eq("notification_type", contentInfo.internalType)
    .eq("content_id", contentInfo.id)
    .maybeSingle();

  if (existingNotification) {
    console.log(`Notification already sent for ${contentInfo.internalType}: ${contentInfo.id}`);
    return 0;
  }

  // Get all users subscribed to this category
  const { data: subscribers, error: fetchError } = await supabase
    .from("user_notification_preferences")
    .select("user_id, unsubscribe_token")
    .eq(contentInfo.category, true);

  if (fetchError) {
    console.error("Error fetching subscribers:", fetchError);
    throw new Error("Failed to fetch subscribers");
  }

  if (!subscribers || subscribers.length === 0) {
    console.log(`No subscribers for category: ${contentInfo.category}`);
    return 0;
  }

  // Get user emails from auth.users
  const userIds = subscribers.map((s) => s.user_id);
  const { data: users, error: usersError } = await supabase.auth.admin.listUsers();

  if (usersError) {
    console.error("Error fetching users:", usersError);
    throw new Error("Failed to fetch user emails");
  }

  // Create subscriber map with emails
  const subscriberMap = new Map(
    subscribers.map((s) => [s.user_id, s.unsubscribe_token])
  );

  // Filter users who are subscribed
  const subscribedUsers = users.users.filter(
    (user) => userIds.includes(user.id) && user.email
  );

  if (subscribedUsers.length === 0) {
    console.log("No valid email addresses found for subscribers");
    return 0;
  }

  // Send emails in batches
  const categoryLabel = getCategoryLabel(contentInfo.internalType);
  const subject = getNotificationSubject(contentInfo.internalType, contentInfo.title);

  let sentCount = 0;

  for (const user of subscribedUsers) {
    const unsubscribeToken = subscriberMap.get(user.id);
    const unsubscribeUrl = `https://ometzlev.co.il/unsubscribe?token=${unsubscribeToken}`;

    const htmlContent = getNotificationEmailTemplate({
      title: contentInfo.title,
      description: contentInfo.description,
      ctaText: contentInfo.ctaText,
      ctaUrl: contentInfo.ctaUrl,
      imageUrl: contentInfo.imageUrl,
      unsubscribeUrl,
      categoryLabel,
    });

    try {
      const response = await fetch(BREVO_API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": brevoApiKey,
        },
        body: JSON.stringify({
          sender: {
            name: "אומץ לב - אלעד שמעונוב",
            email: "no-reply@ometzlev.co.il",
          },
          to: [{ email: user.email }],
          subject,
          htmlContent,
        }),
      });

      if (response.ok) {
        sentCount++;
      } else {
        const errorData = await response.json();
        console.error(`Failed to send email to ${user.email}:`, errorData);
      }
    } catch (error) {
      console.error(`Error sending email to ${user.email}:`, error);
    }
  }

  // Record that notification was sent
  await supabase.from("sent_notifications").insert({
    notification_type: contentInfo.internalType,
    content_id: contentInfo.id,
    recipients_count: sentCount,
  });

  return sentCount;
}

/**
 * Prismic Webhook Handler
 */
export const handler: Handler = async (event: HandlerEvent) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse webhook payload
    const payload: PrismicWebhookPayload = JSON.parse(event.body || "{}");

    // Verify webhook secret
    const webhookSecret = process.env.PRISMIC_WEBHOOK_SECRET;
    if (webhookSecret && payload.secret !== webhookSecret) {
      console.error("Invalid webhook secret");
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: "Unauthorized" }),
      };
    }

    // Only process document publish events
    if (payload.type !== "api-update") {
      console.log(`Ignoring event type: ${payload.type}`);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Event ignored" }),
      };
    }

    // Get document IDs from the payload
    const documentIds = payload.documents || [];

    if (documentIds.length === 0) {
      console.log("No documents in webhook payload");
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "No documents to process" }),
      };
    }

    // Create Prismic client
    const prismicEndpoint = process.env.VITE_PRISMIC_API_ENDPOINT;
    if (!prismicEndpoint) {
      throw new Error("VITE_PRISMIC_API_ENDPOINT not configured");
    }

    const client = prismic.createClient(prismicEndpoint);

    // Fetch documents and process
    let totalSent = 0;
    const supportedTypes: PrismicDocType[] = ["video", "article", "product", "activity"];

    for (const docId of documentIds) {
      try {
        const doc = await client.getByID(docId);

        // Check if this is a supported document type
        if (!supportedTypes.includes(doc.type as PrismicDocType)) {
          console.log(`Skipping unsupported document type: ${doc.type}`);
          continue;
        }

        // Get notification category
        const categoryInfo = getNotificationCategory(
          doc.type as PrismicDocType,
          doc.data as Record<string, unknown>
        );

        if (!categoryInfo) {
          console.log(`Could not determine category for document: ${docId}`);
          continue;
        }

        // Extract content info and send notifications
        const contentInfo = extractContentInfo(doc, categoryInfo);
        const sent = await sendNotifications(contentInfo);
        totalSent += sent;

        console.log(`Sent ${sent} notifications for ${doc.type}: ${doc.id}`);
      } catch (docError) {
        console.error(`Error processing document ${docId}:`, docError);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: `Processed ${documentIds.length} documents, sent ${totalSent} notifications`,
      }),
    };
  } catch (error) {
    console.error("Webhook error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};