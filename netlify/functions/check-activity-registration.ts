import type { Handler } from "@netlify/functions";
import * as prismic from "@prismicio/client";
import { getSupabaseAdmin } from "./utils/supabaseAdmin";
import {
  getNotificationEmailTemplate,
  getNotificationSubject,
  getCategoryLabel,
} from "./utils/emailTemplates/notificationTemplate";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

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
 * Check if a date is today (comparing year, month, day only)
 */
function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

/**
 * Check if activity has registration opening today
 * Registration opens when any session's start date is today
 */
function hasRegistrationOpeningToday(
  sessionDates: Array<{ session_start_date?: string; session_end_date?: string }>,
  hasRegistration: boolean
): boolean {
  if (!hasRegistration) return false;

  return sessionDates.some((session) => {
    if (!session.session_start_date) return false;
    const startDate = new Date(session.session_start_date);
    return isToday(startDate);
  });
}

interface ActivityInfo {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

/**
 * Scheduled function to check for activities opening for registration
 * Runs daily at 8 AM Israel time (configured in netlify.toml)
 *
 * Duplicate prevention:
 * - Each activity notification is tracked in sent_notifications table
 * - Uses unique combo of notification_type + content_id (activity ID)
 * - If activity Y was notified on Day 1, it won't be re-notified on Day 3
 *   even if activity Z opens on Day 3
 */
export const handler: Handler = async () => {
  console.log("Running activity registration check...");

  try {
    const prismicEndpoint = process.env.VITE_PRISMIC_API_ENDPOINT;
    if (!prismicEndpoint) {
      throw new Error("VITE_PRISMIC_API_ENDPOINT not configured");
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      throw new Error("BREVO_API_KEY not configured");
    }

    const supabase = getSupabaseAdmin();
    const client = prismic.createClient(prismicEndpoint);

    // Fetch all activities
    const activities = await client.getAllByType("activity");

    // Find activities with registration opening today
    const activitiesOpeningToday: ActivityInfo[] = [];

    for (const activity of activities) {
      const data = activity.data as Record<string, unknown>;
      const hasRegistration = Boolean(data.has_registration);
      const sessionDates = (data.session_dates || []) as Array<{
        session_start_date?: string;
        session_end_date?: string;
      }>;

      if (hasRegistrationOpeningToday(sessionDates, hasRegistration)) {
        // Check if we already sent notification for this specific activity
        // This prevents duplicate notifications if the function runs multiple times
        // or if another activity opens while this one is still open
        const { data: existingNotification } = await supabase
          .from("sent_notifications")
          .select("id")
          .eq("notification_type", "activity_registration")
          .eq("content_id", activity.id)
          .maybeSingle();

        if (!existingNotification) {
          const title = getPrismicText(data.title as prismic.RichTextField);
          const descArray = data.description as Array<{
            paragraph?: prismic.RichTextField;
          }> | undefined;
          const description = descArray?.[0]?.paragraph
            ? getPrismicText(descArray[0].paragraph)
            : "";
          const mainImage = data.main_image as { url?: string } | undefined;

          activitiesOpeningToday.push({
            id: activity.id,
            title: title || "פעילות חדשה",
            description,
            imageUrl: mainImage?.url,
          });
        } else {
          console.log(`Skipping activity ${activity.id} - notification already sent`);
        }
      }
    }

    if (activitiesOpeningToday.length === 0) {
      console.log("No new activities opening for registration today");
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "No activities to notify about" }),
      };
    }

    console.log(
      `Found ${activitiesOpeningToday.length} activities opening for registration today`
    );

    // Get subscribers for activities category
    const { data: subscribers, error: fetchError } = await supabase
      .from("user_notification_preferences")
      .select("user_id, unsubscribe_token")
      .eq("activities", true);

    if (fetchError) {
      console.error("Error fetching subscribers:", fetchError);
      throw new Error("Failed to fetch subscribers");
    }

    if (!subscribers || subscribers.length === 0) {
      console.log("No subscribers for activities category");
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "No subscribers to notify" }),
      };
    }

    // Get user emails
    const userIds = subscribers.map((s) => s.user_id);
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers();

    if (usersError) {
      console.error("Error fetching users:", usersError);
      throw new Error("Failed to fetch user emails");
    }

    const subscriberMap = new Map(
      subscribers.map((s) => [s.user_id, s.unsubscribe_token])
    );

    const subscribedUsers = users.users.filter(
      (user) => userIds.includes(user.id) && user.email
    );

    if (subscribedUsers.length === 0) {
      console.log("No valid email addresses found");
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "No valid emails to notify" }),
      };
    }

    // Send notifications for each activity
    let totalSent = 0;
    const categoryLabel = getCategoryLabel("activity_registration");

    for (const activity of activitiesOpeningToday) {
      const subject = getNotificationSubject("activity_registration", activity.title);

      let sentCount = 0;

      for (const user of subscribedUsers) {
        const unsubscribeToken = subscriberMap.get(user.id);
        const unsubscribeUrl = `https://ometzlev.co.il/unsubscribe?token=${unsubscribeToken}`;

        const htmlContent = getNotificationEmailTemplate({
          title: activity.title,
          description:
            activity.description ||
            "נפתחה הרשמה לפעילות חדשה! לחצו לפרטים נוספים והרשמה.",
          ctaText: "להרשמה",
          ctaUrl: "https://ometzlev.co.il/activities",
          imageUrl: activity.imageUrl,
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

      // Record that notification was sent for this specific activity
      // This prevents future duplicate notifications
      await supabase.from("sent_notifications").insert({
        notification_type: "activity_registration",
        content_id: activity.id,
        recipients_count: sentCount,
      });

      totalSent += sentCount;
      console.log(
        `Sent ${sentCount} notifications for activity: ${activity.title}`
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        activitiesProcessed: activitiesOpeningToday.length,
        notificationsSent: totalSent,
      }),
    };
  } catch (error) {
    console.error("Scheduled function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};