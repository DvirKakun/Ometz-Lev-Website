import React from "react";
import type { FormRadioGroupProps } from "../../types/forms";

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  label,
  options,
  register,
  error,
  layout = "horizontal",
  required = false,
  className = "",
  optionClassName = "",
}) => {
  const getLayoutClasses = () => {
    switch (layout) {
      case "grid":
        return `grid grid-cols-${options.length} gap-1`;
      case "vertical":
        return "flex flex-col gap-1";
      default:
        return "flex gap-1";
    }
  };

  return (
    <div className={className}>
      <label className="text-xs font-medium text-white block text-right mb-1">
        {label} {required && "*"}
      </label>
      <div className={getLayoutClasses()}>
        {options.map((option) => (
          <label key={option} className="relative">
            <input
              {...register}
              type="radio"
              value={option}
              className="sr-only peer"
            />
            <div
              className={`px-2 py-1 bg-white/10 border border-white/20 rounded text-center text-xs text-white cursor-pointer peer-checked:bg-white peer-checked:text-primary-700 transition-all ${optionClassName}`}
            >
              {option}
            </div>
          </label>
        ))}
      </div>
      {error && <p className="text-red-300 text-xs text-right mt-1">{error}</p>}
    </div>
  );
};

export default FormRadioGroup;
