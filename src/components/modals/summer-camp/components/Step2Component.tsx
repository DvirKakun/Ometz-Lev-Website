import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { FormInput, FormSection } from "../../../forms";
import type { FormData } from "../schemas/formSchemas";

interface Step2ComponentProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const Step2Component = ({ register, errors }: Step2ComponentProps) => (
  <div className="space-y-6">
    <div className="text-center mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">פרטי ההורים</h3>
      <p className="text-sm text-gray-600">
        יש למלא לפחות פרטי אחד ההורים כולל כתובת אימייל לקבלת עדכונים
      </p>
    </div>

    <FormSection>
      <div>
        <label className="text-sm text-slate-700 block text-right mb-4 font-medium">
          פרטי הורים (לפחות אחד) *
        </label>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label=""
              placeholder="שם אמא"
              register={register("motherName")}
            />
            <FormInput
              label=""
              placeholder="טלפון אמא"
              type="tel"
              register={register("motherPhone")}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label=""
              placeholder="שם אבא"
              register={register("fatherName")}
            />
            <FormInput
              label=""
              placeholder="טלפון אבא"
              type="tel"
              register={register("fatherPhone")}
            />
          </div>
          <div className="mt-4">
            <FormInput
              label="אימייל להתכתבות"
              placeholder="example@email.com"
              type="email"
              register={register("parentEmail")}
              error={errors.parentEmail?.message as string}
              required
            />
            <p className="text-xs text-gray-500 text-right mt-1">
              האימייל ישמש לקבלת הודעות והעדכונים על הפעילות. אנא וודאו שהכתובת תקינה.
            </p>
          </div>
        </div>

        {/* Parent Validation Errors */}
        {(errors.motherName ||
          errors.motherPhone ||
          errors.fatherName ||
          errors.fatherPhone ||
          errors.parentEmail ||
          errors.parentInfo) && (
            <div className="mt-4 space-y-1">
              {errors.motherName && (
                <p className="text-red-600 text-sm text-right">
                  {errors.motherName.message as string}
                </p>
              )}
              {errors.motherPhone && (
                <p className="text-red-600 text-sm text-right">
                  {errors.motherPhone.message as string}
                </p>
              )}
              {errors.fatherName && (
                <p className="text-red-600 text-sm text-right">
                  {errors.fatherName.message as string}
                </p>
              )}
              {errors.fatherPhone && (
                <p className="text-red-600 text-sm text-right">
                  {errors.fatherPhone.message as string}
                </p>
              )}
              {errors.parentInfo && (
                <p className="text-red-600 text-sm text-right">
                  {errors.parentInfo.message as string}
                </p>
              )}
            </div>
          )}
      </div>
    </FormSection>
  </div>
);
