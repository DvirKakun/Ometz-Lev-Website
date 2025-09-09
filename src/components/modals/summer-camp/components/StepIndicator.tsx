import { Check } from "lucide-react";
import { Separator } from "../../../ui/separator";
import { cn } from "../../../../lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({
  currentStep,
  totalSteps,
}: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-8 px-2 sm:px-4 mt-1 w-full mx-auto">
      <div className="flex items-center justify-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map(
          (step, index) => {
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            const isUpcoming = step > currentStep;

            return (
              <div
                key={step}
                className={cn(
                  "flex items-center",
                  index < totalSteps - 1 ? "flex-1" : "flex-0"
                )}
              >
                {/* Step Circle */}
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 ease-in-out relative z-10 flex-shrink-0",
                    isCompleted &&
                      "bg-primary-500 border-primary-500 text-white shadow-lg",
                    isCurrent &&
                      "bg-white border-primary-500 text-primary-500 shadow-md ring-2 sm:ring-4 ring-primary-100",
                    isUpcoming && "bg-white border-gray-300 text-gray-400"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3 sm:w-5 sm:h-5 animate-in zoom-in duration-200" />
                  ) : (
                    <span className="text-xs sm:text-sm font-semibold">
                      {step}
                    </span>
                  )}
                </div>

                {/* Connecting Line - only show between steps, not after the last one */}
                {index < totalSteps - 1 && (
                  <div className="relative flex items-center flex-1 mx-1 sm:mx-2">
                    {/* Background line */}
                    <Separator
                      orientation="horizontal"
                      className="w-full h-0.5 bg-gray-300"
                    />
                    {/* Progress line */}
                    <div
                      className={cn(
                        "absolute right-0 h-0.5 bg-primary-500 transition-all duration-500 ease-out",
                        step < currentStep ? "w-full" : "w-0"
                      )}
                    />
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
