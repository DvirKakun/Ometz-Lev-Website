import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Phone, Mail, Loader2 } from "lucide-react";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const formSchema = z.object({
  fullName: z.string().min(1, "שם מלא הוא שדה חובה"),
  phone: z
    .string()
    .min(1, "טלפון הוא שדה חובה")
    .regex(/^[0-9\-+\s()]+$/, "פורמט טלפון לא תקין"),
  email: z.string().email("כתובת אימייל לא תקינה").optional().or(z.literal("")),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

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
    setSubmitStatus("idle");

    try {
      const templateParams = {
        name: data.fullName,
        email: data.email || "לא סופק",
        phone: data.phone || "לא סופק",
        message: data.message || "לא סופקה הודעה",
        time: new Date().toLocaleString(),
      };

      await emailjs.send(
        "service_k21go0m",
        "template_zjbj2xf",
        templateParams,
        "l-UTOpbo-lr3Vt79x"
      );

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Email send error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="max-w-lg mx-auto"
    >
      <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 text-right block">
                שם מלא *
              </label>
              <div className="relative">
                <input
                  {...register("fullName")}
                  type="text"
                  className={`w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right text-sm ${
                    errors.fullName ? "border-red-500" : "border-slate-200"
                  }`}
                  placeholder="הכניסו את שמכם"
                />
                <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-400" />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs text-right">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 text-right block">
                טלפון *
              </label>
              <div className="relative">
                <input
                  {...register("phone")}
                  type="tel"
                  className={`w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right text-sm ${
                    errors.phone ? "border-red-500" : "border-slate-200"
                  }`}
                  placeholder="050-1234567"
                />
                <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-400" />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs text-right">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 text-right block">
                אימייל
              </label>
              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  className={`w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right text-sm ${
                    errors.email ? "border-red-500" : "border-slate-200"
                  }`}
                  placeholder="example@email.com"
                />
                <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-400" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs text-right">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 text-right block">
                על מה תרצו לשמוע?
              </label>
              <textarea
                {...register("message")}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right text-sm h-16 resize-none"
                placeholder="תאר בקצרה את הבעיות או השאלות שלך..."
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              size="sm"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin mr-2" />
                  שולח...
                </>
              ) : (
                "שלח בקשה"
              )}
            </Button>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 text-center text-sm font-medium"
              >
                הבקשה נשלחה בהצלחה! נחזור אליכם בהקדם.
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-center text-sm font-medium"
              >
                אירעה שגיאה בשליחת הבקשה. אנא נסו שוב.
              </motion.div>
            )}

            <p className="text-xs text-slate-500 text-center">
              * שדות חובה
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactForm;
