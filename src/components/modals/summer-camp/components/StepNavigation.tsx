import { ChevronRight, ChevronLeft, Send, Loader2 } from "lucide-react";
import { Button } from "../../../ui/button";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const StepNavigation = ({
  currentStep,
  totalSteps,
  isSubmitting,
  onPrevStep,
  onNextStep,
}: StepNavigationProps) => {
  return (
    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
      <Button
        key="prev"
        type="button"
        variant="outline"
        onClick={onPrevStep}
        disabled={currentStep === 1}
        className="flex items-center gap-2"
      >
        <ChevronRight className="w-4 h-4" />
        קודם
      </Button>

      {currentStep < totalSteps ? (
        <Button
          key="next"
          type="button"
          variant="default"
          onClick={onNextStep}
          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600"
        >
          הבא
          <ChevronLeft className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          key="submit"
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              שולח...
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            <>
              שלח הרשמה
              <Send className="w-4 h-4" />
            </>
          )}
        </Button>
      )}
    </div>
  );
};
