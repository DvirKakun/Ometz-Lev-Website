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
    sessionDates: Array<{
      startDate: Date;
      endDate: Date;
    }>;
  };
}

export const Step1Component = ({
  register,
  errors,
  activityData,
}: Step1ComponentProps) => {
  // Generate session options with dates, filtering out past/started sessions
  const sessionOptions = activityData
    ? Array.from({ length: activityData.sessions }, (_, i) => {
        const sessionNames = ["ראשון", "שני", "שלישי", "רביעי"];
        const sessionName = sessionNames[i];
        const sessionDate = activityData.sessionDates[i];

        // Check if session has started
        const now = new Date();
        const hasStarted = sessionDate && now >= sessionDate.startDate;

        // Skip past/started sessions - only show future sessions
        if (hasStarted) {
          return null;
        }

        // Format dates for display
        let description = "";
        if (sessionDate) {
          const formatDate = (date: Date) => {
            return date.toLocaleDateString("he-IL", {
              day: "numeric",
              month: "numeric",
              year: "2-digit"
            });
          };
          description = `${formatDate(sessionDate.startDate)} - ${formatDate(sessionDate.endDate)}`;
        }

        return {
          value: sessionName,
          label: sessionName,
          description,
        };
      }).filter((opt): opt is { value: string; label: string; description: string } => opt !== null)
    : [
        { value: "ראשון", label: "ראשון", description: "" },
        { value: "שני", label: "שני", description: "" },
      ]; // fallback

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
