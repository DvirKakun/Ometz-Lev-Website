import { useEffect } from "react";
import {
  type UseFormWatch,
  type UseFormSetValue,
  type UseFormTrigger,
} from "react-hook-form";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  type FormData,
} from "../schemas/formSchemas";

interface UseStepValidationProps {
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  trigger: UseFormTrigger<FormData>;
}

export const useStepValidation = ({
  watch,
  setValue,
  trigger,
}: UseStepValidationProps) => {
  const watchDogFear = watch("dogFear");
  const watchAllergies = watch("allergies");
  const watchHealthIssues = watch("healthIssues");

  // Clear dependent fields when parent field changes to "no"
  useEffect(() => {
    if (watchDogFear === "לא") {
      setValue("dogFearScale", undefined);
    }
  }, [watchDogFear, setValue]);

  useEffect(() => {
    if (watchAllergies === "אין") {
      setValue("allergiesText", "");
    }
  }, [watchAllergies, setValue]);

  useEffect(() => {
    if (watchHealthIssues === "אין") {
      setValue("healthIssuesText", "");
    }
  }, [watchHealthIssues, setValue]);

  // Step validation function
  const validateStep = async (step: number): Promise<boolean> => {
    const formData = watch();

    switch (step) {
      case 1: {
        try {
          step1Schema.parse({
            session: formData.session,
            childName: formData.childName,
            age: formData.age,
            grade: formData.grade,
          });
          return true;
        } catch (error) {
          await trigger(["session", "childName", "age", "grade"]);
          return false;
        }
      }
      case 2: {
        try {
          step2Schema.parse({
            motherName: formData.motherName,
            motherPhone: formData.motherPhone,
            fatherName: formData.fatherName,
            fatherPhone: formData.fatherPhone,
          });
          return true;
        } catch (error) {
          await trigger([
            "motherName",
            "motherPhone",
            "fatherName",
            "fatherPhone",
            "parentInfo",
          ]);
          return false;
        }
      }
      case 3: {
        try {
          step3Schema.parse({
            dogFear: formData.dogFear,
            allergies: formData.allergies,
            allergiesText: formData.allergiesText,
            healthIssues: formData.healthIssues,
            healthIssuesText: formData.healthIssuesText,
            dogFearScale: formData.dogFearScale,
          });
          return true;
        } catch (error) {
          await trigger([
            "dogFear",
            "allergies",
            "allergiesText",
            "healthIssues",
            "healthIssuesText",
            "dogFearScale",
          ]);
          return false;
        }
      }
      case 4: {
        try {
          step4Schema.parse({
            notes: formData.notes,
            termsAccepted: formData.termsAccepted,
          });
          return true;
        } catch (error) {
          await trigger(["notes", "termsAccepted"]);
          return false;
        }
      }
      default:
        return true;
    }
  };

  return {
    validateStep,
  };
};
