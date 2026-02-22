import React from "react";
import type { FormRadioGroupProps, FormRadioGroupOption } from "../../types/forms";

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
  // Normalize options to object format
  const normalizedOptions: FormRadioGroupOption[] = options.map(opt => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const getLayoutClasses = () => {
    switch (layout) {
      case "grid":
        // For mobile responsiveness: 2 columns on mobile, full on larger screens for <=4 items
        if (normalizedOptions.length <= 4) {
          return `grid grid-cols-2 sm:grid-cols-${normalizedOptions.length} gap-1`;
        }
        return `grid grid-cols-${normalizedOptions.length} gap-1`;
      case "vertical":
        return "flex flex-col gap-1";
      default:
        return "flex gap-1";
    }
  };

  return (
    <div className={className}>
      <label className="text-xs font-medium text-slate-700 block text-right mb-1">
        {label} {required && "*"}
      </label>
      <div className={getLayoutClasses()}>
        {normalizedOptions.map((option) => (
          <label key={option.value} className="relative flex-1">
            <input
              {...register}
              type="radio"
              value={option.value}
              className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer peer"
            />
            <div
              className={`px-2 py-2 bg-slate-50 border border-slate-300 rounded text-center cursor-pointer peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2 transition-all ${optionClassName}`}
            >
              <div className="text-xs font-medium peer-checked:text-white text-slate-700">
                {option.label}
              </div>
              {option.description && (
                <div className="text-[10px] mt-1 peer-checked:text-white text-slate-500 leading-tight">
                  {option.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
      {error && <p className="text-red-600 text-xs text-right mt-1">{error}</p>}
    </div>
  );
};

export default FormRadioGroup;
