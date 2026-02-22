import { buildEmail, formatWhatsAppNumber } from "./base";
import type { EmailField } from "./base";

/**
 * Pre-questionnaire form email template
 */
export function getPreQuestionnaireEmailTemplate(data: {
  dogName: string;
  ageYears: number;
  ageMonths: number;
  ageWeeks: number;
  hasAllergies: string;
  allergiesDetails?: string;
  hasSurgeryOrInjury: string;
  surgeryDetails?: string;
  hasBitten: string;
  biteDetails?: string;
  wearsMuzzle?: string;
  contactName: string;
  contactPhone: string;
  city: string;
  street: string;
  houseNumber: string;
  floor: string;
  apartment?: string;
  entranceCode?: string;
  notes?: string;
}): string {
  const ageDisplay = `${data.ageYears} שנים, ${data.ageMonths} חודשים, ${data.ageWeeks} שבועות`;

  const summaryParts = [
    data.contactName,
    `${data.street} ${data.houseNumber} קומה ${data.floor}${data.apartment ? ` דירה ${data.apartment}` : ""} ${data.city}`,
    ...(data.entranceCode ? [data.entranceCode] : []),
  ];
  const summaryText = summaryParts.join(", ");

  const whatsappNumber = formatWhatsAppNumber(data.contactPhone);
  const copyUrl = `https://ometzlev.co.il/copy.html?text=${encodeURIComponent(summaryText)}&phone=${whatsappNumber}`;

  const summaryHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
      <tr>
        <td>
          <a href="${copyUrl}" style="display: inline-block; background-color: #da9a52; color: #ffffff; text-decoration: none; padding: 11px 24px; border-radius: 8px; font-weight: 600; font-size: 15px; border: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            📋 העתק פרטים ללוח
          </a>
        </td>
      </tr>
    </table>
  `;

  const contactFields: EmailField[] = [
    { label: "שם", value: data.contactName },
    { label: "טלפון", value: data.contactPhone, isPhone: true },
  ];

  const addressFields: EmailField[] = [
    { label: "עיר", value: data.city },
    { label: "רחוב", value: `${data.street} ${data.houseNumber}` },
    { label: "קומה", value: data.floor },
  ];
  if (data.apartment)
    addressFields.push({ label: "דירה", value: data.apartment });
  if (data.entranceCode)
    addressFields.push({ label: "קוד כניסה", value: data.entranceCode });

  const dogFields: EmailField[] = [
    { label: "שם הכלב", value: data.dogName },
    { label: "גיל הכלב", value: ageDisplay },
    { label: "אלרגיות", value: data.hasAllergies },
  ];
  if (data.allergiesDetails)
    dogFields.push({ label: "פירוט אלרגיות", value: data.allergiesDetails });
  dogFields.push({ label: "ניתוח או פציעה", value: data.hasSurgeryOrInjury });
  if (data.surgeryDetails)
    dogFields.push({ label: "פירוט ניתוח/פציעה", value: data.surgeryDetails });
  dogFields.push({ label: "נשיכה בעבר", value: data.hasBitten });
  if (data.biteDetails)
    dogFields.push({ label: "פירוט נשיכה", value: data.biteDetails });
  if (data.wearsMuzzle)
    dogFields.push({ label: "רגיל לזמם", value: data.wearsMuzzle });
  if (data.notes)
    dogFields.push({ label: "הערות נוספות", value: data.notes });

  return buildEmail({
    headerTitle: "שאלון מקדים חדש",
    headerSubtitle: data.contactName,
    introText: "קיבלת שאלון מקדים חדש מאתר אומץ לב. להלן פרטי הלקוח:",
    summaryHtml,
    sections: [
      { title: "פרטי איש קשר", fields: contactFields },
      { title: "כתובת", fields: addressFields },
      { title: "פרטים על הכלב/ה", fields: dogFields },
    ],
  });
}
