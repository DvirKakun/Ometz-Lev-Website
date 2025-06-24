export interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  variant?: "default" | "icon" | "outline";
  size?: "sm" | "md" | "lg";
}

export interface WhatsAppIconProps {
  className?: string;
  size?: number;
}
