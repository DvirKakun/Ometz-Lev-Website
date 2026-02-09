/**
 * Centralized configuration for pre-training questionnaire fields
 * Update this file to add/remove/modify fields for both email and Google Sheets
 */

export interface PreQuestionnaireData {
  // Dog age
  ageYears: number;
  ageMonths: number;
  ageWeeks: number;

  // Allergies
  hasAllergies: string; // "כן" | "לא"
  allergiesDetails?: string;

  // Surgery/Injury
  hasSurgeryOrInjury: string; // "כן" | "לא"
  surgeryDetails?: string;

  // Biting history
  hasBitten: string; // "לא" | "כן, אחד מבני הבית" | "כן, בני אדם ברחוב" | "כן, כלבים אחרים"
  biteDetails?: string;

  // Muzzle (conditional - only if has bitten)
  wearsMuzzle?: string; // "כן" | "לא"

  // Contact information
  contactName: string;
  contactPhone: string;

  // Address
  city: string;
  street: string;
  houseNumber: string;
  floor: string;
  entranceCode?: string;
}

/**
 * Field configuration mapping internal field names to Hebrew headers
 */
export const PRE_QUESTIONNAIRE_FIELDS = {
  timestamp: { header: 'תאריך ושעה', key: 'timestamp' },

  // Dog age (weeks, months, years order)
  ageWeeks: { header: 'גיל הכלב - שבועות', key: 'ageWeeks' },
  ageMonths: { header: 'גיל הכלב - חודשים', key: 'ageMonths' },
  ageYears: { header: 'גיל הכלב - שנים', key: 'ageYears' },

  // Health information
  hasAllergies: { header: 'האם קיימות אלרגיות?', key: 'hasAllergies' },
  allergiesDetails: { header: 'פירוט אלרגיות', key: 'allergiesDetails' },
  hasSurgeryOrInjury: { header: 'האם עבר ניתוח או פציעה?', key: 'hasSurgeryOrInjury' },
  surgeryDetails: { header: 'פירוט ניתוח/פציעה', key: 'surgeryDetails' },

  // Behavior
  hasBitten: { header: 'האם הכלב נשך בעבר?', key: 'hasBitten' },
  biteDetails: { header: 'פירוט נשיכה', key: 'biteDetails' },
  wearsMuzzle: { header: 'האם הכלב רגיל לזמם?', key: 'wearsMuzzle' },

  // Contact
  contactName: { header: 'שם איש קשר', key: 'contactName' },
  contactPhone: { header: 'טלפון איש קשר', key: 'contactPhone' },

  // Address
  city: { header: 'עיר', key: 'city' },
  street: { header: 'רחוב', key: 'street' },
  houseNumber: { header: 'מספר בית', key: 'houseNumber' },
  floor: { header: 'קומה', key: 'floor' },
  entranceCode: { header: 'קוד כניסה', key: 'entranceCode' },
} as const;

/**
 * Get all headers in order for Google Sheets
 */
export function getPreQuestionnaireHeaders(): string[] {
  return Object.values(PRE_QUESTIONNAIRE_FIELDS).map(field => field.header);
}

/**
 * Format phone number to preserve leading zeros in Google Sheets
 */
function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  // Prefix with apostrophe to force text format in Google Sheets
  return `'${phone}`;
}

/**
 * Convert pre-questionnaire data to a row object for Google Sheets
 */
export function convertPreQuestionnaireToSheetRow(
  data: PreQuestionnaireData,
  timestamp: string
): Record<string, string | number> {
  return {
    [PRE_QUESTIONNAIRE_FIELDS.timestamp.header]: timestamp,

    // Dog age (weeks, months, years order)
    [PRE_QUESTIONNAIRE_FIELDS.ageWeeks.header]: data.ageWeeks,
    [PRE_QUESTIONNAIRE_FIELDS.ageMonths.header]: data.ageMonths,
    [PRE_QUESTIONNAIRE_FIELDS.ageYears.header]: data.ageYears,

    // Health information
    [PRE_QUESTIONNAIRE_FIELDS.hasAllergies.header]: data.hasAllergies,
    [PRE_QUESTIONNAIRE_FIELDS.allergiesDetails.header]: data.allergiesDetails || '',
    [PRE_QUESTIONNAIRE_FIELDS.hasSurgeryOrInjury.header]: data.hasSurgeryOrInjury,
    [PRE_QUESTIONNAIRE_FIELDS.surgeryDetails.header]: data.surgeryDetails || '',

    // Behavior
    [PRE_QUESTIONNAIRE_FIELDS.hasBitten.header]: data.hasBitten,
    [PRE_QUESTIONNAIRE_FIELDS.biteDetails.header]: data.biteDetails || '',
    [PRE_QUESTIONNAIRE_FIELDS.wearsMuzzle.header]: data.wearsMuzzle || '',

    // Contact
    [PRE_QUESTIONNAIRE_FIELDS.contactName.header]: data.contactName,
    [PRE_QUESTIONNAIRE_FIELDS.contactPhone.header]: formatPhoneNumber(data.contactPhone),

    // Address
    [PRE_QUESTIONNAIRE_FIELDS.city.header]: data.city,
    [PRE_QUESTIONNAIRE_FIELDS.street.header]: data.street,
    [PRE_QUESTIONNAIRE_FIELDS.houseNumber.header]: data.houseNumber,
    [PRE_QUESTIONNAIRE_FIELDS.floor.header]: data.floor,
    [PRE_QUESTIONNAIRE_FIELDS.entranceCode.header]: data.entranceCode || '',
  };
}