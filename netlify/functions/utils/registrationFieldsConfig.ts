/**
 * Centralized configuration for registration fields
 * Update this file to add/remove/modify fields for both email and Google Sheets
 */

export interface RegistrationData {
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

/**
 * Field configuration mapping internal field names to Hebrew headers
 * Add/remove fields here and they'll automatically update in both email and Google Sheets
 */
export const REGISTRATION_FIELDS = {
  timestamp: { header: 'תאריך ושעה', key: 'timestamp' },
  activityName: { header: 'שם הפעילות', key: 'activityName' },
  session: { header: 'מחזור', key: 'session' },
  childName: { header: 'שם הילד/ה', key: 'childName' },
  age: { header: 'גיל', key: 'age' },
  grade: { header: 'כיתה', key: 'grade' },
  motherName: { header: 'שם האם', key: 'motherName' },
  motherPhone: { header: 'טלפון האם', key: 'motherPhone' },
  fatherName: { header: 'שם האב', key: 'fatherName' },
  fatherPhone: { header: 'טלפון האב', key: 'fatherPhone' },
  dogFear: { header: 'פחד מכלבים', key: 'dogFear' },
  dogFearScale: { header: 'רמת פחד (1-10)', key: 'dogFearScale' },
  allergies: { header: 'אלרגיות', key: 'allergies' },
  allergiesText: { header: 'פירוט אלרגיות', key: 'allergiesText' },
  healthIssues: { header: 'בעיות בריאות', key: 'healthIssues' },
  healthIssuesText: { header: 'פירוט בעיות בריאות', key: 'healthIssuesText' },
  notes: { header: 'הערות', key: 'notes' },
} as const;

/**
 * Get all headers in order for Google Sheets
 */
export function getSheetHeaders(): string[] {
  return Object.values(REGISTRATION_FIELDS).map(field => field.header);
}

/**
 * Convert registration data to a row object for Google Sheets
 * Uses the field configuration to map data to Hebrew headers
 */
/**
 * Format phone number to preserve leading zeros in Google Sheets
 * Google Sheets drops leading zeros from numbers, so we prefix with apostrophe
 */
function formatPhoneNumber(phone: string | null | undefined): string {
  if (!phone) return '';
  // Prefix with apostrophe to force text format in Google Sheets
  return `'${phone}`;
}

export function convertToSheetRow(
  data: RegistrationData,
  timestamp: string
): Record<string, string | number> {
  return {
    [REGISTRATION_FIELDS.timestamp.header]: timestamp,
    [REGISTRATION_FIELDS.activityName.header]: data.activityName,
    [REGISTRATION_FIELDS.session.header]: data.session,
    [REGISTRATION_FIELDS.childName.header]: data.childName,
    [REGISTRATION_FIELDS.age.header]: data.age,
    [REGISTRATION_FIELDS.grade.header]: data.grade,
    [REGISTRATION_FIELDS.motherName.header]: data.motherName || '',
    [REGISTRATION_FIELDS.motherPhone.header]: formatPhoneNumber(data.motherPhone),
    [REGISTRATION_FIELDS.fatherName.header]: data.fatherName || '',
    [REGISTRATION_FIELDS.fatherPhone.header]: formatPhoneNumber(data.fatherPhone),
    [REGISTRATION_FIELDS.dogFear.header]: data.dogFear || '',
    [REGISTRATION_FIELDS.dogFearScale.header]: data.dogFearScale || '',
    [REGISTRATION_FIELDS.allergies.header]: data.allergies || '',
    [REGISTRATION_FIELDS.allergiesText.header]: data.allergiesText || '',
    [REGISTRATION_FIELDS.healthIssues.header]: data.healthIssues || '',
    [REGISTRATION_FIELDS.healthIssuesText.header]: data.healthIssuesText || '',
    [REGISTRATION_FIELDS.notes.header]: data.notes || '',
  };
}