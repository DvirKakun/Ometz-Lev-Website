import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SummerCampModalFormProps } from "../../../types/modals";

// Extracted components and hooks
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from "./schemas/formSchemas";
import { StepIndicator } from "./components/StepIndicator";
import { StepNavigation } from "./components/StepNavigation";
import { Step1Component } from "./components/Step1Component";
import { Step2Component } from "./components/Step2Component";
import { Step3Component } from "./components/Step3Component";
import { Step4Component } from "./components/Step4Component";
import { useStepValidation } from "./hooks/useStepValidation";
import { useFormSubmission } from "./hooks/useFormSubmission";
import { useParentErrorClearing } from "./hooks/useParentErrorClearing";
import type { ZodSchema } from "zod";

const SummerCampModalForm = ({
  onSuccess,
  onError,
}: SummerCampModalFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  function getSchemaForStep(step: number): {
    schema: ZodSchema<any>;
    defaultValues: any;
  } {
    switch (step) {
      case 1:
        return { schema: step1Schema, defaultValues: {} };
      case 2:
        return { schema: step2Schema, defaultValues: {} };
      case 3:
        return { schema: step3Schema, defaultValues: {} };
      case 4:
        return { schema: step4Schema, defaultValues: {} };
      default:
        return { schema: step1Schema, defaultValues: {} };
    }
  }

  const { schema } = useMemo(
    () => getSchemaForStep(currentStep),
    [currentStep]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    watch,
    setValue,
    trigger,
    clearErrors,
  } = useForm<any>({
    resolver: zodResolver(schema as any),
    mode: "onChange",
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
  });

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
        return <Step1Component register={register} errors={errors} />;
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
