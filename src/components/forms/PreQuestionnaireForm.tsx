import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Phone, Send } from "lucide-react";
import { sendPreQuestionnaire } from "../../lib/brevo";
import {
  FormInput,
  FormRadioGroup,
  FormSubmitButton,
  FormSection,
  FormAgeInput,
  FormConditionalTextarea,
  FormAddressInput,
} from ".";

// Validation schema
const formSchema = z.object({
  // Dog age
  ageYears: z.coerce
    .number()
    .min(0, "שנים חייבות להיות 0 או יותר")
    .int("שנים חייבות להיות מספר שלם"),
  ageMonths: z.coerce
    .number()
    .min(0, "חודשים חייבים להיות 0 או יותר")
    .max(11, "חודשים חייבים להיות עד 11")
    .int("חודשים חייבים להיות מספר שלם"),
  ageWeeks: z.coerce
    .number()
    .min(0, "שבועות חייבים להיות 0 או יותר")
    .max(3, "שבועות חייבים להיות עד 3")
    .int("שבועות חייבים להיות מספר שלם"),

  // Allergies
  hasAllergies: z
    .string({
      required_error: "יש לבחור תשובה",
      invalid_type_error: "יש לבחור תשובה",
    })
    .min(1, "יש לבחור תשובה"),
  allergiesDetails: z.string().optional(),

  // Surgery/Injury
  hasSurgeryOrInjury: z
    .string({
      required_error: "יש לבחור תשובה",
      invalid_type_error: "יש לבחור תשובה",
    })
    .min(1, "יש לבחור תשובה"),
  surgeryDetails: z.string().optional(),

  // Biting history
  hasBitten: z
    .string({
      required_error: "יש לבחור תשובה",
      invalid_type_error: "יש לבחור תשובה",
    })
    .min(1, "יש לבחור תשובה"),
  biteDetails: z.string().optional(),
  wearsMuzzle: z.string().optional(),

  // Contact information
  contactName: z
    .string()
    .min(1, "שם איש הקשר הוא שדה חובה")
    .regex(/^[\u0590-\u05FF\s]+$/, "השם חייב להכיל רק אותיות בעברית"),
  contactPhone: z
    .string()
    .min(1, "טלפון הוא שדה חובה")
    .regex(/^[0-9\-\s()]+$/, "מספר טלפון חייב להכיל רק מספרים"),

  // Address
  city: z.string().min(1, "עיר היא שדה חובה"),
  street: z.string().min(1, "רחוב הוא שדה חובה"),
  houseNumber: z.string().min(1, "מספר בית הוא שדה חובה"),
  floor: z.string().min(1, "קומה היא שדה חובה"),
  apartment: z.string().optional(),
  entranceCode: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface PreQuestionnaireFormProps {
  onSuccess: () => void;
  onError: () => void;
}

const PreQuestionnaireForm = ({
  onSuccess,
  onError,
}: PreQuestionnaireFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ageYears: 0,
      ageMonths: 0,
      ageWeeks: 0,
      hasAllergies: "",
      hasSurgeryOrInjury: "",
      hasBitten: "",
    },
  });

  // Watch conditional fields
  const hasAllergies = watch("hasAllergies");
  const hasSurgeryOrInjury = watch("hasSurgeryOrInjury");
  const hasBitten = watch("hasBitten");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const result = await sendPreQuestionnaire({
        ageYears: data.ageYears,
        ageMonths: data.ageMonths,
        ageWeeks: data.ageWeeks,
        hasAllergies: data.hasAllergies,
        allergiesDetails: data.allergiesDetails,
        hasSurgeryOrInjury: data.hasSurgeryOrInjury,
        surgeryDetails: data.surgeryDetails,
        hasBitten: data.hasBitten,
        biteDetails: data.biteDetails,
        wearsMuzzle: data.wearsMuzzle,
        contactName: data.contactName,
        contactPhone: data.contactPhone,
        city: data.city,
        street: data.street,
        houseNumber: data.houseNumber,
        floor: data.floor,
        apartment: data.apartment,
        entranceCode: data.entranceCode,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to send form");
      }

      reset();
      onSuccess();
    } catch (error) {
      console.error("Form submission error:", error);
      onError();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent Enter key from submitting form except on the submit button
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "BUTTON") {
      e.preventDefault();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
      className="space-y-6"
    >
      {/* Dog Information Section */}
      <FormSection>
        <h3 className="text-base font-semibold text-primary-700 text-right mb-4">
          פרטים על הכלב/ה
        </h3>

        {/* Age */}
        <FormAgeInput
          label="מה גיל הכלב/ה"
          registerYears={register("ageYears")}
          registerMonths={register("ageMonths")}
          registerWeeks={register("ageWeeks")}
          errorYears={errors.ageYears?.message}
          errorMonths={errors.ageMonths?.message}
          errorWeeks={errors.ageWeeks?.message}
          required
          className="mb-4"
        />

        {/* Allergies */}
        <FormRadioGroup
          label="האם קיימות אלרגיות? אם כן פרט/י"
          options={["לא", "כן"]}
          register={register("hasAllergies")}
          error={errors.hasAllergies?.message}
          layout="horizontal"
          required
          className="mb-2"
        />
        <FormConditionalTextarea
          label="פרט/י על האלרגיות"
          placeholder="תאר/י את האלרגיות..."
          register={register("allergiesDetails")}
          error={errors.allergiesDetails?.message}
          showCondition={hasAllergies === "כן"}
          rows={2}
          className="mb-4"
        />

        {/* Surgery/Injury */}
        <FormRadioGroup
          label="האם הכלב/ה עבר/ה ניתוח או פציעה? אם כן פרט/י"
          options={["לא", "כן"]}
          register={register("hasSurgeryOrInjury")}
          error={errors.hasSurgeryOrInjury?.message}
          layout="horizontal"
          required
          className="mb-2"
        />
        <FormConditionalTextarea
          label="פרט/י על הניתוח/פציעה"
          placeholder="תאר/י את הניתוח או הפציעה..."
          register={register("surgeryDetails")}
          error={errors.surgeryDetails?.message}
          showCondition={hasSurgeryOrInjury === "כן"}
          rows={2}
          className="mb-4"
        />

        {/* Biting */}
        <FormRadioGroup
          label="האם הכלב/ה נשך/ה בעבר? אם כן פרט/י"
          options={[
            "לא",
            "כן, אחד מבני הבית",
            "כן, בני אדם ברחוב",
            "כן, כלבים אחרים",
          ]}
          register={register("hasBitten")}
          error={errors.hasBitten?.message}
          layout="grid"
          required
          className="mb-2"
        />
        <FormConditionalTextarea
          label="פרט/י על הנשיכה"
          placeholder="תאר/י את המקרה..."
          register={register("biteDetails")}
          error={errors.biteDetails?.message}
          showCondition={hasBitten !== "לא" && hasBitten !== ""}
          rows={2}
          className="mb-4"
        />

        {/* Muzzle - only if bitten */}
        {hasBitten !== "לא" && hasBitten !== "" && (
          <FormRadioGroup
            label="האם הכלב/ה רגיל לזמם (מחסום)?"
            options={["לא", "כן"]}
            register={register("wearsMuzzle")}
            error={errors.wearsMuzzle?.message}
            layout="horizontal"
            required
            className="mr-6"
          />
        )}
      </FormSection>

      {/* Contact Information Section */}
      <FormSection>
        <h3 className="text-base font-semibold text-primary-700 text-right mb-4">
          פרטי קשר
        </h3>

        <FormInput
          label="שם איש הקשר"
          icon={User}
          placeholder="הכניס/י את שמך המלא"
          register={register("contactName")}
          error={errors.contactName?.message}
          required
          inputClassName="px-3 py-2 pr-10"
          className="mb-4"
        />

        <FormInput
          label="מספר טלפון של איש קשר"
          icon={Phone}
          type="tel"
          placeholder="050-1234567"
          register={register("contactPhone")}
          error={errors.contactPhone?.message}
          required
          inputClassName="px-3 py-2 pr-10"
          className="mb-4"
        />

        <FormAddressInput
          registerCity={register("city")}
          registerStreet={register("street")}
          registerHouseNumber={register("houseNumber")}
          registerFloor={register("floor")}
          registerApartment={register("apartment")}
          registerEntranceCode={register("entranceCode")}
          errorCity={errors.city?.message}
          errorStreet={errors.street?.message}
          errorHouseNumber={errors.houseNumber?.message}
          errorFloor={errors.floor?.message}
          errorApartment={errors.apartment?.message}
          errorEntranceCode={errors.entranceCode?.message}
          required
        />
      </FormSection>

      {/* Submit Button */}
      <FormSection>
        <FormSubmitButton
          isSubmitting={isSubmitting}
          submittingText="שולח שאלון..."
          submitText="שלח שאלון"
          icon={Send}
          className="w-full"
        />
      </FormSection>
    </form>
  );
};

export default PreQuestionnaireForm;
