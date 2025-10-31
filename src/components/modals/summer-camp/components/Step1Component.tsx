import { User, Baby, GraduationCap } from "lucide-react";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import {
  FormInput,
  FormSelect,
  FormRadioGroup,
  FormSection,
} from "../../../forms";
import { GRADE_OPTIONS, type FormData } from "../schemas/formSchemas";
interface Step1ComponentProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  activityData?: {
    sessions: number;
    title: string;
    registerFormTitle: string;
    registerFormMessage: React.ReactNode;
  };
}

export const Step1Component = ({
  register,
  errors,
  activityData,
}: Step1ComponentProps) => {
  // Generate session options based on activityData.sessions
  const sessionOptions = activityData
    ? Array.from({ length: activityData.sessions }, (_, i) => {
        const sessionNames = ["ראשון", "שני", "שלישי", "רביעי"];
        return sessionNames[i];
      })
    : ["ראשון", "שני", "שלישי"]; // fallback

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          פרטי הילד והמחזור
        </h3>
        <p className="text-sm text-gray-600">
          מלאו את הפרטים הבסיסיים של הילד/ה
        </p>
      </div>

      <FormSection>
        <FormRadioGroup
          label="מחזור"
          options={sessionOptions}
          register={register("session")}
          error={errors.session?.message as string}
          required
          className="w-full"
          layout="horizontal"
          optionClassName={sessionOptions.length > 2 ? "text-xs" : ""}
        />
      </FormSection>

      <FormSection>
        <div className="grid grid-cols-12 gap-3">
          <FormInput
            label="שם הילד/ה"
            icon={User}
            placeholder="שם"
            register={register("childName")}
            error={errors.childName?.message as string}
            required
            className="col-span-12 sm:col-span-6"
          />

          <FormInput
            label="גיל"
            icon={Baby}
            placeholder="גיל"
            inputMode="numeric"
            register={register("age", { valueAsNumber: true })}
            error={errors.age?.message as string}
            required
            className="col-span-6 sm:col-span-3"
          />

          <FormSelect
            label="כיתה"
            icon={GraduationCap}
            placeholder="בחר כיתה"
            options={GRADE_OPTIONS}
            register={register("grade")}
            error={errors.grade?.message as string}
            required
            className="col-span-6 sm:col-span-3"
          />
        </div>
      </FormSection>
    </div>
  );
};
