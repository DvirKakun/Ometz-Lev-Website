import type { Handler, HandlerEvent } from "@netlify/functions";
import { getSummerCampConfirmationTemplate } from "./utils/emailTemplates";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

/**
 * Resend confirmation email to customer
 * Future feature: allows admin to resend confirmation emails by searching by email or phone
 *
 * TODO before implementation:
 * - Add authentication middleware for admin-only access
 * - Integrate with Google Sheets to search registrations by email/phone
 * - Add rate limiting to prevent abuse
 * - Add logging for audit trail
 */
export const handler: Handler = async (event: HandlerEvent) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // TODO: Validate admin authentication token
    // const authHeader = event.headers.authorization;
    // if (!authHeader || !validateAdminToken(authHeader)) {
    //   return {
    //     statusCode: 401,
    //     headers,
    //     body: JSON.stringify({ error: "Unauthorized" }),
    //   };
    // }

    const { searchEmail, searchPhone } = JSON.parse(event.body || "{}");

    if (!searchEmail && !searchPhone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Email or phone required for search",
        }),
      };
    }

    // TODO: Search Google Sheets for registration by email or phone
    // const registrationData = await findRegistrationByEmailOrPhone(
    //   searchEmail,
    //   searchPhone
    // );
    //
    // if (!registrationData) {
    //   return {
    //     statusCode: 404,
    //     headers,
    //     body: JSON.stringify({ error: "Registration not found" }),
    //   };
    // }

    // TODO: Send confirmation email using the template
    // const apiKey = process.env.BREVO_API_KEY;
    // if (!apiKey) {
    //   throw new Error("BREVO_API_KEY not configured");
    // }
    //
    // const customerHtmlContent = getSummerCampConfirmationTemplate({
    //   activityName: registrationData.activityName,
    //   childName: registrationData.childName,
    //   parentEmail: registrationData.parentEmail,
    // });
    //
    // const response = await fetch(BREVO_API_URL, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "api-key": apiKey,
    //   },
    //   body: JSON.stringify({
    //     sender: {
    //       name: "אומץ לב - אלעד שמעונוב",
    //       email: "no-reply@ometzlev.co.il",
    //     },
    //     to: [{ email: registrationData.parentEmail }],
    //     subject: `אישור הרשמה ל${registrationData.activityName} - ${registrationData.childName}`,
    //     htmlContent: customerHtmlContent,
    //   }),
    // });
    //
    // if (!response.ok) {
    //   const errorData = await response.json();
    //   console.error("Brevo API Error:", errorData);
    //   throw new Error(
    //     errorData.message || `Failed to send email: ${response.status}`
    //   );
    // }

    return {
      statusCode: 501,
      headers,
      body: JSON.stringify({
        error: "Not yet implemented. This feature is planned for future release.",
      }),
    };
  } catch (error) {
    console.error("Resend confirmation error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
