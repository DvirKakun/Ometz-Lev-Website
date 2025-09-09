import {
  type UseFormRegister,
  type FieldErrors,
  type UseFormWatch,
  type UseFormSetValue,
} from "react-hook-form";
import { FormInput, FormRadioGroup, FormSection } from "../../../forms";
import { Slider } from "../../../ui/slider";
import type { FormData } from "../schemas/formSchemas";

interface Step3ComponentProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
}

export const Step3Component = ({
  register,
  errors,
  watch,
  setValue,
}: Step3ComponentProps) => {
  const watchDogFear = watch("dogFear");
  const watchAllergies = watch("allergies");
  const watchHealthIssues = watch("healthIssues");
  const watchDogFearScale = watch("dogFearScale");

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          מידע בריאותי
        </h3>
        <p className="text-sm text-gray-600">
          מלאו פרטים בריאותיים חשובים של הילד/ה
        </p>
      </div>

      <FormSection>
        <div className="space-y-4">
          <label className="text-sm text-slate-700 block text-right mb-4 font-medium">
            מידע בריאותי *
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dog Fear */}
            <div className="space-y-3">
              <FormRadioGroup
                label="פחד מכלבים"
                options={["כן", "לא"]}
                register={register("dogFear")}
                layout="grid"
                className="text-center"
              />
              {watchDogFear === "כן" && (
                <div className="mt-3">
                  <Slider
                    defaultValue={[5]}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full mb-2"
                    onValueChange={(value) =>
                      setValue("dogFearScale", value[0])
                    }
                  />
                  <div className="text-center text-sm text-slate-600">
                    רמת פחד: {watchDogFearScale || 5}/10
                  </div>
                </div>
              )}
            </div>

            {/* Allergies */}
            <div className="space-y-3">
              <FormRadioGroup
                label="אלרגיות"
                options={["יש", "אין"]}
                register={register("allergies")}
                layout="grid"
                className="text-center"
              />
              {watchAllergies === "יש" && (
                <FormInput
                  label=""
                  placeholder="פרטי אלרגיות..."
                  register={register("allergiesText")}
                  inputClassName="mt-2"
                />
              )}
            </div>

            {/* Health Issues */}
            <div className="space-y-3">
              <FormRadioGroup
                label="בעיות בריאותיות"
                options={["יש", "אין"]}
                register={register("healthIssues")}
                layout="grid"
                className="text-center"
              />
              {watchHealthIssues === "יש" && (
                <FormInput
                  label=""
                  placeholder="פרטי בעיות..."
                  register={register("healthIssuesText")}
                  inputClassName="mt-2"
                />
              )}
            </div>
          </div>

          {/* Health Errors */}
          {(errors.dogFear ||
            errors.dogFearScale ||
            errors.allergies ||
            errors.allergiesText ||
            errors.healthIssues ||
            errors.healthIssuesText) && (
            <div className="mt-4 space-y-1">
              {errors.dogFear && (
                <p className="text-red-600 text-sm text-right">
                  {errors.dogFear.message as string}
                </p>
              )}
              {errors.dogFearScale && (
                <p className="text-red-600 text-sm text-right">
                  {errors.dogFearScale.message as string}
                </p>
              )}
              {errors.allergies && (
                <p className="text-red-600 text-sm text-right">
                  {errors.allergies.message as string}
                </p>
              )}
              {errors.allergiesText && (
                <p className="text-red-600 text-sm text-right">
                  {errors.allergiesText.message as string}
                </p>
              )}
              {errors.healthIssues && (
                <p className="text-red-600 text-sm text-right">
                  {errors.healthIssues.message as string}
                </p>
              )}
              {errors.healthIssuesText && (
                <p className="text-red-600 text-sm text-right">
                  {errors.healthIssuesText.message as string}
                </p>
              )}
            </div>
          )}
        </div>
      </FormSection>
    </div>
  );
};
