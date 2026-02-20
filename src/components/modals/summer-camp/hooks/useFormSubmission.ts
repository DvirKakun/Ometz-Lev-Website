import { useState } from "react";
import { sendSummerCampRegistration } from "../../../../lib/brevo";
import { trackCompleteRegistration } from "../../../../utils/facebookPixel";
import type { FormData } from "../schemas/formSchemas";

interface UseFormSubmissionProps {
  onSuccess: () => void;
  onError: () => void;
  onReset: () => void;
  setCurrentStep: (step: number) => void;
  activityName: string;
  activityStartDate?: Date;
  activityEndDate?: Date;
}

export const useFormSubmission = ({
  onSuccess,
  onError,
  onReset,
  setCurrentStep,
  activityName,
  activityStartDate,
  activityEndDate,
}: UseFormSubmissionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (data: FormData) => {
    setIsSubmitting(true);

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
        activityStartDate: activityStartDate?.toISOString(),
        activityEndDate: activityEndDate?.toISOString(),
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
