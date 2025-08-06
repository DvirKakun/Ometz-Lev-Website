import type { LucideIcon } from "lucide-react";

export interface FormInputProps {
  label: string;
  icon?: LucideIcon;
  placeholder: string;
  required?: boolean;
  type?: "text" | "email" | "tel" | "number";
  inputMode?: "numeric" | "decimal" | "tel" | "search" | "email" | "url";
  register: any;
  error?: string;
  className?: string;
  inputClassName?: string;
}

export interface FormRadioGroupProps {
  label: string;
  options: string[];
  register: any;
  error?: string;
  layout?: "horizontal" | "grid" | "vertical";
  required?: boolean;
  className?: string;
  optionClassName?: string;
}

export interface FormSectionProps {
  children: React.ReactNode;
  className?: string;
}

export interface FormSubmitButtonProps {
  isSubmitting: boolean;
  submittingText: string;
  submitText: string;
  icon?: LucideIcon;
  className?: string;
  size?: "icon" | "sm" | "lg" | "default" | null | undefined;
}

export interface FormSelectProps {
  label: string;
  icon?: LucideIcon;
  placeholder: string;
  options: string[];
  required?: boolean;
  register: any;
  error?: string;
  className?: string;
  selectClassName?: string;
}

export interface FormTextareaProps {
  label?: string;
  placeholder: string;
  register: any;
  error?: string;
  rows?: number;
  required?: boolean;
  className?: string;
  textareaClassName?: string;
}
