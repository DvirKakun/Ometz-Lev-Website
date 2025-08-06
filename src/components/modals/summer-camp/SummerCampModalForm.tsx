import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Baby, GraduationCap, Send } from "lucide-react";
import { Slider } from "../../ui/slider";
import emailjs from "@emailjs/browser";
import type { SummerCampModalFormProps } from "../../../types/modals";
import {
  FormInput,
  FormSelect,
  FormRadioGroup,
  FormTextarea,
  FormSubmitButton,
  FormSection,
} from "../../forms";

const GRADE_OPTIONS = [
  "א׳",
  "ב׳",
  "ג׳",
  "ד׳",
  "ה׳",
  "ו׳",
  "ז׳",
  "ח׳",
  "ט׳",
  "י׳",
  "יא׳",
  "יב׳",
];

const formSchema = z
  .object({
    session: z.enum(["ראשון", "שני", "שלישי"], {
      required_error: "יש לבחור מחזור",
      invalid_type_error: "יש לבחור מחזור",
    }),
    childName: z
      .string()
      .min(1, "שם הילד/ה הוא שדה חובה")
      .regex(/^[\u0590-\u05FF\s]+$/, "השם חייב להכיל רק אותיות בעברית"),
    age: z
      .number({
        required_error: "גיל הוא שדה חובה",
        invalid_type_error: "גיל חייב להיות מספר",
      })
      .min(1, "גיל חייב להיות לפחות 1"),
    grade: z.enum(
      [
        "א׳",
        "ב׳",
        "ג׳",
        "ד׳",
        "ה׳",
        "ו׳",
        "ז׳",
        "ח׳",
        "ט׳",
        "י׳",
        "יא׳",
        "יב׳",
      ],
      {
        required_error: "יש לבחור כיתה",
        invalid_type_error: "יש לבחור כיתה",
      }
    ),
    motherName: z
      .string()
      .optional()
      .refine((val) => !val || /^[\u0590-\u05FF\s]+$/.test(val), {
        message: "השם חייב להכיל רק אותיות בעברית",
      }),
    motherPhone: z.string().optional(),
    fatherName: z
      .string()
      .optional()
      .refine((val) => !val || /^[\u0590-\u05FF\s]+$/.test(val), {
        message: "השם חייב להכיל רק אותיות בעברית",
      }),
    fatherPhone: z.string().optional(),
    dogFear: z
      .string()
      .nullable()
      .refine((val) => val !== null && val !== "", {
        message: "יש לבחור אם יש פחד מכלבים",
      }),
    dogFearScale: z.number().min(1).max(10).optional(),
    allergies: z
      .string()
      .nullable()
      .refine((val) => val !== null && val !== "", {
        message: "יש לבחור אם יש אלרגיות",
      }),
    allergiesText: z.string().optional(),
    healthIssues: z
      .string()
      .nullable()
      .refine((val) => val !== null && val !== "", {
        message: "יש לבחור אם יש בעיות בריאותיות",
      }),
    healthIssuesText: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) =>
      (data.motherName &&
        data.motherName.trim() !== "" &&
        data.motherPhone &&
        data.motherPhone.trim() !== "") ||
      (data.fatherName &&
        data.fatherName.trim() !== "" &&
        data.fatherPhone &&
        data.fatherPhone.trim() !== ""),
    {
      message: "חובה לספק לפחות שם ומספר טלפון של אחד ההורים",
      path: ["motherName"],
    }
  )
  .refine((data) => data.dogFear !== "כן" || data.dogFearScale, {
    message: "אנא ציינו את רמת הפחד בסקלה",
    path: ["dogFearScale"],
  })
  .refine((data) => data.allergies !== "יש" || data.allergiesText, {
    message: "אנא פרטו את האלרגיות",
    path: ["allergiesText"],
  })
  .refine((data) => data.healthIssues !== "יש" || data.healthIssuesText, {
    message: "אנא פרטו את הבעיות הבריאותיות",
    path: ["healthIssuesText"],
  });

type FormData = z.infer<typeof formSchema>;

