/**
 * Base utilities, brand colors, shared components, and generic email builder
 * Used by all individual email templates
 */

// Brand colors from tailwind.config.js
export const COLORS = {
  primary: "#da9a52", // Main brand color
  primaryDark: "#c8823a", // Darker shade for hover/emphasis
  primaryLight: "#fef8f0", // Light background
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate600: "#475569",
  slate900: "#0f172a",
  white: "#ffffff",
  whatsapp: "#25D366",
};

/**
 * Base email container with branding
 */
export function getEmailContainer(content: string): string {
  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
      <meta name="color-scheme" content="light">
      <meta name="supported-color-schemes" content="light">
      <title>Ometz Lev Notification</title>
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style type="text/css">
        /* Client-specific resets */
        body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }

        /* Mobile Styles */
        @media only screen and (max-width: 600px) {
          .email-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
          }
          .mobile-padding {
            padding: 20px 15px !important;
          }
          .mobile-header-padding {
            padding: 30px 20px !important;
          }
          .mobile-card-padding {
            padding: 20px 15px !important;
          }
          .mobile-stack {
            display: block !important;
            width: 100% !important;
            box-sizing: border-box !important;
            margin-bottom: 10px !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .mobile-button {
            display: block !important;
            width: 100% !important;
            text-align: center !important;
            padding: 14px 0 !important;
            margin: 8px 0 !important;
            box-sizing: border-box !important;
          }
          .mobile-text {
            font-size: 15px !important;
            line-height: 1.6 !important;
          }
          .mobile-title {
            font-size: 22px !important;
          }
          .img-responsive {
            max-width: 100% !important;
            height: auto !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Heebo', Arial, sans-serif; background-color: ${COLORS.slate50}; direction: rtl; -webkit-font-smoothing: antialiased;">
      <center role="article" aria-roledescription="email" lang="he" dir="rtl" style="width: 100%; background-color: ${COLORS.slate50};">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: ${COLORS.slate50};">
          <tr>
            <td align="center" style="padding: 10px;">
              <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${COLORS.white}; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border: 1px solid #e2e8f0;">
                ${content}
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                 <tr><td height="40" style="font-size:0; line-height:0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>
        </table>

        </center>
    </body>
    </html>
  `;
}

/**
 * Email header with logo and branding
 */
export function getEmailHeader(title: string, subtitle?: string): string {
  return `
    <tr>
      <td class="mobile-header-padding" style="background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%); padding: 40px 40px; text-align: center;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center">
              <img src="https://ometzlev.co.il/assets/icons/Ometz-Lev-Dogs-Logo.png" alt="אומץ לב" width="80" height="80" style="display: block; margin: 0 auto 20px; border-radius: 12px; background-color: ${COLORS.white}; padding: 8px; border: 0;">
              <h1 class="mobile-title" style="margin: 0; color: ${COLORS.white}; font-size: 26px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1); line-height: 1.3; font-family: 'Heebo', Arial, sans-serif;">
                ${title}
              </h1>
              ${
                subtitle
                  ? `
                <p style="margin: 10px 0 0 0; color: ${COLORS.white}; font-size: 16px; opacity: 0.95; line-height: 1.5;">
                  ${subtitle}
                </p>
              `
                  : ""
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

/**
 * Info card component
 */
export function getInfoCard(title: string, content: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${COLORS.primaryLight}; border-radius: 12px; margin-bottom: 24px; border: 1px solid ${COLORS.primary};">
      <tr>
        <td class="mobile-card-padding" style="padding: 24px;">
          ${
            title
              ? `
            <h3 style="margin: 0 0 16px 0; color: ${COLORS.primaryDark}; font-size: 18px; font-weight: 700; border-bottom: 1px solid ${COLORS.primary}40; padding-bottom: 12px; line-height: 1.4;">
              ${title}
            </h3>
          `
              : ""
          }
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${content}
          </table>
        </td>
      </tr>
    </table>
  `;
}

/**
 * Info row component
 */
export function getInfoRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding-bottom: 16px;">
        ${
          label
            ? `<p style="margin: 0 0 4px 0; color: ${COLORS.slate600}; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
            ${label}
          </p>`
            : ""
        }
        <div style="margin: 0; color: ${COLORS.slate900}; font-size: 16px; line-height: 1.5; font-weight: 400; word-break: break-word; direction: rtl; text-align: right;">
          ${value}
        </div>
      </td>
    </tr>
  `;
}

/**
 * Button component
 */
export function getButton(
  text: string,
  url: string,
  backgroundColor: string = COLORS.primary,
): string {
  return `
    <a href="${url}" class="mobile-button" style="display: inline-block; background-color: ${backgroundColor}; color: ${COLORS.white}; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; mso-padding-alt: 0; border: 0;">
      <span style="mso-text-raise: 15pt;">${text}</span>
      </a>
  `;
}

/**
 * Email footer
 */
export function getEmailFooter(timestamp: string): string {
  return `
    <tr>
      <td class="mobile-padding" style="background-color: ${COLORS.slate100}; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td align="center">
                    <p style="margin: 0 0 8px 0; color: ${COLORS.slate900}; font-size: 16px; font-weight: 700; line-height: 1.4;">
                      אומץ לב - אלעד שמעונוב
                    </p>
                    <p style="margin: 0 0 20px 0; color: ${COLORS.slate600}; font-size: 14px; line-height: 1.4;">
                      אילוף כלבים מקצועי
                    </p>
                    <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.4;">
                      נשלח מאתר אומץ לב ב-${timestamp}
                    </p>
                </td>
            </tr>
        </table>
      </td>
    </tr>
  `;
}

/**
 * Format phone number for WhatsApp (convert 05X to 9725X)
 */
export function formatWhatsAppNumber(phone: string): string {
  const cleaned = phone.replace(/[\s-]/g, "");
  if (cleaned.startsWith("0")) {
    return "972" + cleaned.substring(1);
  }
  return cleaned;
}

/**
 * Format phone with call/WhatsApp buttons
 */
export function formatPhoneWithButtons(phone: string): string {
  return `
    <div style="margin-bottom: 12px; font-weight: 500; direction: ltr; text-align: right; font-size: 18px;">
      ${phone}
    </div>
    <div style="text-align: right;">
      <span class="mobile-stack" style="display: inline-block;">
        ${getButton("📞 התקשר", `tel:${phone}`)}
      </span>
      <span class="mobile-stack" style="display: inline-block;">
        ${getButton("💬 WhatsApp", `https://wa.me/${formatWhatsAppNumber(phone)}`, COLORS.whatsapp)}
      </span>
    </div>
  `;
}

/**
 * Get formatted timestamp
 */
export function getTimestamp(): string {
  return new Date().toLocaleString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jerusalem",
  });
}

/**
 * Build a Google Calendar event URL with today's date pre-filled
 */
export function buildGoogleCalendarUrl(event: {
  title: string;
  details: string;
  location?: string;
}): string {
  const now = new Date();
  const todayStr = now
    .toLocaleDateString("en-CA", { timeZone: "Asia/Jerusalem" })
    .replace(/-/g, "");

  // Timed event: 10:00–11:00 (all-day off by default), local time (no Z suffix)
  const dates = `${todayStr}T100000/${todayStr}T110000`;

  const queryParts = [
    "action=TEMPLATE",
    `text=${encodeURIComponent(event.title)}`,
    `dates=${dates}`,
    `details=${encodeURIComponent(event.details)}`,
  ];
  if (event.location) {
    queryParts.push(`location=${encodeURIComponent(event.location)}`);
  }
  return `https://calendar.google.com/calendar/render?${queryParts.join("&")}`;
}

/**
 * Calendar button HTML for email
 */
export function getCalendarButtonHtml(calendarUrl: string): string {
  return `<span class="mobile-stack" style="display: inline-block;">${getButton("📅 הוסף ליומן", calendarUrl, "#4285F4")}</span>`;
}

/**
 * Email field type
 */
export interface EmailField {
  label: string;
  value: string;
  isPhone?: boolean;
  isEmail?: boolean;
}

/**
 * Email section type
 */
export interface EmailSection {
  title: string;
  fields: EmailField[];
}

/**
 * Generic email template builder
 */
export function buildEmail(config: {
  headerTitle: string;
  headerSubtitle?: string;
  introText?: string;
  summaryHtml?: string;
  sections: EmailSection[];
}): string {
  const timestamp = getTimestamp();

  // Build sections
  const sectionsHtml = config.sections
    .map((section) => {
      const fieldsHtml = section.fields
        .map((field) => {
          let value = field.value;

          // Format special field types
          if (field.isPhone && value) {
            value = formatPhoneWithButtons(value);
          } else if (field.isEmail && value) {
            value = `<a href="mailto:${value}" style="color: ${COLORS.primaryDark}; text-decoration: underline; word-break: break-all; overflow-wrap: break-word; font-weight: 500;">${value}</a>`;
          }

          return getInfoRow(field.label, value);
        })
        .join("");

      return getInfoCard(section.title, fieldsHtml);
    })
    .join("");

  const content = `
    ${getEmailHeader(config.headerTitle, config.headerSubtitle)}
    <tr>
      <td class="mobile-padding" style="padding: 40px;">
        ${
          config.introText
            ? `
          <p class="mobile-text" style="margin: 0 0 30px 0; color: ${COLORS.slate600}; font-size: 16px; line-height: 1.6; text-align: right;">
            ${config.introText}
          </p>
        `
            : ""
        }
        ${config.summaryHtml ?? ""}
        ${sectionsHtml}
      </td>
    </tr>
    ${getEmailFooter(timestamp)}
  `;

  return getEmailContainer(content);
}
