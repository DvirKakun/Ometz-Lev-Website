import {
  buildEmail,
  buildGoogleCalendarUrl,
  getCalendarButtonHtml,
  COLORS,
} from "./base";
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

  const calendarDetails = [
    `אימייל: ${data.email}`,
    ...(data.phone ? [`טלפון: ${data.phone}`] : []),
    `\nהודעה:\n${data.message}`,
  ].join("\n");
  const calendarUrl = buildGoogleCalendarUrl({
    title: `שיחת יעוץ ל${data.name}`,
    details: calendarDetails,
  });
  const summaryHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
      <tr>
        <td>${getCalendarButtonHtml(calendarUrl)}</td>
      </tr>
    </table>
  `;

  return buildEmail({
    headerTitle: "פנייה חדשה מטופס יצירת קשר",
    introText: "קיבלת פנייה חדשה מאתר אומץ לב. להלן פרטי הפונה:",
    summaryHtml,
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
