const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export interface SendEmailParams {
  to: string;
  subject: string;
  htmlContent: string;
  senderName?: string;
  senderEmail?: string;
  replyTo?: string;
}

export const sendEmail = async ({
  to,
  subject,
  htmlContent,
  senderName = 'אומץ לב',
  senderEmail = 'no-reply@ometzlev.co.il',
}: SendEmailParams): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': import.meta.env.VITE_BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: to }],
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API Error:', errorData);
      throw new Error(errorData.message || `Failed to send email: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Helper for summer camp registration emails
export const sendSummerCampRegistration = async (data: {
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
}) => {
  const htmlContent = `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">רישום חדש למחנה קיץ</h2>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">פרטי המפגש</h3>
        <p><strong>מפגש:</strong> ${data.session}</p>
      </div>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">פרטי הילד/ה</h3>
        <p><strong>שם:</strong> ${data.childName}</p>
        <p><strong>גיל:</strong> ${data.age}</p>
        <p><strong>כיתה:</strong> ${data.grade}</p>
      </div>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">פרטי ההורים</h3>
        ${data.motherName ? `<p><strong>אם:</strong> ${data.motherName}</p>` : ''}
        ${data.motherPhone ? `<p><strong>טלפון אם:</strong> ${data.motherPhone}</p>` : ''}
        ${data.fatherName ? `<p><strong>אב:</strong> ${data.fatherName}</p>` : ''}
        ${data.fatherPhone ? `<p><strong>טלפון אב:</strong> ${data.fatherPhone}</p>` : ''}
      </div>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">מידע רפואי</h3>
        <p><strong>פחד מכלבים:</strong> ${data.dogFear}</p>
        ${data.dogFearScale ? `<p><strong>רמת פחד:</strong> ${data.dogFearScale}/10</p>` : ''}
        <p><strong>אלרגיות:</strong> ${data.allergies}</p>
        ${data.allergiesText ? `<p><strong>פרטים:</strong> ${data.allergiesText}</p>` : ''}
        <p><strong>בעיות בריאות:</strong> ${data.healthIssues}</p>
        ${data.healthIssuesText ? `<p><strong>פרטים:</strong> ${data.healthIssuesText}</p>` : ''}
      </div>

      ${data.notes ? `
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">הערות</h3>
        <p>${data.notes}</p>
      </div>
      ` : ''}

      <p style="color: #6b7280; font-size: 12px;">
        נשלח מאתר אומץ לב ב-${new Date().toLocaleString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jerusalem',
  })}
      </p>
    </div>
  `;

  return sendEmail({
    to: 'dvireteui1@gmail.com',
    subject: `רישום חדש למחנה קיץ - ${data.childName}`,
    htmlContent,
  });
};

// Helper for contact form emails
export const sendContactForm = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  const htmlContent = `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">פנייה חדשה מטופס יצירת קשר</h2>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>שם:</strong> ${data.name}</p>
        <p><strong>אימייל:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>טלפון:</strong> ${data.phone}</p>` : ''}
      </div>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">הודעה</h3>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>

      <p style="color: #6b7280; font-size: 12px;">
        נשלח מאתר אומץ לב ב-${new Date().toLocaleString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jerusalem',
  })}
      </p>
    </div>
  `;

  return sendEmail({
    to: 'dvireteui1@gmail.com',
    subject: `פנייה חדשה מ-${data.name}`,
    htmlContent,
  });
};
