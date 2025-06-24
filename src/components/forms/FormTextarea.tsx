import React from "react";
import type { FormTextareaProps } from "../../types/forms";

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
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
        <label className="text-xs text-white block text-right mb-1">
          {label} {required && "*"}
        </label>
      )}
      <textarea
        {...register}
        rows={rows}
        className={`w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white/30 text-right resize-none text-xs ${
          error ? "border-red-400" : ""
        } ${textareaClassName}`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-300 text-xs text-right mt-1">{error}</p>}
    </div>
  );
};

export default FormTextarea;
