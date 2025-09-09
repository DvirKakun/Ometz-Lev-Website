import { useEffect } from "react";
import { type UseFormWatch, type UseFormClearErrors } from "react-hook-form";
import type { FormData } from "../schemas/formSchemas";

interface UseParentErrorClearingProps {
  watch: UseFormWatch<FormData>;
  clearErrors: UseFormClearErrors<FormData>;
}

export const useParentErrorClearing = ({
  watch,
  clearErrors,
}: UseParentErrorClearingProps) => {
  const watchMotherName = watch("motherName");
  const watchMotherPhone = watch("motherPhone");
  const watchFatherName = watch("fatherName");
  const watchFatherPhone = watch("fatherPhone");

  useEffect(() => {
    // Clear parent info error when user has valid parent data
    const motherComplete =
      watchMotherName &&
      watchMotherName.trim() &&
      /^[\u0590-\u05FF\s]+$/.test(watchMotherName) &&
      watchMotherPhone &&
      watchMotherPhone.trim() &&
      /^[0-9\-\s()]+$/.test(watchMotherPhone);

    const fatherComplete =
      watchFatherName &&
      watchFatherName.trim() &&
      /^[\u0590-\u05FF\s]+$/.test(watchFatherName) &&
      watchFatherPhone &&
      watchFatherPhone.trim() &&
      /^[0-9\-\s()]+$/.test(watchFatherPhone);

    if (motherComplete || fatherComplete) {
      // Clear the "at least one parent" error
      clearErrors("parentInfo");
    }
  }, [
    watchMotherName,
    watchMotherPhone,
    watchFatherName,
    watchFatherPhone,
    clearErrors,
  ]);
};
