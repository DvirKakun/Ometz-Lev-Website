import type { Handler, HandlerEvent } from '@netlify/functions';
import { saveContactFormToSheet } from './utils/googleSheets';
import type { ContactFormData } from './utils/contactFormFieldsConfig';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export const handler: Handler = async (event: HandlerEvent) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Get API key from environment
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      throw new Error('BREVO_API_KEY not configured');
    }

    // Parse request body
    const data: ContactFormData = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Helper function to format phone for WhatsApp (convert 05X to 9725X)
    const formatWhatsAppNumber = (phone: string | undefined): string => {
      if (!phone) return "";
      // Remove spaces and dashes
      const cleaned = phone.replace(/[\s-]/g, "");
      // Convert Israeli format (05X) to international (9725X)
      if (cleaned.startsWith("0")) {
        return "972" + cleaned.substring(1);
      }
      return cleaned;
    };

    // Build email HTML content
    const htmlContent = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">פנייה חדשה מטופס יצירת קשר</h2>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>שם:</strong> ${data.name}</p>
          <p><strong>אימייל:</strong> ${data.email}</p>
          ${
            data.phone
              ? `<p><strong>טלפון:</strong>
              <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none; margin-left: 10px;">📞 ${data.phone}</a>
              <a href="https://wa.me/${formatWhatsAppNumber(data.phone)}" style="background: #25D366; color: white; padding: 4px 12px; border-radius: 4px; text-decoration: none; display: inline-block; margin-right: 8px; font-size: 14px;">💬 WhatsApp</a>
            </p>`
              : ""
          }
        </div>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">הודעה</h3>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>

        <p style="color: #6b7280; font-size: 12px;">
          נשלח מאתר אומץ לב ב-${new Date().toLocaleString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jerusalem',
    })}
        </p>
      </div>
    `;

    // Send email via Brevo
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: 'אומץ לב - אלעד שמעונוב',
          email: 'no-reply@ometzlev.co.il'
        },
        to: [{ email: 'Eladshi1326@gmail.com' }],
        subject: `פנייה חדשה מ-${data.name}`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API Error:', errorData);
      throw new Error(errorData.message || `Failed to send email: ${response.status}`);
    }

    // Save to Google Sheets
    try {
      await saveContactFormToSheet({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      });
    } catch (sheetError) {
      // Log the error but don't fail the request
      // Email was sent successfully, so contact form submission is still valid
      console.error('Failed to save contact form to Google Sheets:', sheetError);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};
