import { useState } from "react";
import emailjs from "@emailjs/browser";
import type { FormData } from "../schemas/formSchemas";

interface UseFormSubmissionProps {
  onSuccess: () => void;
  onError: () => void;
  onReset: () => void;
  setCurrentStep: (step: number) => void;
}

export const useFormSubmission = ({
  onSuccess,
  onError,
  onReset,
  setCurrentStep,
}: UseFormSubmissionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const templateParams = {
        session: data.session,
        childName: data.childName,
        age: data.age,
        grade: data.grade,
        motherName: data.motherName || "לא סופק",
        motherPhone: data.motherPhone || "לא סופק",
        fatherName: data.fatherName || "לא סופק",
        fatherPhone: data.fatherPhone || "לא סופק",
        dogFear: data.dogFear,
        dogFearScale: data.dogFearScale
          ? `רמת פחד: ${data.dogFearScale}/10`
          : "",
        allergies: data.allergies,
        allergiesText: data.allergiesText || "",
        healthIssues: data.healthIssues,
        healthIssuesText: data.healthIssuesText || "",
        notes: data.notes || "לא סופקו הערות",
        time: new Date().toLocaleString("he-IL", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Jerusalem",
        }),
      };

      console.log(templateParams);

      await emailjs.send(
        "service_k21go0m",
        "template_27fc0bl",
        templateParams,
        "l-UTOpbo-lr3Vt79x"
      );

      onReset();
      setCurrentStep(5);
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
