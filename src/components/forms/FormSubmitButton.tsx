import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import type { FormSubmitButtonProps } from "../../types/forms";

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  isSubmitting,
  submittingText,
  submitText,
  icon: Icon,
  className = "",
  size = "sm",
}) => {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className={`w-full bg-white text-primary-700 hover:bg-white/90 font-semibold py-2 rounded transition-all duration-200 mt-3 ${className}`}
      size={size}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-3 h-3 animate-spin ml-2" />
          {submittingText}
        </>
      ) : (
        <>
          {submitText}
          {Icon && <Icon className="w-3 h-3 ml-2" />}
        </>
      )}
    </Button>
  );
};

export default FormSubmitButton;
