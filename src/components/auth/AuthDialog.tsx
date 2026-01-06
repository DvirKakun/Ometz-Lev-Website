import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

type AuthMode = "login" | "signup" | "forgot-password";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: AuthMode;
}

export const AuthDialog = ({
  open,
  onOpenChange,
  initialMode = "login",
}: AuthDialogProps) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const handleSuccess = () => {
    onOpenChange(false);
    // Reset to login mode for next time
    setTimeout(() => setMode("login"), 300);
  };

  const getTitle = () => {
    switch (mode) {
      case "login":
        return "התחברות";
      case "signup":
        return "הרשמה";
      case "forgot-password":
        return "איפוס סיסמה";
    }
  };

  const getDescription = () => {
    switch (mode) {
      case "login":
        return "התחבר לחשבון שלך כדי לעקוב אחר ההתקדמות שלך";
      case "signup":
        return "צור חשבון חדש כדי לשמור את ההתקדמות שלך";
      case "forgot-password":
        return "קבל קישור לאיפוס הסיסמה שלך";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{getTitle()}</DialogTitle>
          <DialogDescription className="text-center">
            {getDescription()}
          </DialogDescription>
        </DialogHeader>

        {mode === "login" && (
          <LoginForm
            onSwitchToSignup={() => setMode("signup")}
            onSwitchToForgotPassword={() => setMode("forgot-password")}
            onSuccess={handleSuccess}
          />
        )}

        {mode === "signup" && (
          <SignupForm
            onSwitchToLogin={() => setMode("login")}
            onSuccess={handleSuccess}
          />
        )}

        {mode === "forgot-password" && (
          <ForgotPasswordForm onSwitchToLogin={() => setMode("login")} />
        )}
      </DialogContent>
    </Dialog>
  );
};
