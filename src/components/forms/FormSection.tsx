import React from "react";
import type { FormSectionProps } from "../../types/forms";

const FormSection: React.FC<FormSectionProps> = ({
  children,
  className = "",
}) => {
  return <div className={`space-y-3 ${className}`}>{children}</div>;
};

export default FormSection;
