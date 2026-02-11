import { buildEmail, COLORS } from "./base";
import type { EmailField } from "./base";

/**
 * Contact form email template
 */
export function getContactFormEmailTemplate(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): string {
  const contactFields: EmailField[] = [
    { label: "שם", value: data.name },
    { label: "אימייל", value: data.email, isEmail: true },
  ];

  if (data.phone) {
    contactFields.push({ label: "טלפון", value: data.phone, isPhone: true });
  }

  return buildEmail({
    headerTitle: "פנייה חדשה מטופס יצירת קשר",
    introText: "קיבלת פנייה חדשה מאתר אומץ לב. להלן פרטי הפונה:",
    sections: [
      {
        title: "פרטי הפונה",
        fields: contactFields,
      },
      {
        title: "הודעה",
        fields: [
          {
            label: "",
            value: `<p style="margin: 0; color: ${COLORS.slate900}; font-size: 16px; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">${data.message}</p>`,
          },
        ],
      },
    ],
  });
}
