import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Phone, Mail, MessageSquare, Send } from "lucide-react";
import { sendContactForm } from "../../../lib/brevo";
import type { ContactModalFormProps } from "../../../types/modals";
import { trackContact } from "../../../utils/facebookPixel";
import {
  FormInput,
  FormTextarea,
  FormSubmitButton,
  FormSection,
  PrivacyTermsCheckbox,
} from "../../forms";

const formSchema = z.object({
  fullName: z
    .string()
    .min(1, "שם מלא הוא שדה חובה")
    .regex(/^[\u0590-\u05FF\s]+$/, "השם חייב להכיל רק אותיות בעברית"),
  phone: z
    .string()
    .min(1, "טלפון הוא שדה חובה")
    .regex(/^[0-9\-\s()]+$/, "מספר טלפון חייב להכיל רק מספרים"),
  email: z.string().email("כתובת אימייל לא תקינה").optional().or(z.literal("")),
  message: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "יש לאשר את תנאי השימוש והפרטיות",
  }),
});

type FormData = z.infer<typeof formSchema>;

const ContactModalForm = ({ onSuccess, onError }: ContactModalFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const result = await sendContactForm({
        name: data.fullName,
        email: data.email || "",
        phone: data.phone,
        message: data.message || "",
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to send email');
      }

      reset();
      trackContact();
      onSuccess();
    } catch (error) {
      console.error("Email send error:", error);
      onError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection>
        {/* Contact Information */}
        <FormInput
          label="שם מלא"
          icon={User}
          placeholder="הכניסו את שמכם המלא"
          register={register("fullName")}
          error={errors.fullName?.message}
          required
          inputClassName="px-3 py-2 pr-10 backdrop-blur-sm rounded-lg text-sm focus:ring-2 focus:ring-white/30 focus:border-transparent"
          className="space-y-1"
        />

        <FormInput
          label="טלפון"
          icon={Phone}
          type="tel"
          placeholder="050-1234567"
          register={register("phone")}
          error={errors.phone?.message}
          required
          inputClassName="px-3 py-2 pr-10 backdrop-blur-sm rounded-lg text-sm focus:ring-2 focus:ring-white/30 focus:border-transparent"
          className="space-y-1"
        />

        <FormInput
          label="אימייל (אופציונלי)"
          icon={Mail}
          type="email"
          placeholder="example@email.com"
          register={register("email")}
          error={errors.email?.message}
          inputClassName="px-3 py-2 pr-10 backdrop-blur-sm rounded-lg text-sm focus:ring-2 focus:ring-white/30 focus:border-transparent"
          className="space-y-1"
        />
      </FormSection>

      <FormSection>
        {/* Message */}
        <FormTextarea
          label="הודעה (אופציונלי)"
          icon={MessageSquare}
          placeholder="תארו בקצרה על מה תרצו לשמוע..."
          register={register("message")}
          rows={2}
          className="space-y-1 mt-3"
          textareaClassName="px-3 py-2 pr-10 rounded-lg text-sm resize-none"
        />
      </FormSection>

      <FormSection>
        {/* Privacy Policy Checkbox */}
        <PrivacyTermsCheckbox
          register={register("termsAccepted")}
          error={errors.termsAccepted}
        />
      </FormSection>

      <FormSection>
        {/* Submit Button */}
        <FormSubmitButton
          isSubmitting={isSubmitting}
          submittingText="שולח הודעה..."
          submitText="שלח הודעה"
          icon={Send}
          className="rounded-lg mt-4"
        />
      </FormSection>
    </form>
  );
};

export default ContactModalForm;
