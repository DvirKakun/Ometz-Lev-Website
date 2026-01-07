import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, UserPlus, KeyRound, type LucideIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
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

  // Reset to login mode when dialog closes
  useEffect(() => {
    if (!open) {
      // Small delay to avoid visual glitch during close animation
      const timer = setTimeout(() => setMode("login"), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleSuccess = () => {
    onOpenChange(false);
    // Reset to login mode for next time
    setTimeout(() => setMode("login"), 300);
  };

  const getModeConfig = (): {
    icon: LucideIcon;
    title: string;
    description: string;
  } => {
    switch (mode) {
      case "login":
        return {
          icon: User,
          title: "התחברות",
          description: "התחבר לחשבון שלך כדי לעקוב אחר ההתקדמות שלך",
        };
      case "signup":
        return {
          icon: UserPlus,
          title: "הרשמה",
          description: "צור חשבון חדש כדי לשמור את ההתקדמות שלך",
        };
      case "forgot-password":
        return {
          icon: KeyRound,
          title: "איפוס סיסמה",
          description: "קבל קישור לאיפוס הסיסמה שלך",
        };
    }
  };

  const { icon: Icon, title, description } = getModeConfig();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[85vw] sm:max-w-md max-h-[90vh] p-0 border-0 text-primary-900 overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
            }}
            className="flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 pb-6 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg mx-auto mb-4"
              >
                <Icon className="w-7 h-7 text-primary-50" />
              </motion.div>
              <DialogTitle asChild>
                <h2 className="text-2xl font-bold text-primary-900 mb-2">
                  {title}
                </h2>
              </DialogTitle>
              <DialogDescription asChild>
                <p className="text-sm text-primary-700">{description}</p>
              </DialogDescription>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto" style={{ backgroundColor: '#fefdfb' }}>
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
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
