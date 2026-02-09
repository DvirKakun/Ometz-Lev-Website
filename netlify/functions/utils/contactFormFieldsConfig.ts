/**
 * Centralized configuration for contact form fields
 * Update this file to add/remove/modify fields for both email and Google Sheets
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Field configuration mapping internal field names to Hebrew headers
 */
export const CONTACT_FORM_FIELDS = {
  timestamp: { header: 'תאריך ושעה', key: 'timestamp' },
  name: { header: 'שם', key: 'name' },
  email: { header: 'אימייל', key: 'email' },
  phone: { header: 'טלפון', key: 'phone' },
  message: { header: 'הודעה', key: 'message' },
} as const;

/**
 * Get all headers in order for Google Sheets
 */
export function getContactFormHeaders(): string[] {
  return Object.values(CONTACT_FORM_FIELDS).map(field => field.header);
}

/**
 * Format phone number to preserve leading zeros in Google Sheets
 */
function formatPhoneNumber(phone: string | undefined): string {
  if (!phone) return '';
  // Prefix with apostrophe to force text format in Google Sheets
  return `'${phone}`;
}

/**
 * Convert contact form data to a row object for Google Sheets
 */
export function convertContactFormToSheetRow(
  data: ContactFormData,
  timestamp: string
): Record<string, string | number> {
  return {
    [CONTACT_FORM_FIELDS.timestamp.header]: timestamp,
    [CONTACT_FORM_FIELDS.name.header]: data.name,
    [CONTACT_FORM_FIELDS.email.header]: data.email,
    [CONTACT_FORM_FIELDS.phone.header]: formatPhoneNumber(data.phone),
    [CONTACT_FORM_FIELDS.message.header]: data.message,
  };
}