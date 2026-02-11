import type { Handler, HandlerEvent } from '@netlify/functions';
import { savePreQuestionnaireToSheet } from './utils/googleSheets';
import type { PreQuestionnaireData } from './utils/preQuestionnaireFieldsConfig';
import { getPreQuestionnaireEmailTemplate } from './utils/emailTemplates';

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
    const data: PreQuestionnaireData = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!data.contactName || !data.contactPhone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Build email HTML content using the styled template
    const htmlContent = getPreQuestionnaireEmailTemplate(data);

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
        subject: `שאלון קדם אילוף חדש - ${data.contactName}`,
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
      await savePreQuestionnaireToSheet(data);
    } catch (sheetError) {
      // Log the error but don't fail the request
      // Email was sent successfully, so form submission is still valid
      console.error('Failed to save pre-questionnaire to Google Sheets:', sheetError);
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