/**
 * Email templates for notification system
 */
import { COLORS, getEmailContainer } from "./base";

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
    <!-- Header with Logo -->
    <tr>
      <td class="mobile-header-padding" style="background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%); padding: 40px 30px; text-align: center;">
        <img
          src="https://ometzlev.co.il/assets/Ometz-Lev-Logo-BwrQZuQM.png"
          alt="אומץ לב"
          width="150"
          style="display: block; margin: 0 auto 20px;"
        />
        <h1 style="margin: 0; color: ${COLORS.white}; font-size: 24px; font-weight: 700;">
          ${title}
        </h1>
        <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
          ${categoryLabel}
        </p>
      </td>
    </tr>

    <!-- Content -->
    <tr>
      <td class="mobile-padding" style="padding: 30px;">
        ${
          imageUrl
            ? `
        <div style="margin-bottom: 20px; border-radius: 12px; overflow: hidden;">
          <img
            src="${imageUrl}"
            alt="${title}"
            width="100%"
            style="display: block; max-width: 100%; height: auto;"
          />
        </div>
        `
            : ""
        }

        <p style="margin: 0 0 20px; color: ${COLORS.slate600}; font-size: 16px; line-height: 1.7;">
          ${description}
        </p>

        ${
          ctaText && ctaUrl
            ? `
        <div style="text-align: center; margin: 30px 0;">
          <a
            href="${ctaUrl}"
            style="display: inline-block; background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%); color: ${COLORS.white}; text-decoration: none; padding: 14px 40px; border-radius: 30px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(218, 154, 82, 0.3);"
          >
            ${ctaText}
          </a>
        </div>
        `
            : ""
        }
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px 30px; background-color: ${COLORS.slate100}; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0 0 10px; color: ${COLORS.slate600}; font-size: 13px; text-align: center;">
          קיבלת מייל זה כי נרשמת לקבלת עדכונים מאומץ לב
        </p>
        <p style="margin: 0; text-align: center;">
          <a
            href="${unsubscribeUrl}"
            style="color: ${COLORS.primary}; text-decoration: underline; font-size: 13px;"
          >
            עדכון העדפות התראות או הסרה מרשימת התפוצה
          </a>
        </p>
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
