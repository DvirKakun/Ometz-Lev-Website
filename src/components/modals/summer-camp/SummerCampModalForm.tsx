import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SummerCampModalFormProps } from "../../../types/modals";

// Extracted components and hooks
import { formSchema, type FormData } from "./schemas/formSchemas";
import { StepIndicator } from "./components/StepIndicator";
import { StepNavigation } from "./components/StepNavigation";
import { Step1Component } from "./components/Step1Component";
import { Step2Component } from "./components/Step2Component";
import { Step3Component } from "./components/Step3Component";
import { Step4Component } from "./components/Step4Component";
import { useStepValidation } from "./hooks/useStepValidation";
import { useFormSubmission } from "./hooks/useFormSubmission";
import { useParentErrorClearing } from "./hooks/useParentErrorClearing";

const SummerCampModalForm = ({
  onSuccess,
  onError,
  activityData,
}: SummerCampModalFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    watch,
    setValue,
    trigger,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      termsAccepted: undefined,
    },
  });

  // Custom hooks for logic separation
  const { validateStep } = useStepValidation({
    watch,
    setValue,
    trigger,
  });

  useParentErrorClearing({
    watch,
    clearErrors,
  });

  const { isSubmitting, submitForm } = useFormSubmission({
    onSuccess,
    onError,
    onReset: reset,
    setCurrentStep,
    activityName: activityData?.title || 'פעילות',
    activityStartDate: activityData?.startDate,
    activityEndDate: activityData?.endDate,
  });

  // Set default session value when activityData changes
  useEffect(() => {
    if (activityData) {
      const sessionNames = ["ראשון", "שני", "שלישי", "רביעי"];
      const firstSession = sessionNames[0]; // Always default to "ראשון"
      setValue("session", firstSession as any);
    }
  }, [activityData, setValue]);

  // Step navigation logic
  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render current step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Component
            register={register}
            errors={errors}
            activityData={activityData}
          />
        );
      case 2:
        return <Step2Component register={register} errors={errors} />;
      case 3:
        return (
          <Step3Component
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        );
      case 4:
        return (
          <Step4Component
            register={register}
            errors={errors}
            touchedFields={touchedFields}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
        <div className="mb-6">{renderCurrentStep()}</div>

        <StepNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          isSubmitting={isSubmitting}
          onPrevStep={prevStep}
          onNextStep={nextStep}
        />
      </form>
    </div>
  );
};

export default SummerCampModalForm;
