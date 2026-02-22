/**
 * Customer confirmation email template for summer camp registration
 * Sent to parents after successful registration
 */

import {
  getEmailContainer,
  getEmailHeader,
  getButton,
  getEmailFooter,
  getTimestamp,
  COLORS,
  formatPhoneWithButtons,
} from "./base";

export interface SummerCampConfirmationData {
  activityName: string;
  childName: string;
  parentEmail: string;
  session: string;
  activityStartDate?: string;
  activityEndDate?: string;
}

/**
 * Generate customer confirmation email for summer camp registration
 */
export function getSummerCampConfirmationTemplate(
  data: SummerCampConfirmationData,
): string {
  const timestamp = getTimestamp();

  // Format dates for display
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Jerusalem",
    });
  };

  const startDateFormatted = formatDate(data.activityStartDate);
  const endDateFormatted = formatDate(data.activityEndDate);

  const content = `
    ${getEmailHeader("ברוכים הבאים!", `נרשמתם בהצלחה ל${data.activityName}`)}
    <tr>
      <td class="mobile-padding" style="padding: 40px;">
        <p class="mobile-text" style="margin: 0 0 20px 0; color: ${COLORS.slate900}; font-size: 18px; font-weight: 600; text-align: right; line-height: 1.6;">
          שלום, נרשמתם בהצלחה ל${data.activityName} עבור ${data.childName} - איזה כיף 🤍
        </p>

        <div style="background-color: ${COLORS.slate50}; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-bottom: 8px; text-align: right;">
                <span style="color: ${COLORS.slate600}; font-size: 14px; font-weight: 600;">מחזור:</span>
                <span style="color: ${COLORS.slate900}; font-size: 15px; margin-right: 8px;">${data.session}</span>
              </td>
            </tr>
            ${
              startDateFormatted && endDateFormatted
                ? `
            <tr>
              <td style="text-align: right;">
                <span style="color: ${COLORS.slate600}; font-size: 14px; font-weight: 600;">תאריכי הפעילות:</span>
                <span style="color: ${COLORS.slate900}; font-size: 15px; margin-right: 8px;">${startDateFormatted} - ${endDateFormatted}</span>
              </td>
            </tr>
            `
                : ""
            }
          </table>
        </div>

        <div style="background-color: ${COLORS.primaryLight}; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 2px solid ${COLORS.primary};">
          <p style="margin: 0 0 16px 0; color: ${COLORS.primaryDark}; font-size: 17px; font-weight: 700; text-align: right; line-height: 1.6;">
            חשוב לדעת:
          </p>
          <p style="margin: 0; color: ${COLORS.slate900}; font-size: 15px; text-align: right; line-height: 1.7;">
            ההרשמה עדיין לא הושלמה סופית. כדי להבטיח את המקום שלכם יש להעביר מקדמה על סך 200 ש"ח.
          </p>
        </div>

        <h3 style="margin: 0 0 16px 0; color: ${COLORS.primaryDark}; font-size: 19px; font-weight: 700; text-align: right;">
          אפשרויות תשלום:
        </h3>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
          <tr>
            <td style="text-align: right;">
              ${getButton("תשלום דרך Bit 💳", "https://www.bitpay.co.il/app/me/B6F508E9-90AF-ED55-EF05-59AF0385DD2BF61B")}
            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
          <tr>
            <td style="text-align: right;">
              ${getButton("תשלום דרך Paybox 💳", "https://links.payboxapp.com/Ug23I0blWUb")}
            </td>
          </tr>
        </table>

        <div style="background-color: ${COLORS.slate100}; border-radius: 8px; padding: 20px; margin-bottom: 24px; border-right: 4px solid ${COLORS.primary};">
          <h4 style="margin: 0 0 12px 0; color: ${COLORS.slate900}; font-size: 16px; font-weight: 600; text-align: right;">
            העברה בנקאית:
          </h4>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-bottom: 8px; text-align: right;">
                <span style="color: ${COLORS.slate600}; font-size: 14px; font-weight: 600;">חשבון:</span>
                <span style="color: ${COLORS.slate900}; font-size: 15px; margin-right: 8px; direction: ltr; display: inline-block;">139386094</span>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom: 8px; text-align: right;">
                <span style="color: ${COLORS.slate600}; font-size: 14px; font-weight: 600;">בנק:</span>
                <span style="color: ${COLORS.slate900}; font-size: 15px; margin-right: 8px;">דיסקונט 11</span>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom: 8px; text-align: right;">
                <span style="color: ${COLORS.slate600}; font-size: 14px; font-weight: 600;">סניף:</span>
                <span style="color: ${COLORS.slate900}; font-size: 15px; margin-right: 8px;">55</span>
              </td>
            </tr>
            <tr>
              <td style="text-align: right;">
                <p style="margin: 12px 0 0 0; color: ${COLORS.primaryDark}; font-size: 13px; font-style: italic;">
                  נא לעדכן אותי לאחר ביצוע העברה
                </p>
              </td>
            </tr>
          </table>
        </div>

        <h3 style="margin: 24px 0 16px 0; color: ${COLORS.primaryDark}; font-size: 19px; font-weight: 700; text-align: right;">
          חובה למלא הצהרת בריאות:
        </h3>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
          <tr>
            <td style="text-align: right;">
              ${getButton("הצהרת בריאות 📋", "https://www.jotform.com/sign/251763741870058/invite/01jzr1qh4772f4994fd7a28dad")}
            </td>
          </tr>
        </table>

        <div style="background-color: ${COLORS.primaryLight}; border-radius: 12px; padding: 20px; margin-bottom: 24px; border-right: 4px solid ${COLORS.primary};">
          <p style="margin: 0; color: ${COLORS.slate900}; font-size: 15px; text-align: right; line-height: 1.6;">
            לאחר השלמת המקדמה והצהרת הבריאות תקבלו אישור מסודר ב - Whatsapp.
          </p>
        </div>

        <h3 style="margin: 24px 0 16px 0; color: ${COLORS.primaryDark}; font-size: 19px; font-weight: 700; text-align: right;">
          יצירת קשר:
        </h3>

        <p class="mobile-text" style="margin: 0 0 16px 0; color: ${COLORS.slate600}; font-size: 14px; text-align: right; line-height: 1.6;">
          לכל שאלה אני זמין ב - Whatsapp ובטלפון.
        </p>

        ${formatPhoneWithButtons("0524724700")}
      </td>
    </tr>
    ${getEmailFooter(timestamp)}
  `;

  return getEmailContainer(content);
}
