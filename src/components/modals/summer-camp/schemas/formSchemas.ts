import { z } from "zod";

export const GRADE_OPTIONS = [
  "א׳",
  "ב׳",
  "ג׳",
  "ד׳",
  "ה׳",
  "ו׳",
  "ז׳",
  "ח׳",
  "ט׳",
  "י׳",
  "יא׳",
  "יב׳",
];

// Step 1: Basic child information
export const step1Schema = z.object({
  session: z.enum(["ראשון", "שני", "שלישי"], {
    required_error: "יש לבחור מחזור",
    invalid_type_error: "יש לבחור מחזור",
  }),
  childName: z
    .string()
    .min(1, "שם הילד/ה הוא שדה חובה")
    .regex(/^[\u0590-\u05FF\s]+$/, "השם חייב להכיל רק אותיות בעברית"),
  age: z
    .number({
      required_error: "גיל הוא שדה חובה",
      invalid_type_error: "גיל חייב להיות מספר",
    })
    .min(1, "גיל חייב להיות לפחות 1"),
  grade: z.string().min(1, "יש לבחור כיתה"),
});

// Step 2: Parent information
export const step2Schema = z
  .object({
    motherName: z
      .string()
      .optional()
      .transform((val) => (val?.trim() === "" ? undefined : val)),
    motherPhone: z
      .string()
      .optional()
      .transform((val) => (val?.trim() === "" ? undefined : val)),
    fatherName: z
      .string()
      .optional()
      .transform((val) => (val?.trim() === "" ? undefined : val)),
    fatherPhone: z
      .string()
      .optional()
      .transform((val) => (val?.trim() === "" ? undefined : val)),
    parentInfo: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    let motherInvalid = false;
    let fatherInvalid = false;

    // Validate mother fields (only show one error per parent group)
    if (data.motherName || data.motherPhone) {
      if (data.motherName && !/^[\u0590-\u05FF\s]+$/.test(data.motherName)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "שם האמא חייב להכיל רק אותיות בעברית",
          path: ["motherName"],
        });
        motherInvalid = true;
      } else if (data.motherPhone && !/^[0-9\-\s()]+$/.test(data.motherPhone)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "טלפון האמא חייב להכיל רק מספרים",
          path: ["motherPhone"],
        });
        motherInvalid = true;
      }
    }

    // Validate father fields (only show one error per parent group)
    if (data.fatherName || data.fatherPhone) {
      if (data.fatherName && !/^[\u0590-\u05FF\s]+$/.test(data.fatherName)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "שם האבא חייב להכיל רק אותיות בעברית",
          path: ["fatherName"],
        });
        fatherInvalid = true;
      } else if (data.fatherPhone && !/^[0-9\-\s()]+$/.test(data.fatherPhone)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "טלפון האבא חייב להכיל רק מספרים",
          path: ["fatherPhone"],
        });
        fatherInvalid = true;
      }
    }

    // Check if at least one parent has both valid name and phone (only if no format errors)
    const motherComplete =
      data.motherName && data.motherPhone && !motherInvalid;
    const fatherComplete =
      data.fatherName && data.fatherPhone && !fatherInvalid;

    if (!motherComplete && !fatherComplete) {
      // Only show this error if there are no format validation errors
      if (!motherInvalid && !fatherInvalid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "יש למלא פרטי לפחות הורה אחד (שם וטלפון)",
          path: ["parentInfo"],
        });
      }
    }
  });

// Step 3: Health information
export const step3Schema = z
  .object({
    dogFear: z.string().nullable(),
    dogFearScale: z.number().min(1).max(10).optional(),
    allergies: z.string().nullable(),
    allergiesText: z.string().optional(),
    healthIssues: z.string().nullable(),
    healthIssuesText: z.string().optional(),
  })
  .refine((data) => data.dogFear !== null && data.dogFear !== "", {
    message: "יש לבחור אם יש פחד מכלבים",
    path: ["dogFear"],
  })
  .refine((data) => data.allergies !== null && data.allergies !== "", {
    message: "יש לבחור אם יש אלרגיות",
    path: ["allergies"],
  })
  .refine((data) => data.healthIssues !== null && data.healthIssues !== "", {
    message: "יש לבחור אם יש בעיות בריאותיות",
    path: ["healthIssues"],
  })
  .refine(
    (data) =>
      data.allergies !== "יש" ||
      (data.allergiesText && data.allergiesText.trim().length > 0),
    {
      message: "אנא פרטו את האלרגיות",
      path: ["allergiesText"],
    }
  )
  .refine(
    (data) =>
      data.healthIssues !== "יש" ||
      (data.healthIssuesText && data.healthIssuesText.trim().length > 0),
    {
      message: "אנא פרטו את הבעיות הבריאותיות",
      path: ["healthIssuesText"],
    }
  );

// Step 4: Notes and terms acceptance
export const step4Schema = z
  .object({
    notes: z.string().optional(),
    termsAccepted: z.boolean(),
  })
  .refine((data) => data.termsAccepted === true, {
    message: "יש לאשר את תנאי השימוש והפרטיות",
    path: ["termsAccepted"],
  });

// Complete form schema by combining all steps using intersection - Zod best practice
export const formSchema = z.intersection(
  z.intersection(z.intersection(step1Schema, step2Schema), step3Schema),
  step4Schema
);

export type FormData = z.infer<typeof formSchema>;
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
