import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import {
  FormTextarea,
  FormSection,
  PrivacyTermsCheckbox,
} from "../../../forms";
import type { FormData } from "../schemas/formSchemas";

interface Step4ComponentProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  touchedFields: any;
}

export const Step4Component = ({
  register,
  errors,
  touchedFields,
}: Step4ComponentProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          הערות ואישורים
        </h3>
        <p className="text-sm text-gray-600">
          הוספת הערות נוספות ואישור התנאים
        </p>
      </div>

      <FormSection>
        <FormTextarea
          placeholder="הערות נוספות (אופציונלי)..."
          register={register("notes")}
          rows={3}
        />
      </FormSection>

      <FormSection>
        <PrivacyTermsCheckbox
          register={register("termsAccepted")}
          error={
            touchedFields.termsAccepted // show **only** if user interacted
              ? (errors.termsAccepted as any)
              : undefined
          }
        />
      </FormSection>
    </div>
  );
};
