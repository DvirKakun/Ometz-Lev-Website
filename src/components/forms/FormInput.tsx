import React from "react";
import type { FormInputProps } from "../../types/forms";

const FormInput: React.FC<FormInputProps> = ({
  label,
  icon: Icon,
  placeholder,
  required = false,
  type = "text",
  register,
  error,
  className = "",
  inputClassName = "",
}) => {
  return (
    <div className={className}>
      <label className="text-xs text-white block text-right mb-1">
        {label} {required && "*"}
      </label>
      <div className="relative">
        <input
          {...register}
          type={type}
          className={`w-full px-2 py-1 ${
            Icon ? "pr-7" : ""
          } bg-white/10 border border-white/20 rounded text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white/30 text-right text-xs ${
            error ? "border-red-400" : ""
          } ${inputClassName}`}
          placeholder={placeholder}
        />
        {Icon && (
          <Icon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60" />
        )}
      </div>
      {error && <p className="text-red-300 text-xs text-right mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
