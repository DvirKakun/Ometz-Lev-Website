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
        // Responsive grid: 2 columns on mobile, specific columns on desktop
        // auto-rows-fr ensures equal height for all rows
        const cols = normalizedOptions.length;
        if (cols === 1) {
          return "grid grid-cols-1 auto-rows-fr gap-2";
        } else if (cols === 2) {
          return "grid grid-cols-2 auto-rows-fr gap-2";
        } else if (cols === 3) {
          return "grid grid-cols-2 sm:grid-cols-3 auto-rows-fr gap-2";
        } else if (cols === 4) {
          return "grid grid-cols-2 sm:grid-cols-4 auto-rows-fr gap-2";
        }
        return "grid grid-cols-2 auto-rows-fr gap-2";
      case "vertical":
        return "flex flex-col gap-2";
      default:
        return "flex gap-2";
    }
  };

  return (
    <div className={className}>
      <label className="text-xs font-medium text-slate-700 block text-right mb-1">
        {label} {required && "*"}
      </label>
      <div className={getLayoutClasses()}>
        {normalizedOptions.map((option) => (
          <label key={option.value} className={`relative h-full ${option.disabled ? 'cursor-not-allowed' : ''}`}>
            <input
              {...register}
              type="radio"
              value={option.value}
              disabled={option.disabled}
              className={`absolute left-0 top-0 w-full h-full opacity-0 peer ${option.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            />
            <div
              className={`h-full px-2 py-1.5 sm:px-2 sm:py-2 rounded-lg text-center transition-all duration-200 flex flex-col items-center justify-center ${
                option.disabled
                  ? 'bg-slate-100 border-2 border-slate-200 cursor-not-allowed'
                  : 'bg-white border-2 border-slate-300 cursor-pointer hover:border-primary-400 hover:shadow-sm peer-checked:bg-primary-500 peer-checked:border-primary-600 peer-checked:shadow-md peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2'
              } ${optionClassName}`}
            >
              <div className={`text-xs sm:text-sm font-bold mb-0.5 ${option.disabled ? 'text-slate-400' : 'peer-checked:text-white text-slate-800'}`}>
                {option.label}
              </div>
              {option.description && (
                <div className={`text-[10px] sm:text-xs leading-tight whitespace-pre-line ${option.disabled ? 'text-slate-400' : 'peer-checked:text-white text-slate-600'}`}>
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
