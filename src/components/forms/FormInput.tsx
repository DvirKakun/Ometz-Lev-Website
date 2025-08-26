import React from "react";
import type { FormInputProps } from "../../types/forms";

const FormInput: React.FC<FormInputProps> = ({
  label,
  icon: Icon,
  placeholder,
  required = false,
  type = "text",
  inputMode,
  register,
  error,
  className = "",
  inputClassName = "",
}) => {
  return (
    <div className={className}>
      <label className="text-xs text-slate-700 block text-right mb-1">
        {label} {required && "*"}
      </label>
      <div className="relative">
        <input
          {...register}
          type={type}
          inputMode={inputMode}
          className={`w-full px-2 py-1 ${
            Icon ? "pr-7" : ""
          } bg-slate-50 border border-slate-300 rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-right text-xs ${
            error ? "border-red-400" : ""
          } ${inputClassName}`}
          placeholder={placeholder}
        />
        {Icon && (
          <Icon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-400" />
        )}
      </div>
      {error && <p className="text-red-500 text-xs text-right mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
