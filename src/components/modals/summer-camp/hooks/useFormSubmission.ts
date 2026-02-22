import { useState, useCallback } from "react";
import { sendSummerCampRegistration } from "../../../../lib/brevo";
import { trackCompleteRegistration } from "../../../../utils/facebookPixel";
import type { FormData } from "../schemas/formSchemas";

interface UseFormSubmissionProps {
  onSuccess: () => void;
  onError: () => void;
  onReset: () => void;
  setCurrentStep: (step: number) => void;
  activityName: string;
  sessionDates: Array<{ startDate: Date; endDate: Date }>;
}

export const useFormSubmission = ({
  onSuccess,
  onError,
  onReset,
  setCurrentStep,
  activityName,
  sessionDates,
}: UseFormSubmissionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to get dates for a specific session
  const getSessionDates = useCallback((sessionName: string) => {
    const sessionIndex = ["ראשון", "שני", "שלישי", "רביעי"].indexOf(sessionName);

    if (sessionIndex >= 0 && sessionIndex < sessionDates.length) {
      return {
        start: sessionDates[sessionIndex].startDate,
        end: sessionDates[sessionIndex].endDate,
      };
    }

    // Fallback to first session if index out of bounds
    console.warn(`Session "${sessionName}" not found or out of bounds, using first session`);
    if (sessionDates.length > 0) {
      return {
        start: sessionDates[0].startDate,
        end: sessionDates[0].endDate,
      };
    }

    return { start: undefined, end: undefined };
  }, [sessionDates]);

  const submitForm = async (data: FormData) => {
    setIsSubmitting(true);

    // Get dates for the selected session
    const dates = getSessionDates(data.session);

    try {
      const result = await sendSummerCampRegistration({
        activityName,
        session: data.session,
        childName: data.childName,
        age: data.age,
        grade: data.grade,
        motherName: data.motherName,
        motherPhone: data.motherPhone,
        fatherName: data.fatherName,
        fatherPhone: data.fatherPhone,
        parentEmail: data.parentEmail,
        dogFear: data.dogFear,
        dogFearScale: data.dogFearScale,
        allergies: data.allergies,
        allergiesText: data.allergiesText,
        healthIssues: data.healthIssues,
        healthIssuesText: data.healthIssuesText,
        notes: data.notes,
        activityStartDate: dates.start?.toISOString(),
        activityEndDate: dates.end?.toISOString(),
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to send email');
      }

      onReset();
      setCurrentStep(5);
      trackCompleteRegistration({ content_name: activityName });
      onSuccess();
    } catch (error) {
      console.error("Registration error:", error);
      onError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitForm,
  };
};
