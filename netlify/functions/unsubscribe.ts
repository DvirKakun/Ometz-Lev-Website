import type { Handler, HandlerEvent } from "@netlify/functions";
import { getSupabaseAdmin } from "./utils/supabaseAdmin";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

/**
 * Unsubscribe handler
 *
 * GET /unsubscribe?token=xxx - Get current preferences by token
 * GET /unsubscribe?token=xxx&category=activities - Quick unsubscribe from category
 * GET /unsubscribe?token=xxx&all=true - Unsubscribe from all
 * POST /unsubscribe - Update preferences with full control
 */
export const handler: Handler = async (event: HandlerEvent) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const supabase = getSupabaseAdmin();

    // GET request - fetch preferences or quick unsubscribe
    if (event.httpMethod === "GET") {
      const token = event.queryStringParameters?.token;

      if (!token) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Missing token parameter" }),
        };
      }

      // Find user by token
      const { data: preferences, error: fetchError } = await supabase
        .from("user_notification_preferences")
        .select("*")
        .eq("unsubscribe_token", token)
        .maybeSingle();

      if (fetchError) {
        console.error("Error fetching preferences:", fetchError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: "Database error" }),
        };
      }

      if (!preferences) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: "Invalid or expired token" }),
        };
      }

      // Check for quick unsubscribe actions
      const category = event.queryStringParameters?.category;
      const unsubscribeAll = event.queryStringParameters?.all === "true";

      if (unsubscribeAll) {
        // Unsubscribe from all categories
        const { error: updateError } = await supabase
          .from("user_notification_preferences")
          .update({
            training_videos: false,
            therapy_videos: false,
            activities: false,
            training_article: false,
            therapy_article: false,
            new_product: false,
            unsubscribe_token: crypto.randomUUID(), // Regenerate token
            updated_at: new Date().toISOString(),
          })
          .eq("id", preferences.id);

        if (updateError) {
          console.error("Error updating preferences:", updateError);
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Failed to update preferences" }),
          };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: "הוסרת מכל רשימות התפוצה",
          }),
        };
      }

      if (category) {
        // Validate category
        const validCategories = [
          "training_videos",
          "therapy_videos",
          "activities",
          "training_article",
          "therapy_article",
          "new_product",
        ];

        if (!validCategories.includes(category)) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: "Invalid category" }),
          };
        }

        // Unsubscribe from specific category
        const { error: updateError } = await supabase
          .from("user_notification_preferences")
          .update({
            [category]: false,
            unsubscribe_token: crypto.randomUUID(), // Regenerate token
            updated_at: new Date().toISOString(),
          })
          .eq("id", preferences.id);

        if (updateError) {
          console.error("Error updating preferences:", updateError);
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Failed to update preferences" }),
          };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: `הוסרת מרשימת התפוצה`,
          }),
        };
      }

      // Just return current preferences (for the unsubscribe page to display)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          preferences: {
            training_videos: preferences.training_videos,
            therapy_videos: preferences.therapy_videos,
            activities: preferences.activities,
            training_article: preferences.training_article,
            therapy_article: preferences.therapy_article,
            new_product: preferences.new_product,
          },
        }),
      };
    }

    // POST request - update preferences
    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      const { token, preferences: newPreferences } = body;

      if (!token) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Missing token" }),
        };
      }

      // Find user by token
      const { data: existing, error: fetchError } = await supabase
        .from("user_notification_preferences")
        .select("id")
        .eq("unsubscribe_token", token)
        .maybeSingle();

      if (fetchError || !existing) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: "Invalid or expired token" }),
        };
      }

      // Update preferences
      const { error: updateError } = await supabase
        .from("user_notification_preferences")
        .update({
          ...newPreferences,
          unsubscribe_token: crypto.randomUUID(), // Regenerate token for security
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      if (updateError) {
        console.error("Error updating preferences:", updateError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: "Failed to update preferences" }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "ההעדפות עודכנו בהצלחה",
        }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};