import { buildEmail, COLORS } from "./base";
import type { EmailField, EmailSection } from "./base";

/**
 * Registration form email template
 */
export function getRegistrationEmailTemplate(data: {
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
}): string {
  const activityFields: EmailField[] = [
    { label: "שם הפעילות", value: data.activityName },
    { label: "מחזור", value: data.session },
  ];

  const childFields: EmailField[] = [
    { label: "שם הילד/ה", value: data.childName },
    { label: "גיל", value: String(data.age) },
    { label: "כיתה", value: data.grade },
  ];

  const parentFields: EmailField[] = [];
  if (data.motherName)
    parentFields.push({ label: "שם האם", value: data.motherName });
  if (data.motherPhone)
    parentFields.push({
      label: "טלפון האם",
      value: data.motherPhone,
      isPhone: true,
    });
  if (data.fatherName)
    parentFields.push({ label: "שם האב", value: data.fatherName });
  if (data.fatherPhone)
    parentFields.push({
      label: "טלפון האב",
      value: data.fatherPhone,
      isPhone: true,
    });

  const medicalFields: EmailField[] = [
    { label: "פחד מכלבים", value: data.dogFear || "" },
  ];
  if (data.dogFearScale)
    medicalFields.push({
      label: "רמת פחד (1-10)",
      value: String(data.dogFearScale),
    });
  medicalFields.push({ label: "אלרגיות", value: data.allergies || "" });
  if (data.allergiesText)
    medicalFields.push({ label: "פירוט אלרגיות", value: data.allergiesText });
  medicalFields.push({ label: "בעיות בריאות", value: data.healthIssues || "" });
  if (data.healthIssuesText)
    medicalFields.push({
      label: "פירוט בעיות בריאות",
      value: data.healthIssuesText,
    });

  const sections: EmailSection[] = [
    { title: "פרטי הפעילות", fields: activityFields },
    { title: "פרטי הילד/ה", fields: childFields },
  ];

  if (parentFields.length > 0) {
    sections.push({ title: "פרטי ההורים", fields: parentFields });
  }

  sections.push({ title: "מידע רפואי", fields: medicalFields });

  if (data.notes) {
    sections.push({
      title: "הערות",
      fields: [
        {
          label: "",
          value: `<p style="margin: 0; color: ${COLORS.slate900}; font-size: 16px; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">${data.notes}</p>`,
        },
      ],
    });
  }

  return buildEmail({
    headerTitle: `רישום חדש ל${data.activityName}`,
    headerSubtitle: data.childName,
    introText: "קיבלת רישום חדש לפעילות. להלן פרטי הנרשם:",
    sections,
  });
}
