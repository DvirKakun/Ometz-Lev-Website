/**
 * Email templates for notification system
 */
import {
  COLORS,
  getEmailContainer,
  getEmailHeader,
  getButton,
} from "./base";

interface NotificationEmailData {
  title: string;
  description: string;
  ctaText?: string;
  ctaUrl?: string;
  imageUrl?: string;
  unsubscribeUrl: string;
  categoryLabel: string;
}

/**
 * Get notification email template
 */
export function getNotificationEmailTemplate(
  data: NotificationEmailData,
): string {
  const {
    title,
    description,
    ctaText,
    ctaUrl,
    imageUrl,
    unsubscribeUrl,
    categoryLabel,
  } = data;

  const content = `
    ${getEmailHeader(title, categoryLabel)}

    <!-- Content -->
    <tr>
      <td class="mobile-padding" style="padding: 40px;">
        ${
          imageUrl
            ? `
        <div style="margin-bottom: 24px; border-radius: 12px; overflow: hidden;">
          <img
            src="${imageUrl}"
            alt="${title}"
            width="100%"
            class="img-responsive"
            style="display: block; max-width: 100%; height: auto; border-radius: 12px;"
          />
        </div>
        `
            : ""
        }

        <p class="mobile-text" style="margin: 0 0 24px; color: ${COLORS.slate600}; font-size: 16px; line-height: 1.7; text-align: right;">
          ${description}
        </p>

        ${
          ctaText && ctaUrl
            ? `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
          <tr>
            <td style="text-align: right;">
              ${getButton(ctaText, ctaUrl)}
            </td>
          </tr>
        </table>
        `
            : ""
        }
      </td>
    </tr>

    <!-- Footer -->
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
              <p style="margin: 0 0 12px 0; color: ${COLORS.slate600}; font-size: 13px; line-height: 1.4;">
                קיבלת מייל זה כי נרשמת לקבלת עדכונים מאומץ לב
              </p>
              <p style="margin: 0;">
                <a href="${unsubscribeUrl}" style="color: ${COLORS.primary}; text-decoration: underline; font-size: 13px; font-weight: 500;">
                  עדכון העדפות התראות או הסרה מרשימת התפוצה
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;

  return getEmailContainer(content);
}

/**
 * Get category-specific notification subject
 */
export function getNotificationSubject(
  category: string,
  contentTitle: string,
): string {
  const subjectPrefixes: Record<string, string> = {
    training_videos: "🎬 סרטון אילוף כלבים חדש:",
    therapy_videos: "🎬 סרטון כלבנות טיפולית חדש:",
    new_activity: "🎉 פעילות חדשה:",
    activity_registration: "📝 נפתחה הרשמה:",
    training_article: "📚 מדריך אילוף כלבים חדש:",
    therapy_article: "📚 מדריך כלבנות טיפולית חדש:",
    new_product: "🛍️ מוצר חדש:",
  };

  const prefix = subjectPrefixes[category] || "עדכון חדש:";
  return `${prefix} ${contentTitle}`;
}

/**
 * Get category label in Hebrew
 */
export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    training_videos: "סרטוני אילוף כלבים",
    therapy_videos: "סרטוני כלבנות טיפולית",
    new_activity: "פעילויות",
    activity_registration: "פתיחת הרשמה לפעילות",
    training_article: "מדריכי אילוף כלבים",
    therapy_article: "מדריכי כלבנות טיפולית",
    new_product: "מוצרים חדשים",
  };

  return labels[category] || "עדכונים";
}