const SummerCampModalForm = ({
  onSuccess,
  onError,
}: SummerCampModalFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const watchDogFear = watch("dogFear");
  const watchAllergies = watch("allergies");
  const watchHealthIssues = watch("healthIssues");
  const watchDogFearScale = watch("dogFearScale");

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

  const onSubmit = async (data: FormData) => {
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

      await emailjs.send(
        "service_k21go0m",
        "template_27fc0bl",
        templateParams,
        "l-UTOpbo-lr3Vt79x"
      );

      reset();
      onSuccess();
    } catch (error) {
      console.error("Registration error:", error);
      onError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <FormSection>
        {/* Session Selection */}
        <FormRadioGroup
          label="מחזור"
          options={["ראשון", "שני", "שלישי"]}
          register={register("session")}
          error={errors.session?.message}
          layout="grid"
          required
        />
      </FormSection>

      <FormSection>
        {/* Basic Info - 3 Columns with appropriate widths */}
        <div className="grid grid-cols-12 gap-2">
          <FormInput
            label="שם הילד/ה"
            icon={User}
            placeholder="שם"
            register={register("childName")}
            error={errors.childName?.message}
            required
            className="col-span-12 sm:col-span-6"
          />

          <FormInput
            label="גיל"
            icon={Baby}
            placeholder="גיל"
            inputMode="numeric"
            register={register("age", { valueAsNumber: true })}
            error={errors.age?.message}
            required
            className="col-span-6 sm:col-span-3"
          />

          <FormSelect
            label="כיתה"
            icon={GraduationCap}
            placeholder="בחר כיתה"
            options={GRADE_OPTIONS}
            register={register("grade")}
            error={errors.grade?.message}
            required
            className="col-span-6 sm:col-span-3"
          />
        </div>
      </FormSection>

      <FormSection>
        {/* Parents Info - Compact */}
        <div>
          <label className="text-xs text-white block text-right mb-1">
            פרטי הורים (לפחות אחד) *
          </label>
          <div className="grid grid-cols-2 gap-1 mb-1">
            <FormInput
              label=""
              placeholder="שם אמא"
              register={register("motherName")}
              inputClassName="text-xs py-1"
            />
            <FormInput
              label=""
              placeholder="טלפון אמא"
              type="tel"
              register={register("motherPhone")}
              inputClassName="text-xs py-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-1">
            <FormInput
              label=""
              placeholder="שם אבא"
              register={register("fatherName")}
              inputClassName="text-xs py-1"
            />
            <FormInput
              label=""
              placeholder="טלפון אבא"
              type="tel"
              register={register("fatherPhone")}
              inputClassName="text-xs py-1"
            />
          </div>
          {errors.motherName && (
            <p className="text-red-300 text-xs text-right mt-1">
              {errors.motherName.message}
            </p>
          )}
        </div>
      </FormSection>

      <FormSection>
        {/* Health Info - Compact 3 Columns */}
        <div>
          <label className="text-xs text-white block text-right mb-1">
            מידע בריאותי *
          </label>

          <div className="grid grid-cols-3 gap-2">
            {/* Dog Fear */}
            <div>
              <FormRadioGroup
                label="פחד מכלבים"
                options={["כן", "לא"]}
                register={register("dogFear")}
                layout="grid"
                optionClassName="px-1 py-1"
                className="text-center"
              />
              {watchDogFear === "כן" && (
                <div className="mt-2">
                  <Slider
                    defaultValue={[5]}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full mb-2 [&>.relative]:bg-white/20 [&_[data-radix-slider-range]]:bg-accent-400 [&_[data-radix-slider-thumb]]:bg-white [&_[data-radix-slider-thumb]]:border-2 [&_[data-radix-slider-thumb]]:border-accent-400 [&_[data-radix-slider-thumb]]:shadow-lg"
                    onValueChange={(value) =>
                      setValue("dogFearScale", value[0])
                    }
                  />
                  <div className="text-center text-xs text-white">
                    {watchDogFearScale || 5}/10
                  </div>
                </div>
              )}
            </div>

            {/* Allergies */}
            <div>
              <FormRadioGroup
                label="אלרגיות"
                options={["יש", "אין"]}
                register={register("allergies")}
                layout="grid"
                optionClassName="px-1 py-1"
                className="text-center"
              />
              {watchAllergies === "יש" && (
                <FormInput
                  label=""
                  placeholder="פרטי אלרגיות..."
                  register={register("allergiesText")}
                  inputClassName="text-xs py-1 mt-1"
                />
              )}
            </div>

            {/* Health Issues */}
            <div>
              <FormRadioGroup
                label="בריאות"
                options={["יש", "אין"]}
                register={register("healthIssues")}
                layout="grid"
                optionClassName="px-1 py-1"
                className="text-center"
              />
              {watchHealthIssues === "יש" && (
                <FormInput
                  label=""
                  placeholder="פרטי בעיות..."
                  register={register("healthIssuesText")}
                  inputClassName="text-xs py-1 mt-1"
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
            <div className="mt-1">
              {errors.dogFear && (
                <p className="text-red-300 text-xs text-right">
                  {errors.dogFear.message}
                </p>
              )}
              {errors.dogFearScale && (
                <p className="text-red-300 text-xs text-right">
                  {errors.dogFearScale.message}
                </p>
              )}
              {errors.allergies && (
                <p className="text-red-300 text-xs text-right">
                  {errors.allergies.message}
                </p>
              )}
              {errors.allergiesText && (
                <p className="text-red-300 text-xs text-right">
                  {errors.allergiesText.message}
                </p>
              )}
              {errors.healthIssues && (
                <p className="text-red-300 text-xs text-right">
                  {errors.healthIssues.message}
                </p>
              )}
              {errors.healthIssuesText && (
                <p className="text-red-300 text-xs text-right">
                  {errors.healthIssuesText.message}
                </p>
              )}
            </div>
          )}
        </div>
      </FormSection>

      <FormSection>
        {/* Notes */}
        <FormTextarea
          placeholder="הערות נוספות (אופציונלי)..."
          register={register("notes")}
          rows={2}
        />

        {/* Submit Button */}
        <FormSubmitButton
          isSubmitting={isSubmitting}
          submittingText="שולח..."
          submitText="שלח הרשמה"
          icon={Send}
        />
      </FormSection>
    </form>
  );
};

export default SummerCampModalForm;
