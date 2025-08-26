import React from "react";
import type { FormTextareaProps } from "../../types/forms";

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  icon: Icon,
  placeholder,
  register,
  error,
  rows = 2,
  required = false,
  className = "",
  textareaClassName = "",
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="text-xs text-slate-700 block text-right mb-1">
          {label} {required && "*"}
        </label>
      )}
      <div className="relative">
        <textarea
          {...register}
          rows={rows}
          className={`w-full px-2 py-1 ${
            Icon ? "pr-7" : ""
          } bg-slate-50 border border-slate-300 rounded text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-200 text-right resize-none text-xs ${
            error ? "border-red-400" : ""
          } ${textareaClassName}`}
          placeholder={placeholder}
        />
        {Icon && (
          <Icon className="absolute right-2 top-2 w-3 h-3 text-slate-400" />
        )}
      </div>
      {error && <p className="text-red-500 text-xs text-right mt-1">{error}</p>}
    </div>
  );
};

export default FormTextarea;
