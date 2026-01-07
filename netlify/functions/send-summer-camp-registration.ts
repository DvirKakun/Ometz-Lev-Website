import type { Handler, HandlerEvent } from '@netlify/functions';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

interface RegistrationData {
  activityName: string;
  session: string;
  childName: string;
  age: number | string;
  grade: string;
  motherName?: string | null;
  motherPhone?: string | null;
  fatherName?: string | null;
  fatherPhone?: string | null;
  dogFear: string | null;
  dogFearScale?: number | null;
  allergies: string | null;
  allergiesText?: string | null;
  healthIssues: string | null;
  healthIssuesText?: string | null;
  notes?: string | null;
}

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
    const data: RegistrationData = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!data.activityName || !data.childName || !data.session) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Build email HTML content
    const htmlContent = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">רישום חדש ל${data.activityName}</h2>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">פרטי המפגש</h3>
          <p><strong>מפגש:</strong> ${data.session}</p>
        </div>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">פרטי הילד/ה</h3>
          <p><strong>שם:</strong> ${data.childName}</p>
          <p><strong>גיל:</strong> ${data.age}</p>
          <p><strong>כיתה:</strong> ${data.grade}</p>
        </div>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">פרטי ההורים</h3>
          ${data.motherName ? `<p><strong>אם:</strong> ${data.motherName}</p>` : ''}
          ${data.motherPhone ? `<p><strong>טלפון אם:</strong> ${data.motherPhone}</p>` : ''}
          ${data.fatherName ? `<p><strong>אב:</strong> ${data.fatherName}</p>` : ''}
          ${data.fatherPhone ? `<p><strong>טלפון אב:</strong> ${data.fatherPhone}</p>` : ''}
        </div>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">מידע רפואי</h3>
          <p><strong>פחד מכלבים:</strong> ${data.dogFear}</p>
          ${data.dogFearScale ? `<p><strong>רמת פחד:</strong> ${data.dogFearScale}/10</p>` : ''}
          <p><strong>אלרגיות:</strong> ${data.allergies}</p>
          ${data.allergiesText ? `<p><strong>פרטים:</strong> ${data.allergiesText}</p>` : ''}
          <p><strong>בעיות בריאות:</strong> ${data.healthIssues}</p>
          ${data.healthIssuesText ? `<p><strong>פרטים:</strong> ${data.healthIssuesText}</p>` : ''}
        </div>

        ${data.notes ? `
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">הערות</h3>
          <p>${data.notes}</p>
        </div>
        ` : ''}

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
        subject: `רישום חדש ל${data.activityName} - ${data.childName}`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API Error:', errorData);
      throw new Error(errorData.message || `Failed to send email: ${response.status}`);
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
